// This is Consultant letter file. It is single page document. 
// In this letter by providing required data the user will get all data in the document format,
// with letter header and footer.
// when the user clicks create pdf button user gets the data in the pdf format.
import React, { Component } from 'react'
import Home from '../home';
import Test from '../IncrementLetter/test';
import '../CommonStyle.css'
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import TyHeader from '../Assests/TYHeader.PNG';
import TyFooter from '../Assests/TYFooter.PNG';
import Header from '../LetterHeader/HeaderPart';
import Footer from '../LetterFooter/FooterPart';
import PdfContainer from '../PdfComponent/PdfContainer';
import Doc from '../PdfComponent/DocService'


export class ConsultantOffer extends Component {

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


  componentDidMount() {

    this.setState({
      employee: this.props.empData,
    })
    console.log("DDDDDDDDDDDDDDDDDDd", this.props.empData)

    let showValue = JSON.parse(window.localStorage.getItem('beans'))


    console.log("data hr form  state ", this.state.employee);

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
    if (d > 3 && d < 21) return 'th';
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

  //edit
  sendData() {
    this.props.sendData(this.state.employee);
    this.props.history.push('/InputConsultantOffer');

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


    let joiningDate = new Date(this.state.employee.joiningDate);
    let reportingDate = new Date(this.state.employee.reportingDate);
    console.log("joining DAte render", joiningDate)
    console.log("WaterMark =", this.props.showWaterMark)

    if (this.props.empData == 0) {
      this.props.history.push("/cards")
    }
    let toDayDate = new Date()
    if (this.props.empData) {
      return (
        <div>
          {<Home buttonShow={true} showWatermark={(data) => this.setState({ waterMark: data })} sendData={() => this.sendData()} setHeader={(data) => this.print()} />}
          <div className="main">
          <PdfContainer id={"hrletter"} name={this.state.employee.employeeName} createPdf={this.createPdf}>
            <div className="card" id="AFourPage">
              <div className="card-body pb-0 mt-5">

                <div>

                  {this.state.waterMark ? <header className="headerimg" >
                  <Header/>
                    

                  </header> : null}


                  {console.log("watermark------------------", this.props.waterMark)}
                  
                 
                  <div>
                    <p style={{ textAlign: 'left', paddingLeft: 30, paddingRight: 30, marginTop: 50 }} align="JUSTIFY"><span ><strong>{toDayDate.getDate()}<sup>{this.nth(toDayDate.getDate())}</sup>&nbsp;{moment(toDayDate).format('MMMM YYYY')}</strong></span></p>

                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>Dear {this.state.employee.salute}{this.state.employee.employeeName},</strong></p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>We are pleased to offer you an employment at Test Yantra Software Solutions (India) Pvt. Ltd. You have been offered as a <strong>Consultant - {this.state.employee.designation}</strong> in our Bangalore office. We extend this offer, and the opportunity it represents, with great confidence in your abilities.&nbsp;</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>Your date of joining to Test Yantra would be <span ><strong>{joiningDate.getDate()}<sup>{this.nth(joiningDate.getDate())}</sup>&nbsp;{moment(this.state.employee.joiningDate).format('MMMM YYYY')}</strong></span>. Your Initial Posting will be at<strong> {this.state.employee.companyLocation}. </strong>However, your services are transferable to any other place or office of the Company or to any subsidiary or associate company; whether now existing or still to be formed. Such transfer / deputation will be in accordance with the company’s rules being in force at the time.</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>You should complete and return the signed copy of your offer letter so that reference checks can be completed. Employment will be conditional on the receipt of references to the Company, prior to an agreed start date. A few original documents (or officially certified copies) must be mandatorily provided either before the commencement of employment, or no later than the morning of your first working day.</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>Subject to the provisions contained in this offer, your services can be terminable by either party giving the other<strong> {this.state.employee.noticePeriod} Month Notice. </strong>No notice of resignation will be effective if given during a period of leave of absence from the Company and you will also not be eligible to proceed on such leave during the notice period.</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>However, for your income tax you shall be personally responsible for filing returns etc.The company will provide you the tax deductions certificate, if applicable at the end of each financial year.</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>You will carry out all instructions of your superior(s) in the Company as regards your work, attendance, conduct, behavior, etc. and carry out diligently and honestly all duties that may be assigned to you by the Company from time to time notwithstanding the designation given above. Your days of work and working hours will be as per the working hours of the office in which you are for the time being posted and can be changed at the discretion of the management of the Company. Your individual remuneration is purely a matter between yourself and the company and has been arrived on the basis of your job, skills specific background and professional merit. We expect you to maintain this information and any changes made therein from time to time as personal and confidential. </p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>You shall, during your service with us, devote your whole time and attention to the Company’s business entrusted to you and you shall not engage yourself directly or indirectly in any business or service other than the Company’s business and service.</p>

                  </div>

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

                  <br />
                  <br />
                </div>


                {this.state.waterMark ? <div className="footerimg" >
                      <Footer/>
                  
                </div> : null}
              </div>
            </div>





            {/* second card */}

            <div className="card" id="AFourPage" style={{ marginTop: '20px' }}>
              <div className="card-body pb-0">

                <div>
                  {this.state.waterMark ? <header className="headerimg" >
                  <Header/>
                    

                  </header> : null}


                  {console.log("watermark------------------", this.props.waterMark)}
                  <p style={{ float: 'right' }}></p>
                  <p style={{ textAlign: 'justify' }}>&nbsp;</p>
             

                  <div>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>Information pertaining to the Company’s operations shall remain secret and safeguarded by you. On joining the Company, a formal agreement to effect non-disclosure of confidential information and intellectual property etc., shall be executed by you.&nbsp; You will also keep us duly informed if you are bound by any confidentiality agreement with your previous employers, in which case you shall keep us indemnified against any breach thereof by you.</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>You will abide by the rules and regulations of the Company which are in force from time to time and the Company shall have the right to vary or modify any or all of the above terms and conditions in service which shall be binding on you.</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>Any act of dishonesty, disobedience, insubordination, incivility, intemperance, irregularity in attendance or other misconduct or neglect of duty, or incompetence in the discharge of duty on your part or the breach of any of the terms, conditions and stipulations contained herein will render you liable to termination of your employment without notice or compensation thereof.</p>
                    <p style={{ paddingLeft: 30, textAlign: 'justify' }}>Breach of any of the above terms and conditions will render you liable to termination of your employment without notice or compensation thereof. The benefits provided by the Company as outlined herein and in the Company policies are subject to change at the discretion of the Company.</p>
                    
                    <p style={{ paddingLeft: 30, textAlign: 'justify' }}>You shall inform the company of any change in your personal data within 3 working days. Any notice required to be given to you shall be deemed to have been duly and properly given if delivered to you personally or sent to you by registered post to you at your address in India, as recorded with the Company.</p>
                    <p style={{ paddingLeft: 30, textAlign: 'justify' }}>By signing below, you confirm that you are not bound by any agreement with any previous employer or any party, which restricts in any way your prospective employment by Company (for example, any non-compete or non-competition agreement, non-disclosure or confidentiality agreement, non-solicitation agreement, etc.).&nbsp; Such agreements may be contained in offer letters from previous employers, stock option grants, employment agreements, independent contractor agreements, agreements for the sale of a business etc.&nbsp;You represent that your employment with Company and the performance of your proposed duties for Company will not violate any obligations you have to such previous employer or other party.&nbsp; In your work for Company, you will not disclose or make use of any information or trade secrets in violation of any agreements with or rights of any such previous employer or other party, and you will not bring to Company premises any copies or other tangible embodiments of non-public information belonging to or obtained from any such previous employment or other party. </p>
                  
                    <p style={{ paddingLeft: 30, textAlign: 'justify' }}>In case any information furnished by you either in your application for employment or during the selection process is found to be incorrect/false, and /or if it is found that you have suppressed any material information in respect of your qualifications and past experience, the Company reserves the right to terminate your services any time without notice or compensation in lieu of notice.</p>
                  
                    </div>

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
                  <br />
                  <br />
                </div>


                {this.state.waterMark ? <div className="footerimg" >
                    <Footer/>
                 </div> : null}
              </div>
            </div>



            {/* thirdcard */}
            <div className="card" id="AFourPage" style={{ marginTop: '20px' }}>
              <div className="card-body pb-0">

                <div>

                  {this.state.waterMark ? <header className="headerimg" >
                  <Header/>
                   </header> : null}


                  {console.log("watermark------------------", this.props.waterMark)}
                  <p style={{ float: 'right' }}></p>
                  <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                 
                  <div>
                 
                  
                    <p style={{ paddingLeft: 30, textAlign: 'justify' }}>At any given point of time, during your contract tenure, if the performance is found unsatisfactory, the company has all the rights to terminate from the service immediately without any prior notification. Based on your performance and the Company requirements, we will either extend your contract further, or may convert to fulltime Employment, else the contract period would end.&nbsp; This would be mutually discussed and in written communication prior to 7 days’ notice.</p>
                    <br/>
                    <p style={{ paddingLeft: 30, textAlign: 'justify' }}>Salary Information:-</p>
                
                    <table style={{ paddingLeft: 30,width: 600,marginLeft: 30, }}  >
                      <tbody style={{ paddingLeft: 30 }}>
                        <tr className="trStyle"style={{ paddingLeft: 39,boder:"1px solid black" }} >
                          <td  className="trStyle" style={{paddingLeft: 16,width: 325, boder:"1px solid black"}}>
                            <p><strong>Salary Compensation on Bench </strong></p>
                          </td>
                          <td  className="trStyle" style={{ paddingLeft: 29, width: 207 }}>
                            <p style={{ paddingLeft: 30 }}><strong>8,000 per month </strong></p>
                          </td>
                        </tr>
                        <tr  className="trStyle" style={{ paddingLeft: 30 ,border:"1px solid black"}} >
                          <td   className="trStyle" style={{ paddingLeft: 30, width: 234 }}>
                            <p style={{ paddingLeft: 30 }}><strong>&nbsp;</strong></p>
                          </td>
                          <td  className="trStyle" style={{ paddingLeft: 30, width: 207 }}>
                            <p style={{ paddingLeft: 30 }}><strong>&nbsp;</strong></p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <br/>
                    <p style={{ paddingLeft: 30, textAlign: 'justify' }}>On selection to Project, you will be offered as Full Time Employment with Test Yantra Software Solutions. The Offer Terms &amp; Salary will be as per the Employment Agreement which will be shared to you. This will be effective on 1<sup>st</sup> of the following month post project deployment.</p>
                    <p style={{ paddingLeft: 30, textAlign: 'justify' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <p style={{ paddingLeft: 30, textAlign: 'justify' }}>It is our hope that your acceptance of our offer will be just the beginning of a mutually beneficial relationship with our organization. We take great pleasure in welcoming you to our Organization and sincerely hope that your period of service with us will be long, pleasant and of mutual benefit.</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>Sincerely,</strong></p>
                   
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>For Test Yantra Software Solutions (India) Pvt Ltd&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </strong></p>
                 
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>&nbsp;</strong></p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </strong></p>
                    
                   
                   
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
            <img style={{position:"absolute",marginLeft: '30px',marginTop: '-104px',width:'300px',height:'100px'}}  src={this.state.image} />
       
  } 
  </div>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>Authorized Signatory </strong></p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>I agree to accept the conditional offer and employment on the above-mentioned terms and conditions. I’ll report for duty on <span ><strong>{reportingDate.getDate()}<sup>{this.nth(reportingDate.getDate())}</sup>&nbsp;{moment(this.state.employee.reportingDate).format('MMMM YYYY')}</strong></span></p>
                 
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>&nbsp;</strong></p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>&nbsp;</strong></p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>Employee Signature</strong></p>
                    <p style={{ paddingLeft: 60, textAlign: 'justify' }}>&nbsp;</p>
                  </div>


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
                  <br />
                  <br />
                </div>


                {this.state.waterMark ? <div className="footerimg" >
                  <Footer />
                 </div> : null}
              </div>
            </div>
</PdfContainer>




           



          </div>






        </div>
      )
    } else {
      return (
        <h1></h1>)
    }
  }
}

export default withRouter(ConsultantOffer)
