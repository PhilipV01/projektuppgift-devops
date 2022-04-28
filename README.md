# projektuppgift-devops
## Betygsgrundande uppgift för DevOps1 kursen.
-----------------------------------------------------------------
## Getting Started
Start by cloning the repo into a directory, make sure that you are in the *dev* branch. Go to the ***Trello*** board and look at what tasks/ features need to be done. Assign yourself to a task, and after that make a new branch from the *dev* branch and start implementing your feature.

-----------------------------------------------------------------
## Merging
When your feature is done and you want to merge back into *dev* please make sure that you...

1. Make sure everything is working and nothing broke in the project.
2. Before you merge into *dev* merge *dev* into your feature branch and make sure your feature still works and nothing else broke, if something brakes try to fix it and test again.
3. When everything is working you can then merge your feature branch into *dev*.

-----------------------------------------------------------------
## About the database
If you dont have a database named products.db in the database folder the backend won't work. Copy the products-template.db and rename the copy products.db before you start the server!

If you **REALLY** want to commit changes tp the database, new tables etc, then make those changes in products-template.db and tell everyone in the team that they should copy it again and rename as described above.

------------------------------------------------------------------