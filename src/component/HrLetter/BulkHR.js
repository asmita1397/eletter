//This is bulk uploading HR letter file. 
//In this file by uploading bulk details with excel format, 
//The user will get all Hr letter in the document format with letter header and footer.
// when the user clicks create pdf button the user gets all the documents in the pdf format.
import React, { Component } from 'react'
import Home from '../home';
import Test from '../IncrementLetter/test';
import '../CommonStyle.css'
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import Footer from '../LetterFooter/FooterPart';
import Header from '../LetterHeader/HeaderPart';
import PdfContainer from '../PdfComponent/PdfContainer';
import Doc from '../PdfComponent/DocService'
import { UserConsumer } from '../Context/CustomContext';

export class BulkHR extends Component {

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
  createPdf = async(html, name,id) => {
    window.scrollTo(0, 0);
    const ex=[document.getElementsByClassName('pdf-body')[id]]; 
    await Doc.createPdf(ex, name)
  }

  render() {
    let value = this.context;

    let joiningDate = "";
    if (this.props.empData == 0) {
      window.history.back();
    }

    let toDayDate = new Date()
    if (this.state.employee.length > 0) {
      return (
        this.state.employee.map((item, index) => {

          joiningDate = new Date((item.joiningDate - (25567 + 2)) * 86400 * 1000)
        return (
            <div>
              <Home buttonShow={true} showWatermark={(data) => this.setState({ waterMark: data })} sendData={() => this.sendData()} setHeader={(data) => this.print()} />
              <div class="mainHeader">
                
                <div className="main" style={{ marginTop:index == 0 ? '100px' : '130px' }}  >
                  <PdfContainer id={index} name={item.employeeName} createPdf={this.createPdf}>
                    <div className="card" ref={this.bodyRef} id="AFourPage">
                      <div className="card-body pb-0">

                        <div>

                          {this.state.waterMark ? <header className="headerimg" >
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
                          <p style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30 }} align="JUSTIFY"><span >This is to inform that </span><span ><strong>{item.salute} {item.employeeName} </strong></span><span >(Employee ID: {item.employeeId}) is an employee of Test Yantra Software Solutions (India) Pvt Ltd from </span><span ><strong>{joiningDate.getDate()}<sup>{this.nth(joiningDate.getDate())}</sup>&nbsp;{moment(joiningDate).format('MMMM YYYY')}</strong></span><span > to till Date. {item.salute === "Mr." ? "He" : "She"} is designated as {item.designation}. As per the records submitted to the company the Employee is residing under below address </span></p>
                          <p style={{ paddingLeft: 30, textAlign: 'justify' }}>&nbsp;</p>
                          <p style={{ paddingLeft: 30, textAlign: 'justify' }}><strong>Address</strong>: {item.address}</p>
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
                          <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}><strong>Authorized Signatory</strong></p>


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
      return (
        <h1></h1>)
    }
  }
}

export default withRouter(BulkHR)
