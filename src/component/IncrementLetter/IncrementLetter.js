// This is Increment letter file. 
// In this letter by providing required data the user will get all data in the document format,
//with letter header and footer.
// when the user clicks create pdf button user gets the data in the pdf format.
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

export class IncrementLetter extends Component {

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

    createPdf = (html, name) => {
        window.scrollTo(0, 0);
        // const example=document.getElementById('AFourPage');
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
        let toDate = new Date();
        let toIncrementInEffectDate = new Date(this.state.employee.incrementInEffectDate);


        if (this.props.empData == 0) {
            this.props.history.push("/cards")
        }
        if (this.props.empData) {
            return (
                <div>
                    {<Home buttonShow={true} showWatermark={(data) => this.setState({ waterMark: data })} sendData={() => this.sendData()} setHeader={(data) => this.print()} />}

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

                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}><strong>&nbsp;{toDate.getDate()}<sup>{this.nth(toDate.getDate())}</sup>&nbsp;{moment(toDate).format('MMMM YYYY')}</strong></p>
                                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                                        <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}>To<br /> <br /> </p>
                                        <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}><strong> {this.state.employee.employeeName},</strong></p>
                                        <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}><strong>Employee ID: {this.state.employee.employeeId}</strong></p>
                                        <br />
                                        <br />
                                        <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}>Subject: Increment Letter</p>
                                        <br />
                                        <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}><br /> Dear <strong> {this.state.employee.employeeName},<br /> <br /> </strong></p>
                                        <p style={{ textAlign: 'justify', paddingLeft: 20, margin: 0 }}><br /> This year has been eventful and challenging for all of us in Test Yantra Software Solution Pvt Ltd. We have met the huge challenge of scaling up our business and growing our bottom line. <br /> <br /> Your performance during this period has been rated as Exceeds Expectations. We hope that you continue to meet all challenges that we will offer you in the coming year.<br /> <br /> Further your annual compensation for the year  <strong>{this.state.employee.annualCompensationYear}</strong> has been enhanced to <strong> <span style={{ fontSize: 'large' }}>&#x20B9;</span> {this.state.employee.salaryIncremented}</strong> per annum effective <strong>{toIncrementInEffectDate.getDate()}<sup>{this.nth(toIncrementInEffectDate.getDate())}</sup>&nbsp;{moment(toIncrementInEffectDate).format('MMMM YYYY')}</strong>. &nbsp;The Salary Annexure is attached along with this letter. All other terms and conditions of your letter of appointment remain unchanged.</p>
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


{/* New Signature Image Upload */}
<div>
  
  {(this.state.image == null) ? 
<div>
<label for="files" class="btn" style={{color:'Black',border:'2px solid black',padding:'5px',position:'absolute', marginLeft:'25px',fontWeight:'100px', marginTop:'-185px',backgroundColor:'orange'}}>Upload Digital Signature</label>
            <input 
            type="file" 
            name="myImage" 
            accept=".png"
            id="files"
style={{visibility:'hidden'}}
            onChange={this.onImageChange} /></div> :
            <img style={{position:"absolute",marginLeft: '20px',marginTop: '-162px',width:'300px',height:'120px'}}  src={this.state.image} />
       
  } 
  </div>












                                        <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20, margin: 0, fontWeight: 'bolder',marginTop: '10px' }}>Authorized Signatory</p>
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

                                <div className="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px' : '20px' }}>
                                    <div className="card-body pb-0">

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


                                        {this.state.waterMark ? <header className="headerimg" >
                                            <Header/>
                                            </header> : null}
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <p style={{ textAlign: 'justify', paddingLeft: 20 }}>&nbsp;</p>
                                        <div style={{ padding: 0 }} className="">
                                            <table style={{ width: 800, marginLeft: 'auto', marginRight: 'auto', heigth: 160 }} border="1px">
                                                <tbody>
                                                    <tr style={{ height: 32, background: '#D9D9D9' }}>
                                                        <td style={{ textAlign: 'center', width: '423.5px', paddingTop: '5px' }} colSpan={2}>
                                                            <p style={{ margin: 0 }}><strong>SALARY BREAK UP (ANNEXURE A)</strong></p>
                                                        </td>
                                                    </tr>
                                                    <tr >
                                                        <td style={{ width: '200px', textAlign: 'left', paddingLeft: '10px' }}>&nbsp;<strong style={{ fontSize: 'large' }}>NAME:</strong></td>
                                                        <td style={{ width: '200px', wordBreak: 'break-all', textAlign: 'left', paddingLeft: '10px' }}>&nbsp;<strong>{this.state.employee.employeeName}</strong></td>
                                                    </tr>
                                                    <tr >
                                                        <td style={{ width: '200px', textAlign: 'left', paddingLeft: '10px' }}>&nbsp;<strong style={{ fontSize: 'large' }}>DESIGNATION:</strong></td>
                                                        <td style={{ width: '200px', wordBreak: 'break-all', textAlign: 'left', paddingLeft: '10px' }}>&nbsp;<strong>{this.state.employee.designation}</strong></td>
                                                    </tr>
                                                    <tr >
                                                        <td style={{ width: '200px', textAlign: 'left', paddingLeft: '10px' }}>&nbsp;<strong style={{ fontSize: 'large' }}>LOCATION:</strong></td>
                                                        <td style={{ width: '200px', wordBreak: 'break-all', textAlign: 'left', paddingLeft: '10px' }}>&nbsp;<strong>{this.state.employee.companyLocation}</strong></td>
                                                    </tr>
                                                    <tr >
                                                        <td style={{ width: '200px', textAlign: 'left', paddingLeft: '10px' }}>&nbsp;<strong style={{ fontSize: 'large' }}>COMPANY/BUSINESS UNIT:</strong></td>
                                                        <td style={{ width: '200px', wordBreak: 'break-all', textAlign: 'left', paddingLeft: '10px' }}>&nbsp;<strong>Test Yantra Software Solutions</strong></td>
                                                    </tr>
                                                </tbody>
                                            </table>

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
        } else {
            return (<h1></h1>)
        }
    }
}

export default withRouter(IncrementLetter)
