const  express  =  require('express')
const  app  =  express()

const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });

  

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/api/upload', (req, res) => {
    res.json({
        'message': 'hello'
    });
});app.post('/api/upload',multipartMiddleware , (req, res) => {
    console.log("try uploading");
    res.json({
        'message': 'File uploaded successfully'
    });

});


// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
module.exports=app;