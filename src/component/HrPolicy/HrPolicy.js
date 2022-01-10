// This is HR Policy letter file. It is single page document. 
// In this letter by providing required data the user will get all data in the document format,
// with letter header and footer.
// when the user clicks create pdf button user gets the data in the pdf format.
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

export class HrPolicy extends Component {
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

    let emp=this.props.empData
   
    
    if( this.props.empData!=="" &&typeof(this.props.empData.salute)==="undefined"){
     emp.salute="Mr."
    }
    this.setState({
      employee: emp,
    })

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
    this.props.history.push('/InputHrPolicy');

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
    let joiningDate = new Date(this.state.employee.joiningDate);

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
          <div  class="mainHeader">
          <div className="main">
          <PdfContainer id={"hrletter"} name={this.state.employee.employeeName} createPdf={this.createPdf}>
            <div className="card" ref={this.bodyRef} id="AFourPage">
              <div className="card-body pb-0">

                <div>

                  {this.state.waterMark ? <header className="headerimg" >
                  <Header/>
                   </header> : null}

                  {console.log("watermark------------------", this.props.waterMark)}
                  <p style={{ float: 'right' }}></p>
                 
                
                  <div>
                    <p style={{ textAlign: 'center', paddingTop: 50}}><strong>ANNEXURE A</strong></p>
                   
                    <p style={{ textAlign: 'center' }}><strong>NON DISCLOSURE AGREEMENT </strong></p>
                    <p>&nbsp;</p>
                    <p style={{ paddingLeft: 30, textAlign: 'justify' }}>This NDA (<strong>“Agreement”</strong>) is made between <strong>Test Yantra Software Solutions India Pvt. Ltd.</strong>, a company incorporated under the Companies Act, 1956, having its registered office at No. 88, Brigade Chambers, 3rd floor, Gandhi Bazaar Main Road, Basavanagudi, Bengaluru, Karnataka - 560004, represented by its [Director/Authorized Signatory] Human Resource (hereinafter may be referred to as the “<strong>Company</strong>”, which expression shall, unless repugnant to the context or meaning thereof, be deemed to include its successors and permitted assigns) of the ONE PART and <strong>{this.state.employee.salute} {this.state.employee.employeeName},  </strong>residing at <strong>{this.state.employee.address}</strong>. Working for TYSS and referred to as “EMPLOYEE “.</p>
                    <p>&nbsp;</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>WHEREAS</strong>:</p>
                   
                    <ol>
                      <li style={{ textAlign: 'justify' }}>The Company is engaged inter alia in the business of providing Software Services and QA in the fields of enterprise, technology and services. The Company is also engaged in providing staffing and specialized staff augmentation services to various third party customers across the globe.</li>
                    </ol>
                    <ol style={{ listStyleType: 'lower-alpha' }}>
                      <li style={{ textAlign: 'justify' }}>This agreement is effective from the Date of Employment i.e <span ><strong>{joiningDate.getDate()}<sup>{this.nth(joiningDate.getDate())}</sup>&nbsp;{moment(this.state.employee.joiningDate).format('MMMM YYYY')}</strong></span> between TYSS and the Employee. The Employee agrees that information related to Intellectual Property concerning the working of the Company, including all the information concerning the Company’s business transactions, financial arrangements, business partners, customer information, trade secrets, marketing strategies, employee or administrative policies, patents, Copyrights, marketing content, call scripts, designs, or business method, industrial process, new technologies, rates , revenues and any other information concerning the Company which is not in the public domain constitutes “Confidential Information” belonging to the Company and [{this.props.empData.gender.gender1.toLowerCase()}] shall not, in perpetuity, reveal Confidential Information to any person, firm, corporation, or entity.</li>
                      <br />
                      <li style={{ textAlign: 'justify' }}>The Employee agrees and acknowledges that Confidential Information disclosed to the Employee during the course of {this.props.empData.gender.gender2} employment in trust and confidence solely for the performance of {this.props.empData.gender.gender3} assigned tasks at the Company and such confidential information includes various trade secrets and business practices of the Company which shall not be utilized or disclosed, in perpetuity, by the Employee to any third party whatsoever.</li>
                    <br />
                    <li style={{ textAlign: 'justify' }}>The Employee expressly agrees that {this.props.empData.gender.gender1.toLowerCase()} shall keep all Confidential Information of the Company confidential and shall not disclose the same to any third party. This includes Data of Customers, Partners, Vendors the Employee further agrees that in case of any such disclosure by him/her to any third party, it shall be presumed that such disclosure has been made by the Employee for monetary gain or commercial benefit.</li>

                    </ol>

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


                {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1":"footerimg"} >
                 <Footer/>
                  </div> : null}
              </div>
            </div>





            {/* second card */}

            <div className="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px':'20px' }}>
              <div className="card-body pb-0">

                <div>

                  {this.state.waterMark ? <header className="headerimg" >
                  <Header/>
                    </header> : null}


                  {console.log("watermark------------------", this.props.waterMark)}
                  <p style={{ float: 'right' }}></p>
                  <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                  <div>
                    <div>
                     
                      <ol style={{ listStyleType: 'lower-alpha' }} start={4}>
                        <li style={{ textAlign: 'justify' }}>The Employee shall not be prevented to make any disclosure required by (i) order of a court of competent jurisdiction or (ii) any competent regulatory authority or agency where such disclosure is required by law, provided that where the Employee intends to make such disclosure, {this.props.empData.gender.gender1.toLowerCase()} shall notify the Company in writing, so that the Company may seek a protective order or other appropriate remedy and provided further that the Employee discloses no more Confidential Information than is reasonably necessary in order to respond to the required disclosure, takes all reasonable steps requested by the Company to protect the Confidential Information, minimize the extent of the Confidential Information disclosed and to make such disclosure in confidence.</li>
                      </ol>
                      <ol style={{ textAlign: 'justify', listStyleType: 'lower-alpha' }} start={5}>
                        <li>The Employee shall be responsible for any breach of any of the terms of this Agreement. The Employee understands that if {this.props.empData.gender.gender1.toLowerCase()} threatens to or actually commits a breach of or fails to observe any of the obligations set forth in this Agreement, the Company shall have the right to seek an injunction against such breach. Further, the Employee shall indemnify the Company from and against all costs, expenses, losses or damages (including but not limited to legal expenses, loss of goodwill and reputation, etc.) which arose directly or indirectly from the unauthorized disclosure or use of Confidential Information by the Employee or from any other breach of the terms of this Agreement. Over and above any such unliquidated damages, the Employee agrees that in case of any breach of the confidentiality obligations at any point of time in the future, the Employee will be immediately liable to pay the Company as determined based on Extent of disclosure and damage caused thereof.</li>
                      </ol>
                      <ol style={{ textAlign: 'justify', listStyleType: 'lower-alpha' }} start={6}>
                      <li>Employees shall not share the employment related information such as Compensation and Benefits which are personal to each. Employees working on customer’s projects shall not share the data or information about their client with anyone within the organization as well as outside. Strict disciplinary action including termination service may result if found to be violating these regulations. The Salary information is maintained by the HR Department. Every individual, who is a part of the HR team is also bound by the terms of this Agreement, and shall not disclose any confidential information which is supposed to be maintained at the Individual Property of the Employee.</li>
                    </ol>
                   
                    <ol style={{ textAlign: 'justify', listStyleType: 'lower-alpha' }} start={7}>
                      <li>The Information Technology department of the organization shall ensure that no access to Social Media, Interaction forum, any portal which seeks information from users be allowed to be accessed from the Intranet of the company. Supplementing with the Internet and Wireless access usage policy, strict enforcement of intended and unintended leak of information is prevented. No personal computers or storage medium is brought to the work place. Similarly, no material is taken out of the work place without the due authorization of the Department Head.</li>
                    </ol>

                    </div>


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


                {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1":"footerimg"} >
                <Footer/>
                  </div> : null}
              </div>
            </div>



            {/* thirdcard */}
            <div className="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px':'20px' }}>
              <div className="card-body pb-0">
                <div>

                  {this.state.waterMark ? <header className="headerimg" >
                  <Header/>
                   </header> : null}


                  {console.log("watermark------------------", this.props.waterMark)}
                  <p style={{ float: 'right' }}></p>
                  <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                  <div>

                    <ol start={2}>
                      <li><strong>Non-Solicitation and Non-disparagement</strong></li>
                    </ol>
                    
                    <ol style={{ listStyleType: 'lower-alpha' }} start={1}>
                      <li style={{ textAlign: 'justify' }}>The Employee agrees and undertakes that during the period of Employment, the Employee shall not in any way, directly or indirectly, on {this.props.empData.gender.gender2} own behalf or on behalf of any third party, solicit or otherwise approach any client / customer of the Company for the purpose of employment or to provide any services to such client / customer of the Company.</li>
                    </ol>
                  
                    <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={2}>
                      <li>The Employee agrees not to make any public allegations, statements or claims against each other, including representatives and other employees of the Company, and further agree not to make any disparaging, damaging or defamatory statement against each other to any third party, either in person or through any written or electronic medium or on any public platform.</li>
                    </ol>

                   
                    <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={3}>
                      <li>The Employee agrees that in case of breach of either of the above two conditions, the Employee shall be liable to pay the Company certain damage cost that is determined based on Extent of disclosure and damage caused thereof.</li>
                    </ol>

                    <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={4}>
                      <li style={{ textAlign: 'justify' }}>In the event that the Employee makes any disparaging, defamatory or derogatory statement in any public forum in respect of the Company or any of its employees or representatives, the Company shall issue a notice of breach to the Employee and if such disparaging, defamatory or derogatory statement has not been removed from such public forum within 3 days of receipt of such notice from the Company.</li>
                    </ol>
                    <br />
                    <ol start={3}>
                      <li><strong>Miscellaneous </strong><strong><br /></strong></li>
                    </ol>
                    <ol style={{ listStyleType: 'lower-alpha' }} start={1}>
                      <li>If any provision of this Agreement as applied to either party or to any circumstance shall be adjudged by a court of competent jurisdiction to be void or unenforceable for any reason, the same shall in no way affect the validity or enforceability of any other provision of this Agreement to the maximum extent permissible by law.</li>
                    </ol>
                   
                    <ol style={{ listStyleType: 'lower-alpha' }} start={2}>
                      <li>No delay in exercising or omission to exercise any right, power or remedy accruing to a party hereto upon any default under this Agreement shall impair any such right, power or remedy or shall be construed to be a waiver thereof or any acquiescence in such default, nor shall the action or inaction of such party in respect of any default or any acquiescence by it in any default, affect or impair any right, power or remedy of such party in respect of any other default.</li>
                    </ol>
                   
                    <ol style={{ listStyleType: 'lower-alpha' }} start={3}>
                      <li>This Agreement shall be governed by and construed in accordance with the laws of India. In the event of any dispute between the parties, such dispute shall be referred to the sole arbitrator appointed by the Company. The place of arbitration shall be in Bengaluru. The award passed by the Arbitrator shall be final and binding on the parties. Subject to adjudication of disputes by arbitration, the Courts in Bengaluru shall have the exclusive jurisdiction to deal with the disputes arising out of this Agreement.</li>
                    </ol>
                   
                    

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


                {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1":"footerimg"} >
                    <Footer/>
                 </div> : null}
              </div>
            </div>





            {/* fourth card */}
            <div className="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px':'20px' }}>
              <div className="card-body pb-0">

                <div>

                  {this.state.waterMark ? <header className="headerimg" >
                  <Header/>
                   </header> : null}


                  {console.log("watermark------------------", this.props.waterMark)}
                  <p style={{ float: 'right' }}></p>
                  <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                  <div>

                    <ol style={{ listStyleType: 'lower-alpha' }} start={4}>
                      <li>This Agreement constitutes the entire agreement between the parties with respect to its subject matter and supersedes any and all prior representations or agreements, written or oral.</li>
                    </ol>
                    <p><strong>&nbsp;</strong></p>
                    <ol start={4}>
                      <li><strong>Non-competition clause</strong></li>
                    </ol>
                    <p style={{ paddingLeft: 30, textAlign: 'justify' }}>For a period of 2 (two) years following the termination of this Agreement in any manner whatsoever, the Employee is prohibited from</p>
                    <ol style={{ listStyleType: 'lower-alpha' }}>
                      <li style={{ textAlign: 'justify' }}>establishing or conducting, alone or with other persons, whether gratuitously or for remuneration, any business in India which competes with same clients for the same business with the Company</li>
                      <li style={{ textAlign: 'justify' }}>conducting any assignments and/or performing work activities (in whatever way) similar or identical to those duties and responsibilities of the Employee during {this.props.empData.gender.gender2} employment with the Company, alone or with other persons, whether gratuitously or for remuneration for any business in competition with same clients of the Company;</li>
                      <li style={{ textAlign: 'justify' }}>taking any financial interest, alone or with other persons, directly or indirectly in any business which is competitive with same clients of the Company</li>
                      <li style={{ textAlign: 'justify' }}>being involved in any other way, alone or with other persons, directly or indirectly, whether gratuitously or for remuneration, with any business which competes for the same business with same clients as the Company</li>
                    </ol>

                    <p><strong>&nbsp;</strong></p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>CONFIDENTIALITY ELEMENTS</strong></p>
                    
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>Typical confidential information in the organization are as follows. However, it is not limited to only these items and from time to time, the management shall ensure that the information generated or received are classified accordingly based in its business criticality.</p>
                    <ul style={{ listStyleType: 'disc' }}>
                      <li style={{ textAlign: 'justify' }}>Unpublished financial information.</li>
                      <li style={{ textAlign: 'justify' }}>Data of Customers/Partners/Vendors.</li>
                      <li style={{ textAlign: 'justify' }}>Employee related data such as Salaries, Benefits and personal information</li>
                      <li style={{ textAlign: 'justify' }}>Patents, formulas or new technologies.</li>
                      <li style={{ textAlign: 'justify' }}>Customer lists (existing and prospective).</li>
                      <li style={{ textAlign: 'justify' }}>Data entrusted to our company by external parties.</li>
                      <li style={{ textAlign: 'justify' }}>Pricing/marketing and other undisclosed strategies.</li>
                      <li style={{ textAlign: 'justify' }}>Documents and processes explicitly marked as confidential.</li>
                      <li style={{ textAlign: 'justify' }}>Intellectual Property</li>
                      <li style={{ textAlign: 'justify' }}>Any other information classified as confidential from time to time</li>
                      

                    </ul>






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


                {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1":"footerimg"} >
                    <Footer/>
                  </div> : null}
              </div>
            </div>


            {/* sixthth card */}
            <div className="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px':'20px' }}>
              <div className="card-body pb-0">

                <div>

                  {this.state.waterMark ? <header className="headerimg" >
                  <Header/>
                    </header> : null}


                  {console.log("watermark------------------", this.props.waterMark)}
                  <p style={{ float: 'right' }}></p>
                  <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                  <div>

                    <ul style={{ listStyleType: 'disc' }}>
                    <li style={{ textAlign: 'justify' }}>Company Financial Information</li>
                      <li style={{ textAlign: 'justify' }}>Legal Information</li>
                      <li style={{ textAlign: 'justify' }}>Company Seals &amp; Authorized Signatures</li>
                      <li style={{ textAlign: 'justify' }}>Digital Signature</li>
                      <li style={{ textAlign: 'justify' }}>Company Letter heads, Envelopes, Policy Copies</li>
                      <li style={{ textAlign: 'justify' }}>Bank Account &amp; Reference letters</li>
                      <li style={{ textAlign: 'justify' }}>Fund Management, unofficial financial transactions</li>
                      <li style={{ textAlign: 'justify' }}>Employee Benefits</li>
                      <li style={{ textAlign: 'justify' }}>Company P &amp; L, Balance sheet, Revenue information</li>
                      <li style={{ textAlign: 'justify' }}>Company Directors Information &amp; Documents</li>
                      <li style={{ textAlign: 'justify' }}>Dual Employment</li>
                      <li style={{ textAlign: 'justify' }}>Shares, Trade secrets.</li>
                      <li style={{ textAlign: 'justify' }}>Other Administrative information</li>
                    </ul>

                    <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>PENALTY CLAUSE</strong>&nbsp;</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>If Employee violates the terms of this Agreement, the Company shall be entitled to take disciplinary action against the Employee including dismissal of the Employee. The Company may take legal proceedings and file suit for damages, based on the losses incurred to the Organization.</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>IN WITNESS THEREOF</strong> the parties hereto have set and subscribed their respective signatures and seal on the day, month and year first written herein above:</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>&nbsp;</strong></p>
                    <div>
                      <table style={{ paddingLeft: 30, width: 836 }}>
                        <tbody style={{ paddingLeft: 30 }}>
                          <tr style={{ paddingLeft: 30 }}>
                            <td style={{ paddingLeft: 30, width: 416 }}>
                              <p><strong>Test Yantra Software Solutions (I) Pvt. Ltd.<br /> represented by its authorized signatory</strong></p>
                              
                            </td>
                            <td style={{ paddingLeft: 30, width: 427, paddingTop: 15 }}>
                              <p style={{ textAlign: 'justify' }}><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Employee</strong></p>
                              <p style={{ paddingLeft: 30, textAlign: 'justify' }}><strong>&nbsp;</strong></p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>

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
            <img style={{position:"absolute",marginLeft: '30px',marginTop: '-83px',width:'300px',height:'100px'}}  src={this.state.image} />
       
  } 
  </div>






                      
                      <div><strong className="western" style={{ float: 'left', width: 400, fontSize: 'medium', textAlign: 'left',paddingLeft: 33 }}>___________________________________________</strong><strong style={{ float: 'right', width: 372, fontSize: 'medium' }}>________________________________________</strong></div>
                                <br />
                                <br />
                      <p style={{ textAlign: 'justify', paddingLeft: 30, marginBottom: 0 }}><strong>Authorized Signatory&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature:</strong></p>
                      <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong >Human Resource</strong><strong ><span style={{position: 'absolute',left: '681px'}}> Employee Name:</span></strong><span style={{position: 'absolute',left: '843px',wordBreak: 'break-word',right: '105px'}}>{this.state.employee.employeeName}</span> </p>
                      <p style={{ textAlign: 'justify' }}><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></p>
                    </div>









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


                {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1":"footerimg"} >
                                                    <Footer/>
                  </div> : null}
              </div>
            </div>




            {/* seventh card */}
            <div className="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px':'20px' }}>
              <div className="card-body pb-0">

                <div>

                  {this.state.waterMark ? <header className="headerimg" >
                  <Header/>
                    </header> : null}


                  {console.log("watermark------------------", this.props.waterMark)}
                  <p style={{ float: 'right' }}></p>
                  <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                  <div>
                    <p style={{ paddingLeft: 30, textAlign: 'center' }}><strong>ANNEXURE B</strong></p>
                    <p style={{ paddingLeft: 30, textAlign: 'center' }}><strong>&nbsp;</strong></p>
                    <p style={{ paddingLeft: 30, textAlign: 'center' }}><strong>CONFIDENTIALITY AGREEMENT</strong></p>
                    <p style={{ paddingLeft: 30, textAlign: 'center' }}>&nbsp;</p>
                   
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>I, <strong>{this.state.employee.employeeName}</strong> do hereby solemnly affirm that I shall abide by the Confidentiality Policies of Test Yantra Software Solution, at all times.</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>I have been informed of the policies, practices and the actions that will be taken in the event of a breach of policy due to my intentional and unintentional sharing of classified information of the organization and I promise to abide by the same.</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>I confirm that I shall not share any information regarding my employment which are personal to me, any information about my client and client organization and any other classified information regarding the organization, with anyone inside or outside the organization.</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>I confirm that I shall not seek to access information that is not eligible for my knowledge on a Need-to-know basis.</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>I confirm that I shall bring to the notice of the concerned if I observe any breach of confidentiality policy by anyone in the organization, thereby ensuring the compliance to the policy by all concerned</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>Employee Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.employee.employeeName}</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>Designation&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.employee.designation}</p>
                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}>Date of Joining&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{joiningDate.getDate()}<sup>{this.nth(joiningDate.getDate())}</sup>&nbsp;{moment(this.state.employee.joiningDate).format('MMMM YYYY')}</p>
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


                {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1":"footerimg"} >
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

export default withRouter(HrPolicy)