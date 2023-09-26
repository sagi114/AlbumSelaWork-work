const express=require('express');
const expressApp=express();

var cors = require('cors')
const bodyParser = require("body-parser");


expressApp.use(bodyParser.urlencoded());
// have to set big limit to transfer image
expressApp.use(bodyParser.json({ limit: "50mb" }));
expressApp.use(cors());

const appController=require('./appController')
expressApp.use(appController);

const app=require('./Camera')
expressApp.use(app);

const appFileUploaded=require('./FileUploads')
expressApp.use(appFileUploaded);

const appGetPictures=require('./GetPictures')
expressApp.use(appGetPictures);

expressApp.listen(4000,()=>{
    console.log("server is up and running...")
});
