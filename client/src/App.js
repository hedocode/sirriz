import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { Redirect } from 'react-router';
import './App.css';
var _ = require('underscore');

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
        <h1>Movie List</h1>

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
    fetch("http://localhost:3001/api" + this.props.match.url,{
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
        <h1>{this.props.match.url.split('/')[2]}</h1>

        <div>
          
          {
            _.pairs(this.state['movie']).map( (movie) => 
              <div>
                <h3>Saison {parseInt(movie[0]) + 1}</h3>
              {_.pairs(movie[1]).map( (movie) => 
                <div className='movie'>
                  <a className="aitem" href={'/' + this.props.match.url.split('/')[2] + '/' + movie[1].title}>
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
    
        <Link to={"/addEpisode/" + this.props.match.url.split('/')[2]}>
          <button className="addButton">+</button>
        </Link>
      </div>
    )
  }
}


class SerieEpisodeV extends React.Component{
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
        <h1>{this.props.match.url.split('/')[2]}</h1>

        <div>
          AAA
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
    
        <Link to="/addEpisode">
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

    this.doSubmit = this.doSubmit.bind(this);
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


  doSubmit(e){
    e.preventDefault();
    const note = this.refs.note.value;
    
    fetch("http://localhost:3001/api/movies/note", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({title: this.props.match.url.split('/')[2], note: note})
    }).then( () => {this.forceUpdate()});
  } 

  avgNote(notes){
    var avg = 0;
    notes.forEach(element => {
      avg += parseInt(element);
    });
    return avg / notes.length;
  }
  
  render(){

    return(
      <div>
        <Link to="/movies">
            <p>Back to movie list</p>
        </Link>
        <br></br>
        <h1>{this.props.match.url.split('/')[2]}</h1>

        <div>

          {
            _.pairs(this.state['movie']).map( (movie) => 
              <div className='sexion'>
                <div className='attrhead'>{movie[0]}</div>
                <div className='movie'>
                  <div className='element'>
                    {movie[0] === 'note' 
                      ? this.avgNote(movie[1]).toFixed(2) + ' / 20' + ' (' + movie[1].length + ' notes)' 
                      : movie[0] === 'length' 
                      ? (Math.trunc(movie[1] / 60)) + 'h' + Math.trunc(movie[1] % 60) + 'min' 
                      : movie[1]
                    }
                  </div>
                </div>
              </div>
            )
          }
        </div>
        <form>
          <input ref="note" type="number" min="0" max="20"></input>
          <button onClick={this.doSubmit}>Noter</button>
        </form>
        
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
        <h1>Series List</h1>

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
          <input ref="length" type="number" min='0' name="name" id="Title" placeholder="Length" required/>
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
    var season = this.refs.season.value;
    var title = this.refs.title.value;
    var description = this.refs.description.value;
    var length = this.refs.length.value;
    
    fetch("http://localhost:3001/api/series/addEpisode", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({stitle: this.props.match.url.split('/')[2],
                            season: season-1,
                            title: title,
                            description: description,
                            length: length})
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
        <h1>Adding an episode to {this.props.match.url.split('/')[2]}</h1>
        <form>
          <input ref="season" type="text" name="season" id="season" placeholder="Season" required/>
          <br/><br/>
          <input ref="title" type="text" name="title" id="title" placeholder="Title" required/>
          <br/><br/>
          <input ref="description" type="text" name="description" id="description" placeholder="Description" required/>
          <br/><br/>
          <input ref="length" min='0' type="number" name="length" id="length" placeholder="Length" required/>
          <br/><br/>
          <button onClick={this.doSubmit}>Adding this episode</button>
        </form>
        
      
      </div>
    )
  }
}


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