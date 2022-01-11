import React, { Component } from "react";
import Home from "./component/home";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import InputHRLetter from "./component/HrLetter/InputHRLetter";
import Cards from "./component/Cards";
import HRLetter from "./component/HrLetter/HRLetter";

import InputConfirmationLetter from "./component/ConfirmationLetter/InputConfirmationLetter";
import ConfirmationLetter from "./component/ConfirmationLetter/ConfirmationLetter";
import InputCertificateLetter from "./component/CertificateLetter/InputCertificateLetter";
import CertificateLetter from "./component/CertificateLetter/CertificateLetter";
import InputDepuationLetter from "./component/DepuationLetter/InputDepuationLetter";
import DepuationLetter from "./component/DepuationLetter/DepuationLetter";
import InputIncrementLetter from "./component/IncrementLetter/InputIncrementLetter";
import IncrementLetter from "./component/IncrementLetter/IncrementLetter";
import InputDesignationLetter from "./component/DesignationLetter/InputDesignationLetter";
import DesignationLetter from "./component/DesignationLetter/DesignationLetter";
import InputRelivingLetter from "./component/RelivingLetter/InputRelivingLetter";
import RelivingLetter from "./component/RelivingLetter/RelivingLetter";
import InputExitLetter from "./component/ExitLetter/InputExitLetter";
import ExitLetter from "./component/ExitLetter/ExitLetter";
import Login from "./component/Login/Login";

import TrainingCommit from "./component/TrainingCommit/TrainingCommit";
import { InputTrainingCommitLetter } from "./component/TrainingCommit/InputTrainingCommit";

import { InternshipLetter } from "./component/InternshipLetter/InternshipLetter";
import { InputIntershipLetter } from "./component/InternshipLetter/InputIntershipLetter";
import Dropdown from "./component/dropdown";
import { InputOffer2Letter } from "./component/Offer Letter2/InputOffer2";
import Offer2 from "./component/Offer Letter2/OfferLetter2";
import Intent from "./component/LetterOfIntent/Intent";
import InputIntentLetter from "./component/LetterOfIntent/InputIntentLetter";
import Example from "./component/LetterHead";
import CheckSign from "./component/checksign";
import MailComponent from "./component/Email/MailComponent";
import Form from "./component/Form1";
import Form1 from "./component/Form1";
import Temp from "./component/HrLetter/Temp";
import { InputHrPolicy } from "./component/HrPolicy/InputHrPolicy";
import { HrPolicy } from "./component/HrPolicy/HrPolicy";
import { InputBDPolicy } from "./component/BDPolicy/InputBDPolicy";
import { BDPolicy } from "./component/BDPolicy/BDPolicy";
import { ConsultantOffer } from "./component/ConsultantOffer/ConsultantOffer";
import { InputConsultantOffer } from "./component/ConsultantOffer/InputConsultantOffer";
import { InputSalaryRevision } from "./component/SalaryRevision/InputSalaryRevision";
import { SalaryRevision } from "./component/SalaryRevision/SalaryRevision";
import { ProjectPolicy } from "./component/ProjectPolicy/ProjectPolicy";
import { InputProjectPolicy } from "./component/ProjectPolicy/InputProjectPolicy";
import { InputDeliveryPolicy } from "./component/DeliveryPolicy/InputDeliveryPolicy";
import { DeliveryPolicy } from "./component/DeliveryPolicy/DeliveryPolicy";
import { InputITPolicy } from "./component/ITPolicy/InputITPolicy";
import { ITPolicy } from "./component/ITPolicy/ITPolicy";
import { UserProvider } from "./component/Context/CustomContext";
import { BulkHR } from "./component/HrLetter/BulkHR";
import BulkConfirmationLetter from "./component/ConfirmationLetter/BulkConfirmationLetter";
import { BulkDesignationLetter } from "./component/DesignationLetter/BulkDesignationLetter";
import BulkInput from "./component/BulkInput/BulkInput";
import { BulkIntent } from "./component/LetterOfIntent/BulkIntent";
import { BulkRelivingLetter } from "./component/RelivingLetter/BulkRelivingLetter";
import { BulkDepuationLetter } from "./component/DepuationLetter/BulkDepuationLetter";
import { BulkIncrementLetter } from "./component/IncrementLetter/BulkIncrementLetter";
import BulkTrainingCommit from "./component/TrainingCommit/BulkTrainingCommit";
import { BulkExitLetter } from "./component/ExitLetter/BulkExitLetter";
import { BulkInternshipLetter } from "./component/InternshipLetter/BulkInternshipLetter";
import { BulkOfferLetter2 } from "./component/Offer Letter2/BulkOfferLetter2";
import { BulkHrPolicy } from "./component/HrPolicy/BulkHrPolicy";
import { BulkBDPolicy } from "./component/BDPolicy/BulkBDPolicy";
import { BulkConsultantOffer } from "./component/ConsultantOffer/BulkConsultantOffer";
import { BulkSalaryRevision } from "./component/SalaryRevision/BulkSalaryRevision";
import { BulkProjectPolicy } from "./component/ProjectPolicy/BulkProjectPolicy";
import { BulkITPolicy } from "./component/ITPolicy/BulkITPolicy";
import { BulkDeliveryPolicy } from "./component/DeliveryPolicy/BulkDeliveryPolicy";
import { NoDueLetter } from "./component/NoDueLetter/NoDueLetter";
import { BulkNoDueLetter } from "./component/NoDueLetter/BulkNoDueLetter";
import { InputNoDueLetter } from "./component/NoDueLetter/InputNoDueLetter";
import { BulkCertificateLetter } from "./component/CertificateLetter/BulkCertificateLetter";
import ReactFirebaseFileUpload from "./component/DigitalSignature";
import Annexure from "./component/Annexure/Annexure";
import AddAnnexure from "./component/Annexure/AddAnnexure";
import annexureJson from "./component/finalAnnexure.json";
import annexureDropDown from "./component/annexureRange.json";
import ViewAnnexure from "./component/Annexure/ViewAnnexure";
export class App extends Component {
  constructor(props) {
    super(props);
    localStorage.setItem("editClick", false);
    this.state = {
      emp: "",
      show: "",
      buttonVal: false,
      pdfVal: false,
      annexureData: annexureJson,
      annexureDropdown: annexureDropDown,
      selectedSalaryRange: "21000-27324",
      updateAnnexure: (val) => {
        this.setState({
          annexureData: val,
        });
      },
      updateAnnexureDropdown: (val) => {
        this.setState({
          annexureDropdown: val,
        });
      },
      buttonValMethod: (data) => {
        this.setState({
          buttonVal: data,
        });
      },
      pdfValMethod: (val) => {
        this.setState({
          pdfVal: val,
        });
      },
      annexureDataMethod: (val) => {
        this.setState({
          basic: val,
        });
      },
    };
  }

  employee = (data) => {
    this.setState({
      emp: data,
    });
  };

  showWatermark = (data) => {
    this.setState({
      show: data,
    });
  };
  showUrl = (data) => {
    this.setState({
      show: data,
    });
  };

  render() {
    console.log(this.state.buttonVal);
    return (
      <div className="App">
        <UserProvider value={this.state}>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/cards" component={Cards}></Route>

          <Route
            exact
            path="/drop"
            render={() => {
              return (
                <Dropdown
                  ParentbuttonVal={this.buttonValMethod}
                  Parentbutton={this.state.buttonVal}
                />
              );
            }}
          ></Route>

          <Route
            exact
            path="/hr"
            render={() => {
              return (
                <InputHRLetter
                  empData={this.state.emp}
                  clicked={this.employee.bind()}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/hrLetter"
            render={() => {
              return (
                <HRLetter
                  empData={this.state.emp}
                  navBarData={this.state.show}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/bulkhrletter"
            render={() => {
              return (
                <BulkHR empData={this.state.emp} navBarData={this.state.show} />
              );
            }}
          ></Route>

          <Route
            exact
            path="/InputConfirmation"
            render={() => {
              return (
                <InputConfirmationLetter
                  empData={this.state.emp}
                  clicked={this.employee.bind()}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/confirmationLetter"
            render={() => {
              return <ConfirmationLetter empData={this.state.emp} />;
            }}
          ></Route>
          <Route
            exact
            path="/bulkconfirmationletter"
            render={() => {
              return <BulkConfirmationLetter empData={this.state.emp} />;
            }}
          ></Route>

          <Route
            exact
            path="/InputcertificateLetter"
            render={() => {
              return (
                <InputCertificateLetter
                  empData={this.state.emp}
                  clicked={this.employee.bind()}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/certificateLetter"
            render={() => {
              return <CertificateLetter empData={this.state.emp} />;
            }}
          ></Route>
          <Route
            exact
            path="/bulkcertificateletter"
            render={() => {
              return <BulkCertificateLetter empData={this.state.emp} />;
            }}
          ></Route>

          <Route
            exact
            path="/InputDepuationLetter"
            render={() => {
              return (
                <InputDepuationLetter
                  empData={this.state.emp}
                  clicked={this.employee.bind()}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/DepuationLetter"
            render={() => {
              return <DepuationLetter empData={this.state.emp} />;
            }}
          ></Route>
          <Route
            exact
            path="/bulkdepuationletter"
            render={() => {
              return <BulkDepuationLetter empData={this.state.emp} />;
            }}
          ></Route>

          <Route
            exact
            path="/InputDesignationLetter"
            render={() => {
              return (
                <InputDesignationLetter
                  empData={this.state.emp}
                  clicked={this.employee.bind()}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/DesignationLetter"
            render={() => {
              return <DesignationLetter empData={this.state.emp} />;
            }}
          ></Route>
          <Route
            exact
            path="/bulkdesignationletter"
            render={() => {
              return <BulkDesignationLetter empData={this.state.emp} />;
            }}
          ></Route>

          <Route
            exact
            path="/InputIncrementLetter"
            render={() => {
              return (
                <InputIncrementLetter
                  empData={this.state.emp}
                  clicked={this.employee.bind()}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/IncrementLetter"
            render={() => {
              return <IncrementLetter empData={this.state.emp} />;
            }}
          ></Route>
          <Route
            exact
            path="/bulkincrementletter"
            render={() => {
              return <BulkIncrementLetter empData={this.state.emp} />;
            }}
          ></Route>

          <Route
            exact
            path="/InputRelivingLetter"
            render={() => {
              return (
                <InputRelivingLetter
                  empData={this.state.emp}
                  clicked={this.employee.bind()}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/RelivingLetter"
            render={() => {
              return <RelivingLetter empData={this.state.emp} />;
            }}
          ></Route>
          <Route
            exact
            path="/bulkrelivingletter"
            render={() => {
              return <BulkRelivingLetter empData={this.state.emp} />;
            }}
          ></Route>

          <Route
            exact
            path="/InputTrainingCommitLetter"
            render={() => {
              return (
                <InputTrainingCommitLetter
                  empData={this.state.emp}
                  history={this.props.history}
                  clicked={this.employee.bind()}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/TrainingCommit"
            render={() => {
              return (
                <TrainingCommit
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/bulktrainingcommit"
            render={() => {
              return (
                <BulkTrainingCommit
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>

          <Route
            exact
            path="/InputExitLetter"
            render={() => {
              return (
                <InputExitLetter
                  empData={this.state.emp}
                  clicked={this.employee.bind()}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/ExitLetter"
            render={() => {
              return <ExitLetter empData={this.state.emp} />;
            }}
          ></Route>
          <Route
            exact
            path="/bulkexitletter"
            render={() => {
              return <BulkExitLetter empData={this.state.emp} />;
            }}
          ></Route>

          <Route
            exact
            path="/InputInternship"
            render={() => {
              return (
                <InputIntershipLetter
                  empData={this.state.emp}
                  history={this.props.history}
                  clicked={this.employee.bind()}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/IntershipLetter"
            render={() => {
              return (
                <InternshipLetter
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/bulkintershipletter"
            render={() => {
              return (
                <BulkInternshipLetter
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>

          <Route
            exact
            path="/InputOfferLetter2"
            render={() => {
              return (
                <InputOffer2Letter
                  empData={this.state.emp}
                  history={this.props.history}
                  clicked={this.employee.bind()}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/Offerletter2"
            render={() => {
              return (
                <Offer2 history={this.props.history} empData={this.state.emp} />
              );
            }}
          ></Route>
          <Route
            exact
            path="/bulkofferletter2"
            render={() => {
              return (
                <BulkOfferLetter2
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>

          <Route
            exact
            path="/InputIntentLetter"
            render={() => {
              return (
                <InputIntentLetter
                  empData={this.state.emp}
                  history={this.props.history}
                  clicked={this.employee.bind()}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/IntentLetter"
            render={() => {
              return (
                <Intent history={this.props.history} empData={this.state.emp} />
              );
            }}
          ></Route>
          <Route
            exact
            path="/bulkintentletter"
            render={() => {
              return (
                <BulkIntent
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>

          <Route
            exact
            path="/InputHrPolicy"
            render={() => {
              return (
                <InputHrPolicy
                  empData={this.state.emp}
                  history={this.props.history}
                  clicked={this.employee.bind()}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/HrPolicy"
            render={() => {
              return (
                <HrPolicy
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/bulkhrpolicy"
            render={() => {
              return (
                <BulkHrPolicy
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>

          <Route
            exact
            path="/InputBDPolicy"
            render={() => {
              return (
                <InputBDPolicy
                  empData={this.state.emp}
                  history={this.props.history}
                  clicked={this.employee.bind()}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/BDPolicy"
            render={() => {
              return (
                <BDPolicy
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/bulkbdpolicy"
            render={() => {
              return (
                <BulkBDPolicy
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>

          <Route
            exact
            path="/InputProjectPolicy"
            render={() => {
              return (
                <InputProjectPolicy
                  empData={this.state.emp}
                  history={this.props.history}
                  clicked={this.employee.bind()}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/ProjectPolicy"
            render={() => {
              return (
                <ProjectPolicy
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/bulkprojectpolicy"
            render={() => {
              return (
                <BulkProjectPolicy
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>

          <Route
            exact
            path="/InputConsultantOffer"
            render={() => {
              return (
                <InputConsultantOffer
                  empData={this.state.emp}
                  history={this.props.history}
                  clicked={this.employee.bind()}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/ConsultantOffer"
            render={() => {
              return (
                <ConsultantOffer
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/bulkconsultantoffer"
            render={() => {
              return (
                <BulkConsultantOffer
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>

          <Route
            exact
            path="/InputSalaryRevision"
            render={() => {
              return (
                <InputSalaryRevision
                  empData={this.state.emp}
                  history={this.props.history}
                  clicked={this.employee.bind()}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/SalaryRevision"
            render={() => {
              return (
                <SalaryRevision
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/bulksalaryrevision"
            render={() => {
              return (
                <BulkSalaryRevision
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>

          <Route
            exact
            path="/InputDeliveryPolicy"
            render={() => {
              return (
                <InputDeliveryPolicy
                  empData={this.state.emp}
                  history={this.props.history}
                  clicked={this.employee.bind()}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/DeliveryPolicy"
            render={() => {
              return (
                <DeliveryPolicy
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/bulkdeliverypolicy"
            render={() => {
              return (
                <BulkDeliveryPolicy
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>

          <Route
            exact
            path="/InputITPolicy"
            render={() => {
              return (
                <InputITPolicy
                  empData={this.state.emp}
                  history={this.props.history}
                  clicked={this.employee.bind()}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/ITPolicy"
            render={() => {
              return (
                <ITPolicy
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/bulkitpolicy"
            render={() => {
              return (
                <BulkITPolicy
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>

          <Route
            exact
            path="/InputNoDueLetter"
            render={() => {
              return (
                <InputNoDueLetter
                  empData={this.state.emp}
                  history={this.props.history}
                  clicked={this.employee.bind()}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/NoDueLetter"
            render={() => {
              return (
                <NoDueLetter
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/bulknodueletter"
            render={() => {
              return (
                <BulkNoDueLetter
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>

          <Route
            exact
            path="/withWaterMark"
            render={() => {
              return <Example showWatermark={this.showWatermark.bind()} />;
            }}
          ></Route>
          <Route
            exact
            path="/withUrl"
            render={() => {
              return <CheckSign showUrl={this.showUrl.bind()} />;
            }}
          ></Route>
          <Route
            exact
            path="/DigitalSignature"
            component={ReactFirebaseFileUpload}
          ></Route>

          <Route exact path="/form" component={Form1}></Route>
          <Route exact path="/email" component={MailComponent}></Route>

          <Route exact path="/test" component={Temp}></Route>
          <Route
            exact
            path="/InputAnnexure"
            render={() => {
              return (
                <Annexure
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/AddAnnexure"
            render={() => {
              return (
                <AddAnnexure
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>
          <Route
            exact
            path="/ViewAnnexure"
            render={() => {
              return (
                <ViewAnnexure
                  history={this.props.history}
                  empData={this.state.emp}
                />
              );
            }}
          ></Route>
        </UserProvider>
      </div>
    );
  }
}

export default withRouter(App);
