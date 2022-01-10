//This is bulk uploading Increment letter file. 
//In this file by uploading bulk details with excel format, 
//The user will get all Increment letter in the document format with letter header and footer.
// when the user clicks create pdf button the user gets all the documents in the pdf format.
import React, { Component } from 'react'
import Home from '../home';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import '../CommonStyle.css'
import Header from '../LetterHeader/HeaderPart';
import Footer from '../LetterFooter/FooterPart'; 
import TyHeaderSpace from '../Assests/tyheaderspace.png';
import PdfContainer from '../PdfComponent/PdfContainer';
import Doc from '../PdfComponent/DocService'
import { UserConsumer } from '../Context/CustomContext';

export class BulkIncrementLetter extends Component {

    constructor(props) {
        super(props)
        this.state = {
            employee: [],
            waterMark: false,
            pix: false
        }
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

    //edit
    sendData() {
        this.props.sendData(this.state.employee);
        this.props.history.push('/InputIncrementLetter');

    }

    createPdf = async(html, name,id) => {
        window.scrollTo(0, 0);
      
        const ex=[document.getElementsByClassName('pdf-body')[id]];
        await Doc.createPdf(ex, name)

    }
    render() {
       

        let value = this.context;
        let toIncrementInEffectDate = "";
        if (this.props.empData == 0) {
          window.history.back();
        }

        let toDate = new Date()
        if (this.state.employee.length > 0) {
            return (
                this.state.employee.map((item,index) => {

                    toIncrementInEffectDate = new Date((item.incrementInEffectDate - (25567 + 2)) * 86400 * 1000)
                    return (
                        <div>
                            {<Home buttonShow={true} showWatermark={(data) => this.setState({ waterMark: data })} sendData={() => this.sendData()} setHeader={(data) => this.print()} />}
                            
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

                                                <br></br>
                                                <br></br>
                                                <br></br>
                                                <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                                                <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                                                <p style={{ textAlign: 'justify', paddingLeft: 20 }}><strong>&nbsp;{toDate.getDate()}<sup>{this.nth(toDate.getDate())}</sup>&nbsp;{moment(toDate).format('MMMM YYYY')}</strong></p>
                                                <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                                                <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                                                <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}>To<br /> <br /> </p>
                                                <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}><strong> {item.employeeName},</strong></p>
                                                <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}><strong>Employee ID: {item.employeeId}</strong></p>
                                                <br />
                                                <br />
                                                <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}>Subject: Increment Letter</p>
                                                <br />
                                                <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}><br /> Dear <strong> {item.employeeName},<br /> <br /> </strong></p>
                                                <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}><br /> This year has been eventful and challenging for all of us in Test Yantra Software Solution Pvt Ltd. We have met the huge challenge of scaling up our business and growing our bottom line. <br /> <br /> Your performance during this period has been rated as Exceeds Expectations. We hope that you continue to meet all challenges that we will offer you in the coming year.<br /> <br /> Further your annual compensation for the year  <strong>{item.annualCompensationYear}</strong> has been enhanced to <strong> <span style={{ fontSize: 'large' }}>&#x20B9;</span> {item.salaryIncremented}</strong> per annum effective <strong>{toIncrementInEffectDate.getDate()}<sup>{this.nth(toIncrementInEffectDate.getDate())}</sup>&nbsp;{moment(toIncrementInEffectDate).format('MMMM YYYY')}</strong>. &nbsp;The Salary Annexure is attached along with this letter. All other terms and conditions of your letter of appointment remain unchanged.</p>
                                                <br />
                                                <br />
                                                <p style={{ textAlign: 'justify', paddingLeft: 20 }}>Wish you all the best.<br /> </p>
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20, margin: 0, fontWeight: 'bolder' }}>Authorized Signatory</p>
                                                <p style={{ textAlign: 'justify', paddingLeft: 20 }}><strong>&nbsp;</strong></p>

                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
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
            return (<h1></h1 >)
        }
    }
}

export default withRouter(BulkIncrementLetter)
