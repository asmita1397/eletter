//This is bulk uploading Certificate letter file. 
//In this file by uploading bulk details with excel format, 
//The user will get all Certificate letter in the document format with letter header and footer.
// when the user clicks create pdf button the user gets all the documents in the pdf format.
import React, { Component } from 'react'
import Home from '../home';
import Test from '../IncrementLetter/test';
import '../CommonStyle.css'
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import Header from '../LetterHeader/HeaderPart';
import Footer from '../LetterFooter/FooterPart';
import PdfContainer from '../PdfComponent/PdfContainer';
import Doc from '../PdfComponent/DocService'
import { UserConsumer } from '../Context/CustomContext';


export class BulkCertificateLetter extends Component {

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
    // const example=document.getElementById('AFourPage');
    const ex=[document.getElementsByClassName('pdf-body')[id]];
    await Doc.createPdf(ex, name)
     
    
  }

  render() {
    let value = this.context;

    let joiningDate = "";
    if (this.props.empData == 0) {
      window.history.back();
    }

    let SysDate = new Date()
    if (this.state.employee.length > 0) {
      return (
        this.state.employee.map((item, index) => {

          joiningDate = new Date((item.joiningDate - (25567 + 2)) * 86400 * 1000)
          return (
            <div>
              {<Home buttonShow={true} showWatermark={(data) => this.setState({ waterMark: data })} sendData={() => this.sendData()} setHeader={(data) => this.print()} />}
              <div class="mainHeader">
                <div className="main" style={{ marginTop: index == 0 ? '100px' : '130px' }}  >
                  <PdfContainer id={index} name={item.employeeName} createPdf={this.createPdf}>
                    <div className="card" ref={this.bodyRef} id="AFourPage">
                      <div className="card-body pb-0">

                        <div>

                          {this.state.waterMark ? <header className="headerimg" >
                          <Header/>
                          </header> : null}



                          <p style={{ textAlign: 'justify', paddingLeft: 20 }}><strong>&nbsp;</strong></p>
                          <p style={{ textAlign: 'justify', paddingLeft: 20 }}><strong>&nbsp;</strong></p>
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <p style={{ textAlign: 'justify', paddingLeft: 20 }}><strong>Date:&nbsp; {SysDate.getDate()}<sup>{this.nth(SysDate.getDate())}</sup>&nbsp;{moment(SysDate).format('MMMM YYYY')}</strong></p>
                          <p style={{ textAlign: 'justify', paddingLeft: 20 }}><strong>&nbsp;</strong></p>
                          <p style={{ textAlign: 'justify', paddingLeft: 20 }}><strong>&nbsp;</strong></p>
                          <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}><strong>To,</strong></p>
                          <p style={{ textAlign: 'justify', paddingLeft: 20 }}><strong>&nbsp;</strong></p>
                          <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}><strong>{item.employeeName},</strong></p>
                          <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}><strong>{item.companyLocation}</strong></p>
                          <p style={{ textAlign: 'justify', paddingLeft: 20 }}><strong>&nbsp;</strong></p>
                          <p style={{ textAlign: 'justify', paddingLeft: 20, marginBottom: 20 }}><strong>Dear {item.employeeName},</strong></p>
                          <p style={{ textAlign: 'justify', paddingLeft: 20 }}>This is to confirm that we have collected your<strong> {item.checkedSSC} {item.checkedPUC} {item.checkedDegree} {item.certificateType} Certificate</strong> for the background verification at Test Yantra. We would return the document once the verification process is done.</p>
                          <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                          <p style={{ textAlign: 'justify', paddingLeft: 20 }}>With best wishes,</p>
                          <p style={{ textAlign: 'justify', paddingLeft: 20 }}>Very truly yours,</p>
                          <br />
                          <br />
                          <p style={{ textAlign: 'justify', paddingLeft: 20 }}><strong><br /> Corporate HR</strong></p>
                          <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                          <br />


                     
                        {this.state.waterMark ? <div className="waterMark">
                          <span style={{
                            color: 'rgba(38, 50, 72, 0.33)', fontSize: '91px',
                            fontFamily: 'sans-serif', position: 'absolute', zIndex: '0'
                          }}>TES<span style={{
                            color: 'rgba(248, 152, 28, 0.34)', fontSize: '91px',
                            fontFamily: 'sans-serif', fontWeight: "600"
                          }}>TY</span>ANTRA</span>
                        </div> : null}
                      


                      </div>


                      {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1" : "footerimg"} >
                          <Footer/>
                     </div> : null}


                    </div>
                    </div>
                  </PdfContainer>
              </div>
            </div>

            </div >
          )
        }))
  } else {
  return (
    <h1></h1>)
}
  }
}

export default withRouter(BulkCertificateLetter)
