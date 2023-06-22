const path = require('path');
const cors = require('cors');

//firebase support? 
const { initializeApp } = require('firebase/app');

const firebaseConfig = {
  apiKey: "AIzaSyDm-HD1PTmtUaj3q6PgaI406-hZKxpvSak",
  authDomain: "parkinsonsdataapp.firebaseapp.com",
  projectId: "parkinsonsdataapp",
  storageBucket: "parkinsonsdataapp.appspot.com",
  messagingSenderId: "57156691833",
  appId: "1:57156691833:web:5a52f0285887baa656b1a8",
  measurementId: "G-JF3WEZGBK4",
  databaseURL: "https://parkinsonsdataapp-default-rtdb.firebaseio.com/"
};

const firebaseApp = initializeApp(firebaseConfig); 


//var fs = require('fs');
//var http = require('http');
//var https = require('https');
//var privateKey  = fs.readFileSync('/home/sard/hyperion_rest/key.pem', 'utf8');
//var certificate = fs.readFileSync('/home/sard/hyperion_rest/cert.pem', 'utf8');
//var credentials = {key: privateKey, cert: certificate};

const express = require('express');
const app = express(); // create express app


const corsOptions ={
  origin:true, 
  credentials:true, //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.use(cors(corsOptions));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// add middlewares
const root = require('path').join('/var/www/html', 'app');
app.use(express.static(root));

app.use('/*', (req, res, next) => {

   res.setHeader('Access-Control-Allow-Origin','*');
   res.setHeader('Access-Control-Allow-Methods','OPTIONS, GET, POST, PUT, PATCH, DELETE');
   res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');

   res.sendFile(path.join('/var/www/html', 'app', 'index.html'));
//   next();
});
//var httpsServer = https.createServer(credentials, app);
//httpsServer.listen(6060);
// start express server on port 5005
app.listen(5005, () => {
  console.log('server started');
});
