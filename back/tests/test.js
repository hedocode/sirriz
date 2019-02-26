const Movie = require('../core/movie');
const Serie = require('../core/serie');
const dataBase = require('../core/dataBaseManager');
const jsonHelper = require('../jsonHelper');

const title = "Title";
const description = "Short Desctiption";
const note = 8;
const length = 42;
const MovieTest = new Movie(title, description, note, length);

const newTitle = 'NewTitle';
const newNote = 10;
const newLength = 24;

test("Movie module returns a class ", () => {
    expect(Movie).toBeInstanceOf(Function);
});

test("Passing no arguments to the Movie constructor throw error", () => {
    expect(()=>{const movie = new Movie();}).toThrowError('Missing arguments');
});

test("Movie constructor returns an instance of Movie", ()=>{
    expect(MovieTest).toBeInstanceOf(Movie);
});

test("Passing wrong argument type to constructor throw error", () =>{
    expect(()=>{const movie = new Movie(note, note, length)}).toThrow();
});

test("Note can be undefined", ()=>{
    const work = new Movie(title, description, undefined, length);
    expect(work).toBeInstanceOf(Movie);
});

test("Movie getters works", () => {
    expect(MovieTest.getTitle()).toBe(title);
    expect(MovieTest.getNote()).toBe(note);
    expect(MovieTest.getLength()).toBe(length);
});

test("Movie setters returns the new Movie instance (allows fluent)", ()=>{
    expect(MovieTest.setTitle(newTitle).setNote(newNote).setLength(newLength)).toBeInstanceOf(Movie);
});

test("Movie setters works", ()=>{
    expect(MovieTest.setTitle(newTitle).getTitle()).toBe(newTitle);
    expect(MovieTest.setNote(newNote).getNote()).toBe(newNote);
    expect(MovieTest.setLength(newLength).getLength()).toBe(newLength);
});

test("Serie module returns a class ", () => {
    expect(Serie).toBeInstanceOf(Function);
});

test("deserializeJson deserialize and return a not empty array", () =>{
    expect(dataBase.getAll()).toBeInstanceOf(Array);
});

test("Get Movies returns an array of all the movies", ()=>{
    expect(dataBase.getMovies()).toBeInstanceOf(Object);
});

test("Get Series returns an array of all the Series", ()=>{
    expect(dataBase.getSeries().toBeInstanceOf(Object);
});

test("Get Movie works", () =>{
    expect(dataBase.getMovie('Shrek 2')).toBeInstanceOf(Object);
});

test("Get Movie return the list of the most accurate results", ()=>{
    expect(dataBase.getMovie('Shrek').length).toBe(2);
});

test("Add Movie to JSON works", () => {
    dataBase.addMovie("Pokémon", "Attrapez les tous", undefined, 40); 
});