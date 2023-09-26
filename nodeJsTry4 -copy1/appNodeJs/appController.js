const express=require('express');
const router=express.Router();
router.use(express.json())
const TemplateNameDal=require('./Dal/TemplateNamesDal')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
let adapter = new FileSync('db.json')
let db = low(adapter)
let adapter2 = new FileSync('dbPictures.json')
const adapterCatagory = new FileSync('dbCatagorys.json')

let dbPictures = low(adapter2)
const dbCatagory = low(adapterCatagory)

db.defaults({ posts: []})
  .write()

dbPictures.defaults({ PicturesDb: []})
  .write()
  dbCatagory.defaults({ CatagoryDb: []})
  .write()

  function GetCatagoryDbLenght() {
    return dbCatagory.get('CatagoryDb')
    .size()
    .value()
  }
  function AddACatagory(PicturInfo) { 
     const num =GetCatagoryDbLenght();
     dbCatagory.get('CatagoryDb')
     .push({ id:num,CatagoryName: PicturInfo.cat})
     .write()
   }
  router.post('/AddCatagory',(req,res)=>{
    if(req.body!=undefined){
      AddACatagory(req.body)
        console.log("succesed adding Pictur");
        res.send(200)
    }
    else {
        res.status(402).send("Invalid input");
      }
})
router.get('/GetAllCatagory',(req,res)=>{
  // console.log(dbCatagory.get('CatagoryDb')
  // .value());
 res.send(
  dbCatagory.get('CatagoryDb')
  .value()
 )
})
router.post('/GetCatagoryById',(req,res)=>{
  if(req.body!=undefined){
    const cat=GetPicturById(req.body.id)
    console.log(cat);
    res.send(cat)
    console.log("succesed getting Catagory details");
    // res.send(200)
}
else {
    res.status(402).send("Invalid input");
  }
})
  router.post('/AddPicturDetails',(req,res)=>{
    if(req.body!=undefined){
        AddAPictur(req.body)
        console.log("succesed adding Pictur");
        res.send(req.body)
    }
    else {
        res.status(402).send("Invalid input");
      }
})
router.get('/GetAllPictures',(req,res)=>{
  console.log(dbPictures.get('PicturesDb')
  .value());
 res.send(
  dbPictures.get('PicturesDb')
  .value()
 )
})
router.post('/GetPicturById',(req,res)=>{
  if(req.body!=undefined){
    const pic=GetPicturById(req.body.id)
    console.log(pic);
    res.send(pic)
    console.log("succesed getting pictur details");
    // res.send(200)
}
else {
    res.status(402).send("Invalid input");
  }
})
router.post('/UpdatePictur',async (req,res)=>{
  if(dbPictures.get('PicturesDb').size().value()===0){
  adapter2 = new FileSync('dbPictures.json')
    dbPictures = low(adapter2)
  }
  console.log("update");
  if(req.body!==undefined){
    UpdeatPictur(req.body.id,req.body.information)
    console.log("succesed Updating pictur");
    res.send(GetPicturById(req.body.id))
}
else {
    res.status(402).send("Invalid input");
  }
})
function UpdeatPictur(num,info) {
  console.log(info);
  dbPictures.get('PicturesDb')
  .find({ id: num })
  .assign({ information:info})
  .write()
}
function GetPicturById(num) {
  if(GetPicturDbLenght()!==0){
    return dbPictures.get('PicturesDb')
  .find({id:num})
  .value()
  }
}
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
router.get('/getTamplates',(req,res)=>{
    console.log(TemplateNameDal);
    res.send(TemplateNameDal)
})
router.post('/AddLibraryDetails',async (req,res)=>{
  console.log("Added library");
    if(req.body!=undefined){
      await res.send(WriteAPost(req.body))
        console.log("succesed adding library details");
        
    }
    else {
        await res.status(402).send("Invalid input");
      }
})
router.get('/changeViewOnImege/list/grid',(req,res)=>{
 const lib=GetLibrary(0);
 if(lib.information.DefultViewTemplate.TemplateName==="Grid")
 {
  lib.information.DefultViewTemplate.TemplateName="List"
  lib.information.DefultViewTemplate.id=1
 }
 else{
  lib.information.DefultViewTemplate.TemplateName="Grid"
  lib.information.DefultViewTemplate.id=2
 }
 UpdeatLibrary(0,lib.information)
 res.send(200)
})

router.post('/GetLibrary',(req,res)=>{
  if(req.body!=undefined){
    console.log(GetLibrary(req.body.id));
    res.send(GetLibrary(req.body.id).information)
    console.log("succesed Getting library details");
    res.send(200)
}
else {
    res.status(402).send("Invalid input");
  }
})
router.get('/GetLibrary',(req,res)=>{
  console.log(GetLibrary(0));
    res.send(GetLibrary(0).information)
    // console.log("succesed Getting library details");
    // res.send(200)
})
router.get('/returnlibraryLenght',async(req,res)=>{
  adapter = await new FileSync('db.json')
  db = await low(adapter)
   const x=await db.get('posts')
  .size()
  .value()
  console.log(x);
  res.send(x.toString())
})
router.post('/UpdateLibrary',(req,res)=>{
  if(req.body!=undefined){
    res.send(UpdeatLibrary(req.body.id,req.body.infromation))
    console.log("succesed Updating library details");
    // res.send(200)
}
else {
    res.status(402).send("Invalid input");
  }
})
router.get('/getSizeOfLibrary',(req,res)=>{
  console.log(GetDbLenght());
  res.send(GetDbLenght())
})
router.get('/checkIfExistLibrary',(req,res)=>{
  let exist=GetDbLenght()!==undefined&&GetDbLenght()!==0;
  console.log(exist);
  res.send(exist)
})
function GetDbLenght() {
    return db.get('posts')
    .size()
    .value()
}
function WriteAPost(info) { 
 const num =GetDbLenght();
   db.get('posts')
  .push({ id:num,information: info})
  .write()
  return GetLibrary(num)
}
function GetLibrary(num) {
  if(GetDbLenght()!==0){
    return db.get('posts')
  .find({id:num})
  .value()
  }
}
function UpdeatLibrary(num,info) {
   db.get('posts')
  .find({id:num})
  .assign({inromation:info})
  .write()
  return GetLibrary(num)
}
function UpdeatPrivateMode(boolInfo) {
  const tmp=db.get('posts').value()
  tmp[0].information.privateMode=boolInfo;
  db.get('posts')
 .find({id:0})
 .assign(tmp.information)
 .write()
}
router.post('/ChangePrivateMode',async (req,res)=>{
  console.log("update");
  if(req.body!==undefined){
    UpdeatPrivateMode(req.body.boolInfo)
    res.send(200)
}
else {
    res.status(402).send("Invalid input");
  }
})
router.get('/GetPrivateMode',(req,res)=>{
  const lib=db.get('posts')
  .find({id:0})
  .value()
  res.send(lib.information.privateMode)
})


module.exports=router;