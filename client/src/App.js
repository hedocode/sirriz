import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
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

class SeriesView extends React.Component{
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
    
    console.log("Rendering SeriesView");
    return(
      <div>
        <Link to="/">
            <p>Back to Main Menu</p>
        </Link>
        <h2>Series List</h2>

        <div>
          { _.pairs(this.state['movies']).map( (movie) => <div>{movie[1].description}<br></br>{movie[1].length}</div>
            
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

const AddSerie = () => (
  <div>
    
    <Link to="/series">
        <p>Back to series list</p>
    </Link>

    <form method="POST">
      <input type="text" name="name" id="Title" placeholder="Title" required/>
      <br/>
      <button>Adding this serie</button>
    </form>
  </div>
);

const BasicExample = () => (
  <Router>
    <div>
      <Route exact path="/" component={MainMenu}/>
      <Route path="/movies" component={Movies}/>
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
