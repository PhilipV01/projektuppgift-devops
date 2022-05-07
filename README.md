# projektuppgift-devops
## Betygsgrundande uppgift för DevOps1 kursen.
-----------------------------------------------------------------
## Working in git branches
Because our *dev* and *main* branches are protected, we cannot write nor push directly to them. We can and will pull regularly to have the latest update of the branches found on our repo. 

Our *dev* should work in tandem with our *main*: whatever we want on main should exist and be thoroughly tested on *dev* first. 
Our *main* branch is connected to our live production server and as such, we do all of our ground work and testing FIRST through the *dev*.

This is why we create **feature** branches from *dev*, so that we can develop enhancements or chores that we later (when finished and tested) want to deploy to *main*. **Hotfix** branches are created from *main* when we need to address any bug issues that may appear on *main* so we can resolve it quickly for production. We do **not** use the hotfix branches to work on enhancements, neither do we create feature branches from *main*.

## Getting Started
### Cloning the repo
Start by cloning the repo into a directory: 
Pick/create a location/directory on your computer where your local repository will reside. Through the commandprompt, go to that location/directory. 
Write the following git command, and press enter (this will automatically start setting up your local repository.)

    git clone https://github.com/PhilipV01/projektuppgift-devops.git

Now you can open this repository folder in Visual Studio Code. Make sure to open the folder that matches the name of the repository and not the folder in which you placed it.

## Working your assignment

Go to the ***Trello*** board and look at what tasks/ features need to be done. Assign yourself to a task on Trello. Communicate this with the team on **Discord**, then head over to VS Code where your project should be open and visible.

### Checking what branch you are in
  Look at the bottom-left corner of your VS Code after you have opened your project. It will tell you the name of the branch you are in.
  Alternatively, you can from the terminal/command prompt write the following and hit enter:

      git status

  This will tell you what branch name you are on and if there are any updates that need to be pulled or if everything is up to date. If there are updates, you need to pull them by doing the following:

      git pull

  To get a list of the branches that are available, enter the following from the terminal/command prompt:

      git branch -r

You will then either select an existing branch or create a new branch to work in:

  ### *Selecting an existing feature branch*
  If there is already an existing feature branch, you can go to it by writing the following in the terminal/command prompt:

      git checkout [name-of-branch]
  You can also use the command palette in VS Code by clicking on the branch name in the bottom-left corner, and a drop-down list of all the available branches (local and remote) will appear. Choose one and hit enter.

  ### *Create feature branch*
  If there is not already a working feature branch for your picked assignment, you can create one for yourself AFTER YOU MAKE SURE YOU ARE IN *DEV* by doing the following in the command prompt:

      git checkout -b [feature-name-of-your-branch]

  You can also do this with command palette in VS Code: AFTER YOU MAKE SURE YOU ARE IN *DEV*, you select "+ Create new branch..." and after you select it, in the same line box that appears you will write the name of your branch following this naming convention:

      feature-[name-of-your-task]
  Hit enter and a branch will have been created from the branch you were currently on (which should be *dev*).Publish your branch to the remote repository and start working your feature.

  ### Commit regularly as you work
  You will work locally on your feature and should commit regularly to the feature branch you are working in with a brief summary message of what you have done. This will help you track your changes and if necessary, un-do them easier if necessary. Whenever you commit, this is always just in your local repository until you push/sync them to the repo.
  
  You can do this in the command prompt or via VS Code.

### Pushing your commits
  Pushing your commits is how you update the repo with your local changes. You can do this with every commit, if you are sure of your work (as in you might not need to roll back.) You can do this in the command prompt or VS Code.

  **Nevertheless, you should push your commits at the very least to the repo with the last commit before you are done for the day.** 

  This allows everyone to have the most up-to-date project on all branches, and allows the team to be able to continue work where it has been left off by others, in case you are off.

  This will also be especially useful if you should need any help solving something and we are all working remotely. That way you can just update the team on ***Discord*** on your latest pushes and what questions you have. This is in addition to us screensharing and working on each other's computers.

-----------------------------------------------------------------
## Merging from and to *dev*
When your feature is done and you are ready to incorporate your branch with *dev*:

1. Make sure everything is working and nothing broke in the project. Update your local *dev* by pulling from the origin to make sure *dev* is up-to-date.
2. Before you merge into *dev*, first merge *dev* locally into your feature branch and make sure your feature still works and nothing breaks.
3. When everything is still working locally, merge your local feature branch into your local *dev*.
4. Should something break, try to fix it and then test it again. Keep working locally until it works and the local merger is a success. 
        
*It is important to try merging locally with the most up-to-date *dev* info from the repo before attempting to do the merge on the repo. Always ask the team for help if you get stuck.*

5. Once everything passes locally, you will then push your feature branch to the repo.
6. Create a new pull request via the GitHub repo and merge your feature into dev.
7. Notify the team on ***Discord***, and tag the assigned code reviewer who will need to review and approve the changes before the merge can be completed.

------------------------------------------------------------------
## About the tests
We have three test types that we use to test various functionalities of our project:

1. **Postman/newman-tests (in folder called api-tests)**  
We use these to test the rest-api and making sure information is flowing to and from the back-end to the front-end.
2. **Webdriver IO-tests (in folder called cucumber-wdio)**  
These test the different user scenarios that we imagine the user would use our website and also how the product owner would want the website to be used.
3. **Jest-tests (in folder called test)**   
We use these to test that the frontend looks and buttons function as intended.

We also have a folder that we call "temp" which is where we place all tests that we want to keep but that for one reason or another is not working yet. 
All files moved to this folder are gitignored and therefore not tracked by git until moved out of it.

This is a temporary workaround that allows us to test our CI/CD process and make sure that is working properly with tests that are working as designed.

------------------------------------------------------------------
## About the CI process
To have quick checks and implementation of our upgrades and tests, once we have all of our security and functionality tests in place, we want these to automatically run whenever a change (that is not gitignored) is saved or pushed to our protected branches. This process is what we call Continous Integration or CI.

We utilize GitHub Actions (GHA) and for this we have a written yml script. The file called "wdiotestCI.yml" and is located in our ".github" folder, under a subfolder called "workflows".

This script lists all the jobs we want it to initiate whenever we push or pull to or from our protected branches (in some cases we may do so from other feature branches to be able to check our changes immediately.)

------------------------------------------------------------------
## About the CD process
The next natural step after CI is to make sure that we get these out to our customer as soon as they have been vetted through the CI process. We do not want our updates and changes to just sit around and wait once the automatic tests are run and have passed. This is what we call Continuous Deployment or CD. 

In the same yml script that we have for CI, towards the end, we have written steps to automatically deploy to our production server once certain conditions and criteria are met (for example, passing all of the crucial tests).

In addition to the tests having to pass, we have also criteria on what branch we are deploying from so that the changes only go to the web server that pertain to that particular branch.

-----------------------------------------------------------------
## About the database
We use SQLite Studio to manage our SQL databases. Go to our "backend" folder and into in a subfolder named "database" to find them.

We use 2 databases: **products-template.db** and **products.db**.

1. **products-template.db** is where we save the structure and set up of the database to use (as the name implies) as a template to create database.

2.  **products.db** is the one to which our servers retrieve and write information in the backend. This one is added in our .gitignore file, which means that we do not track/version control changes made there.

If you do already not have a database named products.db in the database folder before starting a local server host, the website will not show all proper information. 

Copy the products-template.db into the same folder and rename the copy to products.db before you start your local server!

If you need to make structural changes to the database (such as new tables, views, etc) then those changes need to be done in the products-template.db from the  tell everyone in the team that they should copy it again and rename as described above.