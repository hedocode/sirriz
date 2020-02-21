import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import './App.scss';

import {MoviesView} from '../pages/MovieView/MoviesView';
import {SerieV} from '../pages/SerieV/SerieV';
import {SeriesView} from '../pages/SeriesView/SeriesView';
import {SerieEpisodeV} from '../pages/SerieEpisodeV/SerieEpisodeV';
import {MovieV} from '../pages/MovieV/MovieV';
import {AddMovie} from '../pages/AddMovie/AddMovie';
import {AddSerie} from '../pages/AddSerie/AddSerie';
import {AddEpisode} from '../pages/AddEpisode/AddEpisode';


const MainMenu = () => (
    <div className="App">
        <ul className='full'>
            <li>
                <Link className="amenu" to="/movies">Movies</Link>
            </li>
            <li>
                <Link className="amenu" to="/series">Series</Link>
            </li>
        </ul>
    </div>
);

const Routes = () => (
    <Router>
        <div>
            <Route exact path="/" component={MainMenu}/>
            <Route exact path="/series" component={SeriesView}/>
            <Route exact path="/movies" component={MoviesView}/>
            <Route path="/movies/:id" component={MovieV}/>
            <Route path="/series/:id" component={SerieV}/>
            <Route path="/series/:id/:ep" component={SerieEpisodeV}/>
            <Route path="/addMovie" component={AddMovie}/>
            <Route path="/addSerie" component={AddSerie}/>
            <Route path="/addEpisode/:id" component={AddEpisode}/>
        </div>
    </Router>
);

export default Routes