import React from 'react';
import {server_API_URL} from '../../config';

import {Link} from 'react-router-dom';

import './MoviesView.scss';

let _ = require('underscore');

export class MoviesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        fetch(server_API_URL + "movies", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then((res) => {
            return res.json()
        }).then((data) => {
            this.setState({movies: data})
        });
    }

    getMovieUrl(movie) {
        return "/movies/" + movie;
    }

    render() {
        return (
            <main>
                <Link className="o-backLink" to="/">Back to Main Menu</Link>
                <h1>Movie List</h1>
                <section className="o-movie-holder">
                    <div>
                        {_.pairs(this.state['movies'])
                          .map( (movie) => 
                            <a key={this.getMovieUrl(movie[0])} className="o-movie" href={this.getMovieUrl(movie[0])}>
                              <h2>{movie[0]}</h2>
                              <div>{movie[1].description}</div>
                              <div className='duration'>{(Math.trunc(movie[1].length / 60))}h{Math.trunc(movie[1].length % 60)}min</div>
                            </a>
                          )
                        }
                    </div>

                    <Link to="/addMovie">
                        <button className="addButton">+</button>
                    </Link>
                </section>
            </main>
        )
    }
}