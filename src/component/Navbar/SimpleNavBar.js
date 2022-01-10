import React, { Component } from "react";
import { Link } from 'react-router-dom'
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';

class SimpleNavBar extends Component {

render() {
  return (
    <Router>
      <MDBNavbar  style={{backgroundColor:"#343A40"}}  dark expand="md">
        <MDBNavbarBrand>
          <Link to="/" className="white-text">E-Letter</Link>
        </MDBNavbarBrand>
      </MDBNavbar>
    </Router>
    );
  }
}

export default SimpleNavBar;