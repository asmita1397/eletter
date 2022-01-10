//This file contains all required details about Delivery Policy letter.
import React, { Component } from 'react'
import { MDBInput } from "mdbreact";
import { MDBBtn } from "mdbreact";
import Home from '../home';
import { withRouter } from 'react-router-dom';
import $ from 'jquery'
import moment from 'moment';
import { UserConsumer } from '../Context/CustomContext';
import BulkInput from '../BulkInput/BulkInput';
export class InputDeliveryPolicy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            salute: 'S/o',
            employeeName: '',
            employeeId: '',
            joiningDate: '',
            address: '',
            fatherName: '',
            age: '',
            date: '',
            
            designation: '',
            withWaterMark: false,
            withHeader: false,
            gender: {
                gender1: 'He',
                gender2: 'his',
                gender3: 'him',
            },

            // valiadation state variables
            showAddress: '',
            showEmployeeName: '',
            showfatherName: '',
            showInvalidEmployeeName: '',
            showAge: '',
            showEmployeeId: '',
            showJoiningDate: '',
            showDate: '',
            showDesignation: '',
           

            //validation message state variable
            errorMsgEmployeeName: '',
            errorMsgFatherName: '',
            errorMsgEmpId: '',
            errorMsgDesignation: '',
            errorMsgAge: '',
            errorMsgAddress: '',
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
                fatherName: this.props.empData.fatherName,
                age: this.props.empData.age,
                designation: this.props.empData.designation,
                joiningDate: this.props.empData.joiningDate,
                address: this.props.empData.address
            })

        }
        var that = this;
   
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
    hideAddress = () => {
        this.setState({
            showAddress: false
        })
    }
    hideFatherName = () => {
        this.setState({
            showFatherName: false
        })
    }
    hideAge = () => {
        this.setState({
            showAge: false
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

        console.log("Checkbox value ==", event.target.value)
        if (event.target.value == 'false') {
            this.setState({
                withHeader: true
            })
            console.log("if  ==", this.state.withHeader)
        }
        else {

            this.setState({
                withHeader: false
            })
            console.log("else  ==", this.state.withHeader)

        }


    }

    validation=() => {

        console.log("inside CDM")


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
        if (this.state.salute === "D/o") {
            this.setState({
                ...this.state,
                gender: {
                    gender1: 'She',
                    gender2: 'her',
                    gender3: 'her'
                }
            })
        }

        let fatherName = (document.getElementById("fatherName").value).trim();
        let age = (document.getElementById("age").value).trim();
        let joiningDate = (document.getElementById("joiningDate").value).trim();
        let designation = (document.getElementById("designation").value).trim();
        let employeeId = (document.getElementById("employeeId").value).trim();
        let address = (document.getElementById("address").value).trim();
        let employeeName = (document.getElementById("employeeName").value).trim();
        let selectedDate = new Date(joiningDate)
        let now = new Date()

        console.log("Inside Validation", joiningDate, employeeName, designation, employeeId);



        if (joiningDate === "") {
            this.setState({
                showJoiningDate: true,
                errorMsgJoiningDate: "Please fill out JoiningDate field *"
            })
        }

        //address
        if (!address.match(/^[A-Za-z\s]+$/) || address === "" || address.length > 100) {
            if (address === "") {
                this.setState({
                    showAddress: true,
                    errorMsgAddress: "Please fill out address field *"
                })
            }
            else if (address.length > 100) {
                this.setState({
                    showAddress: true,
                    errorMsgAddress: "length should less than 30"
                })
            }
            else {
                this.setState({
                    showAddress: true,
                    errorMsgAddress: "errorMsgAddress should be letter"
                })
            }

        }
        

        //employeeName
        if (!employeeName.match(/^[A-Za-z ]+$/) || employeeName === "" || employeeName.length > 20) {
            if (employeeName === "") {
                this.setState({
                    showEmployeeName: true,
                    errorMsgEmployeeName: "Please fill out Name field *"
                })
            } else if (employeeName.length > 20) {
                this.setState({
                    showEmployeeName: true,
                    errorMsgEmployeeName: "EmployeeName should be less than 20"
                })
            }
            else {
                this.setState({
                    showEmployeeName: true,
                    errorMsgEmployeeName: "EmployeeName should be letter"
                })
            }



        }


        //fathername
        if (!fatherName.match(/^[A-Za-z ]+$/) || fatherName === "" || fatherName.length > 20) {
            if (fatherName === "") {
                this.setState({
                    showFatherName: true,
                    errorMsgFatherName: "Please fill out Name field *"
                })
            } else if (fatherName.length > 20) {
                this.setState({
                    showFatherName: true,
                    errorMsgFatherName: "length should less than 30"
                })
            }
            else {
                this.setState({
                    showFatherName: true,
                    errorMsgFatherName: "FatherName should be letter"
                })
            }



        }


        //employeeId
        if (!employeeId.match(/^([A-Za-z]){3}([0-9]){3,}?$/) || employeeId === "" /* || employeeId.length !== 9 */) {
            if (employeeId === "") {
                this.setState({
                    showEmployeeId: true,
                    errorMsgEmpId: "Please fill out ID field *"
                })
            }
            else {
                this.setState({
                    showEmployeeId: true,
                    errorMsgEmpId: "Please enter EmpID in Format:TYC123456"
                })
            }



        }


        //designation
        if (!designation.match(/^[A-Za-z ]+$/) || designation === "" || designation.length > 30) {
            if (designation === "") {
                this.setState({
                    showDesignation: true,
                    errorMsgDesignation: "Please fill out Designation field *"
                })
            }
            else if (designation.length > 30) {
                this.setState({
                    showDesignation: true,
                    errorMsgDesignation: "length should less than 30"
                })
            }
            else {
                this.setState({
                    showDesignation: true,
                    errorMsgDesignation: "Designation should be letter"
                })
            }



        }


        //age
        if (!age.match(/^[0-9]+$/) || age === "" || age.length > 3 || Number(age) === 0) {
            if (age === "") {
                this.setState({
                    showAge: true,
                    errorMsgAge: "Please fill out Age field *"
                })
            }
            else if (age.length > 3) {
                this.setState({
                    showAge: true,
                    errorMsgAge: "give proper age"
                })
            }

            else {
                this.setState({
                    showAge: true,
                    errorMsgAge: "Age field should be greater than zero"
                })
            }



        }






        
}
    pass = (event) => {
        event.preventDefault();
        console.log("this.props.empData========", this.state)



        this.props.clicked(this.state)
        if(!this.state.showAddress && !this.state.showAge && !this.state.showDate && !this.state.showDesignation && !this.state.showEmployeeName && !this.state.showEmployeeId && !this.state.showfatherName){

      
            this.props.history.push('/DeliveryPolicy')

        }

        

    }

    //edit

    //

    handleChildData = (data) => {
        debugger
        console.log(data)
        this.props.clicked(data)
        if (data !== "") {
            this.props.history.push('/bulkdeliverypolicy')
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
                                        <h3 className="text-center black-text font-bold ">Delivery Policy Letter</h3>
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
                                                        <option value="D/o">Mrs.</option>
                                                    </select>
                                                </div>
                                                <div class="col-5">
                                                    <MDBInput autocomplete="off" onKeyPress={() => {  ; this.hideEmployeeName();  }} onClick={() => { this.hideEmployeeName(); }}
                                                        value={this.state.employeeName} label="Employee Name" className="w-100" name="employeeName" title="Employee Name" id="employeeName" onChange={(event) => {
                                                            this.setState({
                                                                employeeName: event.target.value
                                                            }); this.hideEmployeeName(); 
                                                        }} />
                                                </div>
                                                <div className="col-5">
                                                    <MDBInput autocomplete="off" value={this.state.fatherName} label="Father Name" type="text" name="fatherName" id="fatherName" title="Father Name" onChange={(event) => {
                                                        this.setState({
                                                            fatherName: event.target.value
                                                        }); this.hideFatherName();
                                                    }} />
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="offset-2 col-5 p-0" >
                                                    

                                                    {this.state.showEmployeeName ? <div id="errordiv" className="container-fluid">{this.state.errorMsgEmployeeName} </div> : null}
                                                </div>

                                                <div className="col-5 p-0" style={{ width: 0 }}>
                                                {this.state.showFatherName ? <div id="errordiv" className="container-fluid">{this.state.errorMsgFatherName}</div> : null}

                                                </div>
                                            </div>




                                            <div className="row">
                                                <div className="col-6">
                                                    <MDBInput autocomplete="off" onKeyPress={this.hideEmployeeId} value={this.state.employeeId} label="Employee Id" name="employeeId" id="employeeId" title="Employee Id" onChange={(event) => {
                                                        this.setState({
                                                            employeeId: event.target.value
                                                        })
                                                    }} />
                                                </div>
                                                <div className="col-6">
                                                    <MDBInput autocomplete="off" onKeyPress={this.hideDesignation}
                                                        value={this.state.designation} label="Designation" name="designation" id="designation" title="Designation" onChange={(event) => {
                                                            this.setState({
                                                                designation: event.target.value
                                                            })
                                                        }} />
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-6 p-0" >
                                                    {this.state.showEmployeeId ? <div id="errordiv" className="container-fluid">{this.state.errorMsgEmpId}</div> : null}

                                                </div>
                                                <div className="col-6 p-0" style={{ width: 0 }}>
                                                    {this.state.showDesignation ? <div id="errordiv" className="container-fluid">{this.state.errorMsgDesignation}</div> : null}
                                                </div>
                                            </div>
                                            {/* address */}
                                            <div class="row">
                                                <div class="col-6">
                                                <MDBInput autocomplete="off" type="date" max="2050-12-31" value={this.state.joiningDate} onKeyPress={() => { this.hideJoiningDate();  }} onClick={() => { this.hideJoiningDate(); }} label="Joining Date" title="Joining Date" name="Joining Date" id="joiningDate" onChange={(event) => {
                                                        this.setState({
                                                            joiningDate: event.target.value
                                                        }); 
                                                    }} />
                                                   
                                                </div>
                                                <div className="col-6">
                                                    <MDBInput autocomplete="off" value={this.state.age} label="Age" type="number" name="age" id="age" title="Age" onChange={(event) => {
                                                        this.setState({
                                                            age: event.target.value
                                                        }); this.hideAge()
                                                    }} min={18} max="120" />
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-6 p-0" >
                                                {this.state.showJoiningDate ? <div id="errordiv" className="container-fluid">{this.state.errorMsgJoiningDate}</div> : null}
                                                   
                                                </div>
                                                <div className="col-6 p-0" style={{ width: 0 }}>
                                                {this.state.showAge ? <div id="errordiv" className="container-fluid">{this.state.errorMsgAge}</div> : null}

                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                <MDBInput autocomplete="off" value={this.state.address} label="Address" type="textarea" name="address" id="address" title="address" onChange={(event) => {
                                                        this.setState({
                                                            address: event.target.value
                                                        }); this.hideAddress()
                                                    }} />
                                                </div>

                                            </div>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-12 p-0">
                                                {this.state.showAddress ? <div id="errordiv" className="container-fluid">{this.state.errorMsgAddress}</div> : null}


                                                </div>

                                            </div>

                                            <div className=" input-group w-50 container-fluid">
                                                <MDBBtn outline type="submit" onClick={this.validation} id="generate" outline className=" form-control-plaintext  justify-content-center text-center" color="primary">Generate</MDBBtn>

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

export default withRouter(InputDeliveryPolicy)

