// This is Delivery Policy letter file. It is single page document. 
// In this letter by providing required data the user will get all data in the document format,
//with letter header and footer.
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

export class DeliveryPolicy extends Component {

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


    if (this.props.empData !== "" && typeof (this.props.empData.salute) === "undefined") {
      emp.salute = "S/o"
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
    this.props.history.push('/InputDeliveryPolicy');

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
          <div class="mainHeader">
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
                      <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                      <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                      <div>
                        <p style={{ textAlign: 'center' }}><strong><u>NONDISCLOSURE AGREEMENT</u></strong></p>
                        <p style={{ textAlign: 'center' }}><strong>&nbsp;</strong></p>
                        <p style={{ textAlign: 'justify', paddingLeft: 30 }}>This Confidentiality and Non-Disclosure Agreement is entered on this <span ><strong>{joiningDate.getDate()}<sup>{this.nth(joiningDate.getDate())}</sup>&nbsp;{moment(this.state.employee.joiningDate).format('MMMM YYYY')}</strong></span></p>
                        <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>&nbsp;</strong></p>
                        <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>BY AND BETWEEN:</strong></p>

                        <p style={{ textAlign: 'justify', paddingLeft: 30 }}>Test Yantra Software Solutions (India) Private Limited, a company incorporated under the Companies Act, 1956, having its registered office at No.88, Brigade Chambers, 3rd floor, Gandhi Bazaar Main Road, Basavanagudi, Bengaluru, Karnataka - 560004 represented by its Human Resource Department (hereinafter may be referred to as the “<strong>Company</strong>”, which expression shall, unless repugnant to the context or meaning thereof, be deemed to include its successors and permitted assigns) of the ONE PART;</p>
                        <p>&nbsp;</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 30 }}>AND</p>
                        <br />
                        <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>{this.state.employee.employeeName}</strong>, aged about {this.state.employee.age} years, {this.state.employee.salute}&nbsp; {this.state.employee.fatherName}, Residing at, {this.state.employee.address}. Here in after referred to as the “Employee” or the “Second Party”, of the OTHER PART.</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>WHEREAS:</strong></p>

                        <ol style={{ listStyleType: 'upper-alpha' }}>
                          <li style={{ textAlign: 'justify' }}>The Company is engaged, <em>inter alia</em>, in the business of providing software services including but not limited to testing software, secondment of its employees to client places for rendering software and related services;</li>
                        </ol>

                        <ol style={{ listStyleType: 'upper-alpha' }} start={2}>
                          <li style={{ textAlign: 'justify' }}>The Employee has been employed by the Company vide Employment Agreement dated <span ><strong>{joiningDate.getDate()}<sup>{this.nth(joiningDate.getDate())}</sup>&nbsp;{moment(this.state.employee.joiningDate).format('MMMM YYYY')}</strong></span> and is employed in the position of ‘Business Development’. In the role as BD, {this.props.empData.gender.gender1.toLowerCase()}  is responsible for BD related matters including but not limited to enrolling the Candidates &amp; Employees for interviews with the Customers etc. In this role, {this.props.empData.gender.gender1.toLowerCase()} shall have access to Candidate database, employee details, Customer Database, salary details etc. Since the Employee has access to confidential information, the Company has to protect its confidential information.</li>
                        </ol>
                        <ol style={{ listStyleType: 'upper-alpha', textAlign: 'justify' }} start={3}>
                          <li style={{ textAlign: 'justify' }}>To achieve the aforesaid objective and also to ensure confidentiality, restricted use and non-disclosure of confidential information disclosed to or known by the Employee as a consequence of or through {this.props.empData.gender.gender2} association with the Company, the Employee is executing this Agreement.</li>
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

                <div className="card" id="AFourPage" style={{ marginTop:value.pdfVal ? '0px':'20px' }}>
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


                        <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>NOW THIS AGREEMENT WITNESSETH AS UNDER:</strong></p>
                        <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>&nbsp;</strong></p>
                        <ol style={{ textAlign: 'justify' }}>
                          <li><strong>DEFINITIONS</strong>:</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }}>
                          <li><strong>“Agreement”</strong> shall mean this Confidentiality and Nondisclosure Agreement;</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha' }} start={2}>

                          <li style={{ textAlign: 'justify' }}><strong>“Confidential Information”</strong> means any information disclosed to or known by the Employee as a consequence of or through {this.props.empData.gender.gender2} association with the Company, relating to the past, present or future business activities of the Company or its subsidiaries or affiliates, including any information conceived, originated, discovered, or developed by the Employee&nbsp; during {this.props.empData.gender.gender2} employment with the Company, which is not generally known to the public or potential competitors of the Company, or otherwise disclosed by any employee or agent of the Company to others (not agents of the Company) as authorized by the Company (preserving, however, as confidential all such disclosures that are subject to a nondisclosure agreement by recipient of such information), including but not limited to any enquiry made by the Customers with the Company for Business information or know-how.</li>
                        </ol>
                        <br />
                        <ol style={{ listStyleType: 'lower-alpha' }} start={3}>
                          <li><strong>“Test Yantra Software Solutions “hereinafter</strong> may be referred to as the “<strong><em>Company</em></strong>”</li>
                          <br />
                          <li><strong>“Delivery “</strong>involves in is responsible to work closely with other functional team to complete the full cycle of delivery management and coordinates with Business team and other functions in getting new business to the Company by the way of acquisition of new customer and nurturing existing customer for all aspects of Deliverables and Account Management.</li>
                          <br />
                          <p style={{ textAlign: 'justify' }}>Handing Delivery role involves to Create a talent pool of prospective candidates that enables the selection of best candidates to suit for the client requirement, involves interaction with Customers, Candidates and Employees and play a significant role in Revenue Generation to the Company. A Delivery will establish business relationships with our Customers by understanding the requirement and ensure deliverables and operational activities in a smooth &amp; processed way. Employee will actively and successfully manage the closure process which involves calling activity, face-to-face discussions with the Candidates, negotiating skills, job description, skillset, closures and costing.</p>

                          <p style={{ textAlign: 'justify' }}>The goal is to drive&nbsp;sustainable financial growth through boosting Deliverables and forging strong relationships with clients.</p>

                        </ol>

                        <ol style={{ textAlign: 'justify', listStyleType: 'lower-alpha' }} start={5}>
                          <li><strong>“Customers” </strong>means customers of the Company who hires resources from the Company or whose resources are sent to the Company for projects and various other Business activities.</li>
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



                {/* thirdcard */}
                <div className="card" id="AFourPage" style={{ marginTop:value.pdfVal ? '0px':'20px' }}>
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
                        <ol style={{ textAlign: 'justify', listStyleType: 'lower-alpha' }} start={6}>
                          <li><strong>“Customer Database”</strong> includes business agreements, pricing, contact details, email id, bank account details and includes information of old / existing and new customers.</li>
                        </ol>

                        <ol style={{ textAlign: 'justify', listStyleType: 'lower-alpha' }} start={7}>
                          <li><strong>“Student / Candidate Database” means personal details such as </strong>mobile number, email id, address, educational details, work experience etc., of the students or periods who undertake or proposes to undertake employment opportunity from the Company.</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha' }} start={8}>
                          <li style={{ textAlign: 'justify' }}><strong>“Drive Management “</strong>Online or Offline interviews will be conducted to our students at Our Customer place or our Company or at Colleges.</li>
                        </ol>
                        <p>&nbsp;</p>
                        <ol start={2}>
                          <li>The use of the Confidential Information by the Employee shall be subject to the following undertakings by the Employee:</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha' }} start={1}>
                          <li >The Employee agrees to hold all Confidential Information in trust and confidence in perpetuity for the Company and, except as set forth in Clause 2)(b) below and elsewhere in this Agreement or as otherwise may be authorized by the Company in writing, the Employee will not use or disclose to any person, firm or enterprise, or use for {this.props.empData.gender.gender2}  benefit, any Confidential Information;</li>
                        </ol>
                        <ol style={{ listStyleType: 'lower-alpha' }} start={2}>
                          <li style={{ textAlign: 'justify' }}>The Employee understands and agrees that {this.props.empData.gender.gender1.toLowerCase()} is being given access to Confidential Information in confidence and trust and solely for use for the performance of the services required to be performed by the Employee during {this.props.empData.gender.gender2}  employment in the Company for the furtherance of the business interests of the Company.</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={3}>
                          <li>The Employee agrees that the Employee will not use the Confidential Information for any other purpose or disclose to any third party any Confidential Information without express prior authorization in writing by the Company, and will keep all Confidential Information confidential at all times.</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={4}>
                          <li>The Employee agrees not to copy, reproduce or modify the Confidential Information or any portion thereof.</li>
                        </ol>


                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={5}>
                          <li>The Employee can neither through media nor written communication use Customer name and publish the information pertaining to closure / business leads on any forum.</li>
                        </ol>


                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={6}>
                          <li>While communicating with Candidates, employees &amp; Customers on Facebook, LinkedIn or any Social media, Employee must create Official email id for accessing the same.</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={7}>
                          <li>While conducting drives in the Company, or at Colleges, or any other venue, Employee is not supposed to record the ongoing activities of Drive or any other event.</li>
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
                <div className="card" id="AFourPage" style={{ marginTop:value.pdfVal ? '0px':'20px' }}>
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


                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={8}>
                          <li>If there are any recordings, photos about any event conducted by the Company, the same cannot be published in social media and cannot be accessed for personal usage.</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha' }} start={9}>
                          <li style={{ textAlign: 'justify' }}>The Employee agrees that during the course of communications with the Company pursuant to this Agreement, the Employee will not make any unauthorized use, or disclosure to the Company, of any proprietary or confidential information or trade secrets of any third party to whom Employee has an obligation not to do so;</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha' }} start={10}>
                          <li style={{ textAlign: 'justify' }}>Pricing and rates pertaining to Business, Company Revenue and information related to Customer Agreements / Contracts, banking records and passwords should not be disclosed outside the Organization.</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={11}>
                          <li>While conducting online and offline drives, employee must monitor the students and ensure there are no misconducts or cheat by the students. In parallel to this Employee shall not give any guidance / assistance to the students to face the Tests / interview. This leads to a bad image to the Company resulting in losing the customer</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={12}>
                          <li>Employee will have contacts with placement officers at various Colleges. Employee must not carry the Colleges of our Company to {this.props.empData.gender.gender2}  new Company or wherever {this.props.empData.gender.gender1.toLowerCase()} joins. {this.props.empData.gender.gender1} must not establish contacts with old or existing customers of our Company</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={13}>
                          <li>Employee must not make false promise for job assurance and collect money from Candidate, (for example after getting offer letter, or after salary) and not supposed to either demand or accept any gift or treat from Candidates.</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={14}>
                          <li>Feedback and Quality about the Company, quality and Internal Customers and External Customers should not be discussed or commented in a public forum, either within the Company or to an outsider, be it orally or any means of communication.</li>
                        </ol>
                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={15}>
                          <li>Employee is not supposed to make videos or audios about Business discussions and disclose it to outside office network</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={16}>
                          <li>Employee is expected to strictly adhere to the conditions defined in the Sexual Harassment Policy adopted by the Company</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha' }} start={17}>
                          <li style={{ textAlign: 'justify' }}>Employee shall ensure {this.props.empData.gender.gender1.toLowerCase()} will not commit Dual Employment, which means that {this.props.empData.gender.gender1.toLowerCase()} cannot work for Commercial Benefit during Employment with any third party as Consultant, be it a Company / firm/ Proprietorship / Partner/ Person / Customer or any other Organization.</li>
                        </ol>
                        <ol style={{ listStyleType: 'lower-alpha' }} start={18}>
                          <li style={{ textAlign: 'justify' }}>Employee must not Discuss about {this.props.empData.gender.gender2}  Individual Salaries, Compensation Benefits and personal Information with subordinates within the Work premises, as well as in Public Forum.</li>
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

             {/* sixthth card */}
                <div className="card" id="AFourPage" style={{ marginTop:value.pdfVal ? '0px':'20px' }}>
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


                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={19}>
                          <li>Employee shall not misuse, or sell, or share the leads, Customer database, Company Logo, Training Materials, Question paper Patterns, Videos, Audios for personal usage.</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={20}>
                          <li>During Employment or upon Exit from Company, Employee shall ensure that {this.props.empData.gender.gender1.toLowerCase()} shall not make False branding about the Company.</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={21}>
                          <li>Employee is not supposed to spread negative news about the Company and make it viral through WhatsApp, Facebook, YouTube, twitter, LinkedIn or any other social media. As per Cybercrime strict action will be taken against the Employee.</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={22}>
                          <li>Employee shall not prepare or issue false documents, certificates, questionnaires, training materials, or job assurance to anyone for monetary benefits within Company or to an outsider.</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={23}>
                          <li>Employee cannot assist or refer {this.props.empData.gender.gender2} colleagues or any other person who is associated to our Company for attending Interviews with our Competitors or to some other company, which leads to attrition of employment in our company.</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha' }} start={24}>
                          <li style={{ textAlign: 'justify' }}>Employee is not supposed to use personal email id for any communication. Official information should not be carried to personal email id /any accessories</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha' }} start={25}>
                          <li style={{ textAlign: 'justify' }}>All rights in the Confidential Information provided to the Employee shall remain with the Company; Disclosure of Confidential Information to the Employee shall not confer upon the Employee any rights (including any intellectual property rights) over such Confidential Information and same shall be used by the Employee only for the purposes specified in 2)(b) and the same (a) shall be returned to the Company immediately upon written request, should circumstances at the time warrant such an action or (b) shall be destroyed or permanently erased (on all forms of recordable devices) when in possession of the Employee, to the satisfaction of the Company, and if requested by the Company, the Employee shall acknowledge in writing that all such Confidential Information as applicable, has been destroyed or permanently erased.</li>
                        </ol>
                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={26}>
                          <li>The obligations set forth in paragraph (e) shall be subject to the right of the Employee to retain in accordance with the terms and conditions of this Agreement such portions of the Confidential Information as is necessary to comply with any law or regulation.</li>
                        </ol>
                        <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                        <ol style={{ textAlign: 'justify' }} start={3}>
                          <li>Employment<strong> Terms – During Employment &amp; upon Separation from the Company. </strong></li>
                        </ol>
                        <p style={{ paddingLeft: 30, textAlign: 'justify' }}><strong>Relative Employment</strong>: Company Policy prohibits providing employment opportunities to immediate members of the family of Employee, the term immediate means Spouse, Brother, Sister, Parents, In-laws, brother-in-law, Sister-in-law, Co-brother, Co-sister. This is applicable for any-type of employment (Contract / Part-time / Full-time / Consultant) Any such references should be routed through <strong>Hiring Policy</strong> adopted by the Company.</p>

                      </div>


                      {this.state.waterMark ? <div className="waterMark">
                        <span style={{
                          color: 'rgba(38, 50, 72, 0.33)', fontSize: '91px',
                          fontFamily: 'sans-serif', position: 'absolute', zIndex: '0'
                        }}>TES<span style={{
                          color: 'rgba(248, 152, 28, 0.34)', fontSize: '91px',
                          fontFamily: 'sans-serif', fontWeight: "600"
                        }}>TY</span>ANTRA</span>
                      </div> : null}

                      <br />
                      <br />
                    </div>


                    {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1":"footerimg"} >
                        <Footer/>
                      </div> : null}
                  </div>
                </div>


                {/* seventh card */}
                <div className="card" id="AFourPage" style={{ marginTop:value.pdfVal ? '0px':'20px' }}>
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

                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={1}>
                          <li>During Employment and upon exit, Employee should not replicate Business Strategies and process work flow in any other Company, be it {this.props.empData.gender.gender2} own firm or in any company {this.props.empData.gender.gender1.toLowerCase()} joins.</li>
                        </ol>
                        <ol style={{ listStyleType: 'lower-alpha' }} start={2}>
                          <li style={{ textAlign: 'justify' }}>At any given point of time Employee quits the Organization {this.props.empData.gender.gender1.toLowerCase()} cannot establish contacts with Employees &amp; Customers of Company for benefit of {this.props.empData.gender.gender2} own, be it {this.props.empData.gender.gender1.toLowerCase()} joins a new company or to {this.props.empData.gender.gender2} own firm.</li>
                        </ol>
                        <ol style={{ listStyleType: 'lower-alpha' }} start={3}>
                          <li style={{ textAlign: 'justify' }}>As per Exit Policy of the Company, while Employee decides to Exit from the Company {this.props.empData.gender.gender1.toLowerCase()} has to hand over the complete information & database maintained by {this.props.empData.gender.gender3} throughout the tenure of {this.props.empData.gender.gender2} employment. {this.props.empData.gender.gender1} should not carry any data to {this.props.empData.gender.gender2} personal account, as well ensure {this.props.empData.gender.gender1.toLowerCase()} shall not erase or wipe out any official data. Any at given point of time if {this.props.empData.gender.gender1.toLowerCase()} exhibits unprofessionalism the Company shall take strict action against the Employee and shall file legal action against Employee.</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha' }} start={4}>
                          <li style={{ textAlign: 'justify' }}>Upon Exit from the Company, Employee must not demotivate or utilize Company resources (Material / Employee / Customer/ Database) for {this.props.empData.gender.gender2} Commercial benefit. {this.props.empData.gender.gender1} must not form a new Company by pulling the&nbsp;“Company “resources. {this.props.empData.gender.gender1} cannot hire the Employees to {this.props.empData.gender.gender2} new Company / firm {this.props.empData.gender.gender1.toLowerCase()} joins.&nbsp;</li>
                        </ol>
                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={5}>
                          <li>During Employment and upon Exit, Employee must not share Database and Company Confidential Information such as Business Process, Trade Secrets, Financial Information to our Competitors or Ex-Employees, or any other Company. Database should not be sold to any Marketing agencies or Competitors for commercial benefit.</li>
                        </ol>
                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={6}>
                          <li>Upon Exit from the Company, Employee must not carry the Customers of our Company to {this.props.empData.gender.gender2} new Company or wherever {this.props.empData.gender.gender1.toLowerCase()} joins. {this.props.empData.gender.gender1} must not establish contacts with old or existing customers of our Company</li>
                        </ol>
                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={7}>
                          <li>After Separation from the Company, you cannot join our Competitors at least for a minimum period of 2 years from the date of exit of your employment.</li>
                        </ol>
                        <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                        <ol style={{ textAlign: 'justify' }} start={4}>
                          <li>Notwithstanding anything contained herein, the obligation of confidentiality of the Employee under this Agreement shall not apply to the Confidential Information or any part thereof which:</li>
                        </ol>

                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={1}>
                          <li>at the time of its disclosure, is in public domain or which after disclosure becomes part of public domain through no fault of the Employee (such as by appearance in issued patents or publications); or</li>
                        </ol>
                        <ol style={{ listStyleType: 'lower-alpha', textAlign: 'justify' }} start={2}>
                          <li>was disclosed to the Employee by a third person having the right to disclose the same who did not receive it directly or indirectly from the Company with restriction on its use; or</li>
                        </ol>
                        <ol style={{ listStyleType: 'lower-alpha' }} start={3}>
                          <li style={{ textAlign: 'justify' }}>is approved for release by written authorization of the Company.</li>
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
                      </div> : null}

                      <br />
                      <br />
                    </div>


                    {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1":"footerimg"} >
                        <Footer/>
                     </div> : null}
                  </div>
                </div>





                {/* nineth card */}
                <div className="card" id="AFourPage" style={{ marginTop:value.pdfVal ? '0px':'20px' }}>
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

                        <ol style={{ textAlign: 'justify' }} start={5}>
                          <li>The Employee shall not be prevented to make any disclosure required by (i) order of a court of competent jurisdiction or (ii) any competent regulatory authority or agency where such disclosure is required by law, provided that where the Employee intends to make such disclosure, {this.props.empData.gender.gender1.toLowerCase()} shall notify the Company in writing, so that the Company may seek a protective order or other appropriate remedy and provided further that the Employee discloses no more Confidential Information than is reasonably necessary in order to respond to the required&nbsp;disclosure, takes all reasonable steps requested by the Company to protect the Confidential Information, minimize the extent of the Confidential Information disclosed and to make such disclosure in confidence.</li>
                        </ol>
                        <ol style={{ textAlign: 'justify' }} start={6}>
                          <li>The Employee shall be responsible for any breach of any of the terms of this Agreement. The Employee understands that if {this.props.empData.gender.gender1.toLowerCase()} threatens to or actually commits a breach of or fails to observe any of the obligations set forth in this Agreement, the Company shall have the right to seek an injunction against such breach. Further, if a court of competent jurisdiction has made a final determination that the Employee has breached an obligation contained in this Agreement, the Employee shall indemnify the Company from and against all costs, expenses, losses or damages (including but not limited to legal expenses) which arose directly from the unauthorized disclosure or use of Confidential Information by the Employee or from any other breach of the terms of this Agreement.&nbsp;</li>
                        </ol>
                        <ol style={{ textAlign: 'justify' }} start={7}>
                          <li>Notwithstanding anything contained in sub-clause (6) above, breach by the Employee of this Agreement shall be construed as misconduct, entitling the Company to terminate or suspend the Employee or impose pay-cuts or make other appropriate deductions in the payments due from the Company to the Employee.</li>
                        </ol>
                        <ol start={8}>
                          <li style={{ textAlign: 'justify' }}>If any provision of this Agreement as applied to either party or to any circumstance shall be adjudged by a court of competent jurisdiction to be void or unenforceable for any reason, the same shall in no way affect the validity or enforceability of any other provision of this Agreement to the maximum extent permissible by law.</li>
                        </ol>
                        <ol start={9}>
                          <li style={{ textAlign: 'justify' }}>No delay in exercising or omission to exercise any right, power or remedy accruing to a party hereto upon any default under this Agreement shall impair any such right, power or remedy or shall be construed to be a waiver thereof or any acquiescence in such default, nor shall the action or inaction of such party in respect of any default or any acquiescence by it in any default, affect or impair any right, power or remedy of such party in respect of any other default. </li>
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
                      </div> : null}

                      <br />
                      <br />
                    </div>


                    {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1":"footerimg"} >
                        <Footer/>
                     </div> : null}
                  </div>
                </div>



                {/* tenth card */}
                <div className="card" id="AFourPage" style={{ marginTop:value.pdfVal ? '0px':'20px' }}>
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
                        <ol start={10}>
                          <li style={{ textAlign: 'justify' }}>This Agreement shall be governed by and construed in accordance with the laws of India. In the event of any dispute between the parties, such dispute shall be referred to the sole arbitrator appointed by the Company. The place of arbitration shall be in Bengaluru. The award passed by the Arbitrator shall be final and binding on the parties. Subject to adjudication of disputes by arbitration, the Courts in Bengaluru shall have the exclusive jurisdiction to deal with the disputes arising out of this Agreement.</li>
                        </ol>
                        <ol style={{ textAlign: 'justify' }} start={11}>
                          <li>This Agreement constitutes the entire agreement between the parties with respect to its subject matter and supersedes any and all prior representations or agreements, written or oral.</li>
                        </ol>
                        <ol start={12}>
                          <li style={{ textAlign: 'justify' }}>Any modification, amendment or termination of this Agreement shall be effective only if the same in writing and has been signed by each of the parties hereto.</li>
                        </ol>
                        <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>PENALTY CLAUSE</strong>&nbsp;</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 30 }}>If Employee violates the terms of this Agreement, the Company shall be entitled to take disciplinary action against the Employee including dismissal of the Employee. The Company may take legal proceedings and file suit for damages, based on the losses incurred to the Organization.</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>IN WITNESS THEREOF the parties hereto have set and subscribed their respective signatures and seal on the day, month and year first written herein above: </strong></p>
                        <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>&nbsp;</strong></p>
                        <div>
                          <table style={{ paddingLeft: 30, width: 836 }}>
                            <tbody style={{ paddingLeft: 30 }}>
                              <tr style={{ paddingLeft: 30 }}>
                                <td style={{ paddingLeft: 30, width: 416 }}>
                                  <p><strong>Test Yantra Software Solutions (I) Pvt. Ltd.<br /> represented by its authorized signatory</strong></p>
                                  {/* <p><strong>represented by its authorized signatory</strong></p> */}
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
            <img style={{position:"absolute",marginLeft: '30px',marginTop: '-84px',width:'300px',height:'100px'}}  src={this.state.image} />
       
  } 
  </div>












                          <div><strong className="western" style={{ float: 'left', width: 400, fontSize: 'medium', textAlign: 'left', paddingLeft: 33 }}>___________________________________________</strong><strong style={{ float: 'right', width: 372, fontSize: 'medium' }}>________________________________________</strong></div>
                          <br />
                          <br />
                          <p style={{ textAlign: 'justify', paddingLeft: 30, marginBottom: 0 }}><strong>Authorized Signatory&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature:</strong></p>
                          <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong >Human Resource</strong><strong ><span style={{ position: 'absolute', left: '681px' }}> Employee Name:</span></strong><span style={{ position: 'absolute', left: '843px', wordBreak: 'break-word', right: '105px' }}>{this.state.employee.employeeName}</span> </p>
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
                      </div> : null}

                      <br />
                      <br />
                    </div>


                    {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1":"footerimg"} >
                        <Footer/>
                      </div> : null}
                  </div>
                </div>


                {/* ELEVENTH card */}
                <div className="card" id="AFourPage" style={{ marginTop:value.pdfVal ? '0px':'20px' }}>
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
                        <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                        <p style={{ textAlign: 'justify', paddingLeft: 30 }}>I, <strong>{this.state.employee.name}</strong> do hereby solemnly affirm that I shall abide by the Confidentiality Policies of Test Yantra Software Solution, at all times.</p>
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
                        <p style={{ textAlign: 'justify', paddingLeft: 30 }}>Employee Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.employee.name}</p>
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
                      </div> : null}

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

export default withRouter(DeliveryPolicy)