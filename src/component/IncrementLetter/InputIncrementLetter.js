//This file contains all required details about Increment letter.
import React, { Component } from 'react'
import { MDBInput } from "mdbreact";
import { MDBBtn } from "mdbreact";
import Home from '../home';
import $ from 'jquery'
import { withRouter } from 'react-router-dom';
import { UserConsumer } from '../Context/CustomContext';
import BulkInput from '../BulkInput/BulkInput';
export class InputIncrementLetter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employeeName: '',
            employeeId: '',
            annualCompensationYear: '',
            salaryIncremented: '',
            incrementInEffectDate: '',
            companyLocation: '',
            designation: '',
            date: '',
            withWaterMark: false,
            withHeader: false,

            // validation variable
            showEmployeeName: '',
            showEmployeeId: '',
            showAnnualCompensationYear: '',
            showSalaryIncremented: '',
            showIncrementInEffectDate: '',
            showCompanyLocation: '',
            showDesignation: '',


            // valiadation msg state variables
            showEmployeeNameMsg: '',
            showEmployeeIdMsg: '',
            showDesignationMsg: '',
            showSalaryIncrementedMsg: '',
            showAnnualCompensationYearMsg: "",
            showCompanyLocationMsg: "",
            errorMsgIncrementInEffectDate:''

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
                companyLocation: this.props.empData.companyLocation,
                annualCompensationYear: this.props.empData.annualCompensationYear,
                salaryIncremented: this.props.empData.salaryIncremented,
                incrementInEffectDate: this.props.empData.incrementInEffectDate,
            })

        }
        

    }
    pass = (event) => {
        event.preventDefault();
        if (!this.state.showEmployeeName && !this.state.showEmployeeId && !this.state.showJoiningDate && !this.state.showDesignation && !this.state.showCompanyLocation && !this.state.showIncrementInEffectDate && !this.state.showSalaryIncremented && !this.state.showAnnualCompensationYear) {

            this.props.history.push('/IncrementLetter')
        }

        this.props.clicked(this.state)

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
        let designation = (document.getElementById("designation").value).trim();
        let employeeId = (document.getElementById("employeeId").value).trim();
        let annualCompensationYear = (document.getElementById("annualCompensationYear").value).trim();
        let incrementInEffectDate = (document.getElementById("incrementInEffectDate").value).trim();
        let companyLocation = (document.getElementById("companyLocation").value).trim();
        let salaryIncrement = (document.getElementById("salaryIncrement").value).trim();
        let selectedDate = new Date(incrementInEffectDate).setHours(23)
        let now = new Date()


       

        if ( incrementInEffectDate === "" ||  selectedDate <now) {


            console.log(selectedDate)
            console.log(now)
            if (incrementInEffectDate === "") {
                this.setState({
                    showIncrementInEffectDate: true,
                    errorMsgIncrementInEffectDate: "Please fill out Increment Effect Date field *"
                })
            }
            else  {
                this.setState({
                    showIncrementInEffectDate: true,
                    errorMsgIncrementInEffectDate: "Increment Effect Date  must greater than or equal to Today's date"
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

        //****************************************     for     employeeId   ************************************* */

        if (employeeId !== "") {
            this.setState({
                showEmployeeId: false
            })
            if (employeeId.match(/^([A-Za-z]){3}([0-9]){3,}?$/) /* && employeeId.length === 9 */) {
                this.setState({
                    showEmployeeId: false
                })

            } else {
                this.setState({
                    showEmployeeId: true,
                    showEmployeeIdMsg: "Please enter EmpID in Format:TYC123456"
                })
            }

        } else {
            this.setState({
                showEmployeeId: true,
                showEmployeeIdMsg: "Please fill out EmployeeId field* "
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

        //****************************************     for     salaryIncrement   ************************************* */

        if (salaryIncrement !== "") {
            this.setState({ showSalaryIncremented: false })
            if (salaryIncrement > 0) {
                this.setState({ showSalaryIncremented: false })
                if (salaryIncrement.length < 8) {
                    this.setState({ showSalaryIncremented: false })
                } else {
                    this.setState({ showSalaryIncremented: true, showSalaryIncrementedMsg: "salaryIncrement not exceeded 8 characters*" })
                }
            } else {
                this.setState({ showSalaryIncremented: true, showSalaryIncrementedMsg: "salary Increment should be greater than 0 *" })
            }
        } else {
            this.setState({ showSalaryIncremented: true, showSalaryIncrementedMsg: "Please fill out salaryIncrement field *" })
        }

        //****************************************     for     annualCompensationYear   ************************************* */

        if (annualCompensationYear !== "") {
            this.setState({ showAnnualCompensationYear: false })
            if (annualCompensationYear >0) {
                this.setState({ showAnnualCompensationYear: false })
                if (  annualCompensationYear.toString().length >3) {
                    this.setState({ showAnnualCompensationYear: false })
                        if ( annualCompensationYear.toString().length < 5) {
                            this.setState({ showAnnualCompensationYear: false })
                        } else {
                            this.setState({ showAnnualCompensationYear: true, showAnnualCompensationYearMsg: "AnnualCompensationYear not exceeded 4 characters*" })
                        }
                    
                } else {
                    this.setState({ showAnnualCompensationYear: true, showAnnualCompensationYearMsg: "AnnualCompensationYear should contain 4 digit" })
                    
                }
                
            } else {
                this.setState({ showAnnualCompensationYear: true, showAnnualCompensationYearMsg: "annualCompensationYear  should be greater than 0 *" })
            }
        } else {
            this.setState({ showAnnualCompensationYear: true, showAnnualCompensationYearMsg: "Please fill out annualCompensationYear field *" })
        }



        //******************************************************************************************************************* */



    }


    hideEmployeeName = () => {
        this.setState({
            showEmployeeName: false
        })
    }
    hideEmployeeId = () => {
        this.setState({
            showEmployeeId: false
        })
    }
    hideAnnualCompensationYear = () => {
        this.setState({
            showAnnualCompensationYear: false
        })
    }
    hideSalaryIncremented = () => {
        this.setState({
            showSalaryIncremented: false
        })
    }
    hideIncrementInEffectDate = () => {
        this.setState({
            showIncrementInEffectDate: false
        })
    }
    hideCompanyLocation = () => {
        this.setState({
            showCompanyLocation: false
        })
    }
    hideDesignation = () => {
        this.setState({
            showDesignation: false
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

    //edit

    //
    handleChildData = (data) => {
        debugger
        console.log(data)
        this.props.clicked(data)
        if (data !== "") {
            this.props.history.push('/bulkincrementletter')
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
                                        <h3 className="text-center black-text font-bold ">Increment Letter</h3>
                                    </div>
                                    <div className="card-body ">
                                    {value.buttonVal ?
                                           
                                           <>                                              
                                          <BulkInput handleChildData={this.handleChildData} />
                                          </> :
                                          <>
                                        <form onSubmit={this.pass} noValidate>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <MDBInput autocomplete="off" value={this.state.employeeName} onKeyPress={this.hideEmployeeName} label="Employee Name" className="w-100" name="employeeName" title="Employee Name" id="employeeName" onChange={(event) => {
                                                        this.setState({
                                                            employeeName: event.target.value
                                                        })
                                                    }} />
                                                </div>
                                                <div class="col-md-6">
                                                    <MDBInput autocomplete="off" value={this.state.employeeId} onKeyPress={this.hideEmployeeId} label="Employee Id" className="w-100" name="employeeId" title="Employe Id" id="employeeId" onChange={(event) => {
                                                        this.setState({
                                                            employeeId: event.target.value
                                                        })
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-6 p-0" >
                                                    {this.state.showEmployeeName ? <div id="errordiv" className="container-fluid">{this.state.showEmployeeNameMsg}</div> : null}


                                                </div>
                                                <div className="col-6 p-0" style={{ width: 0 }}>
                                                    {this.state.showEmployeeId ? <div id="errordiv" className="container-fluid">{this.state.showEmployeeIdMsg} </div> : null}
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <MDBInput autocomplete="off" value={this.state.designation} onKeyPress={this.hideDesignation} label="Designation" type="text" name="designation" id="designation" title="Designation" onChange={(event) => {
                                                        this.setState({
                                                            designation: event.target.value
                                                        })
                                                    }} />

                                                </div>
                                                <div class="col-md-6">
                                                    <MDBInput autocomplete="off" value={this.state.companyLocation} onKeyPress={this.hideCompanyLocation} label="Company Location" type="text" name="companyLocation" id="companyLocation" title="Company Location" onChange={(event) => {
                                                        this.setState({
                                                            companyLocation: event.target.value
                                                        })
                                                    }} />

                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-6 p-0" >
                                                    {this.state.showDesignation ? <div id="errordiv" className="container-fluid">{this.state.showDesignationMsg}</div> : null}


                                                </div>
                                                <div className="col-6 p-0" style={{ width: 0 }}>
                                                    {this.state.showCompanyLocation ? <div id="errordiv" className="container-fluid">{this.state.showCompanyLocationMsg} </div> : null}
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-6">
                                                    <MDBInput autocomplete="off" value={this.state.salaryIncremented} min={0} type="number" onKeyPress={this.hideSalaryIncremented} label="Salary Incremented" className="w-100" name="salaryIncremented" title="Salary Increment" id="salaryIncrement" onChange={(event) => {
                                                        this.setState({
                                                            salaryIncremented: event.target.value
                                                        })
                                                    }} />
                                                </div>
                                                <div class="col-6">
                                                    <MDBInput autocomplete="off" value={this.state.incrementInEffectDate} onClick={this.hideIncrementInEffectDate} onKeyPress={this.hideIncrementInEffectDate} max="2050-12-31" type="date" label="Increment In Effect Date" title="Increment In Effect Date" name="incrementInEffectDate" id="incrementInEffectDate" onChange={(event) => {
                                                        this.setState({
                                                            incrementInEffectDate: event.target.value
                                                        }); this.hideIncrementInEffectDate();
                                                    }} />
                                                </div>

                                            </div>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-6 p-0" >
                                                    {this.state.showSalaryIncremented ? <div id="errordiv" className="container-fluid">{this.state.showSalaryIncrementedMsg}</div> : null}


                                                </div>
                                                <div className="col-6 p-0" style={{ width: 0 }}>
                                                {this.state.showIncrementInEffectDate ? <div id="errordiv" className="container-fluid">{this.state.errorMsgIncrementInEffectDate} </div> : null}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div class="col-12">
                                                    <MDBInput autocomplete="off" value={this.state.annualCompensationYear} min={2000} onKeyPress={this.hideAnnualCompensationYear} type="number" label="Annual Compensation Year" title="Annual Compensation Year" name="annualCompensationYear" id="annualCompensationYear" onChange={(event) => {
                                                        this.setState({
                                                            annualCompensationYear: event.target.value
                                                        }); this.hideAnnualCompensationYear();
                                                    }} />

                                                </div>


                                            </div>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-12 p-0" >
                                                    {this.state.showAnnualCompensationYear ? <div id="errordiv" className="container-fluid">{this.state.showAnnualCompensationYearMsg}</div> : null}
                                                </div>
                                              
                                            </div>




                                            <div className=" input-group w-50 container-fluid">
                                                <MDBBtn outline id="genrate" type="submit" className=" form-control-plaintext  justify-content-center text-center" color="primary" onClick={this.validation}>Generate</MDBBtn>
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
export default withRouter(InputIncrementLetter)