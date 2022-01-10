//This is bulk uploading No Due letter file. 
//In this file by uploading bulk details with excel format, 
//The user will get all No Due letter in the document format with letter header and footer.
// when the user clicks create pdf button the user gets all the documents in the pdf format.
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

export class BulkNoDueLetter extends Component {

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
  createPdf = async(html, name,id) => {
    window.scrollTo(0, 0);
    
    const ex=[document.getElementsByClassName('pdf-body')[id]];
    await Doc.createPdf(ex, name)

  }
  render() {
    console.log(this.state.employee + "bhnczgvvvvvvvvvvvvvvvvvvvvvvvvvvv")
    let value = this.context;
    let toJoiningDate = "";
    let toReleiving = ""
    if (this.props.empData == 0) {
      // this.props.history.push("/cards")
      window.history.back();
    }

    let employeeDetails = this.state.employee.map((item) => {
      let o = Object.assign({}, item);

      if (item.salute === "Mr.") {
        o.gender = {
          gender1: 'He',
          gender2: 'his',
          gender3: 'him'
        };
      }
      else {
        o.gender = {
          gender1: 'She',
          gender2: 'her',
          gender3: 'her'
        };
      }
      return o;
    })


    let toDayDate = new Date()
    if (this.state.employee.length > 0) {
      return (
        this.state.employee.map((item, index) => {

          toJoiningDate = new Date((item.joiningDate - (25567 + 2)) * 86400 * 1000)
          toReleiving = new Date((item.relievingDate - (25567 + 2)) * 86400 * 1000)

          return (
            <div>
              <Home buttonShow={true} showWatermark={(data) => this.setState({ waterMark: data })} sendData={() => this.sendData()} setHeader={(data) => this.print()} />

              <div class="mainHeader">
                <div className="main" style={{ marginTop: index == 0 ? '100px' : '130px' }}  >
                  <PdfContainer id={index} name={item.employeeName} createPdf={this.createPdf}>
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
                         
                          <p style={{ textAlign: 'left', paddingLeft: 30, paddingRight: 30, marginTop: 150 }} align="JUSTIFY"><span ><strong>{toDayDate.getDate()}<sup>{this.nth(toDayDate.getDate())}</sup>&nbsp;{moment(toDayDate).format('MMMM YYYY')}</strong></span></p>
                        
                          <p style={{ paddingLeft: 30, textAlign: 'center' }}><br /> <strong>NO DUE CONFIRMATION </strong></p>
                          <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                          <p style={{ paddingLeft: 30, textAlign: 'justify' }}>Dear <strong>{item.employeeName}</strong></p>
                          <p style={{ paddingLeft: 30, textAlign: 'justify' }}><br />This is to confirm that there is no salary compensation for the period <strong>{toJoiningDate.getDate()}<sup>{this.nth(toJoiningDate.getDate())}</sup>&nbsp;{moment(toJoiningDate).format('MMMM YYYY')}</strong> to <strong>{toReleiving.getDate()}<sup>{this.nth(toReleiving.getDate())}</sup>&nbsp;{moment(toReleiving).format('MMMM YYYY')}</strong>. Hence stating hereby, the Company Has No Further Dues.
                           <br /> <br />For Test Yantra Software Solutions (India) Pvt Ltd</p>
                          <p style={{ paddingLeft: 30, textAlign: 'justify' }}>&nbsp;</p>
                          <p style={{ paddingLeft: 30, textAlign: 'justify' }}>&nbsp;</p>
                          <p style={{ paddingLeft: 30, textAlign: 'justify' }}>HR Manager<br /><strong>DATE: {moment(toDayDate).format('DD/MM/YYYY')}</strong></p>
                          <p style={{ paddingLeft: 30, textAlign: 'justify' }}><br />{/* ……………………………………………………………………………………………………………………………………………………………. */}</p>
                          <p style={{ paddingLeft: 30, textAlign: 'justify' }}><br />I hereby confirm that Test Yantra has relieved me from all the formalities. Test Yantra has cleared my dues till <strong>{toReleiving.getDate()}<sup>{this.nth(toReleiving.getDate())}</sup>&nbsp;{moment(toReleiving).format('MMMM YYYY')}</strong>. There is no further due from Company to me as on <strong>{toReleiving.getDate()}<sup>{this.nth(toReleiving.getDate())}</sup>&nbsp;{moment(toReleiving).format('MMMM YYYY')}</strong>.</p>
              
                          <p style={{ paddingLeft: 30, textAlign: 'justify' }}><br />I hereby accept and oblige on the above and confirm. <br />EMPLOYEE ID: <strong>{item.employeeId}</strong><br /> <br />For Employee <br />Signature</p>
                          <p style={{ paddingLeft: 30, textAlign: 'justify' }}>&nbsp;</p>
                          <p style={{ paddingLeft: 30, textAlign: 'justify' }}><strong>{item.employeeName}</strong><br /><strong>DATE : {moment(toDayDate).format('DD/MM/YYYY')}</strong></p>
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
        }))
    } else {
      return (
        <h1></h1>)
    }
  }
}

export default withRouter(BulkNoDueLetter)
