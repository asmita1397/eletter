//This is bulk uploading Confirmation letter file. 
//In this file by uploading bulk details with excel format, 
//The user will get all Confirmation letter in the document format with letter header and footer.
// when the user clicks create pdf button the user gets all the documents in the pdf format.
import React, { Component } from 'react'
import Home from '../home';
import moment from 'moment';
import '../CommonStyle.css';
import Header from '../LetterHeader/HeaderPart';
import Footer from '../LetterFooter/FooterPart';
import { withRouter } from 'react-router-dom';
import PdfContainer from '../PdfComponent/PdfContainer';
import Doc from '../PdfComponent/DocService'
import { UserConsumer } from '../Context/CustomContext';

export class ConfirmationLetter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employee: [],
            waterMark: false
        }
    }
    static contextType = UserConsumer;

    componentDidMount() {
        localStorage.setItem("checkHR", false)
        this.setState({
            employee: this.props.empData,
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
        if (d > 3 && d < 21) return 'th';
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
        this.props.history.push('/InputConfirmation');

    }

    createPdf = async(html, name,id) => {
        window.scrollTo(0, 0);
        const ex=[document.getElementsByClassName('pdf-body')[id]];
        await Doc.createPdf(ex, name)
    }
    render() {
        let value = this.context;
        let joiningDate = "";
        let toprobationDate = ""
        if (this.props.empData == 0) {
            window.history.back();
        }

        let toDayDate = new Date()
        if (this.state.employee.length > 0) {
            return (
                this.state.employee.map((item,index) => {

                    joiningDate = new Date((item.joiningDate - (25567 + 2)) * 86400 * 1000)

                    toprobationDate = new Date(joiningDate)
                    toprobationDate.setMonth(toprobationDate.getMonth() + 6);

                    return (
                        <div>
                            <Home buttonShow={true} showWatermark={(data) => this.setState({ waterMark: data })} sendData={() => this.sendData()} setHeader={(data) => this.print()} />
                            <div class="mainHeader">
                                <div className="main" style={{ marginTop: index == 0 ? '100px' : '130px' }}  >
                                    <PdfContainer id={index} name={item.employeeName} createPdf={this.createPdf}>
                                        <div className="card" ref={this.bodyRef} id="AFourPage">
                                            <div className="card-body pb-0">

                                                <div>

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


                                                    <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                                                    <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                                                    <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                                                    <p style={{ textAlign: 'justify', paddingLeft: 20 }}><strong> {toDayDate.getDate()}<sup>{this.nth(toDayDate.getDate())}</sup>&nbsp;{moment(toDayDate).format('MMMM YYYY')}</strong></p>
                                                    <br />
                                                    <br />
                                                    <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}><strong> {item.employeeName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </strong></p>
                                                    <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}>Emp Id:  {item.employeeId}</p>
                                                    <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}> {item.designation}</p>
                                                    <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}>Bangalore</p>
                                                    <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                                                    <p style={{ textAlign: 'justify', paddingLeft: 20 }}>Subject - Confirmation of Employment</p>
                                                    <br />
                                                    <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}>In terms of your appointment letter, you have undergone the Probation period of <strong>6 months</strong> from the date of joining <strong>{joiningDate.getDate()}<sup>{this.nth(joiningDate.getDate())}</sup>&nbsp;{moment(joiningDate).format('MMMM YYYY')}</strong>. Consequent to your successful completion of your probation period we are pleased to inform you that your services with the company have been confirmed with effect from <strong>{toprobationDate.getDate()}<sup>{this.nth(toprobationDate.getDate())}</sup>&nbsp;{moment(toprobationDate).format('MMMM YYYY')}</strong>. Being a confirmed employee, the organization anticipates further outstanding works from you and we fervently hope that you will keep up the expectation.</p>
                                                    <br />
                                                    <p style={{ textAlign: 'justify', paddingLeft: 20, paddingTop: 5 }}>All other terms and conditions of your employment remain unchanged.</p>
                                                    <p style={{ textAlign: 'justify', paddingLeft: 20, paddingTop: 5 }}>Please sign and return the duplicate copy of this letter for our records.</p>
                                                    <p style={{ textAlign: 'justify', paddingLeft: 20, paddingTop: 5, margin: 0 }}>Sincerely Yours,</p>
                                                    <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }} align="JUSTIFY"><span >For <strong>Test Yantra Software Solutions (India) Pvt Ltd</strong></span></p>
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}><strong>Authorized Signatory</strong></p>

                                                    <br />


                                                </div>
                                            </div>
                                            {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1" : "footerimg"} >
                                                        <Footer/>
                                                

                                            </div> : null}
                                        </div>
                                    </PdfContainer>
                                </div>

                            </div>


                        </div>
                    )
                }))

        } else {
            return (<h1></h1 >)
        }
    }
}

export default withRouter(ConfirmationLetter)

