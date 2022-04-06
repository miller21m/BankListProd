const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./db/mongoose');

const bankRouter = require('./api/router/banks');

const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//Handel CORS errors
app.use((req, res, next) =>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  if(req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});


app.use('/bank', bankRouter);

//Handle production
if(process.env.NODE_ENV === 'production'){
  //Static folder
  app.use(express.static(__dirname + '/public/'));

  //Handle SPA
  app.get(/.*/, (req, res)=>res.sendFile(__dirname + '/public/index.html'));
}

app.listen(port, ()=>{
  console.log(`Runing on port ${port}`);
})