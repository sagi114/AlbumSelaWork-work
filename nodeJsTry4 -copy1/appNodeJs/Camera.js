const express = require("express");
const FileSync = require('lowdb/adapters/FileSync')
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dir = './directory';
const low = require('lowdb')
const adapter2 = new FileSync('dbPictures.json')
const dbPictures = low(adapter2)


dbPictures.defaults({ PicturesDb: []})
  .write()



app.use(bodyParser.urlencoded());
// have to set big limit to transfer image
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

const storagePath = path.join(__dirname, "storage");
fs.access(storagePath, (err) => {
  if (err) {
    fs.mkdir(storagePath, (err) => {
      if (err) console.log("real problem !!!!");
    });
  }
});
app.get('/getUrlPath/:id',(req,res)=>{
  console.log("get url path");
  console.log(req.params.id);
  res.sendFile(GetStoragePaths()[req.params.id])
  // res.send(200)
})
app.get('/getStoregeLength',(req,res)=>{
  res.send(GetStoragePaths().length+"")
})
function AddAPictur(PicturInfo) { 
  const num =GetPicturDbLenght();
  dbPictures.get('PicturesDb')
   .push({ id:num,information: PicturInfo})
   .write()
 }
 function GetPicturDbLenght() {
  return dbPictures.get('PicturesDb')
  .size()
  .value()
}
app.post("/upload", function (req, res) {
  let sampleFile = req.body.image;
  // remove the start of the string that contains "data:image/png;base64,"
  let data = sampleFile.replace(/^data:image\/\w+;base64,/, "");
  //create buffer to save to local system
  let buf = Buffer.from(data, "base64");
  // using write file to save the data
  const str=createDir(`pictur`,num)
  console.log(str);
  fs.writeFile(path.join(str, "test.png"), buf, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("image saved");
      res.send("image saved");
    }
  });
});
let num=0;
function createDir(dirName,number) {
    const newDirPath=path.join(storagePath,dirName+number);
        if (fs.existsSync(newDirPath)) {
            num++;
            return createDir(dirName,num)
        }
        else {
          
            num=0;
            fs.mkdir(newDirPath,(err)=>{
            try{
                if(err){
                    throw err;
                }
                else{
                  AddAPictur({url:path.join(newDirPath,"test.png")})
                    console.log("was created");
                }
            }
            catch(error){
                console.log("ERROR"+error);
            }
        });
      }
      return newDirPath;
}
let ArreyOfPicturePath=[];
function GetUsedStoregeDir(dirName,number) {
  console.log("Got used Storege dir");
  const newDirPath=path.join(storagePath,dirName+number);
      if (fs.existsSync(newDirPath)) {
        ArreyOfPicturePath.push(path.join(newDirPath,"test.png"));
          console.log(newDirPath);
        num++;
          return GetUsedStoregeDir(dirName,num)
      }
      else {
         return
    }
}

function GetStoragePaths() {
  console.log("got storege path");
  GetUsedStoregeDir(`pictur`,num);
  for (let index = 0; index < ArreyOfPicturePath.length; index++) {
    const element = ArreyOfPicturePath[index];
    console.log(element);
  }
  return ArreyOfPicturePath;
}

module.exports=app;
