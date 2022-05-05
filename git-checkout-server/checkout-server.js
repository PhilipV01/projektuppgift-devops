//use the build in mini web server in node -http
const http = require ('http');
//Use the built in execSync command that can run command line/ bash comamand
const {execSync} = require('child_process');
//path helps build file path
const path = require('path');
const dbTemplatePath = path.join(__dirname, ('../backend','database','products-template.db'))
const dbPath = path.join(__dirname,('../database','products.db'));
//For github secret 
const secrets = process.env.DEPLOYMENT_KEY;
if(!secrets) {
    //if secret key is not provided, it will be shut down 
    console.log('You need to provide the DEPOLOYMENT_KEY as an environmental variable');
    process.exit(1);
} 

//A function that does all necessary git checkout clean up etc
function checkout(){
    execSync('git pull');
    execSync('npm install');
    execSync('rm' + dbPath);
    execSync('cp'+dbTemplatePath+''+dbpath);
    execSync('npm run build');
    execSync('pm2 resatrt main-app');

    console.log('pulled, copied db and restarted server ')
}

//Set up a small server that only check out things if know the secret hash
const server = http.createServer(function (req,res){
    res.end('This is check out server');
    if (req.url === '/' + secrets) //secret = hased keyword saved in github secret
   
    checkout();
 
});
//start up the server 
server.listen(8080,()=>console.log('Listening on http://localhost:9090'));

