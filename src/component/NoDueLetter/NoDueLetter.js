// This is No Due letter file.  
// In this letter by providing required data the user will get all data in the document format.
// when the user clicks create pdf button user gets the data in the pdf format.
import React, { Component } from 'react'
import Home from '../home';
import moment from 'moment';
import '../CommonStyle.css'
import Header from '../LetterHeader/HeaderPart';
import Footer from '../LetterFooter/FooterPart'; 
import { thisExpression } from '@babel/types';
import { withRouter } from 'react-router-dom';
import PdfContainer from '../PdfComponent/PdfContainer';
import Doc from '../PdfComponent/DocService'
import { UserConsumer } from '../Context/CustomContext';

export class NoDueLetter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      employee: [],
      waterMark: false,
      pix: false


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
    ;
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
    this.props.history.push('/InputRelivingLetter');

  }
  createPdf = (html, name) => {
    window.scrollTo(0, 0);
    const ex=document.getElementsByClassName('pdf-body');
    Doc.createPdf(ex, name)

  }
  render() {
    let value = this.context;
    let toDayDate = new Date();
    let toJoiningDate = new Date(this.state.employee.joiningDate);
    let toReleiving = new Date(this.state.employee.relievingDate)

    if (this.props.empData == 0) {
      this.props.history.push("/cards")
    }
    if (this.props.empData) {
      return (
        <div>
          <Home buttonShow={true} showWatermark={(data) => this.setState({ waterMark: data })} sendData={() => this.sendData()} setHeader={(data) => this.print()} />

          <div class="mainHeader">
            <div className="main">
              <PdfContainer id={"hrletter"} name={this.state.employee.employeeName} createPdf={this.createPdf}>
                <div className="card" ref={this.bodyRef} id="AFourPage">
                  <div className="card-body pb-0">


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
                    </div> : null}
                    <div>
                      <br/>
                      <br/>
                      <br/>
                      <p style={{ paddingLeft: 30, textAlign: 'justify' }}><strong>{toDayDate.getDate()}<sup>{this.nth(toDayDate.getDate())}</sup>&nbsp;{moment(toDayDate).format('MMMM YYYY')}</strong></p>
                      <p style={{ paddingLeft: 30, textAlign: 'center' }}><br />NO DUE CONFIRMATION</p>
                      <br/>
                      <br/>
                      <p style={{ paddingLeft: 30, textAlign: 'justify' }}>Dear {this.state.employee.employeeName}</p>
                      <p style={{ paddingLeft: 30, textAlign: 'justify' }}><br />This is to confirm that there is no salary compensation for the period <strong>{toJoiningDate.getDate()}<sup>{this.nth(toJoiningDate.getDate())}</sup>&nbsp;{moment(toJoiningDate).format('MMMM YYYY')}</strong> to <strong>{toReleiving.getDate()}<sup>{this.nth(toReleiving.getDate())}</sup>&nbsp;{moment(toReleiving).format('MMMM YYYY')}</strong>. Hence stating hereby, the Company Has No Further Dues. <br /> <br />For Test Yantra Software Solutions (India) Pvt Ltd</p>
                      <p style={{ paddingLeft: 30, textAlign: 'justify' }}>&nbsp;</p>
                      <p style={{ paddingLeft: 30, textAlign: 'justify' }}>HR Manager<br />DATE: {moment(toDayDate).format('DD/MM/YYYY')}</p>
                      <p style={{ paddingLeft: 30, textAlign: 'justify' }}><br />{/* &#8943;&#8943;&#8943;&#8943;&#8943;&#8943;&#8943; */}</p>
                      <p style={{ paddingLeft: 30, textAlign: 'justify' }}><br />I hereby confirm that Test Yantra has relieved me from all the formalities. Test Yantra has cleared my dues till <strong>{toReleiving.getDate()}<sup>{this.nth(toReleiving.getDate())}</sup>&nbsp;{moment(toReleiving).format('MMMM YYYY')}</strong>. There is no further due from Company to me as on <strong>{toReleiving.getDate()}<sup>{this.nth(toReleiving.getDate())}</sup>&nbsp;{moment(toReleiving).format('MMMM YYYY')}</strong>.</p>
                      <p style={{ paddingLeft: 30, textAlign: 'justify' }}><br />I hereby accept and oblige on the above and confirm. <br />EMPLOYEE ID: {this.state.employee.employeeId}<br /> <br />For Employee <br />Signature</p>
                      <p style={{ paddingLeft: 30, textAlign: 'justify' }}>&nbsp;</p>
                    
                      <p style={{ paddingLeft: 30, textAlign: 'justify' }}>{this.state.employee.employeeName}<br />DATE: {moment(toDayDate).format('DD/MM/YYYY')}</p>
                      <p style={{ paddingLeft: 30, textAlign: 'justify' }}>&nbsp;</p>
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

export default withRouter(NoDueLetter)
