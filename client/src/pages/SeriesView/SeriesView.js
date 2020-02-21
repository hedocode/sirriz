import React from 'react';
import { Link } from 'react-router-dom';

import { server_API_URL } from '../../config';
import './SeriesView.scss';

let _ = require('underscore');

export class SeriesView extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        data: []
      };
    }
  
    componentDidMount(){
      fetch(server_API_URL + "series", {
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
        <main>
          <Link className="o-backLink" to="/">
              <p>Back to Main Menu</p>
          </Link>
          <br></br>
          <h1>Series List</h1>
  
          <div className="o-serie-holder">
            { _.pairs(this.state['movies']).map( (serie) => 
                <div className="o-serie">
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
        </main>
      )
    }
  }