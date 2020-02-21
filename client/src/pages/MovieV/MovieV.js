import React from 'react';
import { server_API_URL} from '../../config';

import { Link } from 'react-router-dom';

import './MovieV.scss';


let _ = require('underscore');

export class MovieV extends React.Component{
    constructor(props){
      super(props);
      this.state = {
  
      }
  
      this.doSubmit = this.doSubmit.bind(this);
    }
  
    componentDidMount(){
      fetch(server_API_URL + this.props.match.url,{
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
      
      fetch(server_API_URL + "movies/note", {
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
          <Link className="o-backLink" to="/movies">
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
                        ? this.avgNote(movie[1]).toFixed(2) + ' / 20 (' + movie[1].length + ' notes)' 
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
  