
import React from 'react';
import { Link } from 'react-router-dom';

import { server_API_URL } from '../../config';
import './SerieV.scss';

let _ = require('underscore');

export class SerieV extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        data: []
      }
    }
  
    componentDidMount(){
      console.log(this.props);
      fetch(server_API_URL + this.props.match.url,{
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
          <Link className="o-backLink" to="/series">
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
                  <div className='o-serie'>
                    <a className="aitem" href={'/' + this.props.match.url.split('/')[2] + '/' + movie[1].title}>
                      <div className='element'>Episode {parseInt(movie[0]) + 1}</div>
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
  