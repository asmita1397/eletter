//This is bulk uploading Exit letter file. 
//In this file by uploading bulk details with excel format, 
//The user will get all Exit letter in the document format with letter header and footer.
// when the user clicks create pdf button the user gets all the documents in the pdf format.
import React, { Component } from 'react'
import Home from '../home';
import moment from 'moment';
import '../CommonStyle.css'
import Footer from '../LetterFooter/FooterPart';
import Header from '../LetterHeader/HeaderPart';
import { withRouter } from 'react-router-dom';
import PdfContainer from '../PdfComponent/PdfContainer';
import Doc from '../PdfComponent/DocService'
import { UserConsumer } from '../Context/CustomContext';

export class BulkExitLetter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            employee: [],
            waterMark: false,
        }
    }
    static contextType = UserConsumer;
    componentDidMount() {

        let emp = this.props.empData


        if (this.props.empData !== "" && typeof (this.props.empData.salute) === "undefined") {
            emp.salute = "Mr."
            emp.salaryDeduction = "NA"
            emp.deductionTDS = "NA"
            emp.salary = "NA"
            emp.gratuity = "NA"
            emp.fundDue = "NA"

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

    createPdf = async(html, name, id) => {
        window.scrollTo(0, 0);
        const ex=[document.getElementsByClassName('pdf-body')[id]];
        await Doc.createPdf(ex, name)
    }


    render() {

        

        let value = this.context;
        let employeeDetails = this.state.employee.map((item,index) => {
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
        let toJoiningDate = "";
        let toExitDate = "";
        if (this.props.empData == 0) {
             window.history.back();
        }

        let toDate = new Date()
        if (this.state.employee.length > 0) {
            return (
                employeeDetails.map((item,index) => {

                    toJoiningDate = new Date((item.joiningDate - (25567 + 2)) * 86400 * 1000)
                    toExitDate = new Date((item.exitDate - (25567 + 2)) * 86400 * 1000)



                    return (
                        <div id="qwerty">
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
                                                </div>
                                                    : null}
                                                <div>

                                                    <p>&nbsp;</p>
                                                    <p style={{ textAlign: 'justify' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong><u>EXIT AGREEMENT</u></strong></p>
                                                    <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                                                    <p style={{ paddingLeft: 20, paddingRight: 20, textAlign: 'justify' }}>This Exit Agreement (<strong><em>“Agreement”</em></strong>) is made and entered on this day <strong> {toDate.getDate()}<sup>{this.nth(toDate.getDate())}</sup>&nbsp;{moment(toDate).format('MMMM YYYY')}</strong> at <strong> {this.state.employee.location}</strong></p>
                                                    <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                                                    <p style={{ paddingLeft: 20, paddingRight: 20, textAlign: 'justify' }}><strong><u>BY AND BETWEEN</u></strong><strong>:</strong></p>
                                                    <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                                                    <p style={{ paddingLeft: 20, paddingRight: 20, textAlign: 'justify' }}><strong>Test Yantra Software Solutions India Pvt. Ltd.,</strong> a company incorporated under the Companies Act, 1956, having its registered office at No.88, Brigade Chambers, 3rd floor, Gandhi Bazaar Main Road, Basavanagudi, Bengaluru, Karnataka - 560004, represented by its (Human Resource) (hereinafter may be referred to as the “<strong><em>Company</em></strong>”, which expression shall, unless repugnant to the context or meaning thereof, be deemed to include its successors and permitted assigns) of the ONE PART;</p>
                                                    <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                                                    <p style={{ paddingLeft: 20, paddingRight: 20, textAlign: 'justify' }}><strong>AND </strong></p>
                                                    <p style={{ paddingLeft: 20, paddingRight: 20, textAlign: 'justify' }}><strong>{item.salute}</strong> <strong> {item.employeeName}</strong><strong>,</strong> (Hereinafter referred to as the “<strong><em>Exiting Employee</em></strong>”) which expression be deemed to include {item.gender.gender3} heirs, successors, executors and permitted assigns of the OTHER PART.</p>
                                                    <p style={{ paddingLeft: 20, paddingRight: 20, textAlign: 'justify' }}><strong>WHEREAS</strong>:</p>
                                                    <ol type="A" style={{ textAlign: 'justify', paddingLeft: '75px' }}>
                                                        <li style={{ textAlign: 'justify' }}>The Company is engaged <em>inter alia</em> in the business of providing Quality Assurance services in the fields of enterprise, technology and services.The Company is also engaged in providing staffing and specialized staff augmentation services to various third party customers across the globe.</li>
                                                        <li style={{ textAlign: 'justify' }}>Based on an interview and various representation of the Exiting Employee, the Exiting Employee was offered the role of <strong>  {item.designation} </strong>in the Company on <strong> {toJoiningDate.getDate()}<sup>{this.nth(toJoiningDate.getDate())}</sup>&nbsp;{moment(toJoiningDate).format('MMMM YYYY')}</strong>.</li>
                                                        <li style={{ textAlign: 'justify' }}>The Exiting Employee has on <strong>{toExitDate.getDate()}<sup>{this.nth(toExitDate.getDate())}</sup>&nbsp;{moment(toExitDate).format('MMMM YYYY')}</strong> tendered {item.gender.gender2} resignation from the post of<strong> {item.designation}</strong> to the Company.</li>
                                                        <li style={{ textAlign: 'justify' }}>The Company and the Exiting Employee, having agreed to the terms of acceptance of the resignation of the Exiting Employee and {item.gender.gender2} exit from the Company are desirous of setting out the terms of {item.gender.gender2} exit from the Company in writing.</li>
                                                    </ol>
                                                    <p style={{ textAlign: 'justify' }}><strong>&nbsp;</strong></p>
                                                    <p style={{ paddingLeft: 20, paddingRight: 20, textAlign: 'justify' }}><strong>NOW THEREFORE THIS AGREEMENT WITNESSETH AS UNDER:</strong></p>
                                                    <div>&nbsp;</div>
                                                    <p style={{ paddingLeft: 30, textAlign: 'justify' }}><strong>Date of Exit </strong></p>

                                                    <ol style={{ textAlign: 'justify', paddingLeft: 60 }} type='a'>
                                                        <li style={{ textAlign: 'justify', }}>The Company hereby accepts the resignation of the Exiting Employee with effect from {toExitDate.getDate()}<sup>{this.nth(toExitDate.getDate())}</sup>&nbsp;{moment(toExitDate).format('MMMM YYYY')} and the Exiting Employee agrees that {item.gender.gender2} last working day with the Company shall be {toExitDate.getDate()}<sup>{this.nth(toExitDate.getDate())}</sup>&nbsp;{moment(toExitDate).format('MMMM YYYY')}.</li>
                                                    </ol>
                                                   

                                                    <br />
                                                    <br />
                                                    {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1" : "footerimg"} >
                                                        <Footer/>
                                                        </div> : null}
                                                </div>

                                            </div>
                                        </div>

                                        {/* second card */}
                                        <div className="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px' : '20px' }}>

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

                                                <div>

                                                    <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                                                    <p style={{ textAlign: 'justify' }}><strong>Full and Final Settlement </strong></p>
                                                    <ol start={2} type="a">
                                                        <li style={{ textAlign: 'justify' }}>The Company hereby agrees to pay and the Exiting Employee agrees to receive the following amount towards full and final settlement of all dues, emoluments and remunerations due from the Company to the Exiting Employee in respect of the tenure of [his/her] employment with the Company</li>
                                                    </ol>



                                                    <table style={{ width: 800, marginLeft: 'auto', marginRight: 'auto' }} border="1px">
                                                        <tbody>
                                                            <tr>
                                                                <td style={{ width: '400px', textAlign: 'center' }}>
                                                                    <p><strong>Heading</strong></p>
                                                                </td>
                                                                <td style={{ width: '400px', textAlign: 'center' }}>
                                                                    <p><strong>Details </strong></p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '400px', textAlign: 'left' }}>
                                                                    <p style={{ paddingLeft: 10 }}>Gratuity</p>
                                                                </td>
                                                                <td style={{ width: '400px', textAlign: 'left' }}>
                                                                    <p style={{ paddingLeft: 10 }}>{item.gratuity}</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '400px', textAlign: 'left' }}>
                                                                    <p style={{ paddingLeft: 10 }}>Provident Fund Dues</p>
                                                                </td>
                                                                <td style={{ width: '400px', textAlign: 'left' }}>
                                                                    <p style={{ paddingLeft: 10 }}>{item.fundDue}{/* PF contribution till {toExitDate.getDate()}<sup>{this.nth(toExitDate.getDate())}</sup>&nbsp;{moment(toExitDate).format('MMMM YYYY')} */}</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '400px', textAlign: 'left' }}>
                                                                    <p style={{ paddingLeft: 10 }}>Salary deduction in respect of notice period to have been served by the Exiting Employee</p>
                                                                </td>
                                                                <td style={{ width: '400px', textAlign: 'left' }}>
                                                                    <p style={{ paddingLeft: 10 }}>{item.salaryDeduction}</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '400px', textAlign: 'left' }}>
                                                                    <p style={{ paddingLeft: 10 }}>Deduction in respect of TDS</p>
                                                                </td>
                                                                <td style={{ width: '400px', textAlign: 'left' }}>
                                                                    <p style={{ paddingLeft: 10 }}>{item.deductionTDS}</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '400px', textAlign: 'left' }}>
                                                                    <p style={{ paddingLeft: 10 }}>Salary</p>
                                                                </td>
                                                                <td style={{ width: '400px', textAlign: 'left' }}>
                                                                    <p style={{ paddingLeft: 10 }}>{item.salary}{/* Till {toExitDate.getDate()}<sup>{this.nth(toExitDate.getDate())}</sup>&nbsp;{moment(toExitDate).format('MMMM YYYY')} */}</p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <div>
                                                        <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                                                        <ol start={3} type="a" style={{ textAlign: 'justify' }}>
                                                            <li>The Exiting Employee agrees and acknowledges that no further payments are due from the Company and the Exiting Employee has no monetary claims against the Company of whatsoever nature.</li>
                                                        </ol>
                                                        <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                                                        <ol start={4} type="a" style={{ textAlign: 'justify' }}>
                                                            <li>The Company agrees to pay the above said amount within 90 (Ninety) days from the date of this Agreement or completion of all the exit formalities, whichever is later, to the regular salary account of the Exiting Employee.</li>
                                                        </ol>
                                                        <p style={{ textAlign: 'justify' }}>&nbsp;</p>

                                                        <p><strong>Confidentiality and Non-Disclosure of Confidential Information</strong></p>


                                                        <ol start={5} type="a" style={{ textAlign: 'justify' }}>
                                                            <li>The Exiting Employee agrees that information concerning the working of the Company, including all the information concerning the Company’s business transactions, financial arrangements, business partners, clientele, trade secrets, marketing strategies, employee or administrative policies and any other information concerning the Company which is not in the public domain constitutes “<strong>Confidential Information”</strong> belonging to the Company and [he/she] shall not, in perpetuity, reveal Confidential Information to any person, firm, corporation, or entity.</li>
                                                        </ol>

                                                        <ol start={6} type="a">
                                                            <li style={{ textAlign: 'justify' }}>The Exiting Employee agrees and acknowledges that Confidential Information was disclosed to the Exiting Employee during the course of his employment in trust and confidence solely for the performance of his assigned tasks at the Company and such confidential information includes various trade secrets and business practices of the Company which shall not be utilized or disclosed, in perpetuity, by the Exiting Employee to any third party whatsoever.</li>
                                                        </ol>
                                                    </div>
                                                    <br />
                                                    <br />
                                                    
                                                    {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1" : "footerimg"} >
                                                    <Footer/>
                                                        </div> : null}
                                                </div>
                                            </div>
                                        </div>

                                        {/* third page */}
                                        <div className="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px' : '20px' }}>
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
                                                <div>
                                                    <p>&nbsp;</p>
                                                    <p>&nbsp;</p>
                                                    <ol start={7} type="a">
                                                        <li style={{ textAlign: 'justify' }}>The Exiting Employee expressly agrees that he/she shall keep all Confidential Information of the Company confidential and shall not disclose the same to any third party. The Exiting Employee further agrees that in case of any such disclosure by him/her to any third party, it shall be presumed that such disclosure has been made by the Exiting Employee for monetary gain or commercial benefit.</li>
                                                        <p>&nbsp;</p>
                                                        <li style={{ textAlign: 'justify' }}>Notwithstanding anything contained herein, the obligation of confidentiality of the Exiting Employee under this Agreement shall not apply to the Confidential Information or any part thereof which at the time of its disclosure, is in public domain or which after disclosure becomes part of public domain through no fault of the Exiting Employee (such as by appearance in issued patents or publications)</li>
                                                        <p>&nbsp;</p>
                                                        <li style={{ textAlign: 'justify' }}>The Exiting Employee shall not be prevented to make any disclosure required by (i) order of a court of competent jurisdiction or (ii) any competent regulatory authority or agency where such disclosure is required by law, provided that where the Exiting Employee intends to make such disclosure, he/she shall notify the Company in writing, so that the Company may seek a protective order or other appropriate remedy and provided further that the Exiting Employee discloses no more Confidential Information than is reasonably necessary in order to respond to the required disclosure, takes all reasonable steps</li>
                                                        <p>&nbsp;</p>
                                                        <li style={{ textAlign: 'justify' }}>requested by the Company to protect the Confidential Information, minimize the extent of the Confidential Information disclosed and to make such disclosure in confidence.</li>
                                                        <p>&nbsp;</p>
                                                        <li style={{ textAlign: 'justify' }}>The Exiting Employee shall be responsible for any breach of any of the terms of this Agreement. The Exiting Employee understands that if he/she threatens to or actually commits a breach of or fails to observe any of the obligations set forth in this Agreement, the Company shall have the right to seek an injunction against such breach. Further, the Exiting Employee shall indemnify the Company from and against all costs, expenses, losses or damages (including but not limited to legal expenses, loss of goodwill and reputation, etc.) which arose directly or indirectly from the unauthorized disclosure or use of Confidential Information by the Exiting Employee or from any other breach of the terms of this Agreement. Over and above any such unliquidated damages, the Exiting Employee. </li>

                                                        <p>&nbsp;</p>
                                                        <li style={{ textAlign: 'justify' }}>agrees that in case of any breach of the confidentiality obligations at any point of time in the future, the Exiting Employee will be immediately liable to pay the Company <span style={{ background: 'yellow' }}>fixed liquidated damages</span> as decided by the management depending upon the damages incurred in to the organization.</li>

                                                    </ol>
                                                </div>
                                                {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1" : "footerimg"} >
                                                    <Footer/>
                                                   </div> : null}
                                            </div>
                                        </div>
                                        
                                        {/* fourth card */}
                                         <div className="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px' : '20px' }}>
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
                                                <div>
                                                    <p style={{ textAlign: 'justify' }}>&nbsp;</p>

                                                    <p><strong>Non-Solicitation and Non-disparagement</strong></p>

                                                    <ol start={13} type="a" style={{ textAlign: 'justify' }}>
                                                        <li>The Exiting Employee agrees and undertakes that for a period of 2 (two) years from the date of this Agreement, the Exiting Employee shall not in any way, directly or indirectly, on his own behalf or on behalf of any third party, solicit or otherwise approach any client / customer of the Company for the purpose of employment or to provide any services to such client / customer of the Company.</li>
                                                    </ol>
                                                    <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                                                    <ol start={14} type="a" style={{ textAlign: 'justify' }}>
                                                        <li>The Exiting Employee and the Company agree not to make any public allegations, statements or claims against each other, including representatives and other employees of the Company, and further agree not to make any disparaging, damaging or defamatory statement against each other to any third party, either in person or through any written or electronic medium or on any public platform.</li>
                                                    </ol>
                                                    <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                                                    <ol start={15} type="a" style={{ textAlign: 'justify' }}>
                                                        <li>The Exiting Employee agrees that in case of breach of either of the above two conditions, the Exiting Employee <span style={{ background: 'yellow' }}>shall be liable to pay</span> fixed liquidated damages as decided by the management depending upon the damages incurred in to the organization.</li>
                                                    </ol>
                                                    <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                                                    <ol start={16} type="a" style={{ textAlign: 'justify' }}>
                                                        <li>In the event that the Exiting Employee makes any disparaging, defamatory or derogatory statement in any public forum in respect of the Company or any of its employees or representatives, the Company shall issue a notice of breach to the Exiting Employee and if such disparaging, defamatory or derogatory statement has not been removed from such public forum within 3 days of receipt of such notice from the Company, the Exiting Employee shall be liable to pay the fixed liquidated damages as decided by the management depending upon the damages incurred in to the organization</li>
                                                    </ol>
                                                    <p style={{ textAlign: 'justify' }}>&nbsp;</p>

                                                    <p><strong>Miscellaneous </strong></p>

                                                    <ol start={17} type="a" style={{ textAlign: 'justify' }}>
                                                        <li>If any provision of this Agreement as applied to either party or to any circumstance shall be adjudged by a court of competent jurisdiction to be void or unenforceable for any reason, the same shall in no way affect the validity or enforceability of any other provision of this Agreement to the maximum extent permissible by law.</li>
                                                    </ol>
                                                    <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                                                    <ol start={18} type="a" >
                                                        <li style={{ textAlign: 'justify' }}>No delay in exercising or omission to exercise any right, power or remedy accruing to a party hereto upon any default under this Agreement shall impair any such right, power or remedy or shall be construed to be a waiver thereof or any acquiescence in such default, nor shall the action or inaction of such party in respect of any default or any acquiescence by it in any default, affect or impair any right, power or remedy of such party in respect of any other default</li>
                                                    </ol>
                                                </div>

                                                {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1" : "footerimg"} >
                                                    <Footer/>
                                                    </div> : null}

                                            </div>
                                        </div>

                                {/*fifth card  */}
                                        <div className="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px' : '20px' }}>
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

                                                <div >
                                                    <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                                                    <ol start={19} type="a" style={{ textAlign: 'justify', }}>
                                                        <li>This Agreement shall be governed by and construed in accordance with the laws of India. In the event of any dispute between the parties, such dispute shall be referred to the sole arbitrator appointed by the Company. The place of arbitration shall be in Bengaluru. The award passed by the Arbitrator shall be final and binding on the parties. Subject to adjudication of disputes by arbitration, the Courts in Bengaluru shall have the exclusive jurisdiction to deal with the disputes arising out of this Agreement.</li>
                                                    </ol>
                                                    <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                                                    <ol start={20} type="a" style={{ textAlign: 'justify' }}>
                                                        <li>This Agreement constitutes the entire agreement between the parties with respect to its subject matter and supersedes any and all prior representations or agreements, written or oral.</li>
                                                    </ol>
                                                    <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                                                    <p style={{ textAlign: 'justify' }}>IN WITNESS THEREOF the parties hereto have set and subscribed their respective signatures and seal on the day, month and year first written herein above:</p>
                                                    <p>&nbsp;</p>

                                                    <div>
                                                        <p className="western" style={{ float: 'left', width: 500 }} ><strong>Test Yantra Software Solutions (India) Pvt Ltd. &nbsp;&nbsp;&nbsp;</strong> represented by its authorised signatory</p>
                                                        <p className="western" style={{ float: 'left', width: 300 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Exiting Employee</strong></p></div>
                                                    <p className="western">&nbsp;</p>
                                                    <p className="western">&nbsp;</p>
                                                    <p className="western">&nbsp;</p>
                                                    <p className="western">&nbsp;</p>
                                                    <p className="western">&nbsp;</p>
                                                    <div><strong className="western" style={{ float: 'left', width: 400, fontSize: 'medium' }}>_____________________________</strong><strong style={{ float: 'right', width: 300, fontSize: 'medium' }}>_____________________________</strong></div>
                                                    <p className="western">&nbsp;</p>
                                                    <div>
                                                        <p className="western" style={{ float: 'left', width: 300, textAlign: 'left', margin: 0 }}>Authorised Signatory&nbsp;&nbsp;&nbsp;</p > <p style={{ float: 'right', width: 390 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Signature</p>
                                                        {/*  <p className="western" style={{ float: 'left', width: 400, fontWeight: "bolder" }}>&nbsp;Authorised Signatory</p > */}
                                                    </div>
                                                    <p className="western" style={{ textAlign: 'right' }}>&nbsp;</p>
                                                    <p className="western">&nbsp;</p>
                                                    <p className="western">&nbsp;</p>
                                                    <p className="western">&nbsp;</p>
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
        }
        else {
            return (<h1></h1 >)
        }
    }

}

export default withRouter(BulkExitLetter)
