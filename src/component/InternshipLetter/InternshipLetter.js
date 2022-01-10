// This is Internship letter file. 
// In this letter by providing required data the user will get all data in the document format,
//with letter header and footer.
// when the user clicks create pdf button user gets the data in the pdf format.
import React, { Component } from 'react'
import Home from '../home';
import '../CommonStyle.css'
import { withRouter } from 'react-router-dom';
import Header from '../LetterHeader/HeaderPart';
import Footer from '../LetterFooter/FooterPart'; 
import moment from 'moment'
import PdfContainer from '../PdfComponent/PdfContainer';
import Doc from '../PdfComponent/DocService'
import { UserConsumer } from '../Context/CustomContext';

export class InternshipLetter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            employee: [],
            waterMark: false,
            pix: false,
            gender: '',
            image: null
        }

        // Signature Image Upload
    this.onImageChange = this.onImageChange.bind(this);
  

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
        this.props.history.push('/InputInternship');

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

        if (this.props.empData == 0) {
            this.props.history.push("/cards")
        }
        let toJoiningDate = new Date(this.state.employee.startDate);
        let toReleiving = new Date(this.state.employee.endDate)


        if (this.props.empData == 0) {
            this.props.history.push("/cards")
        }
        if (this.props.empData) {
            return (
                <div>
                    <Home buttonShow={true} showWatermark={(data) => this.setState({ waterMark: data })} sendData={() => this.sendData()} setHeader={(data) => this.print()} />
                    <div class="mainHeader">
                        <div className="main">
                            <PdfContainer id={"internshipletter"} name={this.state.employee.internName} createPdf={this.createPdf}>
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
                                            </div>
                                                : null}
                                            <div>
                                                <br />
                                                <br />
                                                <br />

                                                <p style={{ textAlign: 'left', paddingLeft: 10, paddingRight: 10, margin: 0 }}><strong>Date:</strong><span style={{ fontWeight: 400 }}>&nbsp; {SysDate.getDate()}<sup>{this.nth(SysDate.getDate())}</sup>&nbsp;{moment(SysDate).format('MMMM YYYY')}</span></p>
                                                <p style={{ textAlign: 'left', paddingLeft: 10, paddingRight: 10, margin: 0 }}><strong>Place:</strong><span style={{ fontWeight: 400 }}>&nbsp;{this.state.employee.companyLocation}</span></p>
                                                <br />
                                                <br />
                                                <br />
                                                <p style={{ textAlign: 'center', paddingLeft: 10, paddingRight: 10 }}><strong><u>INTERNSHIP CERTIFICATE</u></strong></p>
                                                <br />
                                                <br />
                                                <p style={{ textAlign: 'justify', paddingLeft: 10, paddingRight: 10 }}><span style={{ fontWeight: 400 }}>This is to certify that </span><strong>{this.state.employee.salute} {this.state.employee.internName},</strong><span style={{ fontWeight: 400 }}> was engaged in our organization as {this.state.employee.internType} Internship Trainee for necessary training, during the period from </span><strong> {toJoiningDate.getDate()}<sup>{this.nth(toJoiningDate.getDate())}</sup>&nbsp;{moment(toJoiningDate).format('MMMM YYYY')} </strong><span style={{ fontWeight: 400 }}> to </span><strong> {toReleiving.getDate()}<sup>{this.nth(toReleiving.getDate())}</sup>&nbsp;{moment(toReleiving).format('MMMM YYYY')}</strong><span style={{ fontWeight: 400 }}> in our development unit </span><strong>Test Yantra Software Solutions India Pvt Ltd</strong><span style={{ fontWeight: 400 }}>. This candidate has successfully completed internship training during the above period.</span></p>
                                                <p style={{ textAlign: 'justify', paddingLeft: 10, paddingRight: 10 }}>&nbsp;</p>
                                                <p style={{ textAlign: 'justify', paddingLeft: 10, paddingRight: 10 }}><strong>Test Yantra Intern ID: {this.state.employee.internId}</strong></p>
                                                <br />
                                                <br />
                                                <p style={{ textAlign: 'justify', paddingLeft: 10, paddingRight: 10 }}><span style={{ fontWeight: 400 }}>During the duration of this internship program, we found this candidate is sincere, hardworking and performance oriented.</span></p>
                                                <p style={{ textAlign: 'justify', paddingLeft: 10, paddingRight: 10 }}><span style={{ fontWeight: 400 }}><br /></span><span style={{ fontWeight: 400 }}>We wish </span><strong>{this.state.employee.employeeName}</strong> <span style={{ fontWeight: 400 }}>success for all </span><span style={{ fontWeight: 400 }}>{this.props.empData.gender.gender3}</span> <span style={{ fontWeight: 400 }}>future endeavours.</span></p>
                                                <p style={{ textAlign: 'justify', paddingLeft: 10, paddingRight: 10 }}><br /><br /></p>
                                                <p style={{ textAlign: 'justify', paddingLeft: 10, paddingRight: 10 }}><span style={{ fontWeight: 400 }}>Thanks & Regards</span></p>
                                                <p style={{ textAlign: 'justify', paddingLeft: 10, paddingRight: 10 }}><span style={{ fontWeight: 400 }}>For <strong>Test Yantra Software Solutions (India) Pvt Ltd</strong></span></p>
                                                <br />
                                                <br />
                                                <br />

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
            <img style={{position:"absolute",marginLeft: '10px',marginTop: '-92px',width:'300px',height:'100px'}}  src={this.state.image} />
       
  } 
  </div>
                                                <p style={{ textAlign: 'justify', paddingLeft: 10, paddingRight: 10, margin: 0, fontWeight: 'bolder', marginTop:'7px' }}>Authorized Signatory</p>

                                                <br />
                                                <br />

                                                {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1" : "footerimg"} >
                                                <Footer/>
                                                </div> : null}
                                            </div>
                                        </div>
                                    </div>
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

export default withRouter(InternshipLetter)
