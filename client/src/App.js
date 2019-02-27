import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { Redirect } from 'react-router';
import './App.css';
var _ = require('underscore-node');

const MainMenu = () => (
    <div className="App">
      <ul className='full'>
        <li>
          <Link className="amenu" to="/movies">
              Movies
          </Link>
        </li>
        <li>
          <Link className="amenu" to="/series"> 
              <span>Series</span>
          </Link>
        </li>
      </ul>
    </div>
);

class MoviesView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount(){
    fetch("http://localhost:3001/api/movies", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
    .then((res) => {return res.json()})
    .then((data) => { this.setState({ movies: data })} );
  }

  
  getMovieUrl(movie){
    return "/movies/"+movie;
  }

  render(){
    return(
      <div>
        <Link to="/">
            <p>Back to Main Menu</p>
        </Link>
        <h2>Movie List</h2>

        <div>
          { _.pairs(this.state['movies']).map( (movie) => 
              <div class='movie'>
                <a className="aitem" href={this.getMovieUrl(movie[0])}>
                  <div className='element'>{movie[0]}</div>
                  <div className='element'>{movie[1].description}</div>
                  <div className='element'>{(Math.trunc(movie[1].length / 60))}h{Math.trunc(movie[1].length % 60)}min</div>
                </a>
              </div>
          ) }
        </div>
    
        <Link to="/addMovie">
          <button className="addButton">+</button>
        </Link>
      </div>
    )
  }
}

class SerieV extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount(){
    console.log(this.props);
    fetch("http://localhost:3001/api"+this.props.match.url,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
    .then((res) => {return res.json()})
    .then((data) => { this.setState({ movie: data })} );
  }

  
  render(){
    return(
      <div>
        <Link to="/series">
            <p>Back to series list</p>
        </Link>
        <br></br>
        <h2>{this.props.match.url.split('/')[2]}</h2>

        <div>
          
          {
            _.pairs(this.state['movie']).map( (movie) => 
              <div>
                <h3>Saison {parseInt(movie[0]) + 1}</h3>
              {_.pairs(movie[1]).map( (movie) => 
                <div className='movie'>
                  <a className="aitem" href="/">
                    <div className='element'>Episode {movie[0]}</div>
                    <div className='element'>{movie[1].title}</div>
                    <div className='element'>{movie[1].description}</div>
                    <div className='element'>{(Math.trunc(movie[1].length / 60))}h{Math.trunc(movie[1].length % 60)}min</div>
                  </a>
                </div>
              )
              }
              <br></br>
              </div>
            )
          }
        </div>
    
        <Link to="/addSerie">
          <button className="addButton">+</button>
        </Link>
      </div>
    )
  }
}


class MovieV extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    fetch("http://localhost:3001/api"+this.props.match.url,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
      })
    .then((res) => {return res.json()})
    .then((data) => { this.setState({ movie: data }); })
  }

  
  render(){
    return(
      <div>
        <Link to="/movies">
            <p>Back to movie list</p>
        </Link>
        <br></br>
        <h2>{this.props.match.url.split('/')[2]}</h2>

        <div>

          {
            _.pairs(this.state['movie']).map( (movie) => 
              <div class='movie'>
                <div className='element'>{movie[1]}</div>
              </div>
            )
          }
        </div>
    
        <Link to="/addSerie">
          <button className="addButton">+</button>
        </Link>
      </div>
    )
  }
}

class SeriesView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount(){
    fetch("http://localhost:3001/api/series", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
    .then((res) => {return res.json()})
    .then((data) => { this.setState({ movies: data })} );
  }

  getSerieUrl(serie){
    return "/series/"+serie;
  }


  render(){
    return(
      <div>
        <Link to="/">
            <p>Back to Main Menu</p>
        </Link>
        <br></br>
        <h2>Series List</h2>

        <div>
          { _.pairs(this.state['movies']).map( (serie) => 
              <div className='movie'>
                <a className="aitem" href={this.getSerieUrl(serie[0])}>
                  <div className='element'>{serie[0]}</div>
                  <div className='element'>{serie[1].description}</div>
                  <div className='element'>{(Math.trunc(serie[1].length / 60))}h{Math.trunc(serie[1].length % 60)}min</div>
                </a>
              </div>
            
          ) }
        </div>
    
        <Link to="/addSerie">
          <button className="addButton">+</button>
        </Link>
      </div>
    )
  }
}


class AddMovie extends React.Component{
  constructor(){
    super();
    this.state = {
      fireRedirect: false
    }

    this.doSubmit = this.doSubmit.bind(this);
  }

  redirect(res){
    if( res.status === 200 ){
      window.location.href = 'http://localhost:3000/movies';
    }else {
      // Something went wrong here
    }
  }

  doSubmit(e){
    e.preventDefault();
    const t = this.refs.title.value;
    const d = this.refs.description.value;
    const l = this.refs.length.value;
    
    fetch("http://localhost:3001/api/movies/create", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({title: t, description: d, length: l })
    }).then( () => {this.setState({ fireRedirect: true })} );
  } 

  render(){
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { fireRedirect } = this.state;

    if(fireRedirect){
      return(
        <Redirect to={from}/>)
    }

    return(
      <div>
        <Link to="/movies">
            <p>Back to movies list</p>
        </Link>
    
        <form method="POST">
          <input ref="title" type="text" name="name" id="Title" placeholder="Title" required/>
          <br/>
          <br/>
          <textarea ref="description" type="text" name="name" id="Title" placeholder="Description" required/>
          <br/>
          <br/>
          <input ref="length" type="number" name="name" id="Title" placeholder="Length" required/>
          <br/>
          <br/>
          <button onClick={this.doSubmit}>Adding this Movie</button>
        </form>
      </div>
    )
    
  }

}

class AddSerie extends React.Component{
  
  constructor(){
    super();
    this.state = {
      fireRedirect: false
    }

    this.doSubmit = this.doSubmit.bind(this);
  }

  redirect(res){
    if( res.status === 200 ){
      window.location.href = 'http://localhost:3000/';
    }else {
      // Something went wrong here
    }
  }

  doSubmit(e){
    e.preventDefault();
    var data = this.refs.stitle.value;
    console.log(data);
    fetch("http://localhost:3001/api/series/create", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({stitle: data})
    }).then( () => {this.setState({ fireRedirect: true })} );
  } 

  render(){
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { fireRedirect } = this.state;

    if(fireRedirect){
      return(
        <Redirect to={from}/>)
    }

    
    return(
      <div>
        <Link to="/series">
            <p>Back to series list</p>
        </Link>

        <form>
          <input ref="stitle" type="text" name="stitle" id="stitle" placeholder="Title" required/>
          <br/>
          <button onClick={this.doSubmit}>Adding this serie</button>
        </form>
        
      
      </div>
    )
  }
}


class AddEpisode extends React.Component{
  
  constructor(){
    super();
    this.state = {
      fireRedirect: false
    }

    this.doSubmit = this.doSubmit.bind(this);
  }

  redirect(res){
    if( res.status === 200 ){
      window.location.href = 'http://localhost:3000/';
    }else {
      // Something went wrong here
    }
  }

  doSubmit(e){
    e.preventDefault();
    var data = this.refs.stitle.value;
    console.log(data);
    fetch("http://localhost:3001/api/series/addEpisode", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({stitle: data})
    }).then( () => {this.setState({ fireRedirect: true })} );
  } 

  render(){
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { fireRedirect } = this.state;

    if(fireRedirect){
      return(
        <Redirect to={from}/>)
    }

    
    return(
      <div>
        <Link to="/series">
            <p>Back to series list</p>
        </Link>

        <form>
          <input ref="stitle" type="text" name="stitle" id="stitle" placeholder="Title" required/>
          <br/>
          <button onClick={this.doSubmit}>Adding this serie</button>
        </form>
        
      
      </div>
    )
  }
}


const BasicExample = () => (
  <Router>
    <div>
      <Route exact path="/" component={MainMenu}/>
      <Route exact path="/series" component={SeriesView}/>
      <Route exact path="/movies" component={MoviesView}/>
      <Route path="/movies/:id" component={MovieV}/>
      <Route path="/series/:id" component={SerieV}/>
      <Route path="/addMovie" component={AddMovie}/>
      <Route path="/addSerie" component={AddSerie}/>
      <Route path="/addEpisode" component={AddEpisode}/>
    </div>
  </Router>
);

export default BasicExample