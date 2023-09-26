const  express  =  require('express')
const  app  =  express()
app.use(express.json())
const fs = require('fs'),
request = require('request'),
homedir = require('os').homedir(),
entries = fs.readdirSync( homedir, { withFileTypes: true } );

const FileSync = require('lowdb/adapters/FileSync')
const low = require('lowdb')
let adapter2 = new FileSync('dbPictures.json')
let dbPictures = low(adapter2)
const path = require("path");
const { url } = require('inspector');
const { send } = require('process');
const { response } = require('express');




function AddAPictur(PicturInfo) { 
    const num =GetPicturDbLenght();
    dbPictures.get('PicturesDb')
     .push({ id:num,information: PicturInfo})
     .write()
   }
   function GetPicturDbLenght() {
    return GetStoregeSize()
  }
  function GetStoregeSize() {
    adapter2 = new FileSync('dbPictures.json')
    dbPictures = low(adapter2)
    return dbPictures.get('PicturesDb')
    .size()
    .value()
  }
  function GetDbInfromation(num) {
    const arr=[]=GetArreyOfInformation();
    console.log(arr[num]);
    return dbPictures.get('PicturesDb').find({ information:{url:arr[num].information.url}  }).value()
  }
  function AddUploadsPicsToDb(){
    let fatherPath=path.dirname(__dirname)
    let picturesFolder=path.join(fatherPath,"uploads")
    
    const filesNames=fs.readdirSync(picturesFolder)
    filesNames.forEach(file=>{
      const found=dbPictures.get('PicturesDb').find({ information: {url:(path.join(picturesFolder,file))} })
        .value()
        if(!found){
          const lenght=GetStoregeSize();
          dbPictures.get('PicturesDb')
          .push({ id: lenght, information:{url:(path.join(fatherPath,"uploads",file))}})
          .write()
        }
    })
  }
  function GetUploadsPictures() {
    AddUploadsPicsToDb();
    return GetArreyOfInformation();
  }
  app.get('/getDetailsOfAllPictures',(req,res)=>{
    res.send( GetUploadsPictures());
  })
  function GetArreyOfInformation(){
    return dbPictures.get('PicturesDb')
    // .map('information')
    .value();
  }

  function getUpdatesLenght(){
    var fatherPath=path.dirname(__dirname)
    let picturesFolder=path.join(fatherPath,"uploads")
    let num=fs.readdirSync(picturesFolder).length;
   return num;
  }
  function GetAmountOfPicturues() {
    console.log(GetStoregeSize());
    return GetStoregeSize();
  }
  app.get('/GetAmountOfPictures',(req,res)=>{
    
      res.send({data:GetAmountOfPicturues()});
      
  })
  app.get('/getUrlPathOfGetPics/:id',(req,res)=>{
    adapter2 = new FileSync('dbPictures.json')
    dbPictures = low(adapter2)
    console.log("get url path");
    console.log(req.params.id);
    const str=sendJustUrl(req.params.id)
    console.log(str);
    res.sendFile(str)
    // console.log(ArreyOfPicturePath[req.params.id]);
    // res.send(200)
  })
  function sendJustUrl(num)
  {
    const arr=GetUploadsPictures();
    console.log(arr);
    // console.log(arr[num].url);
    return arr[num].information.url
  }
  app.get('/getImageDetailsFromDb/:id',(req,res)=>{
    console.log(GetDbInfromation(parseInt(req.params.id)));
    res.send(GetDbInfromation(parseInt(req.params.id)))
  })
  app.post('/GetPicturesDetailsTry1',(req,res)=>{
    console.log("update");
    if(req.body!==undefined){
      const img=GetImageDetails(req.body.id)
      console.log("img");
      console.log(img);
      console.log("succesed Updating pictur");
      res.send(img);
  }
  else {
      res.status(402).send("Invalid input");
    }
  })
  function GetImageDetails(Id){
    adapter2 = new FileSync('dbPictures.json')
    dbPictures = low(adapter2)
    return dbPictures.get('PicturesDb')
    .find({id:parseInt(Id)}).value()
  }
  app.post('/getUrlToDownloadFromWeb',(req,res)=>{
    console.log(req.body.url);
    const fatherPath=path.dirname(__dirname)
    const picturesFolder=path.join(fatherPath,"uploads")
    download(req.body.url,`${picturesFolder}/image${Date.now()}.png`, function(){
      console.log('done')}) 
      res.send(200)
  })

  
var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

  // async function download(url){
  //  const picturesFolder=path.join(fatherPath,"uploads")
  //  const response=await fetch(url);
  //  const buffer=await response.buffer();
  //  fs.writeFile(`${picturesFolder}/image${Date.now()}.png`,buffer,()=>
  //  console.log("download succesd"))
  // }
  
  



  module.exports=app;