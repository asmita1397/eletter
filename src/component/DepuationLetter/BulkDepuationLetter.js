//This is bulk uploading Depuatation Policy letter file. 
//In this file by uploading bulk details with excel format, 
//The user will get all Depuatation letter in the document format with letter header and footer.
// when the user clicks create pdf button the user gets all the documents in the pdf format.
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

export class BulkDepuationLetter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employee: [],
      waterMark: false
    }
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

  createPdf = async(html, name,id) => {
    window.scrollTo(0, 0);
   
    const ex=[document.getElementsByClassName('pdf-body')[id]];
    await Doc.createPdf(ex, name)
  }
  render() {
    
    let value = this.context;
    let toReportingDate = "";
    let toReportingTime = "";
    let c = "", d = "";
    if (this.props.empData == 0) {
      window.history.back();
    }

    let toDate = new Date()
    if (this.state.employee.length > 0) {
      return (
        this.state.employee.map((item,index) => {

          toReportingDate = new Date((item.reportingDate - (25567 + 2)) * 86400 * 1000)
          toReportingTime = (item.reportingTime * 1440) / 60 + ":" + ((item.reportingTime * 1440) / 60).toString().split(".")[1] / 10 * 60;


          console.log(toReportingTime)
          return (
            <div>
              <Home buttonShow={true} showWatermark={(data) => this.setState({ waterMark: data })} sendData={() => this.sendData()} setHeader={(data) => this.print()} />

              <div class="mainHeader">
              
                  <div className="main" style={{ marginTop: index == 0 ? '100px' : '130px' }}  >
                    <PdfContainer id={index} name={item.employeeName} createPdf={this.createPdf}>
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
                              <p style={{ textAlign: 'justify', paddingLeft: 20, paddingTop: 10 }}><strong> {item.employeeName},</strong></p>
                              <p style={{ textAlign: 'justify', paddingLeft: 20, paddingTop: 20 }}>Dear <strong>{item.employeeName}</strong><strong>,</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                              <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                              <p style={{ textAlign: 'justify', paddingLeft: 20 }}>As a part of our services to client, please be informed that you are deputed to work at <strong>{item.clientName}, </strong>
                                {item.clientLocation}. We have decided on this owing to your performance at the client interview. You accept this deputation and agree to abide by the policies and procedures of <strong>{item.clientName}</strong>. The date you have to report at <strong>{item.clientName}</strong><strong>, </strong>would be <strong>{toReportingDate.getDate()}<sup>{this.nth(toReportingDate.getDate())}</sup>&nbsp;{moment(toReportingDate).format('MMMM YYYY')}</strong>.</p>

                              <p style={{ textAlign: 'justify', paddingLeft: 20, paddingTop: 5 }}>Contact Person: {item.contactPerson}</p>
                              <p style={{ textAlign: 'justify', paddingLeft: 20 }}>Reporting Time: {moment(toReportingTime, "HH:mm").format("hh:mm A")}</p>
                              <p style={{ textAlign: 'justify', paddingLeft: 20 }}>Other terms and conditions remain the same as per the appointment letter.</p>
                              <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                              <p style={{ textAlign: 'justify', paddingLeft: 20 }}>Kindly sign and return the duplicate of this letter as a token of your acceptance of the above terms and conditions.</p>
                              <p style={{ textAlign: 'justify', paddingLeft: 20 }}>Best Wishes,</p>
                              <br />
                              <br />
                              <br />
                              <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20, margin: 0, fontWeight: 'bolder' }}>Authorized Signatory</p>

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
        }))
    } else {
      return (<h1></h1>)
    }
  }
}

export default withRouter(BulkDepuationLetter)
