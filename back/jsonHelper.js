var Movie = require('./core/movie');

function getJsonByRequest(json, request){
    if(request != undefined){
        if(request.query != undefined){
            if(request.query.title != undefined){
                json = json.series[request.query.title];
                if(request.query.s != undefined){
                    json = json[request.query.s - 1];
                    if(request.query.e != undefined){
                        json = json[request.query.e - 1];
                    }
                }
            }
        }
        else{
            if(request.params != undefined){
                if(request.params.title != undefined){
                    json = json.series[request.params.title];
                    if(request.params.s != undefined){
                        json = json[request.params.s - 1];
                        if(request.params.e != undefined){
                            json = json[request.params.e - 1];
                        }
                    }
                }
            }
        }
    }
    return json;
}

function deserializeJson(json){
    var all = [];
    var seriesArray = [];
    var moviesArray = [];
    console.log(Object.keys(json['series']));
    Object.keys(json['series']).forEach(serie => {
        var movie = json['series'][serie];
        seriesArray[serie] = [];
        for(var saison = 0; saison < Object.keys(movie).length; saison++){
            console.log(movie);
            for(var episode = 0; episode < Object.keys(movie[saison]).length; episode++){
                var m = movie[saison][episode];
                seriesArray[serie].push(new Movie(m['title'], m['description'], m['note'], m['length']));
            }
        }
    });
    Object.keys(json['movies']).forEach(movie => {
        var m = json['movies'];
        Object.keys(m).forEach(movie => {
            moviesArray.push(new Movie(movie, m[movie]['description'], m[movie]['note'], m[movie]['length']));
        });
    });
    all["series"] = seriesArray;
    all["movies"] = moviesArray;
    return all;
}

module.exports.deserializeJson = deserializeJson;
module.exports.getJsonByRequest = getJsonByRequest;