// This is Reliving letter file. 
// In this letter by providing required data the user will get all data in the document format,
// with letter header and footer.
// when the user clicks create pdf button user gets the data in the pdf format.
import React, { Component } from 'react'
import Home from '../home';
import moment from 'moment';
import '../CommonStyle.css'
import Header from '../LetterHeader/HeaderPart';
import Footer from '../LetterFooter/FooterPart'; 
import { thisExpression } from '@babel/types';
import { withRouter } from 'react-router-dom';
import PdfContainer from '../PdfComponent/PdfContainer';
import Doc from '../PdfComponent/DocService'
import { UserConsumer } from '../Context/CustomContext';

export class RelivingLetter extends Component {

  constructor(props) {
    super(props);

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
    
    let emp=this.props.empData
   
    
    if( this.props.empData!==""&& typeof(this.props.empData.salute)==="undefined"){
     emp.salute="Mr."
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
    this.props.history.push('/InputRelivingLetter');

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
    let toDate = new Date();
    let toJoiningDate = new Date(this.state.employee.joiningDate);
    let toReleiving = new Date(this.state.employee.relievingDate)

    if (this.props.empData == 0) {
      this.props.history.push("/cards")
    }
    if (this.props.empData) {
      return (
        <div>
          <Home buttonShow={true} showWatermark={(data) => this.setState({ waterMark: data })} sendData={() => this.sendData()} setHeader={(data) => this.print()} />

          <div  class="mainHeader">
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
                </div> : null}


                <div>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>&nbsp;</strong></p>
                  <p style={{ textAlign: 'center', paddingLeft: 30 }}><strong>EXPERIENCE CERTIFICATE</strong></p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>&nbsp;</strong></p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>&nbsp;</strong></p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30, margin: 0 }}><strong>Date:{(toDate.getDate())}<sup>{this.nth(toDate.getDate())}</sup>&nbsp;{moment(toDate).add().format('MMMM YYYY')}</strong></p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30, margin: 0 }}><strong>Emp ID: {this.state.employee.employeeId}</strong></p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}>This is to inform that <strong>{this.state.employee.salute}</strong> <strong> {this.state.employee.employeeName}, </strong>was working with us from <strong> {toJoiningDate.getDate()}<sup>{this.nth(toJoiningDate.getDate())}</sup>&nbsp;{moment(toJoiningDate).format('MMMM YYYY')} </strong> to <strong> {(toReleiving.getDate())}<sup>{this.nth(toReleiving.getDate())}</sup>&nbsp;{moment(toReleiving).format('MMMM YYYY')}</strong>. {this.props.empData.gender.gender1} was relieved from {this.props.empData.gender.gender2} responsibilities on <strong> {(toReleiving.getDate())}<sup>{this.nth(toReleiving.getDate())}</sup>&nbsp;{moment(toReleiving).format('MMMM YYYY')}</strong> as <strong>  {this.state.employee.designation} </strong>During {this.props.empData.gender.gender2} stay, {this.props.empData.gender.gender2} character and conduct was good. During {this.props.empData.gender.gender3} tenure, {this.props.empData.gender.gender1} was hardworking and a good team member. We wish {this.props.empData.gender.gender3} success in all {this.props.empData.gender.gender2} future endeavors.</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}>Thanks & Regards</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}>For <strong>Test Yantra Software Solutions (India) Pvt Ltd</strong></p>
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
            <img style={{position:"absolute",marginLeft: '20px',marginTop: '-92px',width:'300px',height:'100px'}}  src={this.state.image} />
       
  } 
  </div>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20, margin: 0, fontWeight: 'bolder',marginTop:'10px' }}>Authorized Signatory</p>
                  </div>
                <br />
                <br />
                <br />
               


                {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1":"footerimg"} >
                  <Footer/>
                 </div> : null}

              </div>
            </div>

            <div className="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px':'20px' }}>
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
                </div> : null}
                <div>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>&nbsp;</strong></p>
                  <p style={{ textAlign: 'center', paddingLeft: 30 }}><strong>RELIEVING LETTER</strong></p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}><strong>&nbsp;</strong></p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30, margin: 0 }}><strong>Date:  {toDate.getDate()}<sup>{this.nth(toDate.getDate())}</sup>&nbsp;{moment(toDate).format('MMMM YYYY')}</strong></p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30, margin: 0 }}><strong>Emp ID:  {this.state.employee.employeeId}</strong></p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30, paddingTop: 10 }}>Dear <strong> {this.state.employee.employeeName}</strong>,</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}>As per your resignation letter, we would like to inform you that, you are relieved from the roles and responsibilities of the company from <strong> {(toReleiving.getDate())}<sup>{this.nth(toReleiving.getDate())}</sup>&nbsp;{moment(toReleiving).format('MMMM YYYY')}.</strong> In this regard, we also wish to inform you that there are no commitments outstanding from either of us. We wish you success in all your future endeavors.</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}>Thanks & Regards</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 30 }}>For <strong>Test Yantra Software Solutions (India) Pvt Ltd</strong></p>
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
            <img style={{position:"absolute",marginLeft: '22px',marginTop: '-90px',width:'300px',height:'100px'}}  src={this.state.image} />
       
  } 
  </div>






                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20, margin: 0, fontWeight: 'bolder',marginTop:'10px' }}>Authorized Signatory</p>
               
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

export default withRouter(RelivingLetter)
