import React from 'react';
import { server_API_URL, serverURL} from '../../config';

import { Link, Redirect } from 'react-router-dom';

import './AddMovie.scss';


export class AddMovie extends React.Component{
  constructor(){
    super();
    this.state = {
      fireRedirect: false
    }

    this.doSubmit = this.doSubmit.bind(this);
  }

  redirect(res){
    if( res.status === 200 ){
      window.location.href = serverURL + 'movies';
    }else {
      // Something went wrong here
    }
  }

  doSubmit(e){
    e.preventDefault();
    const t = this.refs.title.value;
    const d = this.refs.description.value;
    const l = this.refs.length.value;
    
    fetch(server_API_URL +"movies/create", {
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