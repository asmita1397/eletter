//This file contains all required details about Offer letter.
import React, { Component } from 'react'
import { MDBInput } from "mdbreact";
import { MDBBtn } from "mdbreact";
import Home from '../home';
import $ from 'jquery'
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { UserConsumer } from '../Context/CustomContext';
import BulkInput from '../BulkInput/BulkInput';
export class InputOffer2Letter extends Component {


    constructor(props) {
        super(props);
        this.state = {
            employeeName: '',
            fatherName: '',
            age: '',
            address: '',
            designation: '',
            offerValidity: '',
            companyLocation: '',
            salary: '',
            date: '',
            salute: 'S/o',
            withWaterMark: false,
            withHeader: false,

            // validation variable
            showName: '',
            showfatherName: '',
            showAge: '',
            showAddress: '',
            showDesignation: '',
            showCompanyLocation: '',
            showOfferValidity: '',
            showSalary: "",
            showInvalidDate: '',
            showInvalidEmployeeName: '',
            errorMsgOfferValidity: '',
            errorMsgSalray: '',

            // Errro Message
            employeeNameErrMsg: '',
            fatherNameErrMsg: '',
            designationErrMsg: '',
            companyLocationErrMsg: '',
            salaryErrMsg: '',
            addressErrMsg: ''

        }
    }
    static contextType = UserConsumer;

    componentDidMount() {
        let editClick = localStorage.getItem("editClick");
        if (editClick) {
            this.setState({

                salute: this.props.empData.salute,
                employeeName: this.props.empData.employeeName,
                fatherName: this.props.empData.fatherName,
                age: this.props.empData.age,
                address: this.props.empData.address,
                designation: this.props.empData.designation,
                offerValidity: this.props.empData.offerValidity,
                companyLocation: this.props.empData.companyLocation,
                salary: this.props.empData.salary,
            })

        }

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
    }

    validation = () => {
        var that = this;

        let employeeName = (document.getElementById("employeeName").value).trim();
        let fatherName = (document.getElementById("fatherName").value).trim();
        let designation = (document.getElementById("designation").value).trim();
        let companyLocation = (document.getElementById("companyLocation").value).trim();
        let offerValidity = (document.getElementById("offerValidity").value).trim();
        let address = (document.getElementById("address").value).trim();
        let age = (document.getElementById("age").value).trim();
        let salary = (document.getElementById("salary").value).trim();
        let selectedDate = new Date(offerValidity).setHours(23);
        let now = new Date()




        if (offerValidity === "" || selectedDate < now) {


            console.log(selectedDate)
            console.log(now)
            if (offerValidity === "") {
                this.setState({
                    showOfferValidity: true,
                    errorMsgOfferValidity: "Please fill out JoiningDate field *"
                })
            }
            else {
                this.setState({
                    showOfferValidity: true,
                    errorMsgOfferValidity: "JoiningDate must greater than  Today's date"
                })
            }

        }
        if (salary === "" || salary < 0) {
            if (salary === "") {
                that.setState({
                    showSalary: true,
                    errorMsgSalray: 'Please fill out Salray field *'
                })
            }
            else {
                that.setState({
                    showSalary: true,
                    errorMsgSalray: 'Salray field must be greater than 0*'
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

        if (age === "" || age<0) {
            if(age==="")
            that.setState({
                showAge: true,
                ageErrMsg: "Please fill out Age field * "
            })
            else
            {
                that.setState({
                    showAge: true,
                    ageErrMsg: "Age field should be greater than zero* "
                })  
            }
        }

        if (address === "" || !address.match(/^[#.0-9a-zA-Z\s,-/:()]+$/) || address !== "") {

            if (address !== "") {

                if (address.match(/^[#.0-9a-zA-Z\s,-/:()]+$/)) {

                    if (address.length < 3 || address.length > 100) {
                        this.setState({
                            showAddress: true,
                            addressErrMsg: `Address Contains MIN 3 and MAX 100 Character Only!!`
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


        if (fatherName === "" || !fatherName.match(/^[a-zA-Z\s]*$/) || fatherName !== "") {

            if (fatherName !== "") {

                if (fatherName.match(/^[a-zA-Z\s]*$/)) {

                    if (fatherName.length < 3 || fatherName.length > 20) {
                        this.setState({
                            showFatherName: true,
                            fatherNameErrMsg: 'Father Name Contains MIN 3 and MAX 20 Character Only!!'
                        })
                    }
                }
                else {
                    this.setState({
                        showFatherName: !this.showEmployeeName,
                        fatherNameErrMsg: 'Father Name should contains Alphabets!!'
                    })
                }
            } else {
                this.setState({
                    showFatherName: true,
                    fatherNameErrMsg: 'Father Name  Required *'
                })
            }
        }

        if (employeeName === "" || !employeeName.match(/^[a-zA-Z\s]*$/) || employeeName !== "") {

            if (employeeName !== "") {

                if (employeeName.match(/^[a-zA-Z\s]*$/)) {

                    if (employeeName.length < 3 || employeeName.length > 20) {
                        this.setState({
                            showName: true,
                            employeeNameErrMsg: 'Employee Name Contains MIN 3 and MAX 20 Character Only!!'
                        })
                    }
                }
                else {
                    this.setState({
                        showName: !this.showEmployeeName,
                        employeeNameErrMsg: 'Employee Name should contains Alphabets!!'
                    })
                }
            } else {
                this.setState({
                    showName: true,
                    employeeNameErrMsg: 'Employee Name  Required *'
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
            ;
            this.setState({
                withHeader: false
            })

        }
    }


    pass = (event) => {
        event.preventDefault();
        this.props.clicked(this.state)

        if (!this.state.showName &&
            !this.state.showAddress &&
            !this.state.showAge &&
            !this.state.showCompanyLocation &&
            !this.state.showDesignation &&
            !this.state.showFatherName &&
            !this.state.showOfferValidity &&
            !this.state.showSalary) {

            this.props.history.push('/Offerletter2')
        }
    }


    hideEmployeeName = () => {
        this.setState({
            showName: false
        })
    }
    hideInvalidEmployeeName = () => {
        this.setState({
            showInvalidEmployeeName: false
        })
    }
    hideFatherName = () => {
        this.setState({
            showFatherName: false
        })
    }
    hideAddress = () => {
        this.setState({
            showAddress: false
        })
    }
    hideAge = () => {
        this.setState({
            showAge: false
        })
    }
    hideSalary = () => {
        this.setState({
            showSalary: false
        })
    }

    hideOfferValidity = () => {
        this.setState({
            showOfferValidity: false
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
            this.props.history.push('/bulkofferletter2')
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
                                        <h3 className="text-center black-text font-bold ">Offer Letter</h3>
                                    </div>
                                    <div className="card-body ">

                                    {value.buttonVal ?
                                           
                                           <>                                              
                                          <BulkInput handleChildData={this.handleChildData} />
                                          </> :
                                          <>
                                        <form onSubmit={this.pass} noValidate>

                                            <div class="row">

                                                <div className="col-md-2" style={{ paddingTop: '25px' }}>
                                                    <select style={{ width: '70px' }} value={this.state.salute} class="browser-default custom-select" autocomplete="off" name="salutation" title="salutation" id="salutation" onChange={(event) => {
                                                        this.setState({
                                                            salute: event.target.value
                                                        })
                                                    }}>
                                                        <option selected value="S/o">Mr.</option>
                                                        <option value="D/o">Ms.</option>
                                                        <option value="D/o ">Mrs.</option>
                                                    </select>
                                                </div>
                                                <div class="col-10">
                                                    <MDBInput autocomplete="off" onKeyPress={() => {  ; this.hideEmployeeName(); }} onClick={() => { this.hideEmployeeName(); }}
                                                        value={this.state.employeeName} label="Employee Name" className="w-100" name="employeeName" title="Employee Name" id="employeeName" onChange={(event) => {
                                                            this.setState({
                                                                employeeName: event.target.value
                                                            }); this.hideEmployeeName();
                                                        }} />
                                                </div>

                                            </div>


                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="offset-2 col-10 p-0" >
                                                    {this.state.showName ? <div id="errordiv" className="container-fluid">{this.state.employeeNameErrMsg}</div> : null}

                                                </div>
                                                <div className="col-5 p-0" style={{ width: 0 }}>


                                                </div>
                                            </div>


                                            <div class="row">
                                                <div className="col-6">
                                                    <MDBInput autocomplete="off" value={this.state.fatherName} label="Father Name" type="text" name="fatherName" id="fatherName" title="fatherName" onChange={(event) => {
                                                        this.setState({
                                                            fatherName: event.target.value
                                                        }); this.hideFatherName();
                                                    }} />
                                                </div>
                                                <div className="col-6">
                                                    <MDBInput autocomplete="off" value={this.state.age} label="Age" type="number" name="age" id="age" title="Age" onChange={(event) => {
                                                        this.setState({
                                                            age: event.target.value
                                                        }); this.hideAge()
                                                    }} min="18" max="120" />
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-6 p-0" >
                                                    {this.state.showFatherName ? <div id="errordiv" className="container-fluid">{this.state.fatherNameErrMsg}</div> : null}

                                                </div>
                                                <div className="col-6 p-0" style={{ width: 0 }}>
                                                {this.state.showAge ? <div id="errordiv" className="container-fluid">{this.state.ageErrMsg}</div> : null}

                                                </div>
                                            </div>



                                            <div class="row">
                                                <div class="col-6">
                                                    <MDBInput autocomplete="off" value={this.state.designation} label="Designation" type="text" name="designation" id="designation" title="designation" onChange={(event) => {
                                                        this.setState({
                                                            designation: event.target.value
                                                        }); this.hideDesignation()
                                                    }} />
                                                </div>
                                                <div className="col-6">
                                                    <MDBInput autocomplete="off" value={this.state.companyLocation} label="Company Location" type="text" name="companyLocation" id="companyLocation" title="companyLocation" onChange={(event) => {
                                                        this.setState({
                                                            companyLocation: event.target.value
                                                        }); this.hideCompanyLocation()
                                                    }} />
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-6 p-0" >
                                                    {this.state.showDesignation ? <div id="errordiv" className="container-fluid">{this.state.designationErrMsg}</div> : null}

                                                </div>
                                                <div className="col-6 p-0" style={{ width: 0 }}>
                                                    {this.state.showCompanyLocation ? <div id="errordiv" className="container-fluid">{this.state.companyLocationErrMsg}</div> : null}

                                                </div>
                                            </div>


                                            <div class="row">
                                                <div class="col-6">
                                                    <MDBInput autocomplete="off" value={this.state.salary} label="Salary" min={0} type="number" name="salary" id="salary" title="salary" onChange={(event) => {
                                                        this.setState({
                                                            salary: event.target.value
                                                        }); this.hideSalary();
                                                    }} />
                                                </div>
                                                <div class="col-6">
                                                    <MDBInput autocomplete="off" value={this.state.offerValidity} onClick={() => { this.hideOfferValidity(); this.hideInvalidDate() }} onKeyPress={() => { this.hideInvalidDate() }} max="2050-12-31" type="date" label="Offer Validity" title="Offer Validity" name="offerValidity" id="offerValidity" onChange={(event) => {
                                                        this.setState({
                                                            offerValidity: event.target.value
                                                        }); this.hideOfferValidity();
                                                    }} />
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-6 p-0" >
                                                    {this.state.showSalary ? <div id="errordiv" className="container-fluid">{this.state.errorMsgSalray}</div> : null}

                                                </div>
                                                <div className="col-6 p-0" style={{ width: 0 }}>
                                                    {this.state.showOfferValidity ? <div id="errordiv" className="container-fluid">{this.state.errorMsgOfferValidity}</div> : null}

                                                </div>
                                            </div>


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

                                                <div className="col-12 p-0" style={{ width: 0 }}>
                                                    {this.state.showAddress ? <div id="errordiv" className="container-fluid">{this.state.addressErrMsg}</div> : null}
                                                </div>
                                            </div>

                                            <div className=" input-group w-50 container-fluid">
                                                <MDBBtn outline type="submit" id="genrate"
                                                    className=" form-control-plaintext  justify-content-center text-center"
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
            </div >
        )
    }
}
export default withRouter(InputOffer2Letter)


