// This is Certificate letter file. It is single page document. 
// In this letter by providing required data the user will get all the
// data in the document format with letter header and footer.
// when the user clicks create pdf button user gets the data in the pdf format.
import React, { Component } from 'react'
import Home from '../home';
import '../CommonStyle.css'
import { withRouter } from 'react-router-dom';
import Header from '../LetterHeader/HeaderPart';
import Footer from '../LetterFooter/FooterPart';
import moment from 'moment';
import PdfContainer from '../PdfComponent/PdfContainer';
import Doc from '../PdfComponent/DocService'
import { UserConsumer } from '../Context/CustomContext';
import "./certificate.css"

export class CertificateLetter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      employee: [],
      waterMark: false
    }
  }
  static contextType = UserConsumer;
  componentDidMount() {

    this.setState({
      employee: this.props.empData,
    })

    let that = this;
    var mediaQueryList = window.matchMedia('print');

    mediaQueryList.addListener(function (mql) {
      if (mql.matches) {
        console.log('before print dialog open');
      } else {
        console.log('after print dialog closed');
        that.setState({
          pix: false
        })
      }
    });

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

  print = (data) => {
    ;
    console.log("pix value ", this.state.pix)
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

  createPdf = (html, name) => {
    window.scrollTo(0, 0);
    const ex=document.getElementsByClassName('pdf-body');
    Doc.createPdf(ex, name)

  }

  render() {
    let value = this.context;
    let SysDate = new Date();
    console.log("System Date", SysDate)
    if (this.props.empData == 0) {
      this.props.history.push("/cards")
    }
    if (this.props.empData) {
      return (
        <div className="qwerty">
          <Home buttonShow={true} showWatermark={(data) => this.setState({ waterMark: data })} setHeader={(data) => this.print()} />
          <div class="mainHeader">
            <div className="main" style={{ marginTop: '100px' }} >
              <PdfContainer id={"hrletter"} name={this.state.employee.employeeName} createPdf={this.createPdf}>
                <div className="card" ref={this.bodyRef} id="AFourPage">
                  <div className="card-body pb-0">

                    <div>

                      {this.state.waterMark ? <header className="headerimg" >
                      <Header/>
                     </header> : null}


                      {this.state.waterMark ? <div className="waterMark">
                        <span style={{
                          color: 'rgba(38, 50, 72, 0.33)', fontSize: '91px',
                          fontFamily: 'sans-serif', position: 'absolute',  zIndex: '0'
                        }}>TES<span style={{
                          color: 'rgba(248, 152, 28, 0.34)', fontSize: '91px',
                          fontFamily: 'sans-serif', fontWeight: "600"
                        }}>TY</span>ANTRA</span>
                      </div>
                        : null}



                      <div>
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
                        <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}><strong>{this.state.employee.employeeName},</strong></p>
                        <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}><strong>{this.state.employee.companyLocation}</strong></p>
                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}><strong>&nbsp;</strong></p>
                        <p style={{ textAlign: 'justify', paddingLeft: 20, marginBottom: 20 }}><strong>Dear {this.state.employee.employeeName},</strong></p>
                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}>This is to confirm that we have collected your<strong> {this.state.employee.checkedSSC} {this.state.employee.checkedPUC} {this.state.employee.checkedDegree} {this.state.employee.certificateType} Certificate</strong> for the background verification at Test Yantra. We would return the document once the verification process is done.</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}>With best wishes,</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}>Very truly yours,</p>
                        <br />
                        <br />
                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}><strong><br /> Corporate HR</strong></p>
                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
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

export default withRouter(CertificateLetter)
