import React, { Component } from 'react';

import { BrowserRouter as Router, Route, withRouter,Link } from 'react-router-dom'
export default class Test1  extends Component {
  render() {
    return (
      <div>
           <div>
  <nav className="navbar navbar-expand navbar-dark bg-primary"> 
 
<div class="btn-group">
  <button style={{    marginTop: '2px',right: '17px',marginBottom:'-11px'}} type="button" class="btn btn-primary" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
  <span class="fas fa-align-justify"></span>
  </button>
  <div style={{marginLeft: '-20px',
    background: 'black',
    width: '260%',
    height: '1800%',
    marginTop: '14px'
}}  class="dropdown-menu">
    <a style={{color:'white'}} class="dropdown-item" href="#">Action</a>
    <a style={{color:'white'}}  class="dropdown-item" href="#">Another action</a>
    <a style={{color:'white'}} class="dropdown-item" href="#">Something else here</a>
   
  </div>
</div>

  
  


    <div className="collapse navbar-collapse" id="navbarsExample02">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active"> <Link className="nav-link" to="/">e-Letter <span className="sr-only">(current)</span></Link> </li>
      </ul>
   
      <form className="form-inline my-2 my-md-0"> </form>
    </div>
  </nav>
     
      </div>
        
      </div>
    );
  }
}
