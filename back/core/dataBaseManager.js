const fs = require('fs');
const jsonHelper = require('../jsonHelper');
const path = require('path');

const cache = getJSON();

function getJSON(){
    var buffer = fs.readFileSync(path.join(__dirname + '/../data/series.json'), 'utf8');
    return JSON.parse(buffer);
}

function saveJSON(){
    fs.writeFile(path.join(__dirname + '/../data/series.json'), JSON.stringify(cache), 'utf8', (error) => { console.log(error) });
}

function getSeries(){
    return cache['series'];
}

function getSerie(stitle){
    var exactSerie = getSeries()[stitle];
    if( exactSerie != undefined){
        return exactSerie;
    }else {
        var possible = [];
        Object.keys(getSeries()).forEach(element => {
            if(element.includes(title)){
                possible.push(element);
            }
        });
        return possible;
    }
}

function addSerie(stitle){
    cache['series'][stitle] = [];
    saveJSON(cache);
}

function addSeason(stitle){
    if(cache['series'][stitle][cache[series][stitle].length - 1] > 0){
        cache['series'][stitle].push([]);
        saveJSON(cache);
    }
}

function addEpisode(stitle, season, title, description, length, note){
    cache['series'][stitle][season].push({title: title, description: description, note: note, length: length});
    saveJSON(cache);
}

function getSeason(stitle, season){
    return getSerie(stitle)[season];
}

function getEpisode(stitle, season, episode){
    return getSeason(stitle, season)[episode];
}

function getMovies(){
    return cache['movies'];
}

function getMovie(title){
    var exactMovie = getMovies()[title];
    if( exactMovie != undefined){
        return exactMovie;
    }else {
        var possible = [];
        Object.keys(getMovies()).forEach(element => {
            if(element.includes(title)){
                possible.push(element);
            }
        });
        return possible;
    }
}

function addNote(title, note){
    if(cache['movies'][title].note == null){
        cache['movies'][title].note = [];
    }
    cache['movies'][title].note.push(note);
    saveJSON();
}

function addMovie(title, description, note, length){
    cache['movies'][title] = { description: description, note: note, length: length};
    saveJSON();
    return cache;
}

function removeMovie(title){
    cache['movies'][title] = undefined;
    saveJSON();
}

function getAll(){
    var videos = jsonHelper.deserializeJson(cache);
    return videos;
}

module.exports.getAll = getAll;
module.exports.getJSON = getJSON;
module.exports.getSeries = getSeries;
module.exports.getMovies = getMovies;
module.exports.getMovie = getMovie;
module.exports.getEpisode = getEpisode;
module.exports.addMovie = addMovie;
module.exports.removeMovie = removeMovie;
module.exports.addSerie = addSerie;
module.exports.addSeason = addSeason;
module.exports.addEpisode = addEpisode;
module.exports.addNote = addNote;