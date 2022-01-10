//This file contains all required details about Intent letter.
import React, { Component } from 'react'
import { MDBInput } from "mdbreact";
import { MDBBtn } from "mdbreact";
import Home from '../home';
import $ from 'jquery'
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import '../CommonStyle.css'
import { UserConsumer } from '../Context/CustomContext';
import BulkInput from '../BulkInput/BulkInput';
let now = new Date()
let dateValidate=(moment(now).format('YYYY-MM-DD'))

export default class InputIntentLetter extends Component {

    constructor(props) {
        super(props)
        this.state = {
            employeeName: '',
            designation: '',
            companyLocation: '',
            reportingManager: '',
            joiningDate: '',
            trainingStartDate: '',
            withWaterMark: false,
            withHeader: false,
            // form validation variable

            showEmployeeName: '',
            showDesignation: '',
            showCompanyLocation: '',
            showReportingManager: '',
            showJoiningDate: '',
            showTrainingStartDate: '',

            // valiadation msg state variables
            showEmployeeNameMsg: '',
            showDesignationMsg: '',
            showCompanyLocationMsg: "",
            showReportingManagerMsg: "",
            errorMsgtrainingStartDate:""

        }

    }
    static contextType = UserConsumer;
    componentDidMount() {

        let editClick = localStorage.getItem("editClick");
        if (editClick) {
            this.setState({


                employeeName: this.props.empData.employeeName,
                designation: this.props.empData.designation,
                companyLocation: this.props.empData.companyLocation,
                reportingManager: this.props.empData.reportingManager,
                trainingStartDate: this.props.empData.trainingStartDate
            })

        }


    }


    pass = (event) => {
        event.preventDefault();

        if (!this.state.showEmployeeName && !this.state.showDesignation && !this.state.showCompanyLocation && !this.state.showAnnualCompensationYear && !this.state.showReportingManager && !this.state.showJoiningDate && !this.state.showTrainingStartDate && !this.state.showInvalidDate) {
            this.props.history.push('/IntentLetter')
        }
        this.props.clicked(this.state)
    };

    
    validation = () => {

        var that = this;
        let employeeName = (document.getElementById("employeeName").value).trim();
        let designation = (document.getElementById("designation").value).trim();
        let companyLocation = (document.getElementById("companyLocation").value).trim();
        let reportingManager = (document.getElementById("reportingManager").value).trim();
        let trainingStartDate = (document.getElementById("trainingStartDate").value).trim();
        let selectedDate = new Date(trainingStartDate).setHours(23)
        
console.log(dateValidate)
        if ( trainingStartDate === "" ||  selectedDate <this.now) {


            console.log(selectedDate)
            console.log(now)
            if (trainingStartDate === "") {
                this.setState({
                    showTrainingStartDate: true,
                    errorMsgtrainingStartDate: "Please fill out Training Start Date  field * "
                })
            }
            else  {
                this.setState({
                    showTrainingStartDate: true,
                    errorMsgtrainingStartDate: "Training Start Date must greater than  Today's date"
                })
            }
            
        }


       


        //****************************************     for     employeeName   ************************************* */


        if (employeeName !== "") {
            this.setState({
                showEmployeeName: false
            })
            if (employeeName.match(/^[a-zA-Z\s]*$/)) {
                this.setState({
                    showEmployeeName: false
                })

                if (employeeName.length > 2) {
                    this.setState({
                        showEmployeeName: false
                    })
                    if (employeeName.length < 20) {
                        this.setState({
                            showEmployeeName: false
                        })

                    }

                    else {
                        this.setState({
                            showEmployeeName: true,
                            showEmployeeNameMsg: "the field shouldnot contain more than 20 characters * "
                        })


                    }

                } else {
                    this.setState({
                        showEmployeeName: true,
                        showEmployeeNameMsg: "the field should contain mimimum  3 characters * "
                    })
                }


            } else {
                this.setState({
                    showEmployeeName: true,
                    showEmployeeNameMsg: "the field should contain only alphabets * "
                })
            }


        }
        else {
            this.setState({
                showEmployeeName: true,
                showEmployeeNameMsg: "Please fill out Name field * "
            })
        }

        //****************************************     for     designation   ************************************* */

        if (designation !== "") {
            this.setState({
                showDesignation: false
            })
            if (designation.match(/^[a-zA-Z\s]*$/)) {
                this.setState({
                    showDesignation: false
                })

                if (designation.length > 2) {
                    this.setState({
                        showDesignation: false
                    })
                    if (designation.length < 20) {
                        this.setState({
                            showDesignation: false
                        })

                    }

                    else {
                        this.setState({
                            showDesignation: true,
                            showDesignationMsg: "Designation must not exceeded 20 characters* "
                        })


                    }

                } else {
                    this.setState({
                        showDesignation: true,
                        showDesignationMsg: "Minimum 3 characters Required * "
                    })
                }


            } else {
                this.setState({
                    showDesignation: true,
                    showDesignationMsg: "Designation should contain only alphabets * "
                })
            }


        }
        else {
            this.setState({
                showDesignation: true,
                showDesignationMsg: "Please fill out Designation field * "
            })
        }


        //****************************************     for     companyLocation   ************************************* */

        if (companyLocation !== "") {
            this.setState({
                showCompanyLocation: false
            })
            if (companyLocation.match(/^[a-zA-Z\s]*$/)) {
                this.setState({
                    showCompanyLocation: false
                })

                if (companyLocation.length > 2) {
                    this.setState({
                        showCompanyLocation: false
                    })
                    if (companyLocation.length < 50) {
                        this.setState({
                            showCompanyLocation: false
                        })

                    }

                    else {
                        this.setState({
                            showCompanyLocation: true,
                            showCompanyLocationMsg: "companyLocation must not exceeded 50 characters* "
                        })


                    }

                } else {
                    this.setState({
                        showCompanyLocation: true,
                        showCompanyLocationMsg: "Minimum 3 characters Required * "
                    })
                }


            } else {
                this.setState({
                    showCompanyLocation: true,
                    showCompanyLocationMsg: "companyLocation should contain only alphabets * "
                })
            }


        }
        else {
            this.setState({
                showCompanyLocation: true,
                showCompanyLocationMsg: "Please fill out companyLocation field * "
            })
        }




        //****************************************     for     reportingManager   ************************************* */


        if (reportingManager !== "") {
            this.setState({
                showReportingManager: false
            })
            if (reportingManager.match(/^[a-zA-Z\s]*$/)) {
                this.setState({
                    showReportingManager: false
                })

                if (reportingManager.length > 2) {
                    this.setState({
                        showReportingManager: false
                    })
                    if (reportingManager.length < 20) {
                        this.setState({
                            showReportingManager: false
                        })

                    }

                    else {
                        this.setState({
                            showReportingManager: true,
                            showReportingManagerMsg: "the field shouldnot contain more than 20 characters * "
                        })


                    }

                } else {
                    this.setState({
                        showReportingManager: true,
                        showReportingManagerMsg: "the field should contain mimimum  3 characters * "
                    })
                }


            } else {
                this.setState({
                    showReportingManager: true,
                    showReportingManagerMsg: "the field should contain only alphabets * "
                })
            }


        }
        else {
            this.setState({
                showReportingManager: true,
                showReportingManagerMsg: "Please fill out reportingManager field * "
            })
        }




        if (designation != "" && companyLocation != "" && employeeName != "" && reportingManager !== "" && trainingStartDate != '') {

            return true;

        }
        else {
            return false;
        }
    }

    hideEmployeeName = () => {
        this.setState({
            showEmployeeName: false
        })
    }
    hideDesignation = () => {
        this.setState({
            showDesignation: false
        })
    }
    hideCompanyLocation = () => {
        this.setState({
            showCompanyLocation: false
        })
    }
    hidereportingManager = () => {
        this.setState({
            showReportingManager: false
        })
    }

    hideJoiningDate = () => {
        this.setState({
            showJoiningDate: false
        })
    }

    hideTrainingStartDate = () => {
        this.setState({
            showTrainingStartDate: false
        })
    }




    hideInvalidDate = () => {
        this.setState({
            showInvalidDate: false
        })
    }

    onCheckHandler = (event) => {
        ;

        if (event.target.value == 'false') {
            this.setState({
                withWaterMark: true
            })

        }
        else {
            ;
            this.setState({
                withWaterMark: false
            })


        }
    }
    onChangeHeader = (event) => {

        ;

        if (event.target.value == 'false') {
            this.setState({
                withHeader: true
            })

        }
        else {
            ;
            this.setState({
                withHeader: false
            })


        }


    }

    onChangeHeader = (event) => {

        ;


        if (event.target.value == 'false') {
            this.setState({
                withHeader: true
            })

        }
        else {
            ;
            this.setState({
                withHeader: false
            })


        }


    }

    handleChildData = (data) => {
        debugger
        console.log(data)
        this.props.clicked(data)
        if (data !== "") {
            this.props.history.push('/bulkintentletter')
        }
    }




    render() {
        let value = this.context;
        return (
            <div>
                <div>
                    <Home buttonShow={false} buttonVal={value.buttonVal}/>
                    <div >
                        <div className="container-fluid mt-5">
                            <div className="row">
                                <div className="col-auto container mt-5 pb-5">
                                    <div style={{ width: '500px' }} className="card m-auto shadow-lg mt-5">
                                        <div class="card-header" style={{ borderRadius: '0px !important', background: 'white' }} >
                                            <h3 className="text-center black-text font-bold ">Intent Letter</h3>
                                        </div>
                                        <div className="card-body ">





                                        {value.buttonVal ?
                                           
                                           <>                                              
                                          <BulkInput handleChildData={this.handleChildData} />
                                          </> :
                                          <>
                                            <form onSubmit={this.pass} noValidate>

                                                <div class="row">
                                                    <div class="col-6">
                                                        <MDBInput autocomplete="off" value={this.state.employeeName} onKeyPress={this.hideEmployeeName} label="Employee Name" type="text" name="employeeName" id="employeeName" title="employeeName" onChange={(event) => {
                                                            this.setState({
                                                                employeeName: event.target.value
                                                            });this.hideEmployeeName();
                                                        }} />
                                                    </div>
                                                    <div className="col-6">
                                                        <MDBInput autocomplete="off" value={this.state.designation} onKeyPress={this.hideDesignation} label="Designation" type="text" name="designation" id="designation" title="Designation" onChange={(event) => {
                                                            this.setState({
                                                                designation: event.target.value
                                                            });this.hideDesignation();
                                                        }} />
                                                    </div>
                                                </div>


                                                <div className="row" style={{ padding: 0 }}>
                                                    <div className="col-6 p-0" >
                                                        {this.state.showEmployeeName ? <div id="errordiv" className="container-fluid">{this.state.showEmployeeNameMsg}</div> : null}


                                                    </div>
                                                    <div className="col-6 p-0" style={{ width: 0 }}>
                                                        {this.state.showDesignation ? <div id="errordiv" className="container-fluid">{this.state.showDesignationMsg} </div> : null}
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-6">
                                                        <MDBInput autocomplete="off" value={this.state.companyLocation} onKeyPress={this.hideCompanyLocation} label="Company Location" type="text" id="companyLocation" title="companyLocation" onChange={(event) => {
                                                            this.setState({
                                                                companyLocation: event.target.value
                                                            });this.hideCompanyLocation();
                                                        }} />
                                                    </div>
                                                    <div className="col-6">
                                                        <MDBInput autocomplete="off" value={this.state.reportingManager} onKeyPress={this.hidereportingManager} label="Reporting Manager" type="text" name="reportingManager" id="reportingManager" title="reportingManager" onChange={(event) => {
                                                            this.setState({
                                                                reportingManager: event.target.value
                                                            });this.hidereportingManager();
                                                        }} />
                                                    </div>
                                                </div>

                                                <div className="row" style={{ padding: 0 }}>
                                                    <div className="col-6 p-0" >
                                                        {this.state.showCompanyLocation ? <div id="errordiv" className="container-fluid">{this.state.showCompanyLocationMsg} </div> : null}


                                                    </div>
                                                    <div className="col-6 p-0" style={{ width: 0 }}>
                                                        {this.state.showReportingManager ? <div id="errordiv" className="container-fluid">{this.state.showReportingManagerMsg} </div> : null}
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div className="col-12">
                                                        <MDBInput autocomplete="off" value={this.state.trainingStartDate} onKeyPress={this.hideTrainingStartDate} label="Training Start Date" type="date"  max="2025-09-12" name="trainingStartDate" id="trainingStartDate" title="trainingStartDate"
                                                            onChange={(event) => {
                                                                this.setState({
                                                                    trainingStartDate: event.target.value
                                                                }); this.hideTrainingStartDate();
                                                            }} />
                                                    </div>
                                                </div>
                                                <div className="row" style={{ padding: 0 }}>

                                                        <div className="col-12 p-0">{this.state.showTrainingStartDate ? <div id="errordiv" className="container-fluid">{this.state.errorMsgtrainingStartDate}</div> : null}</div>

                                                </div>





                                                <div className=" input-group w-50 container-fluid">
                                                    <MDBBtn outline type="submit" id="genrate" className=" form-control-plaintext  justify-content-center text-center" color="primary" onClick={this.validation}>Generate</MDBBtn>
                                                </div>
                                            </form>
                                            </>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
