//This file contains all cards.
import React, { Component } from "react";
import "../component/Cards.css";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Link,
} from "react-router-dom";
import Home from "./home";
import exit from "./Assests/exit.svg";
import confirm from "./Assests/confirm.png";
import certificate from "./Assests/Certificate.png";
import Deputation from "./Assests/Deputation.png";
import Designation from "./Assests/Designation.png";
import Confirm from "./Assests/confirm.png";
import home from "./Assests/home.png";
import HR from "./Assests/HR.png";
import increment from "./Assests/Increment.png";
import offer from "./Assests/Offer.png";
import relieve from "./Assests/relieve.png";
import intern from "./Assests/intern.png";
import training from "./Assests/training.png";
import TrainingCommit from "./Assests/TrainingCommit.png";
import offerletter2 from "./Assests/offerLetter2.png";
import salaryRevision from "./Assests/salaryRevision.png";
import BDPolicy from "./Assests/BDPolicy.png";
import hrPolicy from "./Assests/hrPolicy.png";
import ProjectPolicy from "./Assests/ProjectPolicy.png";
import ITPolicy from "./Assests/ITpolicy.png";
import ConsultantOffer from "./Assests/Consultant.png";
import DeliveryPolicy from "./Assests/DeliveryPolicy.png";
import NoDue from "./Assests/NoDue.png";

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emp: [],
    };
  }

  render() {
    return (
      <div>
        <Home />

        <div className="mt-5 pt-5 pl-5 pr-5">
          <div className="row ">
            <div className="column">
              <Link to="/hr">
                <div className=" card-css ">
                  <img
                    style={{
                      width: "70%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={HR}
                    className="card-css-img-top"
                    alt="..."
                  />
                  <div style={{ color: "#343A40" }}>
                    <h6 className="font-weight-bold">HR Letter</h6>
                  </div>
                </div>
              </Link>
            </div>

            <div className="column">
              <Link to="/InputConfirmation">
                <div className="card-css ">
                  <img
                    style={{
                      width: "70%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={confirm}
                    className="card-css-img-top"
                    alt="..."
                  />
                  <div style={{ color: "#343A40" }}>
                    <h6 className="font-weight-bold">Confirmation Letter</h6>
                  </div>
                </div>
              </Link>
            </div>

            <div className="column">
              <Link to="/InputcertificateLetter">
                <div className="card-css ">
                  <img
                    style={{
                      width: "70%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={certificate}
                    className="card-css-img-top"
                    alt="..."
                  />
                  <div style={{ color: "#343A40" }}>
                    <h6 className="font-weight-bold">Certificate Letter</h6>
                  </div>
                </div>
              </Link>
            </div>

            <div className="column">
              <Link to="/InputDepuationLetter">
                <div className="card-css">
                  <img
                    style={{
                      width: "70%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={Deputation}
                    className="card-css-img-top"
                    alt="..."
                  />
                  <div style={{ color: "#343A40" }}>
                    <h6 className="font-weight-bold">Depuatation Letter</h6>
                  </div>
                </div>
              </Link>
            </div>

            <div className="column">
              <Link to="/InputDesignationLetter">
                <div className="card-css  ">
                  <img
                    style={{
                      width: "70%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={Designation}
                    className="card-css-img-top"
                    alt="..."
                  />
                  <div style={{ color: "#343A40" }}>
                    <h6 className="font-weight-bold">Designation Letter</h6>
                  </div>
                </div>
              </Link>
            </div>
            <div className="column">
              <Link to="/InputIncrementLetter">
                <div className="card-css  ">
                  <img
                    style={{
                      width: "70%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={increment}
                    className="card-css-img-top"
                    alt="..."
                  />
                  <div style={{ color: "#343A40" }}>
                    <h6 className="font-weight-bold">Increment Letter</h6>
                  </div>
                </div>
              </Link>
            </div>
            <div className="column">
              <Link to="/InputIntentLetter">
                <div className="card-css  ">
                  <img
                    style={{
                      width: "70%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={offer}
                    className="card-css-img-top"
                    alt="..."
                  />
                  <div style={{ color: "#343A40" }}>
                    <h6 className="font-weight-bold">Intent Letter</h6>
                  </div>
                </div>
              </Link>
            </div>
            <div className="column">
              <Link to="/InputRelivingLetter">
                <div className="card-css  ">
                  <img
                    style={{
                      width: "70%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={relieve}
                    className="card-css-img-top"
                    alt="..."
                  />
                  <div style={{ color: "#343A40" }}>
                    <h6 className="font-weight-bold">Reliving Letter</h6>
                  </div>
                </div>
              </Link>
            </div>
            <div className="column">
              <Link to="/InputTrainingCommitLetter">
                <div className="card-css  ">
                  <img
                    style={{
                      width: "70%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={TrainingCommit}
                    className="card-css-img-top"
                    alt="..."
                  />
                  <div style={{ color: "#343A40" }}>
                    <h6 className="font-weight-bold">Training Letter</h6>
                  </div>
                </div>
              </Link>
            </div>
            <div className="column">
              <Link to="/InputExitLetter">
                <div className="card-css  ">
                  <img
                    style={{
                      width: "70%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={exit}
                    className="card-css-img-top"
                    alt="..."
                  />
                  <div style={{ color: "#343A40" }}>
                    <h6 className="font-weight-bold">Exit Letter</h6>
                  </div>
                </div>
              </Link>
            </div>
            <div className="column">
              <Link to="/InputInternship">
                <div className="card-css  ">
                  <img
                    style={{
                      width: "70%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={intern}
                    className="card-css-img-top"
                    alt="..."
                  />
                  <div style={{ color: "#343A40" }}>
                    <h6 className="font-weight-bold">Internship Letter</h6>
                  </div>
                </div>
              </Link>
            </div>
            <div className="column">
              <Link to="/InputOfferLetter2">
                <div className="card-css  ">
                  <img
                    style={{
                      width: "70%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={offerletter2}
                    className="card-css-img-top"
                    alt="..."
                  />
                  <div style={{ color: "#343A40" }}>
                    <h6 className="font-weight-bold">Offer Letter</h6>
                  </div>
                </div>
              </Link>
            </div>
            <div className="column">
              <Link to="/InputHrPolicy">
                <div className="card-css  ">
                  <img
                    style={{
                      width: "70%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={hrPolicy}
                    className="card-css-img-top"
                    alt="..."
                  />
                  <div style={{ color: "#343A40" }}>
                    <h6 className="font-weight-bold">HR Policy Letter</h6>
                  </div>
                </div>
              </Link>
            </div>
            <div className="column">
              <Link to="/InputBDPolicy">
                <div className="card-css  ">
                  <img
                    style={{
                      width: "70%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={BDPolicy}
                    className="card-css-img-top"
                    alt="..."
                  />
                  <div style={{ color: "#343A40" }}>
                    <h6 className="font-weight-bold">BD Policy Letter</h6>
                  </div>
                </div>
              </Link>
            </div>
            <div className="column">
              <Link to="/InputConsultantOffer">
                <div className="card-css  ">
                  <img
                    style={{
                      width: "70%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={ConsultantOffer}
                    className="card-css-img-top"
                    alt="..."
                  />
                  <div style={{ color: "#343A40" }}>
                    <h6 className="font-weight-bold">Consultant Letter</h6>
                  </div>
                </div>
              </Link>
            </div>
            <div className="column">
              <Link to="/InputSalaryRevision">
                <div className="card-css  ">
                  <img
                    style={{
                      width: "70%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={salaryRevision}
                    className="card-css-img-top"
                    alt="..."
                  />
                  <div style={{ color: "#343A40" }}>
                    <h6 className="font-weight-bold">Salary Revision Letter</h6>
                  </div>
                </div>
              </Link>
            </div>
            <div className="column">
              <Link to="/InputProjectPolicy">
                <div className="card-css  ">
                  <img
                    style={{
                      width: "70%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={ProjectPolicy}
                    className="card-css-img-top"
                    alt="..."
                  />
                  <div style={{ color: "#343A40" }}>
                    <h6 className="font-weight-bold">Project Policy Letter</h6>
                  </div>
                </div>
              </Link>
            </div>
            <div className="column">
              <Link to="/InputITPolicy">
                <div className="card-css  ">
                  <img
                    style={{
                      width: "70%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={ITPolicy}
                    className="card-css-img-top"
                    alt="..."
                  />
                  <div style={{ color: "#343A40" }}>
                    <h6 className="font-weight-bold">IT Policy Letter</h6>
                  </div>
                </div>
              </Link>
            </div>
            <div className="column">
              <Link to="/InputDeliveryPolicy">
                <div className="card-css  ">
                  <img
                    style={{
                      width: "70%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={DeliveryPolicy}
                    className="card-css-img-top"
                    alt="..."
                  />
                  <div style={{ color: "#343A40" }}>
                    <h6 className="font-weight-bold">Delivery Policy Letter</h6>
                  </div>
                </div>
              </Link>
            </div>
            <div className="column">
              <Link to="/InputNoDueLetter">
                <div className="card-css  ">
                  <img
                    style={{
                      width: "70%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={NoDue}
                    className="card-css-img-top"
                    alt="..."
                  />
                  <div style={{ color: "#343A40" }}>
                    <h6 className="font-weight-bold">NoDue Letter</h6>
                  </div>
                </div>
              </Link>
            </div>
            <div className="column">
              <Link to="/InputAnnexure">
                <div className="card-css  ">
                  <img
                    style={{
                      width: "70%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={NoDue}
                    className="card-css-img-top"
                    alt="..."
                  />
                  <div style={{ color: "#343A40" }}>
                    <h6 className="font-weight-bold">Annexure</h6>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
