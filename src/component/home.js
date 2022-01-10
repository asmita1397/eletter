import React, { Component } from 'react';
import '../component/home.css'
import Cards from './Cards';
import { BrowserRouter as Router, Route, withRouter, Link } from 'react-router-dom'
import { MDBBtn } from "mdbreact";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import home3 from './Assests/home.png'
import printer from './Assests/print.jpeg'
import Dropdown from './dropdown';
import Axios from 'axios'
import Example from './LetterHead.js';
import CheckSign from './checksign.js';
import MailComponent from './Email/MailComponent';
import { Thumbnail } from 'react-bootstrap';
import { UserConsumer } from '../component/Context/CustomContext';
import PdfContainer from './PdfComponent/PdfContainer';
import Doc from './PdfComponent/DocService';
import $ from 'jquery'
import ReactFirebaseFileUpload from './DigitalSignature.js';
import FileUploader from '../FileUpload/FileUpload';
import NewFiles from '../FileUpload/NewFiles';
//import SubmitComp from '../FileUpload/NewFiles';
//import DisplayImage from '../FileUpload/FileUpload';


export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "nilesh.gupta6818@gmail.com",
      message: "from email webservice",
      tos: ["nilesh.g@testyantra.com"],
      ccs: ["nilesh.gupta6818@gmail.com"],
      waterMark: '',
      url:'',
      showUrl:false,
      showWaterMark: false
    }

  }
  static contextType = UserConsumer;
  tgnBtnRef = React.createRef('');
  sendEmail = () => {

    Axios.post('http://localhost:8080/send-email', this.state)
      .then((response) => {
        console.log(" details" + this.state.email)
        console.log(response.data.message)
        if (response.data.statusCode === 201) {

          alert("suceess")

        } else if (response.data.statusCode === 401) {

        }

      }).catch((error) => {

        console.log(error);
      })
  }


  printPreview = () => {
   
    setTimeout(() => {
      window.print();
      console.log("object", window.onafterprint)
    }, 500)
  }



  showWatermark = (data) => {

    this.setState({
      show: data
    }, () => { this.props.showWatermark(this.state.show) })

  }
  showUrl = (data) => {

    this.setState({
      show: data
    }, () => { this.props.showUrl(this.state.show) })

  }

  logout = () => {


    localStorage.clear();
   
    this.props.history.push('/');
  }
  sendBack() {
    this.props.sendData();
  }


  handleClick = (val) => {
    let value = this.context;
    value.pdfValMethod(val)
   
  }
  
  // handleClick1() {
  //   this.props.history.push('/DigitalSignature');
  // }

  handleClickBulk = () => {
    let value = this.context;
    value.buttonValMethod(!value.buttonVal)
  }
 
  componentDidMount() {
    let value = this.context;
    if (this.props.buttonVal) {
      value.buttonValMethod(!this.props.buttonVal)
    }
      value.pdfValMethod(false)
  }






  render() {
    let value = this.context;
    console.log(value.buttonVal)
    console.log("nnnbn", value.pdfVal)
    return (
      <div>
        <div>
          <nav style={{ height: '65px' }} class="navbar navbar-expand-md new-bg navbar-dark">
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
              <ul class="navbar-nav">
                <Dropdown />
                <li style={{ marginTop: '11px' }}>
                  <Link class="nav-link" to="/cards"><img style={{ width: 35, marginTop:"7px" }} src={home3} onClick={() => { localStorage.setItem("editClick", '') }} /> <span class="sr-only">(current)</span></Link>
                </li>
              </ul>
              
            </div>
           {/*Digital  Signature button*/ }
    {/* {this.props.buttonShow || window.location.href.split('/')[3] === "" 
    || window.location.href.split('/')[3] === "" ? <SubmitComp/> : null } */}
           


           {/* {this.props.buttonShow || window.location.href.split('/')[3] === "" 
    || window.location.href.split('/')[3] === "" ? <DisplayImage />: null } */}
      {/* <img style={{position:"absolute"}}  src={this.props.image} /> */}
    




           {/* digital sign check */}
   {/* {this.props.buttonShow ? <CheckSign showUrl={this.showUrl.bind()} /> : null} */}
             
            {this.props.buttonShow ? <Example showWatermark={this.showWatermark.bind()} /> : null}
            {(this.props.buttonShow && value.buttonVal === false) ? <button onClick={() => { window.history.back(); localStorage.setItem("editClick", true) }} className="btn1">EDIT</button> : null}
            {(this.props.buttonShow && value.buttonVal === false)? <MailComponent /> : null}
            {this.props.buttonShow ? <button onClick={() => { this.handleClick(true) }} className="btn1">CREATE PDF</button> : null}
            {this.props.buttonShow ? <img onClick={() => { this.printPreview(); this.handleClick(false); }} style={{ width: 38, cursor: 'pointer', borderRadius: '100px' , marginLeft:"5px" }} src={printer} /> : null}
            

            {/* toggle button code  */}
            {this.props.buttonShow || window.location.href.split('/')[3] === "" || window.location.href.split('/')[3] === "cards" ? null :
              <label class="switch" id="togBtn" >
                <input type="checkbox" id="togBtn" onChange={() => { this.handleClickBulk() }} />
                <div class="slider round">
                  <span class="on" >BULK</span>:
                  <span class="off" >FORM</span>
                </div>
              </label>}
                <div style={{ marginTop: '-2px' }} class="nav-item nav-item avatar dropdown">
                <div class="nav-link new-link">
                <a class="nav-link dropdown-toggle waves-effect waves-light" id="navbarDropdownMenuLink-5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src="http://kartavyasadhana.in/assets/images/user.png" class="rounded-circle z-depth-0" alt="avatar image" />
                  <small>{localStorage.getItem("email") ? localStorage.getItem("email").substring(0, localStorage.getItem("email").lastIndexOf("@")).toUpperCase() : null}</small>
                </a>
                <div class="dropdown-menu dropdown-menu-lg-right dropdown-secondary" aria-labelledby="navbarDropdownMenuLink-5">
                 
                  <Link class="dropdown-item waves-effect waves-light" onClick={this.logout}>Logout</Link>

                </div>

              </div>
            </div>
          </nav>



        </div>


      </div>
    );
  }
}
export default withRouter(Home)