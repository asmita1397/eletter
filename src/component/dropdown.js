import React, { Component } from 'react'
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { MDBBtn } from "mdbreact";
import { BrowserRouter as Router, Route, withRouter, Link } from 'react-router-dom'
import '../component/dropdown.css'
import '../component/home.css'
import { InputHRLetter } from './HrLetter/InputHRLetter';
import { UserConsumer } from './Context/CustomContext';

export default class Dropdown extends Component {
    constructor(props)
    {
        super(props)
       
    }
    state={
        buttonVal:false
    }
    static contextType = UserConsumer
  

    handleClick =()=>
    {
        let value = this.context;
        value.buttonValMethod(!value.buttonVal)
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="dropdown">
                            <button onClick={()=>{localStorage.setItem("editClick",'')}}  className="btn dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="ty-logo">e</span><span className="dropdown"  style={{fontSize:"28px"}}> Letter</span> 
                          </button>
                            <ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                                <li className="dropdown-submenu">
                                    <a className="dropdown-item" tabIndex={-1} >Before Employment</a>
                                    <ul className="dropdown-menu mt-0">
                                        <li className="dropdown-item"><Link  tabIndex={-1} to="/InputInternship">Internship Letter</Link></li>
                                        <li className="dropdown-item"><Link to="/InputConfirmation">Confirmation Letter</Link></li>
                                        <li className="dropdown-item"><Link to="/hr">Hr Letter</Link></li>
                                        <li className="dropdown-item"><Link to="/InputIntentLetter">Intent Letter</Link></li>
                                    </ul>
                                </li>

                               
                                <li className="dropdown-submenu">
                                    <a className="dropdown-item" tabIndex={-1} >During Employment</a>
                                    <ul className="dropdown-menu">
                                        <li className="dropdown-item"><Link tabIndex={-1} to="/InputcertificateLetter">Certificate Letter</Link></li>
                                        <li className="dropdown-item"><Link to="/InputDepuationLetter">Deputation Letter</Link></li>
                                        <li className="dropdown-item"><Link to="/InputDesignationLetter">Designation Letter</Link></li>
                                        <li className="dropdown-item"><Link to="/InputIncrementLetter">Increment Letter</Link></li>
                                        <li className="dropdown-item"><Link to="/InputTrainingCommitLetter">Training Letter</Link></li>
                                    </ul>
                                </li>
                              
                                <li className="dropdown-submenu ">
                                    <a className="dropdown-item" tabIndex={-1} >After Employment</a>
                                    <ul className="dropdown-menu">
                                        <li className="dropdown-item"><Link tabIndex={-1} to="/InputRelivingLetter">Relieving Letter</Link></li>
                                        <li className="dropdown-item"><Link to="/InputExitLetter">Exit Letter</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
             
</div>
              




  
    
        )
    }
}
