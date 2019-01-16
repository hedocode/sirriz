var express = require("express");
var app = express();
var fs = require('fs');


app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.use(express.json());
app.get("/api/series", (request, result, next) =>{
    var buffer = fs.readFileSync('data/series.json', 'utf8');
    var json = JSON.parse(buffer);

    if(request.query.title != undefined){
        json = json.series[request.query.title];
        if(request.query.s != undefined){
            json = json[request.query.s - 1];
            if(request.query.e != undefined){
                json = json[request.query.e - 1];
            }
        }
    }
    result.json(json);
});

app.get("/series", (request, result, next) =>{
    var buffer = fs.readFileSync('data/series.json', 'utf8');
    var json = JSON.parse(buffer);

    if(request.query.title != undefined){
        json = json.series[request.query.title];
        if(request.query.s != undefined){
            json = json[request.query.s - 1];
            if(request.query.e != undefined){
                json = json[request.query.e - 1];
            }
        }
    }
    result.send('<html><body>' + json + '<body></html>');
});

app.get("/", (request, result, next) =>{
    result.send(fs.readFileSync('front/html/index.html', 'utf8'));
});
  