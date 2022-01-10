//This file contains all required details about Certificate letter.
import React, { Component } from 'react'
import { MDBInput } from "mdbreact";
import { MDBBtn } from "mdbreact";
import Home from '../home';
import { withRouter } from 'react-router-dom';
import $ from 'jquery'
import { MDBFormInline } from 'mdbreact';
import { UserConsumer } from '../Context/CustomContext';
import BulkInput from '../BulkInput/BulkInput';
export class InputCertificateLetter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employeeName: '',
            companyLocation: '',
            certificateType: '',
            date: '',
            checkedPUC: '',
            checkedSSC: '',
            CheckedDegree: '',
            withWaterMark: false,
            withHeader: false,

            //validation variable
            showEmployeeName: '',
            showCompanyLocation: '',
            showCertificateType: '',
            showOthers: false,
            showOthers: false,
            showCheckBoxList: '',
            showCertificateType: '',
            errrorMsgField:'',
            errorMsgEmployeeName:'',
            errMsgCheckBox:''
        }
    }

    static contextType = UserConsumer;
    componentDidMount() {
        let editClick = localStorage.getItem("editClick");
        if (editClick) {
            this.setState({

                employeeName: this.props.empData.employeeName,
                certificateType: this.props.empData.certificateType,
            })

        }


         
        if ($('#puc').is(":checked")) {

             
            this.setState({
                checkedPUC: 'PUC'
            })

        }


        let that = this;
        $(document).ready(function () {
            $('#generate').click(function async(e) {



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
                that.setState({
                    date: currentdate
                })



                let employeeName = (document.getElementById("employeeName").value).trim();
                 
                console.log(document.getElementById("ssc").checked)
                let ssc = document.getElementById("ssc").checked
                let puc = document.getElementById("puc").checked
                let degree = document.getElementById("degree").checked
                let checkOthers = document.getElementById("checkOthers").checked



                if (!employeeName.match(/^[A-Za-z ]+$/) || employeeName === "" || employeeName.length > 20||employeeName.length < 3) {
                    if (employeeName === "") {
                        that.setState({
                            showEmployeeName: true,
                            errorMsgEmployeeName: "Please fill out Name field *"
                        })
                    } else if (employeeName.length > 20) {
                        that.setState({
                            showEmployeeName: true,
                            errorMsgEmployeeName: "EmployeeName should be less than 20"
                        })
                    }
                    else if (employeeName.length < 3) {
                        that.setState({
                            showEmployeeName: true,
                            errorMsgEmployeeName: "EmployeeName should be grater than 3"
                        })
                    }
                    else {
                        that.setState({
                            showEmployeeName: true,
                            errorMsgEmployeeName: "EmployeeName should be letter"
                        })
                    }
                } 

                
                if (ssc === false && puc === false && degree === false && checkOthers === false) {

                    that.setState({ showCheckBoxList: true })
                }
                else {
                    that.setState({ showCheckBoxList: false })
                }
               


                let certificate="";
                if(checkOthers===true)
                {

                    certificate =document.getElementById("otherCertificate").value
                    console.log("hiiiii",certificate)
                    if(certificate==="")
                    {
                         that.setState({ showCertificateType: true,
                            errrorMsgField:'Please fill out the other Certificate ',
                             })
                    }
                }
            
                if (employeeName !== "" && ((ssc !== false || puc !== false || degree !== false) ||((checkOthers ==false && certificate=="" ) || (checkOthers != false  && certificate!="" )) )  ) {
                     
                    if(ssc == false && puc == false && degree == false )
                    {
                         that.setState({
                            showCheckBoxList:true,
                            errMsgCheckBox:'Please select any of the one (SSLC PUC DEGREE) field * '
                         })
                         return false
                    }
                    else
                    {
                        that.setState({
                            showCertificateType:false
                         })
                    }
                 
                    return true;
                }
                else {
                    return false;
                }
            });
        });
    }


    hideEmployeeName = () => {
        this.setState({
            showEmployeeName: false
        })
    }
    hideShowCheckBoxList = () => {
        this.setState({
            showCheckBoxList: false
        })
    }

    hideCertificateType = () => {
        this.setState({
            showCertificateType: false
        })
    }


    pass = (event) => {
        event.preventDefault();


        this.props.clicked(this.state)
        this.props.history.push('/certificateLetter')

    }

    CheckValue = async () => {

        if (document.getElementById("puc").checked === true) {

            this.setState({
                checkedPUC: 'PUC'
            })

        }

        if (document.getElementById("ssc").checked === true) {

            this.setState({
                checkedSSC: 'SSLC'
            })

        }
        if (document.getElementById("degree").checked === true) {

            this.setState({
                checkedDegree: 'Degree'
            })

        }



        if (document.getElementById("checkOthers").checked === true) {

            await this.setState({
                showOthers: true
            })

        }
        else {
            await this.setState({
                showOthers: false,

            })
        }
       



      
        if (this.state.checkedPUC === '' && this.state.checkedSSC === '' && this.state.checkedDegree === '' && this.state.showOthers === '') {
            this.setState({ showCheckBoxList: true, errMsgCheckBox:"Please select any of the one field *"  })
        }
        else {
            this.setState({ showCheckBoxList: false })
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


    handleChildData = (data) => {
        debugger
        console.log(data)
        this.props.clicked(data)
        if (data !== "") {
            this.props.history.push('/bulkcertificateletter')
        }
    }


    render() {
        let value = this.context;
        
        return (

            <div>
                <Home buttonShow={false} buttonVal={value.buttonVal} />
                <div >
                    <div className="container-fluid mt-5">
                        <div className="row">
                            <div className="col-auto container mt-5 pb-5">
                                <div style={{ width: '500px' }} className="card m-auto shadow-lg mt-5">
                                    <div class="card-header" style={{ borderRadius: '0px !important', background: 'white' }} >
                                        <h3 className="text-center black-text font-bold ">Certificate Letter</h3>
                                    </div>
                                    <div className="card-body ">
                                    {value.buttonVal ?
                                           
                                           <>                                              
                                          <BulkInput handleChildData={this.handleChildData} />
                                          </> :
                                          <>
                                          
                                        <form onSubmit={this.pass}>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <MDBInput autocomplete="off" value={this.state.employeeName} onKeyPress={this.hideEmployeeName} label="Employee Name" className="w-100" name="employeeName" title="Employee Name" id="employeeName" onChange={(event) => {
                                                        this.setState({
                                                            employeeName: event.target.value
                                                        })
                                                    }} />
                                                </div>

                                            </div>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-6 p-0" >
                                                    {this.state.showEmployeeName ? <div id="errordiv" className="container-fluid">{this.state.errorMsgEmployeeName} </div> : null}
                                                </div>

                                            </div>


                                            <div className="row">
                                                <div className="col-3">
                                                    <div className="custom-control custom-checkbox custom-control-inline col-6">
                                                        <input type="checkbox" value={this.state.checkedSSC} className="custom-control-input" onChange={(event) => {
                                                            this.CheckValue(event)
                                                        }} id="ssc" />
                                                        <label style={{ whiteSpace: 'nowrap' }} className="custom-control-label" htmlFor="ssc">SSLC</label>
                                                    </div>

                                                </div>
                                                <div className="col-3">
                                                    <div className="custom-control custom-checkbox custom-control-inline col-6">
                                                        <input type="checkbox" value={this.state.checkedPUC} className="custom-control-input" id="puc" onChange={(event) => {
                                                            this.CheckValue(event)
                                                        }} />
                                                        <label style={{ whiteSpace: 'nowrap' }} className="custom-control-label" htmlFor="puc">PUC</label>
                                                    </div>

                                                </div>

                                                <div className="col-3">
                                                    <div className="custom-control custom-checkbox custom-control-inline col-6">
                                                        <input type="checkbox" value={this.state.checkedDegree} className="custom-control-input" id="degree" onChange={(event) => {
                                                            this.CheckValue(event)
                                                        }} />
                                                        <label style={{ whiteSpace: 'nowrap' }} className="custom-control-label" htmlFor="degree">Degree</label>
                                                    </div>

                                                </div>
                                                <div className="col-3">
                                                    <div className="custom-control custom-checkbox custom-control-inline col-6">
                                                        <input type="checkbox" className="custom-control-input" id="checkOthers" onClick={this.CheckValue} onChange={this.dataValue} />
                                                        <label style={{ whiteSpace: 'nowrap' }} className="custom-control-label" htmlFor="checkOthers">Others</label>
                                                    </div>

                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-12 p-0" >
                                                    {this.state.showCheckBoxList ? <div id="errordiv" className="container-fluid">{this.state.errMsgCheckBox}</div> : null}
                                                 
                                                </div>

                                            </div>




                                            <div class="row">

                                                {this.state.showOthers ?
                                                    <div class="col-md-12">
                                                        <MDBInput autocomplete="off" value={this.state.certificateType} onKeyPress={this.hideCertificateType} label="OtherCertificate" className="w-100" name="otherCertificate" title="otherCertificate" id="otherCertificate" onChange={(event) => {
                                                            this.setState({
                                                                certificateType: event.target.value
                                                            })
                                                        }} />
                                                    </div> : null}



                                            </div>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-12 p-0" >
                                                 
                                                    {this.state.showCertificateType ? <div id="errordiv" className="container-fluid">{this.state.errrorMsgField}</div> : null}
                                                </div>

                                            </div>


                                            <div className=" input-group w-50 container-fluid">
                                                <MDBBtn outline style={{ marginTop: '20px' }} id="generate" type="submit" className=" form-control-plaintext  justify-content-center text-center" color="primary">Generate</MDBBtn>
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
export default withRouter(InputCertificateLetter)
