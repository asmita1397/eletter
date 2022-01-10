// This is Depuatation Policy letter file. It is single page document. 
// In this letter by providing required data the user will get all data in the document format,
// with letter header and footer.
// when the user clicks create pdf button user gets the data in the pdf format.
import React, { Component } from 'react'
import Home from '../home';
import '../CommonStyle.css'
import Footer from '../LetterFooter/FooterPart';
import Header from '../LetterHeader/HeaderPart';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import PdfContainer from '../PdfComponent/PdfContainer';
import Doc from '../PdfComponent/DocService'
import { UserConsumer } from '../Context/CustomContext';

export class DepuationLetter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employee: [],
      waterMark: false,
      image: null
    }

// Signature Image Upload
this.onImageChange = this.onImageChange.bind(this);
  

  }
  static contextType = UserConsumer;
  componentDidMount() {
    let emp = this.props.empData


    if (typeof (this.props.empData.salute) === "undefined") {
      emp.salute = "Mr."
    }
    this.setState({
      employee: emp,
    })
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


  nth = (d) => {
    if (d > 3 && d < 21)
      return 'th';
    switch (d % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }

  //edit
  sendData() {
    this.props.sendData(this.state.employee);
    this.props.history.push('/InputDepuationLetter');

  }


  createPdf = (html, name) => {
    window.scrollTo(0, 0);
    const ex=document.getElementsByClassName('pdf-body');//Particualr id to create pdf
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
    let toReportingDate = new Date(this.state.employee.reportingDate);
    let toDate = new Date();


    if (this.props.empData == 0) {
      this.props.history.push("/cards")
    }
    if (this.props.empData) {
      return (
        <div>
          <Home buttonShow={true} showWatermark={(data) => this.setState({ waterMark: data })} sendData={() => this.sendData()} setHeader={(data) => this.print()} />

          <div class="mainHeader">
            <div className="main" style={{ marginTop: '100px' }} >
              <PdfContainer id={"deputationletter"} name={this.state.employee.employeeName} createPdf={this.createPdf}>
                <div className="card" ref={this.bodyRef} id="AFourPage">
                  <div className="card-body pb-0">

                    <div>

                      {this.state.waterMark ? <header className="headerimg" >
                      <Header/>
                        </header> : null}


                      {this.state.waterMark ? <div className="waterMark">
                        <span style={{
                          color: 'rgba(38, 50, 72, 0.33)', fontSize: '91px',
                          fontFamily: 'sans-serif', position: 'absolute', zIndex: '0'
                        }}>TES<span style={{
                          color: 'rgba(248, 152, 28, 0.34)', fontSize: '91px',
                          fontFamily: 'sans-serif', fontWeight: "600"
                        }}>TY</span>ANTRA</span>
                      </div>
                        : null}

                      <div>
                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}><strong>Date:&nbsp; {toDate.getDate()}<sup>{this.nth(toDate.getDate())}</sup>&nbsp;{moment(toDate).format('MMMM YYYY')}</strong></p>
                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}>To, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 20, paddingTop: 10 }}><strong> {this.state.employee.employeeName},</strong></p>
                        <p style={{ textAlign: 'justify', paddingLeft: 20, paddingTop: 20 }}>Dear <strong>{this.state.employee.employeeName}</strong><strong>,</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}>As a part of our services to client, please be informed that you are deputed to work at <strong>{this.state.employee.clientName}, </strong>
                          {this.state.employee.clientLocation}. We have decided on this owing to your performance at the client interview. You accept this deputation and agree to abide by the policies and procedures of <strong>{this.state.employee.clientName}</strong>. The date you have to report at <strong>{this.state.employee.clientName}</strong><strong>, </strong>would be <strong>{toReportingDate.getDate()}<sup>{this.nth(toReportingDate.getDate())}</sup>&nbsp;{moment(toReportingDate).format('MMMM YYYY')}</strong>.</p>

                        <p style={{ textAlign: 'justify', paddingLeft: 20, paddingTop: 5 }}>Contact Person: {this.state.employee.contactPerson}</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}>Reporting Time: {moment(this.state.employee.reportingTime, "HH:mm:ss").format("hh:mm A")}</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}>Other terms and conditions remain the same as per the appointment letter.</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}>Kindly sign and return the duplicate of this letter as a token of your acceptance of the above terms and conditions.</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}>Best Wishes,</p>
                        <br />
                        <br />
                        <br />

{/* New Signature Image Upload */}
<div>
  
  {(this.state.image == null) ? 
<div>
<label for="files" class="btn" style={{color:'Black',border:'2px solid black',padding:'5px',position:'absolute', marginLeft:'40px',fontWeight:'100px', marginTop:'-70px',backgroundColor:'orange'}}>Upload Digital Signature</label>
            <input 
            type="file" 
            name="myImage" 
            accept=".png"
            id="files"
style={{visibility:'hidden'}}
            onChange={this.onImageChange} /></div> :
            <img style={{position:"absolute",marginLeft: '20px',marginTop: '-77px',width:'300px',height:'120px'}}  src={this.state.image} />
       
  } 
  </div>


                        <br/>
                        <br/>
                        <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20, margin: 0, fontWeight: 'bolder',marginTop: '10px'}}>Authorized Signatory</p>

                        <br />
                      </div>
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
      return (<h1></h1>)
    }
  }
}

export default withRouter(DepuationLetter)
