const Movie = require("./movie");

class Serie extends Movie{
    constructor(title, description, note, length) {
        super(title, description, note, length);
        this.seasons = [];
    }

    addEpisode(season, episode){
        if(episode instanceof Movie){
            this.seasons[season].push(episode);
        }
        else{
            throw 'Error : You can only add Movie type';
        }
    }

    getSeasons(){
        return this.seasons;
    }

    getSeason(i){
        return this.seasons[i];
    }
}

module.exports = Serie;