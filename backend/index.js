const path = require('path');
const betterSqlite3 = require('better-sqlite3');
const db = betterSqlite3(path.join(__dirname, '../backend/database','products.db'));

// Read settings from server-ports
const serverPorts = require(path.join(__dirname,'../server-ports.json'));
// Read SERVERNAME from command line / environment variable
// get the SERVERNAME from a environment variable or from a argument/flag
const serverName = process.env.SERVERNAME || process.argv[2].split("--SERVERNAME=")[1];
// Look up the port matching the servername
const port = serverPorts[serverName];
// If no port found - shut down wit a warning
if(!port){
  console.warn("YOU NEED TO PROVIDE THE NAME OF A SERVER THAT IS IN server-ports.json AS AN ENVIRONMENT VARIABLE CALLED SERVERNAME!");
  process.exit(1); // shut down
}

const express = require('express');

const app = express();

app.use(express.static('frontend'));

app.use(express.json({ limit: '100MB' }));

app.listen(port, () =>
  console.log('Listening on http://localhost:' + port));
const login = require('./login.js');

login(app, db);

const setupRESTapi = require('./rest-api');
setupRESTapi(app, db);

app.all('*', (req, res) => {
  res.status(404);
  res.set('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, '../frontend', '404.html'));
});