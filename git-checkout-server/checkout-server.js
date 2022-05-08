//use the build in mini web server in node -http
const http = require('http');
//Use the built in execSync command that can run command line/ bash comamand
const { execSync } = require('child_process');
//path helps build file path
const path = require('path');
const dbTemplatePath = path.join(__dirname, ('../backend', 'database', 'products-template.db'))
const dbPath = path.join(__dirname, ('../database', 'products.db'));
//For github secret 
const secrets = process.env.DEPLOYMENT_KEY;
if (!secrets) {
    //if secret key is not provided, it will be shut down 
    console.log('You need to provide the DEPOLOYMENT_KEY as an environmental variable');
    process.exit(1);
}

// Read settings from server-ports
const serverPorts = require(path.join(__dirname, '../server-ports.json'));
// Read SERVERNAME from command line / environment variable
// get the SERVERNAME from a environment variable or from a argument/flag
const serverName = process.env.SERVERNAME || process.argv[2].split("--SERVERNAME=")[1];
// Look up the port matching the servername
const port = serverPorts[serverName];
// If no port found - shut down wit a warning
if (!port) {
    console.warn("YOU NEED TO PROVIDE THE NAME OF A SERVER THAT IS IN server-ports.json AS AN ENVIRONMENT VARIABLE CALLED SERVERNAME!");
    process.exit(1); // shut down
}

//A function that does all necessary git checkout clean up etc
function checkout() {

    // remove the CS part of this servername to get the pm2 name of
    // the server of to start or stop
    let serverToRestart = serverName.replaceAll('CS', '');

    execSync('git stash');
    execSync('git pull');
    execSync('npm install');
    execSync('pm2 stop ' + serverToRestart);
    execSync('rm ' + dbPath);
    execSync('cp ' + dbTemplatePath + ' ' + dbpath);
    execSync('npm run build');
    execSync('pm2 restart ' + serverToRestart);
    console.log('pulled, copied db and restarted server ')
}

//Set up a small server that only check out things if know the secret hash
const server = http.createServer(function (req, res) {
    res.end('This is check out server');
    if (req.url === '/' + secrets) //secret = hased keyword saved in github secret

        checkout();

});
//start up the server 
server.listen(port, () => console.log('Listening on http://localhost:' + port));

