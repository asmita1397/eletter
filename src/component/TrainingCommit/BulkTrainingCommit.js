//This is bulk uploading Training Commit Letter file. 
//In this file by uploading bulk details with excel format, 
//The user will get all Training Commit letter in the document format with letter header and footer.
// when the user clicks create pdf button the user gets all the documents in the pdf format.
import React, { Component } from 'react'
import Home from '../home';
import '../CommonStyle.css'
import Header from '../LetterHeader/HeaderPart';
import Footer from '../LetterFooter/FooterPart'; 
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import './Trainingcommit.css';
import PdfContainer from '../PdfComponent/PdfContainer';
import Doc from '../PdfComponent/DocService'
import { UserConsumer } from '../Context/CustomContext';

class BulkTrainingCommit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      employee: [],
      waterMark: false,
      pix: false
    }

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
    this.props.history.push('/InputTrainingCommitLetter');

  }
  createPdf = async(html, name,id) => {
    window.scrollTo(0, 0);
    
    const ex=[document.getElementsByClassName('pdf-body')[id]];
    await Doc.createPdf(ex, name)
    
  }

  render() {

    
      let value = this.context;

      let employeeDetails=this.state.employee.map((item) => {
        let o = Object.assign({},item);
        
        if(item.salute==="Mr.")
        {
         o.gender = {
           gender1:'He',
             gender2:'his',
             gender3:'him'
         };
        }
        else{
         o.gender = {
           gender1:'She',
             gender2:'her',
             gender3:'her'
         };
        }
        return o;
     })


      let toJoiningDate="";
      let toTraningStart="";
      let toTraningEnd="";
    if (this.props.empData == 0) {
     window.history.back();
    }

    let toDate = new Date()
    if (this.state.employee.length > 0) {
      return (
        employeeDetails.map((item,index) => {
          
          toJoiningDate = new Date((item.joiningDate - (25567 + 2)) * 86400 * 1000)
          toTraningStart = new Date((item.trainingStartDate - (25567 + 2)) * 86400 * 1000)
          toTraningEnd = new Date((item.trainingEndDate - (25567 + 2)) * 86400 * 1000)
                        

      return (
        <div id='container-id'>
          <Home buttonShow={true} showWatermark={(data) => this.setState({ waterMark: data })} sendData={() => this.sendData()} setHeader={(data) => this.print()} />
          <div  class="mainHeader">
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
                  <p style={{ textAlign: 'justify' }} align="CENTER">&nbsp;</p>
                  <p style={{ textAlign: 'justify' }} align="CENTER">&nbsp;</p>
                  <p style={{ textAlign: 'justify' }} align="CENTER">&nbsp;</p>
                  <p style={{ textAlign: 'left' }} align="JUSTIFY"><span style={{ color: '#000000' }}><span  ><strong>Date: {toDate.getDate()}<sup>{this.nth(toDate.getDate())}</sup>&nbsp;{moment(toDate).format('MMMM YYYY')}</strong></span></span></p>
                  <p style={{ textAlign: 'left' }} align="JUSTIFY"><span style={{ color: '#000000' }}><span  ><strong>Place: {item.companyLocation}</strong></span></span></p>
                  <p style={{ textAlign: 'justify' }} align="CENTER">&nbsp;</p>
                  <p style={{ textAlign: 'center' }} align="CENTER"><span style={{ color: '#000000' }}><span  ><strong style={{ fontSize: 'x-large' }}>To Whomsoever It may concern </strong></span></span></p>
                  <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }} align="JUSTIFY"><span style={{ color: '#000000' }}><span  >This is to certify that </span></span><span style={{ color: '#000000' }}><span  ><strong> {item.salute} {item.employeeName} </strong></span></span><span style={{ color: '#000000' }}><span  >is an employee in this organization. {item.gender.gender1} is presently holding the post as </span></span><span style={{ color: '#000000' }}><span  ><strong>{item.designation}</strong></span></span><span style={{ color: '#000000' }}><span  >. {item.gender.gender1} joined this organization on </span></span><span style={{ color: '#000000' }}><span  ><strong>{toJoiningDate.getDate()}<sup>{this.nth(toJoiningDate.getDate())}</sup>&nbsp;{moment(toJoiningDate).format('MMMM YYYY')}</strong></span></span><span style={{ color: '#000000' }}><span  >.</span></span></p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }} align="JUSTIFY"><span style={{ color: '#000000' }}><span  >Further this organization has </span></span><span style={{ color: '#000000' }}><span  ><strong>No Objection</strong></span></span><span style={{ color: '#000000' }}><span  > for </span></span><span style={{ color: '#000000' }}><span  ><strong>{item.salute} {item.employeeName} </strong></span></span><span style={{ color: '#000000' }}><span  >joining to</span></span><span style={{ color: '#000000' }}><span  ><strong> {item.courseName} Course</strong></span></span><span style={{ color: '#000000' }}><span  > at </span></span><span style={{ color: '#000000' }}><span  ><strong>{item.branchName},</strong></span></span> <span style={{ color: '#000000' }}><span  ><strong>{item.branchLocation} Branch. </strong></span></span></p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>Thanks & Regards</p>

                  <p style={{ textAlign: 'left', paddingLeft: 20, paddingRight: 20 }}><span style={{ color: '#000000' }}>For </span><span style={{ color: '#000000' }}><strong>Test Yantra Software Solutions (India ) Pvt Ltd</strong></span></p>
                  <br />
                  <br />
                  <br />
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20, margin: 0, fontWeight: 'bolder' }}>Authorized Signatory</p>
                 {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1":"footerimg"} >
                  <Footer/>
                   </div> : null}



                </div>

              </div>
            </div>
            



            <div className="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px':'20px' }}>
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
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}><strong>&nbsp;</strong></p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}><strong>Date:  {toDate.getDate()}<sup>{this.nth(toDate.getDate())}</sup>&nbsp;{moment(toDate).format('MMMM YYYY')}</strong></p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20, margin: 0 }}><strong>To,</strong></p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20, margin: 0 }}><strong>The Management,</strong>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}><strong>&nbsp;Subject: Training&nbsp; </strong></p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}><strong>&nbsp;</strong></p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>I am <strong> {item.employeeName} </strong>working in Test Yantra Software Solutions Pvt Ltd or Qspiders or Jspiders (u/o) Test Yantra Software Solutions Pvt Ltd as <strong> {item.designation}</strong> from <strong>{toJoiningDate.getDate()}<sup>{this.nth(toJoiningDate.getDate())}</sup>&nbsp;{moment(toJoiningDate).format('MMMM YYYY')}.</strong></p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>I am willing to undergo training in<strong>  {item.courseName}</strong>. I would request you to permit me to take the course at Qspiders / JSpiders. Below is the details of Course and period of Training.</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20, margin: 0 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20, margin: 0 }}><strong>Course Name</strong>: <strong> {item.courseName}</strong></p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20, margin: 0 }}><strong>Training Start Date</strong>: <strong>{toTraningStart.getDate()}<sup>{this.nth(toTraningStart.getDate())}</sup>&nbsp;{moment(toTraningStart).format('MMMM YYYY')}</strong></p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20, margin: 0 }}><strong>Training End Date:  {toTraningEnd.getDate()}<sup>{this.nth(toTraningEnd.getDate())}</sup>&nbsp;{moment(toTraningEnd).format('MMMM YYYY')}</strong></p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20, margin: 0 }}><strong>SPOC</strong></p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20, margin: 0 }}><strong>Location:</strong>  {item.branchName},  {item.branchLocation}</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>I hereby promise and accept that</p>
                  <p style={{ textAlign: 'justify' }}>&nbsp;</p>
                  <ol style={{ textAlign: 'justify' }}>
                    <ol>
                      <li>I will not misuse the data, which I use for day to day business operations.</li>
                      <li>I shall not quit while I am perusing the Training.</li>
                      <li>I would commit to work for a minimum period of 12 months after completion of Training.</li>
                      <li>I will not join any organization which is competitor to Test Yantra Software Solutions Pvt Ltd and its units Qspiders and Jspiders for 12 Months.</li>
                      <li>I will accept relocation / project allocation on any Testing area and shall not deny the opportunities / interviews provided to me.</li>
                    </ol>
                  </ol>
                </div>

                {this.state.waterMark ? <div className={value.pdfVal ? "footerimg1":"footerimg"} >
                  <Footer/>
                 </div> : null}
              </div>
            </div>





            <div className="card" id="AFourPage" style={{ marginTop: value.pdfVal ? '0px':'20px' }}>
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
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>This Agreement constitutes the entire understanding between the parties and supersedes any and all prior or contemporaneous understandings and agreements, whether oral or written, between the parties with respect to the subject matter hereof.</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>This Agreement can only be modified by a written amendment signed by the party against whom enforcement of such modification is sought.</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>I agree that I have not shared the data accumulated with any organization or anybody in past and will not share in future.</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>If Test Yantra Software Solutions Pvt Ltd or its units Qspiders or Jspiders figures out that I have misused data as mentioned above, Test Yantra Software Solutions Pvt Ltd and u/o Test Yantra Software Solutions Pvt Ltd hold legal rights to file a case against me and to take legal action.</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>I hereby agree to abide by the same in its true spirit and meaning.</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}><strong>IN WITNESS WHEREOF</strong>, the parties hereto have executed this Agreement as of the date first above written.</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>Thanking you,</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>&nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}><span style={{position :"absolute"}}>Signature:</span> <span style={{position :"absolute",right:"354px" }}>Signature:</span></p>
                  <p style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                  <div style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}><span >Name:</span> <span style={{position :"absolute",right:"140px" }}>for <strong>Test Yantra Software Solutions</strong></span></div>
                  <div style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}><span >Designation:</span></div>
                  <div style={{ textAlign: 'justify', paddingLeft: 20, paddingRight: 20 }}><span >Date:</span></div>
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
      ) }))  
    } else {
      return (<h1></h1>)
    }
  }

}

export default withRouter(BulkTrainingCommit)
