const express=require('express');
const router=express.Router();
router.use(express.json())
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapterPicture = new FileSync('dbPictures.json')
const dbPictures = low(adapterPicture)
const path = require("path");



dbPictures.defaults({ PicturesDb: []})
  .write()

  // let ArreyOfPicturePath=[]
  // let num;

  function GetUploadsPictures() {
    let arr=[];
    arr=dbPictures.get('PicturesDb')
    .map('information')
    .value()
    console.log(arr);

    arr.forEach(item=>{
        console.log(item.url);
      ArreyOfPicturePath.push(item.url)
    })

    var fatherPath=path.dirname(__dirname)
    
    fs.readdir(path.join(fatherPath,"uploads"), (err, files) => { 
        if (err) 
          console.log(err); 
        else { 
          console.log("\nCurrent directory filenames:"); 
          files.forEach(file => { 
            console.log(file)
            console.log(path.join(fatherPath,"uploads",file));
            ArreyOfPicturePath.push((path.join(fatherPath,"uploads",file)))
          })
          //.catch(e => console.error(e));  
        } 
      })
    // num=ArreyOfPicturePath.length;
  }
  function GetAmountOfPicturues() {
    GetUploadsPictures();
    num=ArreyOfPicturePath.length;
  }
  router.get('/AmountOfPictures',(req,res)=>{
    //   const num=GetAmountOfPicturues()
    //   console.log(num);
      res.send(1);
  })
  router.get('/getUrlPath/:id',(req,res)=>{
    console.log("get url path");
    GetAmountOfPicturues();
    console.log(req.params.id);
    res.sendFile(ArreyOfPicturePath[req.params.id])
  })
  module.exports=router;