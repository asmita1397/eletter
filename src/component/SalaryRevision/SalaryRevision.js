// This is Salary letter file.
// In this letter by providing required data the user will get all data in the document format,
//with letter header and footer.
// when the user clicks create pdf button user gets the data in the pdf format.
import React, { Component } from 'react'
import Home from '../home';
import '../CommonStyle.css'
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import Header from '../LetterHeader/HeaderPart';
import Footer from '../LetterFooter/FooterPart'; 
import PdfContainer from '../PdfComponent/PdfContainer';
import Doc from '../PdfComponent/DocService'
import { UserConsumer } from '../Context/CustomContext';

export class SalaryRevision extends Component {

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

    this.setState({
      employee: this.props.empData,
    })
    console.log("DDDDDDDDDDDDDDDDDDd", this.props.empData)

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
    this.props.history.push('/InputSalaryRevision');

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

    let incrementInEffectDate = new Date(this.state.employee.incrementInEffectDate);

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
              <PdfContainer id={"salrevletter"} name={this.state.employee.employeeName} createPdf={this.createPdf}>
                <div className="card" ref={this.bodyRef} id="AFourPage">
                  <div className="card-body pb-0">

                    <div>

                      {this.state.waterMark ? <header className="headerimg" >
                      <Header/>
                       </header> : null}

                      {console.log("watermark------------------", this.props.waterMark)}
                      <p style={{ float: 'right' }}></p>
                      <div>
                        <p style={{ textAlign: 'left', paddingLeft: 30, paddingRight: 30, marginTop: 150 }} align="JUSTIFY"><span ><strong>{toDayDate.getDate()}<sup>{this.nth(toDayDate.getDate())}</sup>&nbsp;{moment(toDayDate).format('MMMM YYYY')}</strong></span></p>
                        <p style={{ paddingLeft: 30, textAlign: 'justify' }}>&nbsp;</p>
                        <p style={{ paddingLeft: 30, textAlign: 'justify' }}>To<br /> <br /> <strong>{this.state.employee.employeeName}</strong><strong>,</strong></p>
                        <p style={{ paddingLeft: 30, textAlign: 'justify' }}><strong>Employee ID: {this.state.employee.employeeId}</strong></p>
                        <p style={{ paddingLeft: 30, textAlign: 'justify' }}>&nbsp;</p>

                        <p style={{ paddingLeft: 30, textAlign: 'justify' }}>Subject: Change in Annual Salary Compensation</p>
                        <p style={{ paddingLeft: 30, textAlign: 'justify' }}>&nbsp;</p>
                        <p style={{ paddingLeft: 30, textAlign: 'justify' }}> Dear <strong>{this.state.employee.employeeName},</strong><strong><br /> <br /> </strong></p>
                        <p style={{ paddingLeft: 30, textAlign: 'justify' }}>This is with reference to your Offer letter dated ( DOJ ). As per the Salary clause mentioned in your Offer, we confirm to revise your Annual CTC from INR <strong>{this.state.employee.salaryIncrementedFrom}</strong> to INR <strong>{this.state.employee.salaryIncrementedTo}</strong>. This revision is effective <span ><strong>{incrementInEffectDate.getDate()}<sup>{this.nth(incrementInEffectDate.getDate())}</sup>&nbsp;{moment(this.state.employee.incrementInEffectDate).format('MMMM YYYY')}</strong></span></p>
                        <p style={{ paddingLeft: 30, textAlign: 'justify' }}>&nbsp;</p>
                        <p style={{ paddingLeft: 30, textAlign: 'justify' }}>Further, your Salary revision shall be revised Annually, based on your performance and will be aligned to Performance appraisal policy adopted by the Company. &nbsp;</p>
                        <p style={{ paddingLeft: 30, textAlign: 'justify' }}>&nbsp;</p>
                        <p style={{ paddingLeft: 30, textAlign: 'justify' }}>The Salary Annexure is attached along with this letter. All other terms and conditions remains the same as per your Employment Offer.</p>
                        <p style={{ paddingLeft: 30, textAlign: 'justify' }}>&nbsp;</p>
                        <p style={{ paddingLeft: 30, textAlign: 'justify' }}>&nbsp;</p>
                        <p style={{ paddingLeft: 30, textAlign: 'justify' }}>Wish you all the best.<br /> </p>
                        <p style={{ paddingLeft: 30, textAlign: 'justify' }}>&nbsp;</p>
                        <p style={{ paddingLeft: 30, textAlign: 'justify' }}><strong>&nbsp;</strong></p>


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
            <img style={{position:"absolute",marginLeft: '30px',marginTop: '-102px',width:'300px',height:'100px'}}  src={this.state.image} />
       
  } 
  </div>









                        <p style={{ paddingLeft: 30, textAlign: 'justify' }}><strong>Authorized Signatory </strong></p>
                        <p style={{ paddingLeft: 60, textAlign: 'justify' }}>&nbsp;</p>
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
      return (
        <h1></h1>)
    }
  }
}

export default withRouter(SalaryRevision)
