// This is HR letter file. It is single page document. 
// In this letter by providing required data the user will get all data in the document format,
//with letter header and footer.
// when the user clicks create pdf button user gets the data in the pdf format.
import React, { Component } from 'react'
import Home from '../home';
import Test from '../IncrementLetter/test';
import '../CommonStyle.css'
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import Header from '../LetterHeader/HeaderPart';
import Footer from '../LetterFooter/FooterPart'; 
import PdfContainer from '../PdfComponent/PdfContainer';
import TyHeader from '../Assests/TYHeader.PNG';
import Doc from '../PdfComponent/DocService';
import { UserConsumer } from '../Context/CustomContext';
// import CheckSign from '../checksign.js';
import imageToBase64 from 'image-to-base64';
//import FileUploader from '../../FileUpload/FileUpload';
//import SubmitComp from '../../FileUpload/NewFiles';
//import DisplayImage from '../../FileUpload/FileUpload';
import CheckSign from '../checksign';


export class HRLetter extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      employee: [],
      url: '',
      waterMark: false,
      showStatus:false,
      image: null
      
    }

    // Signature Image Upload
    this.onImageChange = this.onImageChange.bind(this);
  
  }

  static contextType = UserConsumer;
  
  componentDidMount() {

    let emp = this.props.empData

    if (this.props.empData !== "" && typeof (this.props.empData.salute) === "undefined") {
      emp.salute = "Mr."
    }
    this.setState({
      employee: emp,
    })
    

    let showValue = JSON.parse(window.localStorage.getItem('beans'))


    let that = this;
    var mediaQueryList = window.matchMedia('print');

    mediaQueryList.addListener(function (mql) {
      if (mql.matches) {

      } else {

        that.setState({
          pix: false
        })
      }
    });

  }

  
 
  
  
  
  
  nth = (d) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }


  print = (data) => {

    if (this.state.employee.withHeader) {
      this.setState({
        pix: true
      }, () => setTimeout(() => {
        window.print()
      }, 550)
      )
    } else {
      window.print()
    }

  }

  //edit
  sendData() {
    this.props.sendData(this.state.employee);
    this.props.history.push('/hr');

  }

  createPdf = (html, name) => {
    window.scrollTo(0, 0);
    const ex=document.getElementsByClassName('pdf-body');
    Doc.createPdf(ex, name)
  }


//Signature Image Upload
onImageChange = event => {
  if (event.target.files && event.target.files[0]) {
    let img = event.target.files[0];
    this.setState({
      image: URL.createObjectURL(img)
    });
  }
}




  render() {

    let value = this.context;

    console.log(this.props.empData)
    let joiningDate = new Date(this.state.employee.joiningDate);


    if (this.props.empData === 0) {
      window.history.back();
      
    }
    
    let toDayDate = new Date()
    if (this.props.empData) {
      return (
        <div>
          <Home buttonShow={true} showWatermark={(data) => this.setState({ waterMark: data })} showUrl={(data) => {this.setState({ url: data });this.setState({showStatus:!this.state.showStatus})}} sendData={() => this.sendData()} setHeader={(data) => this.print()} />
          <div class="mainHeader">
            <div className="main">
              <PdfContainer id={"hrletter"} name={this.state.employee.employeeName} createPdf={this.createPdf} >
                <div className="card" ref={this.bodyRef} id="AFourPage">
                  <div className="card-body pb-0">

                     <div>

                    {this.state.waterMark ? <header className="headerimg"> 
                    <Header/>
                    
                    
                    </header> : null}



                      <p style={{ float: 'right' }}></p>
                      <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                      <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                      <p style={{ textAlign: 'left', paddingLeft: 30, paddingRight: 30, marginTop: 150 }} align="JUSTIFY"><span ><strong>Date: {toDayDate.getDate()}<sup>{this.nth(toDayDate.getDate())}</sup>&nbsp;{moment(toDayDate).format('MMMM YYYY')}</strong></span></p>
                      <p style={{ textAlign: 'justify' }} align="CENTER">&nbsp;</p>
                      <p style={{ textAlign: 'center' }} align="CENTER"><span ><span style={{ fontSize: 'large' }}><strong>TO WHOMSOEVER IT MAY CONCERN</strong></span></span></p>
                      <p style={{ textAlign: 'justify' }} align="CENTER">&nbsp;</p>
                      <p style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30 }} align="JUSTIFY"><span ><strong>Sub: Information as per HR Records</strong></span></p>
                      <p style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30 }}>&nbsp;</p>
                      <p style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30 }} /* align="JUSTIFY" */><span >This is to inform that </span><span ><strong>{this.state.employee.salute} {this.state.employee.employeeName} </strong></span><span >(Employee ID: {this.state.employee.employeeId}) is an employee of Test Yantra Software Solutions (India) Pvt Ltd from </span><span ><strong>{joiningDate.getDate()}<sup>{this.nth(joiningDate.getDate())}</sup>&nbsp;{moment(this.state.employee.joiningDate).format('MMMM YYYY')}</strong></span><span > to till Date. {this.props.empData.gender.gender1} is designated as {this.state.employee.designation}. As per the records submitted to the company the Employee is residing under below address </span></p>
                      <p style={{ paddingLeft: 30, textAlign: 'justify' }}>&nbsp;</p>
                      <p style={{ paddingLeft: 30, textAlign: 'justify' }}><strong>Address </strong>: {this.state.employee.address}</p>
                      <p style={{ paddingLeft: 30, textAlign: 'justify' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                      <p style={{ paddingLeft: 30, textAlign: 'justify' }}><strong>NOTE:</strong> This Letter is only for address proof confirmation. The company shall not be responsible for any personal transaction entered by employee with any authority or an outsider</p>


                      <p style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30 }} align="JUSTIFY">&nbsp;</p>
                      {this.state.waterMark ? <div className="waterMark">
                        <span style={{
                          color: 'rgba(38, 50, 72, 0.33)', fontSize: '91px',
                          fontFamily: 'sans-serif', position: 'absolute', zIndex: '0'
                        }}>TES<span style={{
                          color: 'rgba(248, 152, 28, 0.34)', fontSize: '91px',
                          fontFamily: 'sans-serif', fontWeight: "600"
                        }}>TY</span>ANTRA</span>
                      </div> : null}
                      <p lang="en-IN" style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30 }}>&nbsp;</p>
                      <p style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30 }} align="JUSTIFY"><span >Thanks & Regards,</span></p>
                      <p style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30 }} align="JUSTIFY"><span >For <strong>Test Yantra Software Solutions (India) Pvt Ltd</strong></span></p>
                      <br />
                      <br />
                      <br />
                      
                       {/* {this.state.showStatus === true ? <digsign className="digitalsign">
                         <img style={{position: "absolute"}}  src={this.convertToBase64(this.state.url)}></img>
                        <img style={{position: "absolute"}}  src={this.state.url} alt=""/> 
                        </digsign>:null}   */}

{/* {this.props.showStatus === true ? <DisplayImage style={{position:'relative'}}>
  <img style={{position:"absolute"}}  src={this.props.image} />
</DisplayImage>: null} */}



{/* New Signature Image Upload */}
<div>
  
  {(this.state.image == null) ? 
<div>
<label for="files" class="btn" style={{color:'Black',border:'2px solid black',padding:'5px',position:'absolute', marginLeft:'40px',fontWeight:'100px', marginTop:'-70px', backgroundColor:'orange'}}>Upload Digital Signature</label>
            <input 
            type="file" 
            name="myImage" 
            accept=".png"
            id="files"
style={{visibility:'hidden'}}
            onChange={this.onImageChange} /></div> :
            <img style={{position:"absolute",marginLeft: '30px',marginTop: '-50px',width:'300px',height:'100px'}}  src={this.state.image} />
       
  } 
  </div>
        
       


                        <br/>
                        
                      <p style={{ float: 'right' }}></p>
                      <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                      <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                      <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0, position: "absolute"}} align="JUSTIFY"><strong>Authorized Signatory</strong></p>
                   </div>


                    {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1" : "footerimg"} >
                          <Footer/>
                          
                     </div> : null}

                  </div> 
                </div>
              </PdfContainer>
              
            </div>
          </div>

        </div>
      )
    } else {
      return (
        <h1></h1>)
    }
  }
}

export default withRouter(HRLetter)
