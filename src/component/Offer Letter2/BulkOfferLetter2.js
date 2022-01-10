//This is bulk uploading Offer etter file. 
//In this file by uploading bulk details with excel format, 
//The user will get all Offer letter in the document format with letter header and footer.
// when the user clicks create pdf button the user gets all the documents in the pdf format.
import React, { Component } from 'react'
import moment from 'moment'
import '../CommonStyle.css'
import './offer.css'
import Header from '../LetterHeader/HeaderPart';
import Footer from '../LetterFooter/FooterPart'; 
import Home from '../home';
import { withRouter } from 'react-router-dom';
import PdfContainer from '../PdfComponent/PdfContainer';
import Doc from '../PdfComponent/DocService'
import { UserConsumer } from '../Context/CustomContext';


export class BulkOfferLetter2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            employee: '',
            waterMark: false,
        }
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
        this.props.history.push('/InputOfferLetter2');

    }

    createPdf = async(html, name, id) => {
        window.scrollTo(0, 0);
        
        const ex=[document.getElementsByClassName('pdf-body')[id]];
    await Doc.createPdf(ex, name)

    }


    render() {


        let value = this.context;
        let toOfferValidity = "";
        if (this.props.empData == 0) {
         window.history.back();
        }

        let SysDate = new Date()
        if (this.state.employee.length > 0) {
            return (
                this.state.employee.map((item,index) => {

                    toOfferValidity = new Date((item.offerValidity - (25567 + 2)) * 86400 * 1000)

                    return (
                        <div className="qwerty">
                            <Home buttonShow={true} showWatermark={(data) => this.setState({ waterMark: data })} sendData={() => this.sendData()} />
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
                                                </div>
                                                    : null}
                                                <div>

                                                    <br />
                                                    <br />
                                                    <p style={{ paddingLeft: 10, paddingRight: 10, textAlign: 'left' }}>Date: {SysDate.getDate()}<sup>{this.nth(SysDate.getDate())}</sup>&nbsp;{moment(SysDate).format('MMMM YYYY')} </p>
                                                    <br />
                                                    <br />
                                                    <p style={{ paddingLeft: 10, paddingRight: 10, textAlign: 'left' }}>To,</p>


                                                    <p style={{ paddingLeft: 10, paddingRight: 10, textAlign: 'left' }}><strong>{item.employeeName}</strong><strong>,</strong><div style={{ wordBreak: 'break-word', width: '400px' }}>{item.address}</div></p>

                                                    <br />
                                                    <p style={{ paddingLeft: 10, paddingRight: 10, textAlign: 'left' }}>Dear &nbsp;<strong>&nbsp;</strong><strong>{item.employeeName}</strong><strong>,</strong></p>
                                                    <br />
                                                    <p style={{ paddingLeft: 10, paddingRight: 10, textAlign: 'left' }}><u>Subject: Offer of employment – <strong>‘{item.designation}’ </strong></u></p>

                                                    <ol>
                                                        <li style={{ paddingLeft: 10, paddingRight: 10, textAlign: 'justify' }}>In response to your interview with us, we are pleased to offer you the position of <strong><u>‘{item.designation}’ </u></strong>in M/s Test Yantra Software Solutions (India) Pvt. Ltd. (“Company”). This offer is subject to the satisfactory background verification check that will be completed by the Company prior to your joining date.</li>
                                                        <li style={{ paddingLeft: 10, paddingRight: 10, textAlign: 'justify' }}>Your cost to company (CTC) shall be as per the below Schedule.</li>
                                                        <li style={{ paddingLeft: 10, paddingRight: 10, textAlign: 'justify' }}>The terms and conditions of your employment will be governed as per the employment agreement (Agreement) annexed as Annexure 1.</li>
                                                        <li style={{ paddingLeft: 10, paddingRight: 10, textAlign: 'justify' }}>You are required to carefully go through the terms and conditions of this offer letter and Annexure 1 as your employment in the Company shall be strictly governed by these documents.</li>
                                                        <li style={{ paddingLeft: 10, paddingRight: 10, textAlign: 'justify' }}>If you agree to the terms and conditions of employment, please sign a copy of this letter as a token of your acceptance and return the signed copy to the Company on&nbsp;or before <strong> {toOfferValidity.getDate()}<sup>{this.nth(toOfferValidity.getDate())}</sup>&nbsp;{moment(toOfferValidity).format('MMMM YYYY')}</strong>. Please sign on all pages. Upon signing, the terms and conditions of the employment agreement shall become binding on you.</li>
                                                        <li style={{ paddingLeft: 10, paddingRight: 10, textAlign: 'justify' }}>The Company’s obligations shall commence on the date of your joining which shall be on or before <strong> {toOfferValidity.getDate()}<sup>{this.nth(toOfferValidity.getDate())}</sup>&nbsp;{moment(toOfferValidity).format('MMMM YYYY')}</strong>.</li>
                                                        <li style={{ paddingLeft: 10, paddingRight: 10, textAlign: 'justify' }}>This offer is valid till <strong>{toOfferValidity.getDate()}<sup>{this.nth(toOfferValidity.getDate())}</sup>&nbsp;{moment(toOfferValidity).format('MMMM YYYY')} </strong>and if you fail to accept the terms of the offer, the Company shall have the right to withdraw the offer without giving you any further notice.</li>
                                                        <li style={{ paddingLeft: 10, paddingRight: 10, textAlign: 'justify' }}>We are confident that you will enjoy being a part of the Company as much as we shall cherish our association with you.</li>
                                                        <li style={{ paddingLeft: 10, paddingRight: 10, textAlign: 'justify' }}>You are also requested to submit the following documents to us on the date of submitting the duly signed Agreement, which shall not be later than <strong>{toOfferValidity.getDate()}<sup>{this.nth(toOfferValidity.getDate())}</sup>&nbsp;{moment(toOfferValidity).format('MMMM YYYY')}</strong>.</li>
                                                    </ol>
                                                    <table style={{ width: 800, marginLeft: 'auto', marginRight: 'auto', heigth: 160, /* fontFamily: 'sans-serif' */ fontWeight: '400' }} border="1px">
                                                        <tbody>
                                                            <tr>
                                                                <td style={{ textAlign: 'left', padding: 0, fontWeight: '400' }} width={302}>
                                                                    <p style={{ paddingLeft: 10, margin: 0 }}>a)&nbsp; Photocopies of your educational qualifications</p>
                                                                    <p style={{ paddingLeft: 10, margin: 0 }}>b)&nbsp; 2 passport size photographs of yourself</p>
                                                                    <p style={{ paddingLeft: 10, margin: 0 }}>c)&nbsp; Offer Letter, Relieving letter from previous employer/s, if applicable</p>
                                                                    <p style={{ paddingLeft: 10, margin: 0 }}>d)&nbsp; 3 month's Payslips of previous employer, if applicable</p>

                                                                </td>
                                                                <td style={{ textAlign: 'left', fontWeight: '400' }} width={300}>
                                                                    <p style={{ paddingLeft: 10, margin: 0 }}>e) PF account details</p>
                                                                    <p style={{ paddingLeft: 10, margin: 0 }}>f) Income Tax deduction certificate of previous employer</p>
                                                                    <p style={{ paddingLeft: 10, margin: 0 }}>g) Pan Copy</p>
                                                                    <p style={{ paddingLeft: 10, margin: 0 }}>h) Passport Copy</p>
                                                                    <p style={{ paddingLeft: 10, margin: 0 }}>i) Aadhar Card Copy</p>
                                                                    <p style={{ paddingLeft: 10, margin: 0 }}>j) ID Proof &amp; Address Proof</p>

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <br />

                                                </div>
                                                {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1" : "footerimg"} >
                                                    <Footer/>
                                                    </div> : null}

                                            </div>

                                        </div>

                                        <div className="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px' : '20px' }}>
                                            <div class="card-body">
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
                                                </div>
                                                    : null}
                                                    <div><p />
                                                       
                                                    </div>


                                                    <div>
                                                        <p style={{ textAlign: 'center' }}><strong>SALARY COMPENSATION AND BENEFITS</strong></p>
                                                        {/* <p style={{ textAlign: 'justify' }}><strong>&nbsp;</strong></p> */}
                                                        <p style={{ textAlign: 'justify' }}>An employee of Test Yantra is eligible for all statutory compensation and benefits. This is as per the <strong>COMPENSATION AND BENEFIT</strong> Policy of Test Yantra Software Solutions. Employee is requested to follow the guidelines and process as per the Policy, which will be shared at the time of Joining.</p>
                                                        <p style={{ textAlign: 'justify' }}>At the discretion of the management, the non-statutory benefits may be extended to an employee based on the market situations.</p>
                                                        <br />
                                                        <p style={{ textAlign: 'justify' }}><strong>STATUTORY BENEFITS</strong></p>
                                                        <p style={{ textAlign: 'justify' }}>The following Compensation and Benefits are statutory in nature and are available to all eligible employees</p>
                                                        <ol>
                                                            <li style={{ textAlign: 'justify' }}>Salary</li>
                                                            <li style={{ textAlign: 'justify' }}>Provident Fund</li>
                                                            <li style={{ textAlign: 'justify' }}>Gratuity</li>
                                                            <li style={{ textAlign: 'justify' }}>ESI Medical benefit</li>
                                                            <li style={{ textAlign: 'justify' }}>Maternity benefit &amp; Paternity benefit</li>
                                                        </ol>
                                                        <br />
                                                        <p style={{ textAlign: 'justify' }}><strong>NON - STATUTORY BENEFITS</strong></p>
                                                        <p style={{ textAlign: 'justify' }}>The company provides the following benefits to all or sections of employees based on certain employment, performance criteria and career bands. They are meant to provide additional benefits to employees, act as a motivator in their career and to take care of their life style requirements. The award of these benefits are solely under the discretion of the management.</p>
                                                        <br />
                                                        <p style={{ textAlign: 'justify' }}>The following is the list of Non Statutory Benefits:</p>
                                                        <ol>
                                                            <li style={{ textAlign: 'justify' }}>Group Insurance Scheme (Accident and Death)</li>
                                                            <li style={{ textAlign: 'justify' }}>Group Health Insurance Scheme (Hospitalization)</li>
                                                            <li style={{ textAlign: 'justify' }}>Sabbatical Leave</li>
                                                            <li style={{ textAlign: 'justify' }}>Extended Maternity Leave</li>
                                                            <li style={{ textAlign: 'justify' }}>Food Allowance</li>
                                                            <li style={{ textAlign: 'justify' }}>Leave Travel Concession</li>
                                                        </ol>

                                                    </div>
                                                </div>
                                                {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1" : "footerimg"} >
                                                    <Footer/>
                                                    </div> : null}

                                            </div>
                                        </div>



                                        <div className="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px' : '20px' }}>
                                            <div class="card-body">

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

                                                    <br />
                                                    <br />
                                                    <p style={{ textAlign: 'center' }}><u>Annexure 1</u></p>
                                                    <p style={{ textAlign: 'center' }}><u>EMPLOYMENT Agreement</u></p>
                                                    <br />
                                                    <p style={{ textAlign: 'justify' }}>This Employment Agreement (the “Agreement”) is made and executed on this <strong>{SysDate.getDate()}<sup>{this.nth(SysDate.getDate())}</sup>&nbsp;{moment(SysDate).format('MMMM YYYY')}</strong>&nbsp;at Bengaluru.</p>
                                                    <p style={{ textAlign: 'justify' }}><u>BY:</u></p>
                                                    <br />
                                                    <p style={{ textAlign: 'justify' }}><strong>M/S TEST YANTRA SOFTWARE SOLUTIONS (INDIA) PVT. LTD</strong>., a company incorporated under the Companies Act, 1956, having its registered office at #88, Brigade Chambers, 3<sup>rd</sup>floor, Gandhi Bazaar Main Road, Basavanagudi, Bengaluru, Karnataka - 560004 represented by its Human Resource (hereinafter may be referred to as the “Company”, which expression shall, unless repugnant to the context or meaning thereof, be deemed to include its successors and permitted assigns) of the ONE PART;</p>
                                                    <br />
                                                    <p style={{ textAlign: 'justify' }}>AND:</p>
                                                    <br />
                                                    <p style={{ textAlign: 'justify' }}><strong><span style={{ textTransform: 'capitalize' }}>{item.employeeName}</span> ,</strong> aged about {item.age}&nbsp;years, {item.salute}&nbsp;{item.fatherName},<strong> Residing at &nbsp;{item.address}</strong>. Here in after referred to as the “Employee” or the “Second Party”, of the OTHER PART.</p>
                                                    <br />
                                                    <p style={{ textAlign: 'justify' }}>The Company and the Employee shall hereinafter, wherever the context may so require, be individually referred to as ‘Party’ or collectively as ‘Parties’, as the case may be.</p>
                                                    <br />
                                                    <p style={{ textAlign: 'justify' }}><u>WHEREAS;</u></p>
                                                    <br />
                                                    <ol style={{ textAlign: 'justify' }}>
                                                        <li>The Company is engaged in the business of providing software services (the “Business”);</li>
                                                        <br />
                                                        <li style={{ textAlign: 'justify' }}>The Company was looking to hire an employee for the post of <strong><u>‘{item.designation}’.</u></strong> The Employee had applied to the Company for the said post and made several representations regarding his/her qualification and abilities and produced certificates thereof. Based on an interview conducted by the Company and based on the representations made by the Employee, the Company has agreed to appoint the Employee for the said post, on the terms and conditions set forth herein below.</li>
                                                    </ol>
                                                    <br />



                                                </div>
                                                {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1" : "footerimg"} >
                                                    <Footer/>
                                                    </div> : null}


                                            </div>
                                        </div>

                                        <div className="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px' : '20px' }}>
                                            <div class="card-body">

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

                                                    <p style={{ textAlign: 'justify' }}>NOW THIS EMPLOYMENT AGREEMENT SHALL WITNESSETH AS FOLLOWS;</p>


                                                    <ol start={1}><li style={{ textAlign: 'justify' }}><u> APPOINTMENT:</u></li></ol>
                                                   
                                                    <ol start={1.1} className="foo">
                                                        <li style={{ textAlign: 'justify' }}>The Company hereby appoints the Employee <strong><u>‘{item.designation}’.</u></strong> The Employee hereby accepts the said appointment and agrees to work diligently and serve the Company in the said capacity or in such other posts/ designations as the Company may prescribe and/or promote from time to time. The Employee shall be responsible to perform duties more fully described in Schedule A hereto.</li>
                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}>The Employee shall report on <strong>{toOfferValidity.getDate()}<sup>{this.nth(toOfferValidity.getDate())}</sup>&nbsp;{moment(toOfferValidity).format('MMMM YYYY')}</strong>. The obligations of the Company towards the Employee shall commence only on and after the date of joining. However, the Employee’s obligations under the Agreement shall commence on the date of execution of the Agreement.</li>

                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}>The Employee shall report to Test Yantra and/or to such other person or persons as the Company deems fit to be his/her supervisor from time to time. In addition, the Employee shall carry out such other duties and functions as may be assigned to {this.props.empData.salute === 'S/o' ? "him" : "her"} by the Company from time to time.</li>

                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}>The Employee’s place of work, for the time being, shall be at Bengaluru. However, the Company may relocate/ transfer/ depute the Employee to any of its branches or client’s place as part of their work, within or outside India where business of the Company or any subsidiary/ branch/ outlet/ unit of the Company is in or may come into existence if the Company so directs based on the exigencies of work. Upon such relocation/ transfer, the Employee agrees to be bound by the rules and regulations of the respective working place, or otherwise as specified by Company.</li>

                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}>The Employee shall be on probation for the first six months and only after his/her successful completion of probationary period, the Company will issue a letter of confirmation of employment. In the event, the Company is not satisfied with the performance of the Employee during the probationary period, the Company is entitled to terminate this agreement with immediate effect and the Employee agrees and undertakes to not make any claim on the Company whatsoever.</li>

                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}>The terms of this Agreement shall continue to bind Employee until it is terminated in accordance with this Agreement, irrespective of the fact that Employee may be promoted, transferred or seconded to any other place.</li>

                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}>The working hours of the Employee shall follow the operating hours of the Company. When working on relocation/ transfer/ deputation, the working hours shall follow the operating hours of such place of work. But the Employee understands that from time to time he/she is required to work additional unpaid hours in order to carry out the duties promptly and efficiently.</li>

                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}>The Company shall provide training to the Employee for the first month for better discharge of the roles and responsibility by the Employee. However, the Employee may choose to seek special training on any specific area from the Company and in such an event, the Company will at its cost provide the special training to the Employee. However, post completion of the training the Employee shall compulsorily work in the Company and provide his/her services for a minimum period of one year and on the terms and conditions as may be agreed between the Parties under a separate agreement to be executed by the Parties prior to commencement of the special training.</li>
                                                    </ol>
                                                </div>

                                                {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1" : "footerimg"} >
                                                    <Footer/>
                                                   </div> : null}
                                            </div>
                                        </div>

                                        <div className="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px' : '20px' }}>
                                            <div class="card-body">

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
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <ol start={2}>
                                                        <li style={{ textAlign: 'justify' }}><u>EMOLUMENTS:</u></li></ol>

                                                    <br />
                                                    <ol className="order">
                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">2.1</span> The Employee’s total compensation (Cost to the Company) shall be as per the above-mentioned schedule, payable in periodic installments according to the Company’s normal payroll practices, subject to standard deductions towards tax and other deductions as per Company policy.</li>

                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">2.2</span> Performance reviews shall be done on a yearly basis with the first performance review at the end of twelve months. Salary increments shall be done on a yearly basis based on the performance of the Employee in that year which shall include professional efficiency, integrity, discipline, punctuality, professional grooming, Employee’s contribution towards profitability of the Company’s income, etc. The Employee’s increments are completely discretionary and will be subject to and on the basis of his effective performance and results during the period as also the performance and results of the Company. All or any such increment or bonus may be paid by the Company at the end of completion of every twelve months of employment.</li>

                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">2.3</span> All statutory requirements of tax, including tax deductible at source, professional tax, etc, will be paid and complied by the Company and all/ any funds/ salary/ remuneration paid to the Employee will be after such appropriate deductions.</li>

                                                        <br />
                                                    </ol>
                                                    <ol style={{ textAlign: 'justify' }} start={3}>
                                                        <li style={{ textAlign: 'justify' }}><u>TERM AND TERMINATION:</u></li></ol>

                                                    <br />
                                                    <ol className="order">
                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">3.1</span> The parties agree that the Employee’s employment with the Company shall commence on the date of joining and subject to clause 1.5 above, shall continue till such time that either party terminates the employment in accordance with the clauses below.</li>

                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">3.2</span> Either party may terminate this agreement by giving <strong>Three (3) months</strong> prior notice to the other party. The said notice period for termination of this Agreement by the Employee shall neither be adjustable against privileged leave nor forfeiture of salary of such Employee and the same shall be subject to the discretion of the Company. However, nothing in this Agreement shall prevent the Company from terminating the Employee’s employment forthwith for proved breach of any duties and responsibilities/ gross default/ misconduct contravening the express or implied terms and conditions of this Agreement. Where this Agreement is terminated by the Company on account of the Employee’s proved breach of any duties and responsibilities/ gross default/ misconduct, no prior notice and thereby no salary in lieu of such notice shall be necessary.</li>
                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">3.3</span> Further, it shall be at the sole discretion of the Company to suspend the requirement of the notice period as stipulated in clause 3.2 above. However, in such cases, the Company may direct the Employee to buy out the notice period by paying amount equivalent to the Salary+ GST(18%) payable during the notice period plus such other amounts as may be sought by the Company.</li>

                                                    </ol>
                                                    <br />
                                                    <p style={{ textAlign: 'justify', paddingLeft: 30 }}></p>
                                                </div>
                                                {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1" : "footerimg"} >
                                                    <Footer/>
                                                    </div> : null}
                                            </div>
                                        </div>


                                        <div className="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px' : '20px' }}>
                                            <div class="card-body">

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
                                                    <br />

                                                    <ol className="order">

                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">3.4</span> In the event of the Employee terminating the Agreement or otherwise leaving the services of the Company in any manner, the Company shall not be liable to pay any amounts towards bonus, increment, etc. and the Company may recover any losses the Company has suffered on account termination by the Employee except in accordance with clause 3.2 above.</li>

                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">3.5</span> In the event of the Employee being liable to pay any amounts as mentioned hereinabove, the Company shall have the first charge over the salary, bonus and other dues to be paid to the Employee from the Company and the Employee hereby agrees and authorizes the Company to deduct from them, all such amounts payable by him.</li>

                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}><u>Summary</u><u> dismissal</u>:- The Company may dismiss the Employee immediately and without notice if, the employee:</li>
                                                        <ol type={"a"} style={{ textAlign: 'justify' }}>
                                                            <li style={{ textAlign: 'justify' }}>Does not perform the duties assigned to him/her under this Agreement satisfactorily;</li>
                                                            <li style={{ textAlign: 'justify' }}>Is guilty of dishonesty, serious neglect or gross misconduct in the course of employment;</li>
                                                            <li style={{ textAlign: 'justify' }}>Becomes unable, due to illness (whether physical or mental), to properly and effectively perform duties as provided hereunder for a period or periods totalling 20 working days in any consecutive period of 3 months;</li>
                                                            <li style={{ textAlign: 'justify' }}>Expressly or by implication repudiates this Agreement;</li>
                                                            <li style={{ textAlign: 'justify' }}>Acts in such a way (whether or not in the course of employment) as to bring the Company or its subsidiaries into disrepute;</li>
                                                            <li style={{ textAlign: 'justify' }}>Is convicted of any criminal offence, or under any law;</li>
                                                            <li style={{ textAlign: 'justify' }}>Is accused of any offence involving moral turpitude;</li>
                                                        </ol>
                                                        <br />
                                                    </ol>
                                                    <ol start={4} style={{ textAlign: 'justify' }}>
                                                        <li><u>LEAVES:</u></li>
                                                    </ol>
                                                    <ol className="order">
                                                        <li style={{ textAlign: 'justify' }}>The Employee will be entitled to avail holidays/ leaves as per the Company policies in force from time to time.</li>
                                                    </ol>

                                                    <ol style={{ textAlign: 'justify' }} start={5}>
                                                        <li><u>NON – DISCLOSURE OF CONFIDENTIAL INFORMATION &amp; NON-COMPETE:</u></li>
                                                    </ol>


                                                    <ol className="order">
                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">5.1</span> The Employee agrees that information concerning the working of the Company, including all the information concerning the Company’s business transactions, financial arrangements, business partners, clientele, trade secrets, marketing strategies and any other information concerning the Company which is not in the public domain constitutes ‘Confidential Information’ belonging to the Company under this Agreement and he shall not, during the continuance of this Agreement or for a period of two (2) years after the termination of this Agreement, reveal Confidential Information to any person, firm, corporation, or entity. Should the Employee reveal or threaten to reveal such Confidential Information to any person, firm, corporation, or entity contrary to the provisions of this Agreement during the subsistence of this Agreement, the Company shall be entitled to take disciplinary action against the Employee including dismissal of the Employee and the Company may file suit for damages. Should the Employee reveal or threaten to reveal such Confidential Information to any person, firm, corporation, or entity contrary to the provisions of this Agreement after termination of this Agreement but within 2 year from the date termination of this Agreement, the Company shall be entitled to claim damages from the Employee.</li>

                                                    </ol>
                                                </div>
                                                {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1" : "footerimg"} >
                                                    <Footer/>
                                                    </div> : null}
                                            </div>
                                        </div>


                                        <div className="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px' : '20px' }}>
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
                                                </div>
                                                    : null}
                                                <div>
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <ol className="order">
                                                        <p style={{ textAlign: 'justify' }}><strong>Non-Compete:</strong> For a period of Two (2) Years flowing the termination of this Agreement in any manner whatsoever, the employee is prohibited from   establishing of conducting alone or with other persons whether gratuitously or for remuneration, any business in India which competes with same clients for the same business with the Company.</p>
                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">5.2</span> Nothing contained in the previous/ above clause shall apply to:</li>

                                                        <br />
                                                        <ol type={"a"}>
                                                            <li style={{ textAlign: 'justify' }}>information that is in the public domain; and</li>
                                                            <li style={{ textAlign: 'justify' }}>information which the Parties are under a legal obligation to disclose to a court of law or other statutory/regulatory authority;</li>
                                                        </ol>
                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">5.3</span> The Employee also agrees to promptly and without necessity of any demand, return to the Company, any and all documents, records, or writings made or obtained by the Employee in the course of his/her employment with the Company, on expiry or termination of this Agreement for any reason whatsoever.</li>

                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">5.4</span> The Employee also agrees to sign on similar non- disclosure/ confidential agreement of any of the clients of the Company as and when required/ requested by the Company.</li>

                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">5.5</span> The Employee agrees and undertakes not to take up employment with the existing clients of the Company during the subsistence of the Agreement without prior written consent of the Company.</li>

                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">5.6</span> The Employee agrees and confirms that he/she will not accept any offer of employment from any customer, where he/she had worked during the course of employment with the Company for a continuous period of 6 months immediately preceding the termination of his/her employment in the Company.</li>

                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">5.7</span> The Employee agrees and undertakes not to either directly or indirectly solicit the employees, customers, clients of the Company post termination of the his/her employment in the Company.</li>
                                                    </ol>
                                                    <br />
                                                    <ol style={{ textAlign: 'justify' }} start={6}>
                                                        <li><u>SIMULTANEOUS EMPLOYMENT/ EDUCATION: </u></li>
                                                    </ol>
                                                    <br />
                                                    <ol className="order">
                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">6.1</span> The Parties agree that during the term of this Agreement, the Employee shall not, under any circumstances, be permitted to work for any other company or firm or person, either whole time or part time, to own, or in any way be associated with any company or firm or proprietorship concern as advisor, director or partner, whether paid or not, for his services, without prior written permission from the Company.</li>

                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">6.2</span> The Employee may pursue further education with the prior written consent of the Company. However, any such further education shall not in any way affect the work/ business of the Company.</li>
                                                    </ol>
                                                </div>
                                                {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1" : "footerimg"} >
                                                    <Footer/>
                                                   </div> : null}
                                            </div>
                                        </div>

                                        <div className="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px' : '20px' }}>
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
                                                </div>
                                                    : null}
                                                <div>
                                                    <br />
                                                    <br />

                                                    <ol style={{ textAlign: 'justify' }} start={7}>
                                                        <li><u>EMPLOYEE’S OBLIGATIONS:</u></li>
                                                    </ol>
                                                    <br />
                                                    <ol className="order">
                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">7.1</span> The Employee agrees to carry out all the duties assigned by the Company with all due diligence and loyalty and keeping the Company’s interest paramount.</li>

                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">7.2</span> The Employee agrees to not directly/ indirectly receive or accept for Employee’s own benefit any commission, rebate, discount or profit from any person/ firm/ company having business transactions with the Company.</li>

                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">7.3</span> Employee agrees to supervise the work of Employee’s subordinates and shall always ensure proper and effective implementation and compliance of all the rules and regulations of the Company.</li>

                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">7.4</span> The Employee shall not commit any illegal act/ breach of trust or bring any civil/ criminal or any such other liability on the Company. In any such event, the Employee alone will be liable for all such liabilities/ wrongs done.</li>

                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">7.5</span> During the term of this Agreement, the Employee agrees to be bound by the policies framed and enforced by the Company from time to time.</li>
                                                    </ol>

                                                    <ol style={{ textAlign: 'justify' }} start={8}>
                                                        <li ><u>DOCUMENTS PROVIDED TO THE COMPANY:</u></li>
                                                    </ol>
                                                    <br />
                                                    <ol className="order">
                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">8.1</span>The Employee for the purpose of the employment has provided the Company with the following documents and upload the Documents on the HR portal. This Is mandatory, contact HR team for further information</li>

                                                        <br />
                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">8.2</span> The Parties agree that the Company has offered employment to the Employee on the basis of the above mentioned documents and information provided by the Employee and on the understanding that there is nothing in the Employee’s past record which should have prevented in the Company from offering employment to the Employee under this Agreement. If any of the above documents/ information is found to be incorrect or false or in the opinion of the Company  is incorrect/ false, or if the Employee has suppressed any material information, the Company shall have the option of terminating this Agreement forthwith without any prior notice or salary in lieu of such notice to the Employee.</li>
                                                        <br />

                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">8.3</span> This Agreement shall supersede any prior agreements/ understandings between the Company and the Employee. Any amendment/ alteration to this Agreement shall be in writing and shall be signed by both the parties.</li>
                                                        <br />
                                                        <li style={{ textAlign: 'justify' }}><span className="orderspan">8.4</span> If, for any reason, any provision of this Agreement is held invalid, all other provisions of this Agreement shall remain in full force and effect.</li>

                                                    </ol>
                                                </div>
                                                {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1" : "footerimg"} >
                                                    <Footer/>
                                                    </div> : null}
                                            </div>
                                        </div>

                                        <div className="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px' : '20px' }}>
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
                                                </div>
                                                    : null}

                                                <div>
                                                    <br />
                                                    <br />

                                                    <br />
                                                    <ol style={{ textAlign: 'justify' }} start={9}>
                                                        <li><u>DISPUTE RESOLUTION AND GOVERNING LAW:</u></li>
                                                    </ol>
                                                    <br />
                                                    <ol className="order">
                                                        <li><span className="orderspan">9.1</span> In the event of any dispute between the parties, such dispute shall be referred to the sole arbitrator appointed by the Company. The place of arbitration shall be in Bengaluru. The award passed by the Arbitrator shall be final and binding on the parties.</li>

                                                        <br />

                                                        <li><span className="orderspan">9.2</span> Subject to Clause 9.1, this Agreement shall be governed by the laws of India irrespective of conflict of law provisions and the Courts in Bengaluru shall have the exclusive jurisdiction to deal with the disputes arising out of this Agreement.</li>
                                                    </ol>
                                                    <br />
                                                    <ol style={{ textAlign: 'justify' }} start={10}>
                                                        <li>Notice: Any notice and other communications provided for in this Agreement shall be in writing and shall be first transmitted by email and then confirmed by Speed Post, in the manner as elected by the Party giving such notice to the following addresses:</li>
                                                    </ol>
                                                    <div style={{ paddingLeft: 60 }}>

                                                        <p style={{ paddingLeft: 40 }}>In the case of notices to the Company :</p>
                                                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Address&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp; &nbsp;#88, Brigade Chambers, 3rd floor, Gandhi Bazaar Main Road, Basavanagudi, Bengaluru, Karnataka 560004</p>
                                                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Attention&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;HR Department</p>
                                                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E-mail&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;hr@testyantra.com</p>


                                                    </div>
                                                    <p style={{ textAlign: 'justify' }}>All notices shall be deemed to have been validly given on (a) the Business Day immediately after the date of transmission with confirmed answer back, if transmitted by facsimile/electronic transmission, or (b) the Business Day of receipt, if transmitted by courier or registered airmail.</p>
                                                    <br />
                                                    <p style={{ textAlign: 'justify' }}>Any Party may, from time to time, change its address or representative for receipt of notices provided for in this Agreement by giving to the other Party not less than 30 days prior written notice.</p>
                                                    <br />
                                                    <p style={{ textAlign: 'justify' }}>IN WITNESS THEREOF the parties hereto have set and subscribed their respective signatures and seal on the day, month and year first written herein above:</p>


                                                    <div>
                                                        <p className="western" style={{ float: 'left', textAlign: 'left', width: 500 }} >M/s Test Yantra Software Solutions (India) Pvt. Ltd, represented by its authorised signatory</p>
                                                        <p className="western" style={{ float: 'left', textAlign: 'left', width: 300 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Employee</p></div>
                                                    <p className="western">&nbsp;</p>
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <div><strong className="western" style={{ float: 'left', width: 400, fontSize: 'medium', textAlign: 'left' }}>_________________________________</strong><strong style={{ float: 'right', width: 320, fontSize: 'medium' }}>________________________________________</strong></div>
                                                    <br />
                                                    <br />
                                                    <div>
                                                        <p className="western" style={{ float: 'left', width: 300, textAlign: 'left', margin: 0 }}>Authorised Signatory&nbsp;&nbsp;&nbsp;</p > <p style={{ float: 'right', width: 390 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Name: {item.employeeName}</p>
                                                        <br /> <p className="western" style={{ width: 200, textAlign: 'left', margin: 0 }}>&nbsp;&nbsp;&nbsp;</p >
                                                    </div>
                                                </div>
                                                {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1" : "footerimg"} >
                                                    <Footer/>
                                                   </div> : null}
                                            </div>
                                        </div>
                                    </PdfContainer>
                                </div>
                            </div >
                        </div>
                    )
                }))
        } else {
            return (<h1></h1 >)
        }
    }
}

export default withRouter(BulkOfferLetter2)