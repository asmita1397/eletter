//This file contains all required details about No Due letter.
import React, { Component } from 'react'
import { MDBInput } from "mdbreact";
import { MDBBtn } from "mdbreact";
import Home from '../home';
import { withRouter } from 'react-router-dom';
import $ from 'jquery'
import moment from 'moment';
import { UserConsumer } from '../Context/CustomContext';
import BulkInput from '../BulkInput/BulkInput';
export class InputNoDueLetter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            salute: 'Mr.',
            employeeName: '',
            employeeId: '',
            designation: '',
            joiningDate: '',
            relievingDate: '',
            withWaterMark:false,
            withHeader:false,
            date: '',
            gender: { gender1:'He',
            gender2:'his',
            gender3:'him'
        },
        showEmployeeName: '',
        showEmployeeId:'',
        showDesignation: '',
        showJoiningDate: '',
        showRelievingDate: '',
        showinvalidDate:'',
        showinvalidEmployeeName:'',

         // valiadation state variables
         showEmployeeNameMsg: '',
         showEmployeeIdMsg: '',
         showJoiningDateMsg: '',
         showDateMsg: '',
         showCINMsg: '',
         showDesignationMsg: '',
         validDateMsg: '',
         errorMsgJoiningDate:'',
         errorMsgRelievingDate:''
        }
    }
    static contextType = UserConsumer;
    componentDidMount() {
        let editClick = localStorage.getItem("editClick");
        if (editClick) {
            this.setState({

                salute: this.props.empData.salute,
                employeeName: this.props.empData.employeeName,
                employeeId:this.props.empData.employeeId,
                designation: this.props.empData.designation,
                joiningDate: this.props.empData.joiningDate,
                relievingDate: this.props.empData.relievingDate,
            })

        }

        
    }


    onCheckHandler=(event)=>{
        ;

       
       if(event.target.value=='false'){
           this.setState({
               withWaterMark:true
           })
      
       }
       else{
           ;
           this.setState({
               withWaterMark: false
           })

       }
    }

    onChangeHeader=(event)=>{


      if(event.target.value=='false'){
          this.setState({
              withHeader:true
          })
      }
      else{
          ;
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
    hideDesignation = () => {
        this.setState({
            showDesignation: false
        })
    }
   
    hideJoiningDate = () => {
        this.setState({
            showJoiningDate: false
        })
    }
    hideRelievingDate = () => {
        this.setState({
            showRelievingDate: false
        })
    }
    hideInvalidDate=()=>{
        this.setState({
            showinvalidDate:false
        })
    }
    hideInvalidEmployeeName=()=>{
        this.setState({
            showinvalidEmployeeName:false
        })
    }


    pass = (event) => {
        event.preventDefault();

        this.props.clicked(this.state)
        if (!this.state.showEmployeeName && !this.state.showEmployeeId && !this.state.showJoiningDate && !this.state.showDesignation && !this.state.showRelievingDate && !this.state.showinvalidEmployeeName)  {
            
            this.props.history.push('/NoDueLetter')
            }

    }

    validation =()=>{
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
                let employeeName = (document.getElementById("employeeName").value).trim();
                let selectedDate = new Date(joiningDate).setHours(23)
                let relievingDate = (document.getElementById("relievingDate").value).trim();
                         let selectedJoiningDate = new Date(joiningDate).setHours(23)
                        let selectedrelievingDate =new Date(relievingDate)
                        
                let now = new Date()
    
                  
                 if (relievingDate === "" || selectedrelievingDate<selectedJoiningDate) {
                     if(relievingDate === "")
                     {
                        this.setState({ 
                            showRelievingDate: true,
                            errorMsgRelievingDate: "Please fill out RelievingDate field *" 
                        })
                     }
                     else
                     {
                        this.setState({ 
                            showRelievingDate: true,
                            errorMsgRelievingDate: "Relieving Date greater than Joining Date *" 
                        })
                     }
                     
                 }
                 if ( joiningDate === "" ||  selectedJoiningDate >now) {


                    console.log(selectedJoiningDate)
                    console.log(now)
                    if (joiningDate === "") {
                        this.setState({
                            showJoiningDate: true,
                            errorMsgJoiningDate: "Please fill out JoiningDate field *"
                        })
                    }
                    else  {
                        this.setState({
                            showJoiningDate: true,
                            errorMsgJoiningDate: "JoiningDate must less than  Today's date"
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

                //****************************************     for     showinvalidDate   ************************************* */

                if(selectedrelievingDate<=selectedJoiningDate){
                                that.setState({
                                   showinvalidDate:true
                                }) 
    
                            }
     }

     handleChildData = (data) => {
        debugger
        console.log(data)
        this.props.clicked(data)
        if (data !== "") {
            this.props.history.push('/bulknodueletter')
        }
    }

    render() {
        let value = this.context;
        return (
            <div>
                {console.log("a is =>",this.state.showinvalidEmployeeName)}
                <Home buttonShow={false} buttonVal={value.buttonVal}/>
                <div >
                    <div className="container-fluid mt-5">
                        <div className="row">
                            <div className="col-auto container mt-5 pb-5">
                                <div style={{ width: '500px' }} className="card m-auto shadow-lg mt-5">
                                    <div class="card-header" style={{ borderRadius: '0px !important', background: 'white' }} >
                                        <h3 className="text-center black-text font-bold ">No Due Letter</h3>
                                    </div>
                                    <div className="card-body ">






                                    {value.buttonVal ?
                                           
                                           <>                                              
                                          <BulkInput handleChildData={this.handleChildData} />
                                          </> :
                                          <>
                                        <form onSubmit={this.pass}>
                                            <div class="row">

                                                <div className="col-md-3" style={{ paddingTop: '25px' }}>
                                                    <select class="browser-default custom-select"  value={this.state.salute} autocomplete="off"  name="salutation" title="salutation" id="salutation" onChange={(event) => {
                                                        this.setState({
                                                            salute: event.target.value
                                                        })
                                                    }}>

                                                        <option value="Mr."  selected>Mr.</option>
                                                        <option value="Ms.">Ms.</option>
                                                        <option value="Mrs.">Mrs.</option>
                                                    </select>
                                                </div>

                                                <div class="col-md-9">
                                                    <MDBInput autocomplete="off"  value={this.state.employeeName} /* onClick={()=>{this.hideEmployeeName();this.hideInvalidEmployeeName()}} onKeyPress={()=>{this.hideEmployeeName();this.hideInvalidEmployeeName()}} */ label="Employee Name" className="w-100" name="employeeName" title="Employee Name" id="employeeName" onChange={(event) => {
                                                        this.setState({
                                                            employeeName: event.target.value
                                                        });this.hideEmployeeName();
                                                    }} />
                                                </div>
                                            </div>

                                            <div className="row" style={{padding:0}}>
                                               <div className="col-3 p-0" >
                                               </div>
                                               <div className="col-6 p-0" style={{width:0}}>
                                               {this.state.showEmployeeName ? <div id="errordiv" className="container-fluid">{this.state.showEmployeeNameMsg} </div> : null}
                                              
                                        
                                               { 
                                               this.state.showinvalidEmployeeName ? <div id="errordiv" className="container-fluid">hrkgkh</div> : null}
                                              
                                               </div>
                                           </div>


                                           <div class="row">
                                                <div class="col-md-6">
                                                    <MDBInput autocomplete="off"  value={this.state.employeeId} onKeyPress={this.hideEmployeeId} label="Employee Id" className="w-100" name="employeeId" title="Employe Id" id="employeeId" onChange={(event) => {
                                                        this.setState({
                                                            employeeId: event.target.value
                                                        });this.hideEmployeeId();
                                                    }} />
                                                </div>
                                                <div class="col-md-6">
                                                    <MDBInput autocomplete="off"  value={this.state.designation} onKeyPress={this.hideDesignation} label="Designation" type="text" name="designation" id="designation" title="designation" onChange={(event) => {
                                                        this.setState({
                                                            designation: event.target.value
                                                        });this.hideDesignation();
                                                    }} />

                                                </div>

                                            </div>
                                            <div className="row">
                                                    <div className="col-6 p-0">
                                                    {this.state.showEmployeeId ? <div id="errordiv" className="container-fluid">{this.state.showEmployeeIdMsg} </div> : null}
                                                    </div>
                                                    <div className="col-6 p-0">
                                                    {this.state.showDesignation ? <div id="errordiv" className="container-fluid">{this.state.showDesignationMsg}  </div> : null}
                                                    </div>
                                            </div>


                                            <div class="row">
                                                <div class="col-md-6">
                                                    <MDBInput autocomplete="off"  value={this.state.joiningDate} onClick={this.hideJoiningDate} onKeyPress={this.hideJoiningDate} type="date" max="2050-12-31" label="Joined Date" title="Joining Date" name="JoiningDate" id="joiningDate" onChange={(event) => {
                                                        this.setState({
                                                            joiningDate: event.target.value
                                                        });this.hideJoiningDate();
                                                    }} />
                                                </div>
                                                <div class="col-md-6">
                                                    <MDBInput autocomplete="off"  value={this.state.relievingDate} onClick={()=>{this.hideRelievingDate()}} onKeyPress={()=>{this.hideRelievingDate();}}  type="date" max="2050-12-31" label="Relieving Date" title="relievingDate" name="relievingDate" id="relievingDate" onChange={(event) => {
                                                        this.setState({
                                                            relievingDate: event.target.value
                                                        });this.hideRelievingDate()
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="row" style={{padding:0}}>
                                               <div className="col-6 p-0" >
                                                {this.state.showJoiningDate ? <div id="errordiv" className="container-fluid">{this.state.errorMsgJoiningDate}</div> : null}
                                           
                                           
                                               </div>
                                               <div className="col-6 p-0" style={{width:0}}>
                                                {this.state.showRelievingDate ? <div id="errordiv" className="container-fluid">{this.state.errorMsgRelievingDate}</div> : null}
                                               
                                               </div>
                                           </div>
                                            

                                            
                                           
 

                                            <div className=" input-group w-50 container-fluid">
                                                <MDBBtn outline id="generate" type="submit" className=" form-control-plaintext  justify-content-center text-center" color="primary"  onClick={this.validation}>Generate</MDBBtn>
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
export default withRouter(InputNoDueLetter)