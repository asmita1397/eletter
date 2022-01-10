//This file contains all required details about Salary letter.
import React, { Component } from 'react'
import { MDBInput } from "mdbreact";
import { MDBBtn } from "mdbreact";
import Home from '../home';
import { withRouter } from 'react-router-dom';
import $ from 'jquery'
import moment from 'moment';
import { UserConsumer } from '../Context/CustomContext';
import BulkInput from '../BulkInput/BulkInput';
export class InputSalaryRevision extends Component {

    constructor(props) {
        super(props);
        this.state = {
            salute: 'Mr.',
            employeeName: '',
            employeeId: '',
            incrementInEffectDate: '',
            SalaryIncrementedFrom: '',
            SalaryIncrementedTo: '',

            date: '',
            CIN: '',


            withWaterMark: false,
            withHeader: false,
            gender: {
                gender1: 'He',
                gender2: 'him',
                gender3: 'his'
            },

            // valiadation state variables

            showEmployeeName: '',
            showEmployeeId: '',
            showJoiningDate: '',
            showDate: '',
            showIncrementInEffectDate: '',
            showCompanyLocation: '',
            showDesignation: '',
            showSalaryIncrementedFrom: '',
            showSalaryIncrementedTo: '',
            showIncrementInEffectDate: '',

            showCIN: '',
            validDate: '',

            // Error message
            employeeNameErrMsg: '',
            employeeIdErrMsg: '',
            errorMsgIncrementInEffectDate:'',
            errMsgSalaryIncrementedFrom:'',
            errMsgSalaryIncrementedTo:''

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
                incrementInEffectDate: this.props.empData.incrementInEffectDate,
                salaryIncrementedFrom: this.props.empData.salaryIncrementedFrom,
                salaryIncrementedTo: this.props.empData.salaryIncrementedTo,


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
        console.log("Date =", d.setMonth(d.getMonth() + 7))

        console.log("dattetaetaetaet ", this.state)
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

        let employeeId = (document.getElementById("employeeId").value).trim();
        let incrementInEffectDate = (document.getElementById("incrementInEffectDate").value).trim();
        let employeeName = (document.getElementById("employeeName").value).trim();

        let salaryIncrementedFrom = (document.getElementById("salaryIncrementFrom").value).trim();
        let salaryIncrementedTo = (document.getElementById("salaryIncrementTo").value).trim();
        let selectedDate = new Date(incrementInEffectDate)
        let now = new Date()


      
        if (employeeId === "" || !employeeId.match(/^([A-Za-z]){3}([0-9]){3,}?$/) || employeeId !== "") {

            if (employeeId !== "") {

                if (!employeeId.match(/^([A-Za-z]){3}([0-9]){3,}?$/)) {
                    this.setState({
                        showEmployeeId: true,
                        employeeIdErrMsg: 'Invalid ID Format!! ex:TYC123456 '
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
        
        if (incrementInEffectDate === "") {
            this.setState({
                showIncrementInEffectDate: true,
                errorMsgIncrementInEffectDate: "Please fill out Increment Effect Date field * "
            })
        }

        if (salaryIncrementedFrom === "" || salaryIncrementedFrom<0) {

            if(salaryIncrementedFrom==="")
            this.setState({ 
                showSalaryIncrementedFrom: true,
                errMsgSalaryIncrementedFrom:'Please fill out salary Increment from field *'
             })
             else
             {
                this.setState({ 
                    showSalaryIncrementedFrom: true,
                    errMsgSalaryIncrementedFrom:'salary Increment from field should be greater than zero *'
                 })
             }
        }


        if (salaryIncrementedTo === "" || salaryIncrementedTo<=0) {

            if(salaryIncrementedTo==="")
            this.setState({ 
                showSalaryIncrementedTo: true,
                errMsgSalaryIncrementedTo:'Please fill out salary Increment to field *'
             })
             else
             {
                this.setState({ 
                    showSalaryIncrementedTo: true,
                    errMsgSalaryIncrementedTo:'salary Increment to field should be greater than zero *'
                 })
             }
        }
       

      
    }

    hideEmployeeName = () => {
        this.setState({
            showEmployeeName: false
        })
    }
    hideIncrementInEffectDate = () => {
        this.setState({
            showIncrementInEffectDate: false
        })
    }
    hideEmployeeId = () => {
        this.setState({
            showEmployeeId: false
        })
    }

    hideSalaryIncrementedFrom = () => {
        this.setState({
            showSalaryIncrementedFrom: false
        })
    }
    hideSalaryIncrementedTo = () => {
        this.setState({
            showSalaryIncrementedTo: false
        })
    }
    hideCIN = () => {
        this.setState({
            showCIN: false
        })
    }

    hideInvaliddate = () => {
        this.setState({
            validDate: false
        })

    }


    onCheckHandler = (event) => {
         ;

        console.log("Checkbox value ==", event.target.value)
        if (event.target.value == 'false') {
            this.setState({
                withWaterMark: true
            })
            console.log("if  ==", this.state.withWaterMark)
        }
        else {
             ;
            this.setState({
                withWaterMark: false
            })
            console.log("else  ==", this.state.withWaterMark)

        }
    }

    onChangeHeader = (event) => {

         ;

        console.log("Checkbox value ==", event.target.value)
        if (event.target.value == 'false') {
            this.setState({
                withHeader: true
            })
            console.log("if  ==", this.state.withHeader)
        }
        else {
             ;
            this.setState({
                withHeader: false
            })
            console.log("else  ==", this.state.withHeader)

        }

    }


    pass = (event) => {
        event.preventDefault();
        console.log("data========", this.state)
        this.props.clicked(this.state)

        if (!this.state.showEmployeeId &&
            !this.state.showEmployeeName &&
            !this.state.showIncrementInEffectDate &&
            !this.state.showSalaryIncrementedFrom &&
            !this.state.showSalaryIncrementedTo) 
            {
            this.props.history.push('/SalaryRevision')
        }

    }
    handleChildData = (data) => {
        debugger
        console.log(data)
        this.props.clicked(data)
        if (data !== "") {
            this.props.history.push('/bulksalaryrevision')
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
                                        <h3 className="text-center black-text font-bold ">Salary Revision Letter</h3>
                                    </div>
                                    <div className="card-body ">
                                    {value.buttonVal ?
                                           
                                           <>                                              
                                          <BulkInput handleChildData={this.handleChildData} />
                                          </> :
                                          <>
                                          
                                        <form onSubmit={this.pass} noValidate>

                                            <div className="row">

                                                <div className="col-6">
                                                    <MDBInput autocomplete="off" onKeyPress={this.hideEmployeeName}
                                                        value={this.state.employeeName} label="Employee Name" className="w-100" name="employeeName" title="Employee Name" id="employeeName" onChange={(event) => {
                                                            this.setState({
                                                                employeeName: event.target.value
                                                            })
                                                        }} />
                                                </div>
                                                <div className="col-6">
                                                    <MDBInput autocomplete="off" onKeyPress={this.hideEmployeeId} value={this.state.employeeId} label="Employee Id" name="employeeId" id="employeeId" title="Employee Id" onChange={(event) => {
                                                        this.setState({
                                                            employeeId: event.target.value
                                                        })
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: 0 }}>

                                                <div className="col-6 p-0" style={{ width: 0 }}>
                                                    {this.state.showEmployeeName ? <div id="errordiv" className="container-fluid">{this.state.employeeNameErrMsg}</div> : null}
                                                </div>
                                                <div className="col-6 p-0" >
                                                    {this.state.showEmployeeId ? <div id="errordiv" className="container-fluid">{this.state.employeeIdErrMsg}</div> : null}

                                                </div>
                                            </div>

                                            <div class="row">

                                                <div class="col-12">
                                                    <MDBInput autocomplete="off" value={this.state.incrementInEffectDate} onClick={this.hideIncrementInEffectDate} 
                                                    onKeyPress={this.hideIncrementInEffectDate} max="2050-12-31" type="date" label="Increment In Effect Date" 
                                                    title="Increment In Effect Date" 
                                                    name="incrementInEffectDate" id="incrementInEffectDate" onChange={(event) => {
                                                        this.setState({
                                                            incrementInEffectDate: event.target.value
                                                        }); this.hideIncrementInEffectDate();
                                                    }} />
                                                </div>

                                            </div>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-12 p-0" style={{ width: 0 }}>
                                                {this.state.showIncrementInEffectDate ? <div id="errordiv" className="container-fluid">{this.state.errorMsgIncrementInEffectDate}</div> : null}
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-6">
                                                    <MDBInput autocomplete="off" value={this.state.salaryIncrementedFrom} min={0}type="number" onKeyPress={this.hideSalaryIncrementedFrom} label="Salary Incremented From" 
                                                    className="w-100" name="salaryIncrementedFrom" title="Salary Increment From" id="salaryIncrementFrom" onChange={(event) => {
                                                        this.setState({
                                                            salaryIncrementedFrom: event.target.value
                                                        })
                                                    }} />
                                                </div>
                                                <div class="col-6">
                                                    <MDBInput autocomplete="off" value={this.state.salaryIncrementedTo} min={0}type="number" onKeyPress={this.hideSalaryIncrementedTo} label="Salary Incremented To" 
                                                    className="w-100" name="salaryIncrementedTo" title="Salary Increment To" id="salaryIncrementTo" onChange={(event) => {
                                                        this.setState({
                                                            salaryIncrementedTo: event.target.value
                                                        })
                                                    }} />
                                                </div>

                                            </div>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-6 p-0" >
                                                {this.state.showSalaryIncrementedFrom ? <div id="errordiv" className="container-fluid">{this.state.errMsgSalaryIncrementedFrom}</div> : null}


                                                </div>
                                                <div className="col-6 p-0" >
                                                {this.state.showSalaryIncrementedTo ? <div id="errordiv" className="container-fluid">{this.state.errMsgSalaryIncrementedTo}</div> : null}
                                                </div>
                                            </div>

                                            <div className=" input-group w-50 container-fluid">
                                                <MDBBtn outline type="submit" id="generate" 
                                                outline className=" form-control-plaintext  justify-content-center text-center" 
                                                onClick={this.validation}
                                                color="primary">Generate</MDBBtn>
                                            </div>
                                        </form> </>}
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

export default withRouter(InputSalaryRevision)