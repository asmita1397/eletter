//This file contains letter header code. It will render on each file.
import React from 'react'
import './Header.css'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";


const HeaderPart = () => {
  return (
    <header className="font-small tyHeader">
      <i className="header-copyright  tyupHeader">
         <span className="header-copyright tydownHeader">
            <span className="tydownHeaderText">Test Yantra Software Solutions (India) Private Limited</span>
        </span>
      </i>
      <MDBRow>
        <span className="tyheaderleft">TES<span className="Tlettercolor">T</span> <span className="Ylettercolor">Y</span>ANTRA</span>
      </MDBRow>
    </header>
  );
}
export default HeaderPart;

