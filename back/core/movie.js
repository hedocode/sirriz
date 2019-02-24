const Check = require('./typeError');
class Movie{
    constructor(title, description, note, length)  {
        var title;
        var description;
        var note;
        var length;
        if(title === undefined || length === undefined || description === undefined){
            throw 'Missing arguments while instantiating Movie';
        }
        if(typeof(title) != "string"){
            throw 'Title must be a string';
        }
        if(note != undefined){
            Check.isNumber(note, 'Note');
        }
        Check.isNumber(length, 'Length');

        this.setTitle(title).setNote(note).setLength(length);
    }

    setTitle(title){
        this.title = title;
        return this;
    }

    getTitle(){
        return this.title;
    }

    setDescription(description){
        this.description = description;
        return this;
    }

    getDescription(){
        return this.description;
    }

    setNote(note){
        this.note = note;
        return this;
    }
    
    getNote(){
        return this.note;
    }

    setLength(length){
        this.length = length;
        return this;
    }
    
    getLength(){
        return this.length;
    }
}

module.exports = Movie;