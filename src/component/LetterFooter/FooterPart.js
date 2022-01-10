//This file contains letter Footer. It will render on each file.
import React from 'react'
import './Footer.css'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";


const FooterPart = () => {
  return (
    <footer className="font-small tyFooter">
      <span className="footer-copyright  tyupFooter">
        #88, Brigade Chambers, 3rd floor, Gandhi Bazar Main Road, Basavanagudi,Bengaluru, Karnataka 560004 CIN: U72200KA2007PTC044701  
      </span>
      <span className="footer-copyright tydownFooter">
      <MDBRow>
        <MDBCol size="4"><i className="fa fa-phone" aria-hidden="true"></i>
               <span className="typhone">+91-80-4120 4235</span></MDBCol>
        <MDBCol size="4"><i className="fa fa-globe"></i>
              <span className="tyemail">www.testyantra.com</span></MDBCol>
        <MDBCol size="4"><i className="fa fa-envelope"></i>
             <span className="tycontact">contactus@testyantra.com</span></MDBCol>
      
      </MDBRow>
      </span>
    </footer>
  );
}
export default FooterPart;