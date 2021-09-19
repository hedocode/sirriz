import React, { useEffect, useState } from 'react';
import {server_API_URL} from '../../config';

import { Link } from 'react-router-dom';

import './MoviesList.scss';

function MoviesList() {

    const [movies, setMovies] = useState({});

    useEffect(
        () => {
            fetch(server_API_URL + "movies", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            }).then(
                res => {
                    return res.json()
                }
            ).then(
                data => {
                    setMovies(data);
                }
            );
        }, []
    )

    function getMovieUrl(movie) {
        return "/movies/" + movie;
    }

    return (
        <main>
            <Link className="o-backLink" to="/">
                Back to Main Menu
            </Link>
            <h1>Movie List</h1>
            <section className="o-movie__wrapper">
                <div className="o-movie__holder">
                    {Object.keys(movies).map(
                        (keyMovieName) => {
                            const movieData = movies[keyMovieName];
                            const { description, length } = movieData;
                            return (
                                <a
                                    href={getMovieUrl(keyMovieName)}
                                    className="o-movie"
                                    key={getMovieUrl(keyMovieName)}
                                >
                                    <div>
                                        <h2>{keyMovieName}</h2>
                                        <div>{description}</div>
                                        <div className='duration'>
                                            {(Math.trunc(length / 60))}h
                                            {Math.trunc(length % 60)}min
                                        </div>
                                    </div>
                                </a>
                            );
                        }
                    )}
                </div>

                <Link to="/addMovie">
                    <button className="addButton">+</button>
                </Link>
            </section>
        </main>
    )
}

export default MoviesList;