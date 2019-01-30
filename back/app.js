const express = require("express");
const fs = require('fs');
const path = require('path');
const jsonhelper = require('./jsonHelper')
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'front')));

//BodyParser
var urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.use(urlencodedParser);
app.use(bodyParser.json());

//Définition des CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Définition du routeur
var router = express.Router();
//app.use('/user', router);
//require(__dirname + '/controllers/userController')(router);



router.get("/api/series", (request, result, next) =>{
    var buffer = fs.readFileSync(path.join(__dirname + '/data/series.json'), 'utf8');
    var json = JSON.parse(buffer);
    json = jsonhelper.getJsonByRequest(json, request);
    result.json(json);
});

router.get("/series", (request, result, next) =>{
    var buffer = fs.readFileSync(path.join(__dirname + '/data/series.json'), 'utf8');
    var json = JSON.parse(buffer);
    json = jsonhelper.getJsonByRequest(json, request);
    result.send('<html><body>' + json + '<body></html>');
});

router.get("/", (request, result, next) =>{
    if(request.query.name != undefined && request.query.lastname)
        result.send('Greetings ' + request.query.name + ' ' + request.query.lastname);
    else
        result.sendFile(path.join(__dirname + '/front/html/index.html'));
});

router.post("/", (request, result, next) =>{

});

app.use('/', router);

app.use(function(req, res, next) {
    return res.status(404).sendFile(path.join(__dirname + '/front/html/404.html'));
});

app.use(function(err, req, res, next) {
    console.log(typeof(err));
    console.log(err);
     
    return res.status(500).sendFile(path.join(__dirname + '/front/html/500.html'));  
});


if (!module.parent) {
    var port = 3001;
    app.listen(port, () => console.log(`Listening on port ${port}`));
    
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}