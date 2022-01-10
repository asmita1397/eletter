//This file contains all required details about HR letter.
import React, { Component } from 'react'
import { MDBInput } from "mdbreact";
import { MDBBtn } from "mdbreact";
import Home from '../home';
import { withRouter } from 'react-router-dom';
import $ from 'jquery'
import moment from 'moment';
import { UserConsumer } from '../Context/CustomContext';
import BulkInput from '../BulkInput/BulkInput';

export class InputHRLetter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            salute: 'Mr.',
            employeeName: '',
            employeeId: '',
            joiningDate: '',
            address: '',
            date: '',
            CIN: '',
            designation: '',
            withWaterMark: false,
            withUrl:false,
            withHeader: false,
            gender: {
                gender1: 'He',
                gender2: 'him',
                gender3: 'his'
            },

            // Error Messages
            employeeNameErrMsg: '',
            employeeIdErrMsg: '',
            addressErrMsg: '',
            designationErrMsg: '',
            errorMsgJoiningDate: '',

            // valiadation state variables
            showAddress: '',
            showEmployeeName: '',
            showInvalidEmployeeName: '',
            showEmployeeId: '',
            showJoiningDate: '',
            showDate: '',
            showCIN: '',
            showDesignation: '',
            validDate: ''
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
                joiningDate: this.props.empData.joiningDate,
                address: this.props.empData.address
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
            date: today
        })

        var d = new Date();
        if (this.state.salute === "Ms." || this.state.salute === "Mrs.") {
            this.setState({
                ...this.state,
                gender: {
                    gender1: 'She',
                    gender2: 'her',
                    gender3: 'her'
                }
            })
        }


        let joiningDate = (document.getElementById("joiningDate").value).trim();
        let designation = (document.getElementById("designation").value).trim();
        let employeeId = (document.getElementById("employeeId").value).trim();
        let address = (document.getElementById("address").value).trim();
        let employeeName = (document.getElementById("employeeName").value).trim();
        let selectedDate = new Date(joiningDate)
        let now = new Date()

        

        if (joiningDate === "") {
            this.setState({
                showJoiningDate: true,
                errorMsgJoiningDate: "Please fill out JoiningDate field *"
            })
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
                        designationErrMsg: 'Designation Allowes Only Alphabet!!.'
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

        if (employeeId === "" || !employeeId.match(/^([A-Z]){3}([0-9]){3,}?$/) || employeeId !== "") {

            if (employeeId !== "") {

                if (!employeeId.match(/^([A-Za-z]){3}([0-9]){3,}?$/)) {
                    this.setState({
                        showEmployeeId: true,
                        employeeIdErrMsg: 'Invalid Format!! ex:TYC123456 '
                    })
                }
            }
            else {
                this.setState({
                    showEmployeeId: true,
                    employeeIdErrMsg: 'Employee id Required * '
                })
            }
        }


        if (address === "" || !address.match(/^[#.0-9a-zA-Z\s,-/:()]+$/) || address !== "") {

            if (address !== "") {

                if (address.match(/^[#.0-9a-zA-Z\s,-/:()]+$/) || address.match(/^[0-9]+$/) ) {

                    if (address.length > 100) {
                        this.setState({
                            showAddress: true,
                            addressErrMsg: `Address field allowed only 100 Characters.`
                        })
                    }
                    else if(address.match(/^[0-9]+$/)) 
                    {
                        this.setState({
                            showAddress: true,
                            addressErrMsg: `Address field Must contain alphabets.`
                        })
                    }
                }
                else {
                    this.setState({
                        showAddress: true,
                        addressErrMsg: `Address Allowed Only [alphabets,number and Special Character " { # . - ) ( : / } "]"`
                    })
                }
            }
            else {
                this.setState({
                    showAddress: true,
                    addressErrMsg: "Address Required *"
                })
            }

        }

        if (employeeName === "" || !employeeName.match(/^[a-zA-Z\s]*$/) || employeeName !== "") {

            if (employeeName !== "") {

                if (employeeName.match(/^[a-zA-Z\s]*$/)) {

                    if (employeeName.length < 3 || employeeName.length > 20) {
                        this.setState({
                            showEmployeeName: true,
                            employeeNameErrMsg: 'Employee Name Contains min 3 and max 20 Character Only!!'
                        })
                    }
                }
                else {
                    this.setState({
                        showEmployeeName: !this.showEmployeeName,
                        employeeNameErrMsg: 'Employee Name should contains Alphabets'
                    })
                }
            } else {
                this.setState({
                    showEmployeeName: true,
                    employeeNameErrMsg: 'Employee Name Required *'
                })
            }
        }
    }


    hideInvalidEmployeeName = () => {

        this.setState({
            showInvalidEmployeeName: false
        })
    }
    hideAddress = () => {
        this.setState({
            showAddress: false
        })
    }
    hideEmployeeId = () => {
        this.setState({
            showEmployeeId: false
        })
    }
    hideEmployeeName = () => {
        this.setState({
            showEmployeeName: false
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


    onCheckHandler = (event) => {
         ;

        //console.log("Checkbox value ==", event.target.value)
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
    onCheckHandler1 = (event) => {
        ;

       //console.log("Checkbox value ==", event.target.value)
       if (event.target.value == 'false') {
           this.setState({
               withUrl: true
           })
           
       }
       
       else {
            ;
           this.setState({
               withUrl: false
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


    pass = (event) => {
        event.preventDefault();
        
        this.props.clicked(this.state)

        if (!this.state.showDesignation
            && !this.state.showEmployeeId
            && !this.state.showAddress
            && !this.state.showEmployeeName
            && !this.state.showJoiningDate) {

            this.props.history.push('/hrLetter')
        }


    }

    handleChildData = (data) => {
        debugger
        this.props.clicked(data)
        if (data !== "") {
            this.props.history.push('/bulkhrletter')
        }
    }

    render() {
        let value = this.context;
        console.log("buttonval",value.buttonVal)
        return (
            <div>
                <Home buttonShow={false}  buttonVal={value.buttonVal}/>
                <div >
                    <div className="container-fluid mt-5">
                        <div className="row">
                            <div className="col-auto container mt-5 pb-5">
                                <div style={{ width: '500px' }} className="card m-auto shadow-lg mt-5">
                                    <div class="card-header" style={{ borderRadius: '0px !important', background: 'white' }} >
                                        <h3 className="text-center black-text font-bold ">HR  Letter</h3>
                                    </div>
                                    <div className="card-body ">
                                    {value.buttonVal ?
                                           
                                           <>                                              
                                          <BulkInput handleChildData={this.handleChildData} />
                                          </> :
                                          <>
                                          
                                        <form onSubmit={this.pass}>

                                            <div className="row">

                                                <div className="col-md-3" style={{ paddingTop: '25px' }}>
                                                    <select class="browser-default custom-select" autocomplete="off" value={this.state.salute} name="salutation" title="salutation" id="salutation" onChange={(event) => {
                                                        this.setState({
                                                            salute: event.target.value
                                                        });
                                                    }}>
                                                        <option selected value="Mr.">Mr.</option>
                                                        <option value="Ms.">Ms.</option>
                                                        <option value="Mrs.">Mrs.</option>
                                                    </select>
                                                </div>
                                                <div className="col-9">
                                                    <MDBInput autocomplete="off" onKeyPress={() => {  ; this.hideEmployeeName(); }} onClick={() => { this.hideEmployeeName(); }}
                                                        value={this.state.employeeName} label="Employee Name" className="w-100" name="employeeName" title="Employee Name" id="employeeName" onChange={(event) => {
                                                            this.setState({
                                                                employeeName: event.target.value
                                                            }); this.hideEmployeeName();
                                                        }} />
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-3 p-0" >

                                                </div>
                                                <div className="col-9 p-0" style={{ width: 0 }}>
                                                    {this.state.showEmployeeName ? <div id="errordiv" className="container-fluid">{this.state.employeeNameErrMsg} </div> : null}


                                                </div>
                                            </div>



                                            <div className="row">
                                                <div className="col-6">
                                                    <MDBInput autocomplete="off" onKeyPress={this.hideEmployeeId} value={this.state.employeeId} label="Employee Id" name="employeeId" id="employeeId" title="Employee Id" onChange={(event) => {
                                                        this.setState({
                                                            employeeId: event.target.value
                                                        }); this.hideEmployeeId();
                                                    }} />
                                                </div>
                                                <div className="col-6">
                                                    <MDBInput autocomplete="off" onKeyPress={this.hideDesignation}
                                                        value={this.state.designation} label="Designation" name="designation" id="designation" title="Designation" onChange={(event) => {
                                                            this.setState({
                                                                designation: event.target.value
                                                            }); this.hideDesignation();
                                                        }} />
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-6 p-0" >
                                                    {this.state.showEmployeeId ? <div id="errordiv" className="container-fluid">{this.state.employeeIdErrMsg} </div> : null}

                                                </div>
                                                <div className="col-6 p-0" style={{ width: 0 }}>
                                                    {this.state.showDesignation ? <div id="errordiv" className="container-fluid">{this.state.designationErrMsg}</div> : null}
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12">
                                                    <MDBInput autocomplete="off" type="date" max="2050-12-31" value={this.state.joiningDate} onKeyPress={() => { this.hideJoiningDate(); }} onClick={() => { this.hideJoiningDate(); }} label="Joining Date" title="Joining Date" name="Joining Date" id="joiningDate" onChange={(event) => {
                                                        this.setState({
                                                            joiningDate: event.target.value
                                                        }); this.hideJoiningDate();
                                                    }} />
                                                </div>

                                            </div>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-12 p-0">
                                                    {this.state.showJoiningDate ? <div id="errordiv" className="container-fluid">{this.state.errorMsgJoiningDate}</div> : null}

                                                </div>

                                            </div>

                                            {/* address */}
                                            <div class="row">
                                                <div class="col-12">
                                                    <MDBInput autocomplete="off" value={this.state.address} label="Address" type="textarea" name="address" id="address" title="address" onChange={(event) => {
                                                        this.setState({
                                                            address: event.target.value
                                                        }); this.hideAddress()
                                                    }} />
                                                </div>

                                            </div>

                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-6 p-0" >
                                                    {this.state.showAddress ? <div id="errordiv" className="container-fluid">{this.state.addressErrMsg} </div> : null}

                                                </div>

                                            </div>



                                            <div className=" input-group w-50 container-fluid">
                                                <MDBBtn outline type="submit" id="generate" outline className=" form-control-plaintext  justify-content-center text-center"
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

export default withRouter(InputHRLetter)