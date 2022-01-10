//This file contains all required details about Designation letter.
import React, { Component } from 'react'
import { MDBInput } from "mdbreact";
import { MDBBtn } from "mdbreact";
import Home from '../home';
import { withRouter } from 'react-router-dom';
import $ from 'jquery'
import { UserConsumer } from '../Context/CustomContext';
import BulkInput from '../BulkInput/BulkInput';

export class InputDesignationLetter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employeeName: '',
            employeeId: '',
            newDesignation: '',
            date: '',
            effdate: '',
            withWaterMark: false,
            withHeader: false,
            // validation variable
            showEmployeeName: '',
            showEmployeeId: '',
            showNewDesignation: '',
            showEffdate: '',

            // valiadation msg state variables
            showEmployeeNameMsg: '',
            showEmployeeIdMsg: '',
            showNewDesignationMsg: '',
            errorMsgEffdate:''

        }
    }

    static contextType = UserConsumer;
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
    hideEffdate = () => {
        this.setState({
            showEffdate: false
        })
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
    hideNewDesignation = () => {
        this.setState({
            showNewDesignation: false
        })
    }

    componentDidMount() {


        let editClick = localStorage.getItem("editClick");
        if (editClick) {
            this.setState({
                employeeName: this.props.empData.employeeName,
                employeeId: this.props.empData.employeeId,
                newDesignation: this.props.empData.newDesignation,
                effdate: this.props.empData.effdate
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
        let employeeId = (document.getElementById("employeeId").value).trim();
        let newDesignation = (document.getElementById("newDesignation").value).trim();
        let effdate = (document.getElementById("effDate").value)
        let selectedDate = new Date(effdate).setHours(23)
        let now = new Date()
        if (effdate === "") {
            that.setState({ showEffdate: true })
        }

        if (newDesignation === "") {
            that.setState({ showNewDesignation: true })
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


        //****************************************     for     newDesignation   ************************************* */

        if (newDesignation !== "") {
            this.setState({
                showNewDesignation: false
            })
            if (newDesignation.match(/^[a-zA-Z\s]*$/)) {
                this.setState({
                    showNewDesignation: false
                })

                if (newDesignation.length > 2) {
                    this.setState({
                        showNewDesignation: false
                    })
                    if (newDesignation.length < 20) {
                        this.setState({
                            showNewDesignation: false
                        })

                    }

                    else {
                        this.setState({
                            showNewDesignation: true,
                            showNewDesignationMsg: "Designation must not exceeded 20 characters* "
                        })


                    }

                } else {
                    this.setState({
                        showNewDesignation: true,
                        showNewDesignationMsg: "Minimum 3 characters Required * "
                    })
                }


            } else {
                this.setState({
                    showNewDesignation: true,
                    showNewDesignationMsg: "Designation should contain only alphabets * "
                })
            }


        }
        else {
            this.setState({
                showNewDesignation: true,
                showNewDesignationMsg: "Please fill out Designation field * "
            })
        }



        if ( effdate === "" ||  selectedDate <now) {


            console.log(selectedDate)
            console.log(now)
            if (effdate === "") {
                this.setState({
                    showEffdate: true,
                    errorMsgEffdate: "Please fill out Effective Date field *"
                })
            }
            else  {
                this.setState({
                    showEffdate: true,
                    errorMsgEffdate: "EffectiveDate must greater than or equal to Today's date"
                })
            }
            
        }







      
    }





    pass = (event) => {
        event.preventDefault();
        if (!this.state.showEmployeeName && !this.state.showEmployeeId && !this.state.showJoiningDate && !this.state.showNewDesignation && !this.state.showEffdate) {

            this.props.history.push('/DesignationLetter')
        }
        this.props.clicked(this.state)

    }
    handleChildData = (data) => {
        debugger
        console.log(data)
        this.props.clicked(data)
        if (data !== "") {
            this.props.history.push('/bulkdesignationletter')
        }
    }

    //edit

    // 
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
                                        <h3 className="text-center black-text font-bold ">Designation Change Letter</h3>
                                    </div>
                                    <div className="card-body ">




                                    {value.buttonVal ?
                                           
                                           <>                                              
                                          <BulkInput handleChildData={this.handleChildData} />
                                          </> :
                                          <>
                                        <form onSubmit={this.pass}>
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
                                                    {this.state.showEmployeeId ? <div id="errordiv" className="container-fluid">{this.state.showEmployeeIdMsg}</div> : null}
                                                </div>
                                            </div>


                                            <div class="row">
                                                <div class="col-md-6">
                                                    <MDBInput autocomplete="off" value={this.state.newDesignation} onKeyPress={this.hideNewDesignation} label="New Designation" type="text" name="newDesignation" id="newDesignation" title="New Designation" onChange={(event) => {
                                                        this.setState({
                                                            newDesignation: event.target.value
                                                        })
                                                    }} />

                                                </div>
                                                <div class="col-md-6">
                                                    <MDBInput autocomplete="off" value={this.state.effdate} onKeyPress={this.hideEffdate} onClick={this.hideEffdate} max="2050-12-31" type="date" label="Effect Date" title="Effect Date" name="effDate" id="effDate" onChange={(event) => {
                                                        this.setState({
                                                            effdate: event.target.value
                                                        }); this.hideEffdate();
                                                    }} />
                                                </div>

                                            </div>

                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-6">
                                                    {this.state.showNewDesignation ? <div id="errordiv" className="container-fluid p-0">{this.state.showNewDesignationMsg}</div> : null}


                                                </div>
                                                <div className="col-6 p-0" style={{ width: 0 }}>
                                                {this.state.showEffdate ? <div id="errordiv" className="container-fluid">{this.state.errorMsgEffdate}</div> : null}
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
export default withRouter(InputDesignationLetter)
