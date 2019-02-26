import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import './App.css';
var _ = require('underscore');

const MainMenu = () => (
    <div className="App">
      <ul className='full'>
        <li>
          <Link to="/movies">
              Movies
          </Link>
        </li>
        <li>
          <Link to="/series"> 
              <span>Series</span>
          </Link>
        </li>
      </ul>
    </div>
);

const Movies = () => (
    <div>
      <Link to="/">
        <p>Back to Main Menu</p>
      </Link>
      <h2>Movie List</h2>
      
      <Link to="/addMovie">
        <button className="addButton">+</button>
      </Link>
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
    fetch("http://localhost:3001/api/movies")
    .then((res) => {return res.json()})
    .then((data) => { this.setState({ movies: data })} );
  }

  render(){
    return(
      <div>
        <Link to="/">
            <p>Back to Main Menu</p>
        </Link>
        <h2>Series List</h2>

        <div>
          { _.pairs(this.state['movies']).map( (movie) => 
              <div class='movie'>
                <div class='element'>{movie[0]}</div>
                <div class='element'>{movie[1].description}</div>
                <div class='element'>{(Math.trunc(movie[1].length / 60))}h{Math.trunc(movie[1].length % 60)}min</div>
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


class SeriesView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount(){
    fetch("http://localhost:3001/api/series")
    .then((res) => {return res.json()})
    .then((data) => { this.setState({ movies: data })} );
  }

  render(){
    return(
      <div>
        <Link to="/">
            <p>Back to Main Menu</p>
        </Link>
        <h2>Series List</h2>

        <div>
          { _.pairs(this.state['movies']).map( (serie) => 
              <div className='movie'>
                <div className='element'>{serie[0]}</div>
                <div className='element'>{serie[1].description}</div>
                <div className='element'>{(Math.trunc(serie[1].length / 60))}h{Math.trunc(serie[1].length % 60)}min</div>
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

const AddMovie = () => (
  <div>
    <Link to="/movies">
        <p>Back to movies list</p>
    </Link>

    <form method="POST">
      <input type="text" name="name" id="Title" placeholder="Title" required/>
      <br/>
      <br/>
      <textarea type="text" name="name" id="Title" placeholder="Description" required/>
      <br/>
      <br/>
      <input type="number" name="name" id="Title" placeholder="Length" required/>
      <br/>
      <br/>
      <button>Adding this Movie</button>
    </form>
  </div>
);

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
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({stitle:data})
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

        <form >
          <input ref="stitle" type="text" name="stitle" id="stitle" placeholder="Title" required/>
          <br/>
          <button type="button" onClick={this.doSubmit}>Adding this serie</button>
        </form>
        
      
      </div>
    )
  }
}


const BasicExample = () => (
  <Router>
    <div>
      <Route exact path="/" component={MainMenu}/>
      <Route path="/movies" component={MoviesView}/>
      <Route path="/series" component={SeriesView}/>
      <Route path="/addMovie" component={AddMovie}/>
      <Route path="/addSerie" component={AddSerie}/>
    </div>
  </Router>
);

function getMovies(){
  fetch("http://localhost:3001/api/movies")
  .then((res) => {return res.json()})
  .then((data) => { this.setState({ movies: data })} );
}

function getSeries(){
  fetch("http://localhost:3001/api/series")
  .then(res => res.json())
  .then(data => this.setState({ series: data }));
}

export default BasicExample

// var params = {
//   method : 'GET',
//   headers : new Headers(),
//   mode : 'cors',
//   cache : 'default'
// };

// function getSeries(){
//   fetch('localhost:3001/api/series', params).then(function(response){
//     if(response.ok){
//       response.blob().then(function(myBlob){
        
//       });
//     } else {
//       console.log("Erreur");
//     }
//   }).catch(function(error) {
//     console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
//   });
// }

// export default App;
