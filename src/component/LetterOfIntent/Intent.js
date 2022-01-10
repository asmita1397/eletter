// This is Intent letter file. 
// In this letter by providing required data the user will get all data in the document format,
//with letter header and footer.
// when the user clicks create pdf button user gets the data in the pdf format.
import React, { Component } from 'react'
import moment from 'moment'
import Home from '../home'
import Header from '../LetterHeader/HeaderPart';
import Footer from '../LetterFooter/FooterPart'; 
import { BrowserRouter as Router, Route, withRouter, Link } from 'react-router-dom'
import PdfContainer from '../PdfComponent/PdfContainer';
import Doc from '../PdfComponent/DocService'
import { UserConsumer } from '../Context/CustomContext';


export class Intent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            employee: [],
            waterMark: false,
            pix: false,
            image: null
        }

        // Signature Image Upload
this.onImageChange = this.onImageChange.bind(this);
  
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

    //edit
    sendData() {
        this.props.sendData(this.state.employee);
        this.props.history.push('/InputIntentLetter');

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
        let SysDate = new Date();

        let toJoiningDate = new Date(this.state.employee.trainingStartDate);

        console.log("System Date", SysDate)
        if (this.props.empData == 0) {
            this.props.history.push("/cards")
        }

        console.log("wawda")

        if (this.props.empData == 0) {
            this.props.history.push("/cards")
        }
        if (this.props.empData) {

            return (


                <div>
                    <Home buttonShow={true} showWatermark={(data) => this.setState({ waterMark: data })} sendData={() => this.sendData()} setHeader={(data) => this.print()} />
                    <div class="mainHeader">
                        <div className="main" style={{ marginTop: '100px' }} >
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
                                        </div>
                                            : null}
                                        <p style={{ textAlign: 'justify', margin: 0 }}>&nbsp;</p>

                                        <p style={{ textAlign: 'justify', margin: 0 }}>&nbsp;</p>
                                        <p style={{ textAlign: 'center' }}><strong>Letter of Intent</strong></p>

                                        <p style={{ textAlign: 'justify', margin: 0 }}>&nbsp;</p>
                                        <p style={{ textAlign: 'justify', margin: 0 }}><strong>Date: {SysDate.getDate()}<sup>{this.nth(SysDate.getDate())}</sup>&nbsp;{moment(SysDate).format('MMMM YYYY')}</strong></p>
                                        <div style={{ textAlign: 'justify', margin: 0 }}><strong>Location: {this.state.employee.companyLocation}</strong></div>
                                        <p style={{ textAlign: 'justify' }}><strong><br></br></strong></p>
                                        <p style={{ textAlign: 'justify', margin: 0 }}><strong>Dear &nbsp;{this.state.employee.employeeName},</strong></p>
                                        <p style={{ textAlign: 'justify' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                        <p style={{ textAlign: 'justify', margin: 0 }}>We are pleased to inform that you have been selected for Training program with <strong>Test Yantra Software Solution (India) Pvt Ltd</strong> (Here in after referred as ‘<strong>Test Yantra’</strong>).</p>
                                        <p style={{ textAlign: 'justify', margin: 0 }}>&nbsp;</p>
                                        <p style={{ textAlign: 'justify', margin: 0 }}>In this regards we are offering you as<strong>&nbsp; {this.state.employee.designation} </strong>, the details of the same are in <strong>ANNEXURE A </strong>to this letter.</p>
                                        <p style={{ textAlign: 'justify', margin: 0 }}>&nbsp;</p>
                                        <p style={{ textAlign: 'justify', margin: 0 }}>Your training is subjected to Learning<strong>, Performance, Evaluation, Project Interview</strong> determined by <strong>Test Yantra</strong>.</p>
                                        <p style={{ textAlign: 'justify', margin: 0 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                        <p style={{ textAlign: 'justify', margin: 0 }}>Also on completion of <strong>100%</strong> <strong>training program</strong>, <strong>you will be provided for an employment opportunity</strong></p>
                                        <p style={{ textAlign: 'justify', margin: 0 }}><strong>At Test Yantra. This is subjected to your completion of your post-graduation and results, however test yantra shall follow the hiring process for such opportunity&nbsp; </strong></p>
                                        <p style={{ textAlign: 'justify', margin: 0 }}></p>
                                        <p style={{ textAlign: 'justify', margin: 0 }}><strong><br></br> </strong></p>
                                        <p style={{ textAlign: 'justify', margin: 0 }}><strong>Details of Training Program:</strong></p>
                                        <p style={{ textAlign: 'justify', margin: 0 }}><strong></strong></p>
                                        <ul style={{ textAlign: 'justify', margin: 0 }}>
                                            <li>Training shall commence from <strong> {toJoiningDate.getDate()}<sup>{this.nth(toJoiningDate.getDate())}</sup>&nbsp;{moment(toJoiningDate).format('MMMM YYYY')} </strong>for period of <strong>3 months</strong>.</li>
                                            <li>The Intern will receive direct and close supervision by the supervisor.</li>
                                            <li>Intern has to report to program when expected and need to maintain 100% of attendance.</li>
                                        </ul>
                                        <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                                        <p style={{ textAlign: 'justify' }}>The Intern specifically agrees to and acknowledges the following:</p>
                                        <p style={{ textAlign: 'justify' }}></p>
                                        <ul style={{ textAlign: 'justify' }}>
                                            <li>Intern will demonstrate honesty, punctuality, courtesy, cooperative attitude, proper health and grooming habits, appropriate dress and a willingness to learn.</li>
                                            <li>Intern will obey the policies, rules and regulations of the Company site and comply with the Company’s business practices and procedures,</li>
                                            <li>Under no circumstances will Intern leave the training program without first conferring with his / her supervisor.</li>
                                            <li>Intern hereby agrees that he/she, his/her assignees, heirs, guardians, and legal representatives, will not make a claim against Company or any of its affiliated organizations, or either of their officers or directors collectively or individually, or any of its employees, for the injury of death to Intern or damage to his/her property, however caused, arising from his/her participation in the training program.</li>
                                        </ul>


                                    </div>
                                   {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1":"footerimg"} >
                                            <Footer/>
                                       </div> : null}

                                </div>

                                <div>

                                </div>

                                <div class="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px':'20px' }}>
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
                                            <p style={{ textAlign: 'justify', margin: 0 }}>Please take the time to carefully review our Letter of Intent. This letter, along with the enclosed annexures, outlines the obligations of both <strong>Test Yantra </strong>and yourself with respect to your training program terms &amp; conditions.</p>
                                            <p>&nbsp;</p>
                                            <p style={{ textAlign: 'justify', margin: 0 }}>Kindly complete and return the signed copy of your Letter of intent so that reference checks can be completed. A few original documents (or officially certified copies) must be mandatorily provided either before the commencement of your training, or no later than the morning of your first day.</p>
                                            <br />
                                            <p style={{ textAlign: 'justify', margin: 0 }}>The Terms and details of this letter is confidential and are not to be disclosed to any party.</p>
                                            <br />
                                            <p style={{ textAlign: 'justify', margin: 0 }}>During the training salary will be as below:</p>
                                            <p style={{ margin: 0 }}>&nbsp;</p>
                                        </div>
                                        <div>
                                            <table style={{ width: 300, height: 92, textAlign: 'left' }} border="1px">
                                                <tbody>
                                                    <tr style={{ height: 55 }}>
                                                        <td style={{ width: '200px', height: 55, background: '#00B0F0' }}><strong>During training -<br /> 3 months </strong></td>
                                                        <td style={{ width: '100px', height: 55 }}><strong>NO Salary</strong></td>
                                                    </tr>
                                                    <tr style={{ height: 26 }}>
                                                        <td style={{ width: 178, height: 26, background: '#00B0F0' }}>&nbsp;</td>
                                                        <td style={{ width: 194, height: 26 }}>&nbsp;</td>
                                                    </tr>
                                                    <tr style={{ height: 18, background: '#00B0F0' }}>
                                                        <td style={{ width: 178, height: 18 }}>&nbsp;</td>
                                                        <td style={{ width: 194, height: 18 }}>&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <p style={{ margin: 0 }}>&nbsp;</p>
                                        <p style={{ textAlign: 'center', margin: 0 }}><strong><u>ANNEXURE A</u></strong></p>
                                        <p style={{ margin: 0 }}><strong>&nbsp;</strong></p>
                                        <p style={{ textAlign: 'justify', margin: 0 }}>The following outlines the terms and conditions of <strong>Training Program</strong> with <strong>Test Yantra Software Solutions Pvt Ltd</strong>. The Company reserves the right to change these terms and conditions as necessary, with due notice.</p>
                                        <div>
                                            <table style={{ width: 860, height: 84, textAlign: 'left' }} border="1px">
                                                <tbody>
                                                    <tr style={{ height: 21 }}>
                                                        <td style={{ width: 153, height: 21, textIndent: 15 }}><strong>Title</strong></td>
                                                        <td style={{ width: 464, height: 21, textIndent: 15 }}><strong>{this.state.employee.designation}</strong></td>
                                                    </tr>
                                                    <tr style={{ height: 21 }}>
                                                        <td style={{ width: 153, height: 21, textIndent: 15 }}>
                                                            <div>
                                                                <div style={{ textAlign: 15 }}><strong>Reporting&nbsp;Manager</strong></div>
                                                            </div>
                                                        </td>
                                                        <td style={{ width: 464, height: 21, textIndent: 15 }}>
                                                            <div>
                                                                <div style={{ textAlign: 15 }}><strong>&nbsp;{this.state.employee.reportingManager}</strong></div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ height: 21 }}>
                                                        <td style={{ width: 153, height: 21, textIndent: 15 }}>
                                                            <div>
                                                                <div style={{ textAlign: 15 }}><strong>Start&nbsp;Date</strong></div>
                                                            </div>
                                                        </td>
                                                        <td style={{ width: 464, height: 21, textIndent: 15 }}>
                                                            <div>
                                                                <div style={{ textAlign: 15 }}><strong><mark style={{ padding: ".1em", backgroundColor: '#f5ff18' }} >{toJoiningDate.getDate()}<sup>{this.nth(toJoiningDate.getDate())}</sup>&nbsp;{moment(toJoiningDate).format('MMMM YYYY')}</mark></strong></div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ height: 21 }}>
                                                        <td style={{ width: 153, height: 21, textIndent: 15 }}>
                                                            <div>
                                                                <div style={{ textAlign: 15 }}><strong>Hours&nbsp;of&nbsp;Work</strong></div>
                                                            </div>
                                                        </td>
                                                        <td style={{ width: 464, height: 21, textIndent: 15 }}>
                                                            <div>
                                                                <div style={{ textAlign: 15, fontFamily: 'sans-serif' }}>Training&nbsp;Program&nbsp;is&nbsp;from&nbsp;<mark style={{ padding: ".1em", backgroundColor: '#f5ff18' }} >Monday&nbsp;to&nbsp;Saturday from<strong style={{ fontSize: 16 }}> 8:00&nbsp;AM</strong> to<strong style={{ fontSize: 16 }}>7:00&nbsp;PM</strong></mark></div>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    <tr style={{ height: 26 }}>
                                                        <td style={{ width: 153, height: 26, textIndent: 15 }}>
                                                            <div>
                                                                <div style={{ textAlign: 15 }}><strong>Leave</strong></div>
                                                            </div>
                                                        </td>
                                                        <td style={{ width: 464, height: 26, textIndent: 15 }}>
                                                            <div>
                                                                <div style={{ textAlign: 15, fontFamily: 'sans-serif' }}>Not&nbsp;Eligible&nbsp;for&nbsp;Leave&nbsp;during&nbsp;training&nbsp;period</div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ height: 18 }}>
                                                        <td style={{ width: 153, height: 18, textIndent: 15 }}>
                                                            <div>
                                                                <div style={{ textAlign: 15 }}><strong>Dress&nbsp;Code</strong></div>
                                                            </div>
                                                        </td>
                                                        <td style={{ width: 464, height: 18, textIndent: 15 }}>
                                                            <div>
                                                                <div style={{ textAlign: 15, fontFamily: 'sans-serif' }}>Formals</div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div>
                                            <p>&nbsp;</p>
                                            <p style={{ textAlign: 'left' }}><strong>NOTE: Based on your performance you will be considered as a Full Time Employee after training period from the date of joining.</strong></p></div>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div>
                                        <div>
                                            <div>

{/* New Signature Image Upload */}
<div>
  
  {(this.state.image == null) ? 
<div>
<label for="files" class="btn" style={{color:'Black',border:'2px solid black',padding:'5px',position:'absolute', marginLeft:'635px',fontWeight:'100px', marginTop:'-80px', backgroundColor:'orange'}}>Upload Digital Signature</label>
            <input 
            type="file" 
            name="myImage" 
            accept=".png"
            id="files"
style={{visibility:'hidden'}}
            onChange={this.onImageChange} /></div> :
            <img style={{position:"absolute",marginLeft: '547px',marginTop: '-96px',width:'300px',height:'100px'}}  src={this.state.image} />
       
  } 
  </div>




                                                <p style={{ textAlign: 'justify', margin: 0 }}><strong>Employee Signature:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;Authorized Signatory </strong></p>
                                                <p style={{ textAlign: 'justify', margin: 0 }}><strong>Date:&nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;Test Yantra Software Solutions (India) Pvt Ltd</strong></p>
                                            </div>

                                        </div>

                                    </div>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1":"footerimg"} >
                                            <Footer/>
                                        </div> : null}

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

export default withRouter(Intent)