import React, { Component } from 'react'
import "./Form1.css"
import $ from "jquery";

export default class Form1 extends Component {  
    componentDidMount() {
         debugger;
    }
    render() {
        return (
            <div>

                <div>
                    <label htmlFor="title" className="ty-font heading">Create Batch</label>
                    <div className="card card-body col-md-4 offset-4 mt-5">
                        <div className="card-body">
                            <form>
                                <div className="form-row mt-3">
                                    <div className="form-group col-md-6 ty-font user-input-wrp"> <br />
                                        <input type="text" className="form-control  inputText" id="client" name="client" />
                                        <span className="floating-label">Client Name</span>
                                        <div className="ty-errmsg ">
                                            <div> Client is  * </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 ty-font left user-input-wrp" id="billdesc"><br />
                                        <select className="custom-select inputText" id="test" name="technology">
                                            <option selected disabled value>Choose technology</option>
                                            <option className="non" value="option1">Java full stack</option>
                                            <option className="non" value="option2">Mean stack</option>
                                            <option className="non" value="option1">Data science</option>
                                            <option className="editable" value="other">Other</option>
                                        </select>
                                        <input className="ty-editOption" style={{ display: 'none' }} placeholder="technology" name="technology" />
                                        <div className="ty-errmsg ">
                                            <div> Technology is  * </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row mt-3">
                                    <div className="form-group col-md-6 ty-font user-input-wrp"> <br />
                                        <select className="form-control  inputText" id="batchtype" name="batchtype">
                                            Client Name
              <option value selected disabled hidden>Batchtype</option>
                                            <option>Paid</option>
                                            <option value="other">Free</option>
                                        </select>
                                        <div className="ty-errmsg ">
                                            <div> Batchtype is  * </div>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6 ty-font left user-input-wrp"><br />
                                        <input type="text" className="form-control   inputText" id="province" name="fees" />
                                        <span className="floating-label">Fees</span>
                                        <div className="ty-errmsg ">
                                            <div> fees info is  * </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row mt-3">
                                    <div className="form-group col-md-6 ty-font user-input-wrp"><br />
                                        <input type="text" className="form-control  inputText" id="input" name="costpercandi" />
                                        <span className="floating-label">Cost per candidate</span>
                                        <div className="ty-errmsg ">
                                            <div> info is  * </div>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6 ty-font left user-input-wrp"><br />
                                        <input type="text" className="form-control  inputText" id="input" name="location" />
                                        <span className="floating-label">Location</span>
                                        <div className="ty-errmsg ">
                                            <div> Location is  * </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row mt-3">
                                    <div className="form-group col-md-6 ty-font user-input-wrp"><br />
                                        <input type="text" className="form-control  inputText" id="input" name="startdate" onfocus="this.type='date' " placeholder="Start-date" onblur="this.type='text'" />
                                        <div className="ty-errmsg ">
                                            <div> startdate is  * </div>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6 ty-font left user-input-wrp"><br />
                                        <input type="text" className="form-control inputText" id="input" name="enddate" onfocus="this.type='date' " placeholder="End-date" onblur="this.type='text'" />
                                        <div className="ty-errmsg ">
                                            <div> enddate is  * </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row mt-3">
                                    <div className="form-group col-md-6 ty-font user-input-wrp"><br />
                                        <select className="form-control  inputText" id="input" name="traineetype">
                                            <option value selected disabled hidden>Select Trainee type</option>
                                            <option>Freshers </option>
                                            <option>Lateral</option>
                                            <option>Mixed</option>
                                        </select>
                                        <div className="ty-errmsg ">
                                            <div> traineetype is  * </div>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6 ty-font left user-input-wrp"><br />
                                        <input type="text" className="form-control inputText " id="input" name="invoice" onfocus="this.type='date' " placeholder="Invoice" onblur="this.type='text'" />
                                        <div className="ty-errmsg ">
                                            <div> invoice is  * </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row mt-3">
                                    <div className="form-group col-md-6 ty-font user-input-wrp"><br />
                                        <div className="form-check float-left">
                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" defaultValue="option1" defaultChecked />
                                            <label className="form-check-label" htmlFor="exampleRadios1">
                                                HTD
              </label>
                                        </div>
                                        <div className="form-check float-left">
                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" defaultValue="option2" />
                                            <label className="form-check-label" htmlFor="exampleRadios2">
                                                ELF
              </label>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6 ty-font left user-input-wrp"><br />
                                        <div className="form-check ">
                                            <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                                            <label className="form-check-label" htmlFor="defaultCheck1">
                                                Online Training
              </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                                            <label className="form-check-label" htmlFor="defaultCheck1">
                                                Offline Training
              </label>
                                        </div>
                                    </div>
                                </div>
                              

                                <div className="float-right ty-create-button">
                                    <button type="submit" className="btn btn-outline-primary ty-font">Create</button></div>
                                <div className="float-right ty-reset-button">
                                    <button type="submit" className="btn btn-outline-secondary ty-font">Reset</button></div>
                            </form></div>
                    </div>
                </div>



            </div>
        )
    }
}
