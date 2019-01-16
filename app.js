const express = require("express");
const app = express();
const fs = require('fs');
const path = require('path');
const router = express.Router();
const jsonhelper = require('./back/jsonHelper')

app.use(express.json());
app.use(express.static(path.join(__dirname, 'front')));


app.listen(3000, () => {
    console.log("Server running on port 3000");
});

router.get("/api/series", (request, result, next) =>{
    var buffer = fs.readFileSync('data/series.json', 'utf8');
    var json = JSON.parse(buffer);
    json = jsonhelper.getJsonByRequest(json, buffer);
    result.json(json);
});

router.get("/series", (request, result, next) =>{
    var buffer = fs.readFileSync('data/series.json', 'utf8');
    var json = JSON.parse(buffer);
    json = jsonhelper.getJsonByRequest(json, buffer);
    result.send('<html><body>' + json + '<body></html>');
});

router.get("/", (request, result, next) =>{
    result.sendFile(path.join(__dirname + '/front/html/index.html'));
});

app.use('/', router);