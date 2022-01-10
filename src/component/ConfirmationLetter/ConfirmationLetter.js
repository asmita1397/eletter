// This is Confirmation letter file. It is single page document. 
// In this letter by providing required data the user will get all data in the document format,
//with letter header and footer.
// when the user clicks create pdf button user gets the data in the pdf format.
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
            waterMark: false,
            image: null
        }
        // Signature Image Upload
        this.onImageChange = this.onImageChange.bind(this);
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
    createPdf = (html, name) => {
        window.scrollTo(0, 0);
        const ex=document.getElementsByClassName('pdf-body');
        Doc.createPdf(ex, name)
    }


    // Signature Image Upload
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
        let toDayDate = new Date();
        let toprobationDate = new Date(this.state.employee.joiningDate)
        toprobationDate.setMonth(toprobationDate.getMonth() + 6);


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
                                        <div>

                                            {this.state.waterMark ? <header className="headerimg" >
                                            <Header/>
                                          </header> : null}





                                            {this.state.waterMark ? <div className="waterMark">
                                                <span style={{
                                                    color: 'rgba(38, 50, 72, 0.33)', fontSize: '91px',
                                                    fontFamily: 'sans-serif', position: 'absolute',zIndex: '0'
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
                                            <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}><strong> {this.state.employee.employeeName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </strong></p>
                                            <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}>Emp Id:  {this.state.employee.employeeId}</p>
                                            <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}> {this.state.employee.designation}</p>
                                            <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}>Bangalore</p>
                                            <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                                            <p style={{ textAlign: 'justify', paddingLeft: 20 }}>Subject - Confirmation of Employment</p>
                                            <br />
                                            <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}>In terms of your appointment letter, you have undergone the Probation period of <strong>6 months</strong> from the date of joining <strong>{joiningDate.getDate()}<sup>{this.nth(joiningDate.getDate())}</sup>&nbsp;{moment(this.state.employee.joiningDate).format('MMMM YYYY')}</strong>. Consequent to your successful completion of your probation period we are pleased to inform you that your services with the company have been confirmed with effect from <strong>{toprobationDate.getDate()}<sup>{this.nth(toprobationDate.getDate())}</sup>&nbsp;{moment(toprobationDate).format('MMMM YYYY')}</strong>. Being a confirmed employee, the organization anticipates further outstanding works from you and we fervently hope that you will keep up the expectation.</p>
                                            <br />
                                            <p style={{ textAlign: 'justify', paddingLeft: 20, paddingTop: 5 }}>All other terms and conditions of your employment remain unchanged.</p>
                                            <p style={{ textAlign: 'justify', paddingLeft: 20, paddingTop: 5 }}>Please sign and return the duplicate copy of this letter for our records.</p>
                                            <p style={{ textAlign: 'justify', paddingLeft: 20, paddingTop: 5, margin: 0 }}>Sincerely Yours,</p>
                                            <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }} align="JUSTIFY"><span >For <strong>Test Yantra Software Solutions (India) Pvt Ltd</strong></span></p>
                                            <br />
                                            <br />
                                            <br />

{/* New Signature Image Upload */}
<div>
  
  {(this.state.image == null) ? 
<div>
<label for="files" class="btn" style={{color:'Black',border:'2px solid black',padding:'5px',position:'absolute',fontSize:'15px', marginLeft:'40px', marginTop:'-70px',backgroundColor:'orange'}}><b>Upload Digital Signature</b></label>
            <input 
            type="file" 
            name="myImage" 
            accept=".png"
            id="files"
style={{visibility:'hidden'}}
            onChange={this.onImageChange} /></div> :
            <img style={{position:"absolute",marginLeft: '20px',marginTop: '-50px',width:'300px',height:'120px'}}  src={this.state.image} />
       
  } </div>

<br/>
<br/>
<br/>

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
        } else {
            return (<h1></h1>)
        }
    }
}

export default withRouter(ConfirmationLetter)

