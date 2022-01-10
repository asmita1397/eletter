//This file contains all required details about Training Commit letter.
import React, { Component } from 'react'
import { MDBInput } from "mdbreact";
import { MDBBtn } from "mdbreact";
import Home from '../home';
import { withRouter } from 'react-router-dom';
import '../CommonStyle.css'
import { UserConsumer } from '../Context/CustomContext';
import BulkInput from '../BulkInput/BulkInput';
export class InputTrainingCommitLetter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            salute: 'Mr.',
            companyLocation: '',
            employeeName: '',
            designation: '',
            joiningDate: '',
            courseName: '',
            trainingStartDate: '',
            trainingEndDate: '',
            branchName: '',
            branchLocation: '',
            date: '',
            withWaterMark: false,
            withHeader: false,
            gender: {
                gender1: 'He',
                gender2: 'his',
                gender3: 'him'
            },

            // Error Message
            employeeNameErrMsg: '',
            designationErrMsg: '',
            companyLocationErrMsg: '',
            courseNameErrMsg: '',
            branchNameErrMsg: '',
            branchLocationErrMsg: '',
            errorMsgTrainingDate:'',
            errorMsgTrainingEndDate:'',

            // validation variable
            showEmployeeName: '',
            showCompanyLocation: '',
            showdDesignation: '',
            showJoiningDate: '',
            showCourseName: '',
            showTrainingStartDate: '',
            showTrainingEndDate: '',
            showBranchName: '',
            showBranchLocation: '',
            showInvalidDate: '',
            


        }
    }

    static contextType = UserConsumer;
    componentDidMount() {

        let editClick = localStorage.getItem("editClick");
        if (editClick) {
            this.setState({
                employeeName: this.props.empData.employeeName,
                employeeId: this.props.empData.employeeId,
                designation: this.props.empData.designation,
                joiningDate: this.props.empData.joiningDate,
                courseName: this.props.empData.courseName,
                companyLocation: this.props.empData.companyLocation,
                trainingStartDate: this.props.empData.trainingStartDate,
                trainingEndDate: this.props.empData.trainingEndDate,
                branchName: this.props.empData.branchName,
                branchLocation: this.props.empData.branchLocation,
            })

        }
    }

    validation = () => {

        var that = this;

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

        if (that.state.salute === "Ms." || that.state.salute === "Mrs.") {
            that.setState({
                ...that.state,
                gender: {
                    gender1: 'She',
                    gender2: 'her',
                    gender3: 'her'
                }
            })
        }

        let employeeName = (document.getElementById("employeeName").value).trim();
        let designation = (document.getElementById("designation").value).trim();
        let joiningDate = (document.getElementById("joiningDate").value).trim();
        let companyLocation = (document.getElementById("companyLocation").value).trim();
        let courseName = (document.getElementById("courseName").value).trim();
        let branchName = (document.getElementById("branchName").value).trim();
        let branchLocation = (document.getElementById("branchLocation").value).trim();
        let trainingStartDate = (document.getElementById("trainingStartDate").value).trim();
        let trainingEndDate = (document.getElementById("trainingEndDate").value).trim();
        let trainingStartDateSelected = new Date(trainingStartDate).setHours(23)
        let trainingEndDateSelected = new Date(trainingEndDate)
        let now = new Date()
        //debugger
        if ( trainingStartDate === "" ||  trainingEndDateSelected <trainingStartDateSelected) {

            if (trainingStartDate === "") {
                this.setState({
                    showTrainingEndDate: true,
                    errorMsgTrainingEndDate: "Please fill out TrainingEndDate field *"
                })
            }
            else  {
                this.setState({
                    showTrainingEndDate: true,
                    errorMsgTrainingEndDate: "TrainingEndDate must greater than  TrainingStartDate"
                })
            }
            
        }

        if ( trainingEndDate === "" /* ||  trainingStartDateSelected <now */) {

            if (trainingEndDate === "") {
                this.setState({
                    showTrainingStartDate: true,
                    errorMsgTrainingDate: "Please fill out TrainingStartDate field *"
                })
            }
           /*  else  {
                this.setState({
                    showTrainingStartDate: true,
                    errorMsgTrainingDate: "JoiningDate must greater than  Today's date"
                })
            } */
            
        }

        if (designation === "" || !designation.match(/^[a-zA-Z\s]*$/) || designation !== '') {

            if (designation !== '') {

                if (designation.match(/^[a-zA-Z\s]*$/)) {

                    if (designation.length < 3 || designation.length > 30) {
                        this.setState({
                            showDesignation: true,
                            designationErrMsg: 'Designation Contains MIN 3 and MAX 30 Character Only!!'
                        })
                    }

                } else {
                    this.setState({
                        showDesignation: true,
                        designationErrMsg: 'Designation should contains Alphabets!!'
                    })
                }

            }
            else {
                this.setState({
                    showDesignation: true,
                    designationErrMsg: 'Designation Required *'
                })
            }
        }

        if (employeeName === "" || !employeeName.match(/^[a-zA-Z\s]*$/) || employeeName !== "") {

            if (employeeName !== "") {

                if (employeeName.match(/^[a-zA-Z\s]*$/)) {

                    if (employeeName.length < 3 || employeeName.length > 20) {
                        this.setState({
                            showEmployeeName: true,
                            employeeNameErrMsg: 'Employee Name Contains MIN 3 and MAX 20 Character Only!!'
                        })
                    }
                }
                else {
                    this.setState({
                        showEmployeeName: !this.showEmployeeName,
                        employeeNameErrMsg: 'Employee Name should contains Alphabets!!'
                    })
                }
            } else {
                this.setState({
                    showEmployeeName: true,
                    employeeNameErrMsg: 'Employee Name  Required *'
                })
            }
        }

        if (companyLocation === "" || !companyLocation.match(/^[a-zA-Z\s]*$/) || companyLocation !== "") {

            if (companyLocation !== "") {

                if (companyLocation.match(/^[a-zA-Z\s]*$/)) {

                    if (companyLocation.length < 3 || companyLocation.length > 25) {
                        this.setState({
                            showCompanyLocation: true,
                            companyLocationErrMsg: `Company Location Contains MIN 3 and MAX 25 Character Only!!`
                        })
                    }
                } else {
                    this.setState({
                        showCompanyLocation: true,
                        companyLocationErrMsg: `Company Location Contains Alphabets Only!!`
                    })
                }
            }
            else {
                this.setState({
                    showCompanyLocation: true,
                    companyLocationErrMsg: `Company Location Required *`
                })
            }
        }


        if (courseName === "" || !courseName.match(/^[a-zA-Z\s]*$/) || courseName !== "") {
            if (courseName !== "") {

                if (courseName.match(/^[a-zA-Z\s]*$/)) {

                    if (courseName.length < 3 || courseName.length > 25) {
                        this.setState({
                            showCourseName: true,
                            courseNameErrMsg: 'Course Name Contains MIN 3 and MAX 25 Character Only!!'
                        })
                    }
                } else {
                    this.setState({
                        showCourseName: true,
                        courseNameErrMsg: 'Course Name Contains Alphabets Only!!'
                    })
                }
            } else {
                this.setState({
                    showCourseName: true,
                    courseNameErrMsg: 'Course Name Required *'
                })
            }

        }

        if (branchName === "" || !branchName.match(/^[a-zA-Z\s]*$/) || branchName !== "") {

            if (branchName !== "") {

                if (branchName.match(/^[a-zA-Z\s]*$/)) {

                    if (branchName.length < 3 || branchName.length > 25) {
                        this.setState({
                            showBranchName: true,
                            branchNameErrMsg: 'Branch Name Contains MIN 3 and MAX 25 Character Only!!'
                        })
                    }

                } else {
                    this.setState({
                        showBranchName: true,
                        branchNameErrMsg: 'Branch Name Contains Alphabets Only!!'
                    })
                }
            } else {
                this.setState({
                    showBranchName: true,
                    branchNameErrMsg: 'Branch Name Required *'
                })
            }
        }


        if (branchLocation === "" || !branchLocation.match(/^[a-zA-Z\s]*$/) || branchLocation !== "") {

            if (branchLocation !== "") {

                if (branchLocation.match(/^[a-zA-Z\s]*$/)) {

                    if (branchLocation.length < 3 || branchLocation.length > 25) {
                        this.setState({
                            showBranchLocation: true,
                            branchLocationErrMsg: 'Branch Location Contains MIN 3 and MAX 25 Character Only!!'
                        })
                    }

                } else {
                    this.setState({
                        showBranchLocation: true,
                        branchLocationErrMsg: 'Branch Location Contains Alphabets Only!!'
                    })
                }

            } else {
                this.setState({
                    showBranchLocation: true,
                    branchLocationErrMsg: 'Branch Location Required *'
                })
            }
        }


        if (joiningDate === "") {
            this.setState({ showJoiningDate: true })
        }
        if (trainingStartDate === "") {
            this.setState({ showTrainingStartDate: true })
        }
        if (trainingEndDate === "") {
            this.setState({ showTrainingEndDate: true })
        }

        if (trainingEndDateSelected <= trainingStartDateSelected) {
            that.setState({
                showInvalidDate: "true"
            })
            // return false;
        }
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

    hideCompanyLocation = () => {
        this.setState({
            showCompanyLocation: false
        })
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
    hideTrainingStartDate = () => {
        this.setState({
            showTrainingStartDate: false
        })
    }
    hideJoiningDate = () => {
        this.setState({
            showJoiningDate: false
        })
    }
    hideCourseName = () => {
        this.setState({
            showCourseName: false
        })
    }

    hideBranchName = () => {
        this.setState({
            showBranchName: false
        })
    }

    hideBranchLocation = () => {
        this.setState({
            showBranchLocation: false
        })
    }
    hideTrainingEndDate = () => {
        this.setState({
            showTrainingEndDate: false
        })
    }

    hideInvalidDate = () => {
        this.setState({
            showInvalidDate: false
        })
    }

    pass = (event) => {
        event.preventDefault();
debugger
        this.props.clicked(this.state)

        if (!this.state.showBranchName &&
            !this.state.showBranchLocation &&
            !this.state.showCompanyLocation &&
            !this.state.showCourseName &&
            !this.state.showDesignation &&
            !this.state.showEmployeeName &&
            !this.state.showTrainingEndDate &&
            !this.state.showTrainingStartDate &&
            !this.state.showJoiningDate) {


            this.props.history.push('/TrainingCommit')
        }

    }

    handleChildData = (data) => {
        debugger
        console.log(data)
        this.props.clicked(data)
        if (data !== "") {
            this.props.history.push('/bulktrainingcommit')
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
                                        <h3 className="text-center black-text font-bold ">Training Commitment Letter</h3>
                                    </div>
                                    <div className="card-body ">


                                    {value.buttonVal ?
                                           
                                           <>                                              
                                          <BulkInput handleChildData={this.handleChildData} />
                                          </> :
                                          <>
                                        <form onSubmit={this.pass}>
                                            <div class="row">
                                                <div className="col-2" style={{ paddingTop: '25px' }}>
                                                    <select class="browser-default custom-select" value={this.state.salute} style={{ width: '62px' }} autocomplete="off" name="salutation" title="salutation" id="salutation" onChange={(event) => {
                                                        this.setState({
                                                            salute: event.target.value
                                                        })
                                                    }}>
                                                        <option selected value="Mr.">Mr.</option>
                                                        <option value="Ms.">Ms.</option>
                                                        <option value="Mrs.">Mrs.</option>
                                                    </select>
                                                </div>

                                                <div class="col-md-5">
                                                    <MDBInput autocomplete="off" value={this.state.employeeName} onKeyPress={this.hideEmployeeName} label="Employee Name" className="w-100" name="employeeName" title="Employee Name" id="employeeName" onChange={(event) => {
                                                        this.setState({
                                                            employeeName: event.target.value
                                                        });this.hideEmployeeName();
                                                    }} />
                                                </div>
                                                <div class="col-5">
                                                    <MDBInput autocomplete="off" value={this.state.designation} onKeyPress={this.hideDesignation} label="Designation" type="text" name="designation" id="designation" title="designation" onChange={(event) => {
                                                        this.setState({
                                                            designation: event.target.value
                                                        }); this.hideDesignation();
                                                    }} />
                                                </div>

                                            </div>

                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-2"></div>
                                                <div className="col-5 p-0" >
                                                    {this.state.showEmployeeName ? <div id="errordiv" className="container-fluid">{this.state.employeeNameErrMsg}</div> : null}


                                                </div>
                                                <div className="col-5 p-0" >
                                                    {this.state.showDesignation ? <div id="errordiv" className="container-fluid">{this.state.designationErrMsg}</div> : null}
                                                </div>

                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <MDBInput autocomplete="off" value={this.state.joiningDate} onClick={this.hideJoiningDate} onKeyPress={this.hideJoiningDate} type="date" max="2050-12-31" label="Joining Date" title="Joining Date" name="JoiningDate" id="joiningDate" onChange={(event) => {
                                                        this.setState({
                                                            joiningDate: event.target.value
                                                        }); this.hideJoiningDate()
                                                    }} />
                                                </div>
                                                <div className="col-6">
                                                    <MDBInput autocomplete="off" value={this.state.companyLocation} onKeyPress={this.hideCompanyLocation} label="Company Location" className="w-100" name="companyLocation" title="Company Location" id="companyLocation" onChange={(event) => {
                                                        this.setState({
                                                            companyLocation: event.target.value
                                                        }); this.hideCompanyLocation();
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-6 p-0" style={{ width: 0 }}>
                                                {this.state.showJoiningDate ? <div id="errordiv" className="container-fluid">{this.state.errorMsgTrainingDate}</div> : null}
                                                </div>
                                                <div className="col-6 p-0" style={{ width: 0 }}>
                                                    {this.state.showCompanyLocation ? <div id="errordiv" className="container-fluid">{this.state.companyLocationErrMsg}</div> : null}
                                                </div>
                                            </div>


                                            <div class="row">
                                                <div class="col-md-6">
                                                    <MDBInput autocomplete="off" value={this.state.trainingStartDate} onClick={this.hideTrainingStartDate} onKeyPress={this.hideTrainingStartDate} max="2050-12-31" type="date" label="Traininng Start Date" title="Training Start Date" name="trainingStartDate" id="trainingStartDate" onChange={(event) => {
                                                        this.setState({
                                                            trainingStartDate: event.target.value
                                                        }); this.hideTrainingStartDate();
                                                    }} />
                                                </div>
                                                <div class="col-md-6">
                                                    <MDBInput autocomplete="off" value={this.state.trainingEndDate} onClick={() => { this.hideTrainingEndDate(); }} onKeyPress={() => { this.hideTrainingEndDate();  }} max="2050-12-31" type="date" label="Training End Date" title="Training End Date" name="trainingStartDate" id="trainingEndDate" onChange={(event) => {
                                                        this.setState({
                                                            trainingEndDate: event.target.value
                                                        }); this.hideTrainingEndDate(); 
                                                    }} />
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-6 p-0" >
                                                {this.state.showTrainingStartDate ? <div id="errordiv" className="container-fluid">{this.state.errorMsgTrainingDate}</div> : null}
                                                </div>
                                                <div className="col-6 p-0" style={{ width: 0 }}>
                                                {this.state.showTrainingEndDate ? <div id="errordiv" className="container-fluid">{this.state.errorMsgTrainingEndDate}</div> : null}
                                                    
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <MDBInput autocomplete="off" value={this.state.courseName} onKeyPress={this.hideCourseName} label="Course Name" name="courseName" id="courseName" title="Course Name" onChange={(event) => {
                                                        this.setState({
                                                            courseName: event.target.value
                                                        }); this.hideCourseName();
                                                    }} />
                                                </div>
                                                <div class="col-md-4">
                                                    <MDBInput autocomplete="off" value={this.state.branchName} onKeyPress={this.hideBranchName} label="Branch Name" name="branchName" id="branchName" title="Branch Name" onChange={(event) => {
                                                        this.setState({
                                                            branchName: event.target.value
                                                        });this.hideBranchName(); 
                                                    }} />
                                                </div>
                                                <div class="col-md-4">
                                                    <MDBInput autocomplete="off" value={this.state.branchLocation} onKeyPress={this.hideBranchLocation} type="text" label="Branch Location" title="Branch Location" name="branchLocation" id="branchLocation" onChange={(event) => {
                                                        this.setState({
                                                            branchLocation: event.target.value
                                                        });this.hideBranchLocation();
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-4 p-0" style={{ width: 0 }}>
                                                    {this.state.showCourseName ? <div id="errordiv" className="container-fluid">{this.state.courseNameErrMsg}</div> : null}
                                                </div>


                                                <div className="col-4 p-0" >
                                                    {this.state.showBranchName ? <div id="errordiv" className="container-fluid">{this.state.branchNameErrMsg}</div> : null}


                                                </div>
                                                <div className="col-4 p-0" style={{ width: 0 }}>
                                                    {this.state.showBranchLocation ? <div id="errordiv" className="container-fluid">{this.state.branchLocationErrMsg}</div> : null}
                                                </div>
                                            </div>



                                            <div className=" input-group w-50 container-fluid">
                                                <MDBBtn outline id="generate" type="submit" className=" form-control-plaintext  justify-content-center text-center"
                                                    onClick={this.validation}
                                                    color="primary">Generate</MDBBtn>
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
export default withRouter(InputTrainingCommitLetter)