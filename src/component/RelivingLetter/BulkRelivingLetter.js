//This is bulk uploading Reliving Letter file. 
//In this file by uploading bulk details with excel format, 
//The user will get all Reliving letter in the document format with letter header and footer.
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

export class BulkRelivingLetter extends Component {

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
    let value = this.context;
    console.log(this.state.employee + "bhnczgvvvvvvvvvvvvvvvvvvvvvvvvvvv")
  
    let toJoiningDate = "";
    let toReleiving = ""
    if (this.props.empData == 0) {
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


    let toDate = new Date()
    if (this.state.employee.length > 0) {
      return (
        employeeDetails.map((item,index) => {

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
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>&nbsp;</strong></p>
                          <p style={{ textAlign: 'center', paddingLeft: 30 }}><strong>EXPERIENCE CERTIFICATE</strong></p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>&nbsp;</strong></p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>&nbsp;</strong></p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30, margin: 0 }}><strong>Date:{(toDate.getDate())}<sup>{this.nth(toDate.getDate())}</sup>&nbsp;{moment(toDate).add().format('MMMM YYYY')}</strong></p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30, margin: 0 }}><strong>Emp ID: {item.employeeId}</strong></p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}>This is to inform that <strong>{item.salute}</strong> <strong> {item.employeeName}, </strong>was working with us from <strong> {toJoiningDate.getDate()}<sup>{this.nth(toJoiningDate.getDate())}</sup>&nbsp;{moment(toJoiningDate).format('MMMM YYYY')} </strong> to <strong> {(toReleiving.getDate())}<sup>{this.nth(toReleiving.getDate())}</sup>&nbsp;{moment(toReleiving).format('MMMM YYYY')}</strong>. {item.gender.gender1} was relieved from {item.gender.gender2} responsibilities on <strong> {(toReleiving.getDate())}<sup>{this.nth(toReleiving.getDate())}</sup>&nbsp;{moment(toReleiving).format('MMMM YYYY')}</strong> as <strong>  {item.designation} </strong>During {item.gender.gender2} stay, {item.gender.gender2} character and conduct was good. During {item.gender.gender3} tenure, {item.gender.gender1} was hardworking and a good team member. We wish {item.gender.gender3} success in all {item.gender.gender2} future endeavors.</p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}>Thanks & Regards</p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}>For <strong>Test Yantra Software Solutions (India) Pvt Ltd</strong></p>
                          <br />
                          <br />
                          <br />
                          <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20, margin: 0, fontWeight: 'bolder' }}>Authorized Signatory</p>
                          </div>
                        <br />
                        <br />
                        <br />



                        {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1" : "footerimg"} >
                          <Footer/>
                          </div> : null}

                      </div>
                    </div>

                    <div className="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px':'20px' }}>
                      <div className="card-body">

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
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>&nbsp;</strong></p>
                          <p style={{ textAlign: 'center', paddingLeft: 30 }}><strong>RELIEVING LETTER</strong></p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>&nbsp;</strong></p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30, margin: 0 }}><strong>Date:  {toDate.getDate()}<sup>{this.nth(toDate.getDate())}</sup>&nbsp;{moment(toDate).format('MMMM YYYY')}</strong></p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30, margin: 0 }}><strong>Emp ID:  {item.employeeId}</strong></p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30, paddingTop: 10 }}>Dear <strong> {item.employeeName}</strong>,</p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}>As per your resignation letter, we would like to inform you that, you are relieved from the roles and responsibilities of the company from <strong> {(toReleiving.getDate())}<sup>{this.nth(toReleiving.getDate())}</sup>&nbsp;{moment(toReleiving).format('MMMM YYYY')}.</strong> In this regard, we also wish to inform you that there are no commitments outstanding from either of us. We wish you success in all your future endeavors.</p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}>Thanks & Regards</p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}>For <strong>Test Yantra Software Solutions (India) Pvt Ltd</strong></p>
                          <br />
                          <br />
                          <br />
                          <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20, margin: 0, fontWeight: 'bolder' }}>Authorized Signatory</p>

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

export default withRouter(BulkRelivingLetter)
