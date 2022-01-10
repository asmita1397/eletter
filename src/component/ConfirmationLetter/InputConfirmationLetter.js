//This file contains all required details about Confirmation letter.
import React, { Component } from 'react'
import { MDBInput } from "mdbreact";
import { MDBBtn } from "mdbreact";
import Home from '../home';
import { withRouter } from 'react-router-dom';
import $ from 'jquery'
import moment from 'moment'
import { UserConsumer } from '../Context/CustomContext';
import BulkInput from '../BulkInput/BulkInput';

export class InputConfirmationLetter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employeeName: '',
            employeeId: '',
            designation: '',
            joiningDate: '',
            probationEndDate: '',
            date: '',
            withWaterMark: false,
            withHeader: false,
            //validation variable

            showEmployeeName: '',
            showEmployeeId: '',
            showDesignation: '',
            showJoiningDate: '',
            showProbationEndDate: '',
            showInvalidDate: '',

             // valiadation msg state variables
             showEmployeeNameMsg: '',
             showEmployeeIdMsg: '',
             showDesignationMsg: '',
             errorMsgJoiningDate:''

        }
    }
    static contextType = UserConsumer;
    componentDidMount() {
        let editClick = localStorage.getItem("editClick");
        if (editClick) {
            this.setState({


                salute: this.props.empData.salute,
                employeeName: this.props.empData.employeeName,
                employeeId: this.props.empData.employeeId,
                designation: this.props.empData.designation,
                joiningDate: this.props.empData.joiningDate
            })

        }


        
    }
    pass = (event) => {
        event.preventDefault();

        if (!this.state.showEmployeeName && !this.state.showEmployeeId && !this.state.showJoiningDate && !this.state.showDesignation && !this.state.showInvalidDate && !this.state.showProbationEndDate) {
            
    this.props.history.push('/confirmationLetter')
            }
        this.props.clicked(this.state)

    }

validation = () =>{
    
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
        let joiningDate = (document.getElementById("joiningDate").value).trim();
        let designation = (document.getElementById("designation").value).trim();
        let employeeId = (document.getElementById("employeeId").value).trim();
        let employeeName = (document.getElementById("employeeName").value).trim();
        let selectedDate = new Date(joiningDate).setHours(23)
        let now = new Date()

        


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
            if (employeeId.match(/^([A-Za-z]){3}([0-9]){3,}?$/) ) {
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




        if ( joiningDate === "" ||  selectedDate <now) {


            console.log(selectedDate)
            console.log(now)
            if (joiningDate === "") {
                this.setState({
                    showJoiningDate: true,
                    errorMsgJoiningDate: "Please fill out joiningDate field *"
                })
            }
           
        }

       
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
    hideJoiningDate = () => {
        this.setState({
            showJoiningDate: false
        })
    }
    hideDesignation = () => {
        this.setState({
            showDesignation: false
        })
    }

    /* hideProbationEndDate = () => {
        this.setState({
            showProbationEndDate: false
        })
    } */
    hideInvalidDate = () => {
        this.setState({
            showInvalidDate: false
        })
    }

  
    handleChildData = (data) => {
        debugger
        console.log(data)
        this.props.clicked(data)
        if (data !== "") {
            this.props.history.push('/bulkconfirmationletter')
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
                                        <h3 className="text-center black-text font-bold ">Confirmation Letter</h3>
                                    </div>
                                    <div className="card-body ">


                                     {value.buttonVal  ?
                                            <>
                                                <BulkInput handleChildData={this.handleChildData} />
                                            </> :<>
                                        <form onSubmit={this.pass}>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <MDBInput autocomplete="off" value={this.state.employeeName} onKeyPress={this.hideEmployeeName} label="Employee Name" className="w-100" name="employeeName" title="Employee Name" id="employeeName" onChange={(event) => {
                                                        this.setState({
                                                            employeeName: event.target.value
                                                        });this.hideEmployeeName();
                                                    }} />
                                                </div>
                                                <div class="col-md-6">
                                                    <MDBInput autocomplete="off" value={this.state.employeeId} onKeyPress={this.hideEmployeeId} label="Employee Id" className="w-100" name="employeeId" title="Employe Id" id="employeeId" onChange={(event) => {
                                                        this.setState({
                                                            employeeId: event.target.value
                                                        });this.hideEmployeeId();
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-6 p-0" >
                                                {this.state.showEmployeeName ? <div id="errordiv" className="container-fluid">{this.state.showEmployeeNameMsg}</div> : null}
                                                </div>
                                                <div className="col-6 p-0" style={{ width: 0 }}>
                                                    {this.state.showEmployeeId ? <div id="errordiv" className="container-fluid">{this.state.showEmployeeIdMsg}</div> : null}
                                                </div>
                                            </div>
                                           

                                            <div class="row">
                                                <div class="col-md-12">
                                                    <MDBInput autocomplete="off" value={this.state.designation} onKeyPress={this.hideDesignation} label="Designation" type="text" name="designation" id="designation" title="designation" onChange={(event) => {
                                                        this.setState({
                                                            designation: event.target.value
                                                        });this.hideDesignation();
                                                    }} />

                                                </div>


                                            </div>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-12" >
                                                    {this.state.showDesignation ? <div id="errordiv" className="container-fluid p-0">{this.state.showDesignationMsg} </div> : null}
                                                </div>
                                            </div>


                                            <div class="row">
                                                <div class="col-md-12">
                                                    <MDBInput autocomplete="off" value={this.state.joiningDate} onKeyPress={this.hideJoiningDate} onClick={this.hideJoiningDate} type="date" max="2050-12-31" label="Joined Date" title="Joining Date" name="joiningDate" id="joiningDate" onChange={(event) => {
                                                        this.setState({
                                                            joiningDate: event.target.value
                                                        }); this.hideJoiningDate();
                                                    }} />
                                                </div>

                                            </div>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-12 p-0" >
                                                {this.state.showJoiningDate ? <div id="errordiv" className="container-fluid">{this.state.errorMsgJoiningDate}</div> : null}


                                                </div>

                                            </div>


                                            <div className=" input-group w-50 container-fluid">
                                                <MDBBtn outline id="generate" type="submit" className=" form-control-plaintext  justify-content-center text-center" color="primary" onClick={this.validation}>Generate</MDBBtn>
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
export default withRouter(InputConfirmationLetter)
