
import React from 'react';
import { server_API_URL, serverURL} from '../../config';

import { Link, Redirect } from 'react-router-dom';

import './AddSerie.scss';


export class AddSerie extends React.Component{
  
    constructor(){
      super();
      this.state = {
        fireRedirect: false
      }
  
      this.doSubmit = this.doSubmit.bind(this);
    }
  
    redirect(res){
      if( res.status === 200 ){
        window.location.href = serverURL;
      }else {
        // Something went wrong here
      }
    }
  
    doSubmit(e){
      e.preventDefault();
      var data = this.refs.stitle.value;
      console.log(data);
      fetch(server_API_URL + "series/create", {
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
          <Link className="o-backLink" to="/series">Back to series list</Link>
  
          <form>
            <input ref="stitle" type="text" name="stitle" id="stitle" placeholder="Title" required/>
            <br/>
            <button onClick={this.doSubmit}>Adding this serie</button>
          </form>
          
        
        </div>
      )
    }
  }
  