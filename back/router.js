const express = require("express");
const fs = require('fs');
const jsonhelper = require('./jsonHelper');
const path = require('path');
const dataManager = require('./core/dataBaseManager');
const Movie = require('./core/movie');
var router = express.Router();


var videos = dataManager.getAll();
var series = videos["series"];
var movies = videos["movies"];

router.get("/api/series", (request, result, next) =>{
    var json = dataManager.getJSON();
    json = jsonhelper.getJsonByRequest(json, request);
    result.json(json['series']);
});

router.get("/api/series/:serie", (request, result, next) =>{
    var json = dataManager.getJSON();
    json = jsonhelper.getJsonByRequest(json, request);
    result.json(json['series'][request.params.serie]);
});

router.get("/api/movies", (request, result, next) =>{
    var json = dataManager.getJSON();
    json = jsonhelper.getJsonByRequest(json, request);
    result.json(json['movies']);
});

router.post("/api/movies/note", (request, result, next) =>{
    var args = request.body;
    if(args.title === undefined && args.note === undefined){
        result.status(400).send("BAD REQUEST SYNTAX : Missing title or note param");
        return;
    }
    else{
        dataManager.addNote(args.title, args.note);
        result.status(202).send("Note added");
    }
});


router.get("/api/movies/:movie", (request, result, next) =>{
    var json = dataManager.getJSON();
    json = jsonhelper.getJsonByRequest(json, request);
    result.json(json['movies'][request.params.movie]);
});

router.post("/api/series/create", (request, result) => {
    var args = request.body;
    if(args.stitle === undefined){
        result.status(400).send("BAD REQUEST SYNTAX : Missing stitle param");
        return;
    }
    else{
        dataManager.addSerie(args.stitle);
        result.status(202).send(series);
    }
});


router.post("/api/movies/create", (request, result) => {
    var args = request.body;
    if(args.title === undefined && args.description === undefined && args.length === undefined){
        result.status(400).send("BAD REQUEST SYNTAX : Missing stitle param");
        return;
    }
    else{
        dataManager.addMovie(args.title, args.description, null, args.length);
        result.status(202).send(series);
    }
});


router.post("/api/series/addEpisode", (request, result) => {
    var args = request.body;
    if(args.stitle === undefined){
        result.status(400).send("BAD REQUEST SYNTAX : Missing stitle param");
        return;
    }
    else{
        dataManager.addEpisode(args.stitle, args.season, args.title, args.description, args.length, null);
        result.status(202).send(series);
    }
});

router.post("/api/series/addEpisode", (request, result) => {
    var args = request.body;
    if(args.stitle === undefined && args.season === undefined && args.title === undefined && args.description === undefined && args.length === undefined){
        result.status(400).send("BAD REQUEST SYNTAX : Missing stitle param");
        return;
    }
    else{
        dataManager.addEpisode(args.stitle, args.season, args.title, args.description, args.length);
        result.status(202).send(series);
    }
});





/*
router.get("/series", (request, result, next) =>{
    var json = dataManager.getJSON();
    json = jsonhelper.getJsonByRequest(json, request);
    result.send('<html><body>' + json + '<body></html>');
});

router.get("/", (request, result) =>{
    if(request.query.name != undefined && request.query.lastname)
        result.send('Greetings ' + request.query.name + ' ' + request.query.lastname);
    else
        result.sendFile(path.join(__dirname + '/front/html/index.html'));
});


router.use(function(req, res, next) {
    res.status(404).sendFile(path.join(__dirname + '/front/html/404.html'));
});

router.use(function(err, req, res, next) {
    console.log(typeof(err));
    console.log(err);
    
    res.status(500).sendFile(path.join(__dirname + '/front/html/500.html'));  
});
*/

module.exports = router;