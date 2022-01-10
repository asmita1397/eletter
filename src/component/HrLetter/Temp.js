import React, { Component } from 'react'
import '../HrLetter/Temp.css'
import TyHeader from '../Assests/TYHeader.PNG';
import TyFooter from '../Assests/TYFooter.PNG'
import moment from 'moment';
export default class Temp extends Component {


  nth=(d)=> {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }


    render() {
      let toDayDate=new Date()
      let joiningDate=new Date();
        return (
            <div>





<table border={0} width="50%"> 
  <thead> 
    <tr> 
      <th style={{width: '100%'}}>   <header className="header" >
               
               <img   src={TyHeader}></img>

             </header>
        </th> 
    </tr> 
   
  </thead> 
  <tfoot>
    <tr> 
      <td width="100%"> 
        <table width="100%" border={0}> 
          <tbody><tr> 
           
            </tr> 
          </tbody></table> 
      </td></tr></tfoot>
  <tbody> 
    <tr> 
      <td width="100%"> 
      <div className="card" id="AFourPage">
      
      <div className="card-body">

    

        <div>

        
          {console.log("watermark------------------",this.props.waterMark)}
        <p style={{float:'right'}}></p>
          <p style={{ textAlign: 'justify' }}>&nbsp;</p>
          <p style={{ textAlign: 'justify' }}>&nbsp;</p>
          <p style={{ textAlign: 'left',paddingLeft: 30, paddingRight: 30,marginTop:150 }} align="JUSTIFY"><span ><strong>Date: {toDayDate.getDate()}<sup>{this.nth(toDayDate.getDate())}</sup>&nbsp;{moment(toDayDate).format('MMMM YYYY')}</strong></span></p>
          <p style={{ textAlign: 'justify' }} align="CENTER">&nbsp;</p>
          <p style={{ textAlign: 'center' }} align="CENTER"><span ><span style={{ fontSize: 'large' }}><strong>TO WHOMSOEVER IT MAY CONCERN</strong></span></span></p>
          <p style={{ textAlign: 'justify' }} align="CENTER">&nbsp;</p>
          <p style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30 }} align="JUSTIFY"><span ><strong>Sub: Information as per HR Records</strong></span></p>
          <p style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30 }}>&nbsp;</p>

          <p style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30 }} align="JUSTIFY">&nbsp;</p>
       
          <p lang="en-IN" style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30 }}>&nbsp;</p>
          <p style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30 }} align="JUSTIFY"><span >For Test Yantra Software Solutions (India) Pvt Ltd</span></p>
          <p style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30 }}>&nbsp;</p>
          <p style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30 }}><span ><strong>Authorized Signatory</strong></span></p>
          <p>&nbsp;</p>
        </div>
     
      </div>
      </div>

          
      </td> 
    </tr>
  </tbody> 
</table>

<table id="footer" width="100%"> 
  <tr> 
  <td width="100%"> 
  <footer className="footer">
               
               <img  src={TyFooter}></img>

             </footer>
  </td>
  </tr>
</table>

















                
{/* 
                <table class="report-container">
   <thead class="report-header">
     <tr>
        <th class="report-header-cell">
           <div class="header-info">
           <header className="header" style={{marginLeft: '280px',/* marginTop: '-115px' }}>
               
               <img   src={TyHeader}></img>

             </header>
           </div>
         </th>
      </tr>
    </thead>
    <tfoot class="report-footer">
      <tr>
         <td class="report-footer-cell">
           <div class="footer-info">
           <footer className="footer" style={{marginLeft: '-141px',marginTop: '-115px'}}>
               
               <img  src={TyFooter}></img>

             </footer>
           </div>
          </td>
      </tr>
    </tfoot>
    <tbody class="report-content">
      <tr>
         <td class="report-content-cell">
            <div class="main">
          
            <div className="card" id="AFourPage">
      
      <div className="card-body">

    

        <div>

        
          {console.log("watermark------------------",this.props.waterMark)}
        <p style={{float:'right'}}></p>
          <p style={{ textAlign: 'justify' }}>&nbsp;</p>
          <p style={{ textAlign: 'justify' }}>&nbsp;</p>
          <p style={{ textAlign: 'left',paddingLeft: 30, paddingRight: 30,marginTop:150 }} align="JUSTIFY"><span ><strong>Date: {toDayDate.getDate()}<sup>{this.nth(toDayDate.getDate())}</sup>&nbsp;{moment(toDayDate).format('MMMM YYYY')}</strong></span></p>
          <p style={{ textAlign: 'justify' }} align="CENTER">&nbsp;</p>
          <p style={{ textAlign: 'center' }} align="CENTER"><span ><span style={{ fontSize: 'large' }}><strong>TO WHOMSOEVER IT MAY CONCERN</strong></span></span></p>
          <p style={{ textAlign: 'justify' }} align="CENTER">&nbsp;</p>
          <p style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30 }} align="JUSTIFY"><span ><strong>Sub: Information as per HR Records</strong></span></p>
          <p style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30 }}>&nbsp;</p>

          <p style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30 }} align="JUSTIFY">&nbsp;</p>
       
          <p lang="en-IN" style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30 }}>&nbsp;</p>
          <p style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30 }} align="JUSTIFY"><span >For Test Yantra Software Solutions (India) Pvt Ltd</span></p>
          <p style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30 }}>&nbsp;</p>
          <p style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30 }}><span ><strong>Authorized Signatory</strong></span></p>
          <p>&nbsp;</p>
        </div>
     
      </div>
      </div>

            </div>
          </td>
       </tr>
     </tbody>
</table>

 */}
            </div>
        )
    }
}
