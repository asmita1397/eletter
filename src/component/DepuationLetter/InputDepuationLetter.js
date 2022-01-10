//This file contains all required details about Depuatation letter.
import React, { Component } from 'react'
import { MDBInput } from "mdbreact";
import { MDBBtn } from "mdbreact";
import Home from '../home';
import { withRouter } from 'react-router-dom';
import $ from 'jquery'
import moment from 'moment';
import { UserConsumer } from '../Context/CustomContext';
import BulkInput from '../BulkInput/BulkInput';
export class InputDepuationLetter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employeeName: '',
            clientName: '',
            clientLocation: '',
            contactPerson: '',
            reportingDate: '',
            reportingTime: '',
            date: '',
            withWaterMark: false,
            withHeader: false,

            // validation variable
            showEmployeeName: '',
            showcontactPerson: '',
            showClientName: '',
            showClientLocation: '',
            showReportingDate: '',
            showReportingTime: '',
            showInvalidDate: '',

            // valiadation msg state variables
            showEmployeeNameMsg: '',
            showClientNameMsg: '',
            showcontactPersonMsg: '',
            showClientLocationMsg: "",
            errorMsgReportingDate:''
        }
    }
    static contextType = UserConsumer;

    hideEmployeeName = () => {
        this.setState({
            showEmployeeName: false
        })
    }
    hideContactPerson = () => {
        this.setState({
            showcontactPerson: false
        })
    }
    hideClientName = () => {
        this.setState({
            showClientName: false
        })
    }
    hideClientLocation = () => {
        this.setState({
            showClientLocation: false
        })
    }
    hideReportingDate = () => {
        this.setState({
            showReportingDate: false
        })
    }
    hideReportingTime = () => {
        this.setState({
            showReportingTime: false
        })
    }

    hideInvalidDate = () => {
        this.setState({
            showInvalidDate: false
        })
    }



    componentDidMount() {
        let editClick = localStorage.getItem("editClick");
        if (editClick) {
            this.setState({

                employeeName: this.props.empData.employeeName,
                clientName: this.props.empData.clientName,
                clientLocation: this.props.empData.clientLocation,
                contactPerson: this.props.empData.contactPerson,
                reportingDate: this.props.empData.reportingDate,
                reportingTime: this.props.empData.reportingTime
            })

        }

    }
    pass = (event) => {
        event.preventDefault();

        if (!this.state.showEmployeeName && !this.state.showcontactPerson && !this.state.showClientName && !this.state.showClientLocation && !this.state.showReportingDate && !this.state.showReportingTime && !this.state.showInvalidDate) {
            this.props.history.push('/DepuationLetter')
        }
        this.props.clicked(this.state)
    }

    onCheckHandler = (event) => {

        if (event.target.value == 'false') {
            this.setState({
                withWaterMark: true
            })

        }
        else {
            this.setState({
                withWaterMark: false
            })


        }
    }

    onChangeHeader = (event) => {
        if (event.target.value == 'false') {
            this.setState({
                withHeader: true
            })
        }
        else {
            this.setState({
                withHeader: false
            })
        }
    }
    validation = () => {

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];


        const nth = (d) => {
            if (d > 3 && d < 21) return 'th';
            switch (d % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        }

        let today = new Date();
        let currentdate = today.getDate() + nth(today.getDate()) + ' ' + monthNames[today.getMonth()] + ' ' + today.getFullYear();
        this.setState({
            date: currentdate
        })

        var that = this;
        let employeeName = (document.getElementById("employeeName").value).trim();
        let clientName = (document.getElementById("clientName").value).trim();
        let clientLocation = (document.getElementById("clientLocation").value).trim();
        let contactPerson = (document.getElementById("contactPerson").value).trim();
        let reportingDate = (document.getElementById("reportingDate").value)
        let reportingTime = (document.getElementById("reportingTime").value).trim();
        let selectedDate = new Date(reportingDate).setHours(23);
        let now = new Date();



        if (reportingTime === "") {
            that.setState({ showReportingTime: true })
        }
       
        if (contactPerson === "") {
            that.setState({ showcontactPerson: true })
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

        //****************************************     for     clientName   ************************************* */

        if (clientName !== "") {
            this.setState({
                showClientName: false
            })
            if (clientName.match(/^[a-zA-Z\s]*$/)) {
                this.setState({
                    showClientName: false
                })

                if (clientName.length > 2) {
                    this.setState({
                        showClientName: false
                    })
                    if (clientName.length < 20) {
                        this.setState({
                            showClientName: false
                        })

                    }

                    else {
                        this.setState({
                            showClientName: true,
                            showClientNameMsg: "the field shouldnot contain more than 20 characters * "
                        })


                    }

                } else {
                    this.setState({
                        showClientName: true,
                        showClientNameMsg: "the field should contain mimimum  3 characters * "
                    })
                }


            } else {
                this.setState({
                    showClientName: true,
                    showClientNameMsg: "the field should contain only alphabets * "
                })
            }


        }
        else {
            this.setState({
                showClientName: true,
                showClientNameMsg: "Please fill out Name field * "
            })
        }



        //****************************************     for     clientLocation   ************************************* */


        if (clientLocation !== "") {
            this.setState({
                showClientLocation: false
            })
            if (clientLocation.match(/^[a-zA-Z\s]*$/)) {
                this.setState({
                    showClientLocation: false
                })

                if (clientLocation.length > 2) {
                    this.setState({
                        showClientLocation: false
                    })
                    if (clientLocation.length < 20) {
                        this.setState({
                            showClientLocation: false
                        })

                    }

                    else {
                        this.setState({
                            showClientLocation: true,
                            showClientLocationMsg: "the field shouldnot contain more than 20 characters * "
                        })


                    }

                } else {
                    this.setState({
                        showClientLocation: true,
                        showClientLocationMsg: "the field should contain mimimum  3 characters * "
                    })
                }


            } else {
                this.setState({
                    showClientLocation: true,
                    showClientLocationMsg: "the field should contain only alphabets * "
                })
            }


        }
        else {
            this.setState({
                showClientLocation: true,
                showClientLocationMsg: "Please fill out Name field * "
            })
        }

        //****************************************     for     contactPerson   ************************************* */


        if (contactPerson !== "") {
            this.setState({
                showcontactPerson: false
            })
            if (contactPerson.match(/^[a-zA-Z\s]*$/)) {
                this.setState({
                    showcontactPerson: false
                })

                if (contactPerson.length > 2) {
                    this.setState({
                        showcontactPerson: false
                    })
                    if (contactPerson.length < 20) {
                        this.setState({
                            showcontactPerson: false
                        })

                    }

                    else {
                        this.setState({
                            showcontactPerson: true,
                            showcontactPersonMsg: "the field shouldnot contain more than 20 characters * "
                        })


                    }

                } else {
                    this.setState({
                        showcontactPerson: true,
                        showcontactPersonMsg: "the field should contain mimimum  3 characters * "
                    })
                }


            } else {
                this.setState({
                    showcontactPerson: true,
                    showcontactPersonMsg: "the field should contain only alphabets * "
                })
            }


        }
        else {
            this.setState({
                showcontactPerson: true,
                showcontactPersonMsg: "Please fill out Name field * "
            })
        }


        //**************************************************


       
        if (reportingDate === ""/*  || selectedDate < now */) {


            console.log(selectedDate)
            console.log(now)
            if (reportingDate === "") {
                this.setState({
                    showReportingDate: true,
                    errorMsgReportingDate: "Please fill out Reporting Date field *"
                })
            }
           /*  else {
                this.setState({
                    showJoiningDate: true,
                    errorMsgJoiningDate: "JoiningDate must greater than  Today's date"
                })
            } */

        }
       
    }



    //
    handleChildData = (data) => {
        debugger
        console.log(data)
        this.props.clicked(data)
        if (data !== "") {
            this.props.history.push('/bulkdepuationletter')
        }
    }

    render() {
        let value = this.context;
        return (
            <div>
                <Home buttonShow={false} buttonVal={value.buttonVal}/>
                <div >
                    <div className="container-fluid mt-5">
                        <div className="row">
                            <div className="col-auto container mt-5 pb-5">
                                <div style={{ width: '500px' }} className="card m-auto shadow-lg mt-5">
                                    <div class="card-header" style={{ borderRadius: '0px !important', background: 'white' }} >
                                        <h3 className="text-center black-text font-bold ">Deputation Letter</h3>
                                    </div>
                                    <div className="card-body ">



                                    {value.buttonVal ?
                                           
                                           <>                                              
                                          <BulkInput handleChildData={this.handleChildData} />
                                          </> :
                                          <>
                                        <form onSubmit={this.pass}>
                                            <div class="row">
                                                <div class="col-12">
                                                    <MDBInput autocomplete="off" value={this.state.employeeName} onKeyPress={this.hideEmployeeName} label="Employee Name" className="w-100" name="employeeName" title="Employee Name" id="employeeName" onChange={(event) => {
                                                        this.setState({
                                                            employeeName: event.target.value
                                                        })
                                                    }} />
                                                </div>
                                            {this.state.showEmployeeName ? <div id="errordiv" className="container-fluid p-0 ml-3">{this.state.showEmployeeNameMsg}</div> : null}
                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                    <MDBInput autocomplete="off" value={this.state.clientName} onKeyPress={this.hideClientName} type="text" label="Client Name" title="Client Name" name="clientName" id="clientName" onChange={(event) => {
                                                        this.setState({
                                                            clientName: event.target.value
                                                        })
                                                    }} />
                                                </div>
                                            </div>
                                            {this.state.showClientName ? <div id="errordiv" className="container-fluid p-0 ml-3">{this.state.showClientNameMsg} </div> : null}
                                            <div className="row">
                                                <div class="col-6">
                                                    <MDBInput autocomplete="off" value={this.state.clientLocation} onKeyPress={this.hideClientLocation} type="text" label="Client Location" title="Client Name" name="clientLocation" id="clientLocation" onChange={(event) => {
                                                        this.setState({
                                                            clientLocation: event.target.value
                                                        })
                                                    }} />
                                                </div>
                                                <div class="col-6">
                                                    <MDBInput autocomplete="off" value={this.state.contactPerson} onKeyPress={this.hideContactPerson} type="text" label="Contact Person" title="Contact Person" name="contactPerson" id="contactPerson" onChange={(event) => {
                                                        this.setState({
                                                            contactPerson: event.target.value
                                                        })
                                                    }} />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-6">
                                                    {this.state.showClientLocation ? <div id="errordiv" className="container-fluid p-0">{this.state.showClientLocationMsg}</div> : null}
                                                </div>
                                                <div className="col-6">
                                                    {this.state.showcontactPerson ? <div id="errordiv" className="container-fluid p-0">{this.state.showcontactPersonMsg} </div> : null}
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-6">
                                                    <MDBInput autocomplete="off" value={this.state.reportingDate} max="2050-12-31" onKeyPress={() => { this.hideReportingDate(); this.hideInvalidDate() }} onClick={() => { this.hideReportingDate(); this.hideInvalidDate() }} type="date" label="Reporting Date" title="Reporting Date" name="reportingDate" id="reportingDate" onChange={(event) => {
                                                        this.setState({
                                                            reportingDate: event.target.value
                                                        }); this.hideReportingDate(); this.hideInvalidDate();
                                                    }} />
                                                </div>
                                                <div class="col-md-6">
                                                    <MDBInput autocomplete="off" value={this.state.reportingTime} onKeyPress={this.hideReportingTime} onClick={this.hideReportingTime} type="time" label="Reporting Time" title="Reporting Time" name="reportingTime" id="reportingTime" onChange={(event) => {
                                                        this.setState({
                                                            reportingTime: event.target.value
                                                        }); this.hideReportingTime();
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-6 p-0" >
                                                {this.state.showReportingDate ? <div id="errordiv" className="container-fluid">{this.state.errorMsgReportingDate}</div> : null}
                                                   

                                                </div>
                                                <div className="col-6 p-0" style={{ width: 0 }}>
                                                    {this.state.showReportingTime ? <div id="errordiv" className="container-fluid">Please fill out Reporting Time field * </div> : null}
                                                </div>
                                            </div>



                                            <div className=" input-group w-50 container-fluid">
                                                <MDBBtn outline id='generate' type="submit" className=" form-control-plaintext  justify-content-center text-center" color="primary" onClick={this.validation}>Generate</MDBBtn>
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
        )
    }
}

export default withRouter(InputDepuationLetter)