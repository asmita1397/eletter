import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import Axios from 'axios'
import '../CommonStyle.css'
import $ from 'jquery'
import Handlebars from 'handlebars'
import './mail.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export class MailComponent extends Component {

    constructor(props) {
        super(props)

        // Default mailid for HR
        let value;
        let url = window.location.href
        if (url.endsWith("hrLetter")) {
            value = "hr@testyantra.com"
        }
        else {
            value = localStorage.getItem("email")
        }


        this.state = {
            from: value,
            content: '',
            subject: '',
            attachment: null,
            modal: false,
            checkMail: false,
            //checkHR:false,

            items: [],
            value: "",
            error: null,


            items2: [],
            value2: "",
            error2: null,

            //validation
            //   showCCs: false,
            showTos: false,
            showFrom: false,
            showSubject: false,
            showContent: false,
            showAttach: false
        }
    }

    notifySuccess = () => {
        toast.success("Email sent successfully", {
            position: toast.POSITION.TOP_CENTER
        });
    }

    notifyFailure = () => {
        toast.error("Exception at server side", {
            position: toast.POSITION.TOP_CENTER
        });
    }


    // Default content for HR mail
    componentDidMount() {

        let valueEmail = this.state.from;
        if (valueEmail === "hr@testyantra.com") {
            this.setState({
                checkMail: true
            })
        }
    }

    fileName = () => {
        document.querySelector('.custom-file-input').addEventListener('change', function (e) {
            try {
                debugger;
                console.log("within try", document.getElementById("myInput").files.length)
                if (document.getElementById("myInput").files.length > 1) {
                    let fileName = document.getElementById("myInput").files.length + " files selected";
                    let nextSibling = e.target.nextElementSibling
                    nextSibling.innerText = fileName
                }
                else if (document.getElementById("myInput").files.length == 0) {

                    let fileName = "No file chosen"
                    let nextSibling = e.target.nextElementSibling
                    nextSibling.innerText = fileName

                }
                else if (typeof (document.getElementById("myInput").files[0].name != 'undefined')) {
                    let fileName = document.getElementById("myInput").files[0].name;
                    let nextSibling = e.target.nextElementSibling
                    nextSibling.innerText = fileName
                }
            } catch (e) {
                document.querySelector('.custom-file-input').addEventListener('change', function (e) {
                    let fileName = "No file chosen"
                    let nextSibling = e.target.nextElementSibling
                    nextSibling.innerText = fileName
                })
            }
        })
    }


    handleKeyDown = evt => {
        if (["Enter", ","].includes(evt.key)) {
            evt.preventDefault();

            var value = this.state.value.trim();
            if (value && this.isValid(value)) {
                this.setState({
                    items: [...this.state.items, this.state.value],
                    value: ""
                });
            }
        }
    };

    handleChange = evt => {
        this.setState({
            value: evt.target.value,
            error: null
        });

    };

    handleDelete = item => {
        this.setState({
            items: this.state.items.filter(i => i !== item)
        });
    };

    handlePaste = evt => {
        evt.preventDefault();

        var paste = evt.clipboardData.getData("text");
        var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

        if (emails) {
            var toBeAdded = emails.filter(email => !this.isInList(email));

            this.setState({
                items: [...this.state.items, ...toBeAdded]
            });
        }
        this.hideTos()
    };

    handleBlur = evt => {
        evt.preventDefault();

        var paste = document.getElementById("to").value;
        var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

        if (emails) {
            var toBeAdded = emails.filter(email => !this.isInList(email));

            this.setState({
                items: [...this.state.items, ...toBeAdded]
            });
        }
    };


    isValid(email) {
        let error = null;

        if (this.isInList(email)) {
            error = `${email} has already been added.`;
        }

        if (!this.isEmail(email)) {
            error = `${email} is not a valid email address.`;
        }

        if (error) {
            this.setState({ error });

            return false;
        }

        return true;
    }

    isInList(email) {
        return this.state.items.includes(email);
    }

    isEmail(email) {
        return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
    }

    //email logic for ccs
    handleKeyDown2 = evt => {
        if (["Enter", ","].includes(evt.key)) {
            evt.preventDefault();

            var value2 = this.state.value2.trim();
            if (value2 && this.isValid2(value2)) {
                this.setState({
                    items2: [...this.state.items2, this.state.value2],
                    value2: ""
                });
            }
        }

    };

    handleChange2 = evt => {

        this.setState({
            value2: evt.target.value,
            error2: null
        });

    };

    handleDelete2 = item2 => {
        this.setState({
            items2: this.state.items2.filter(i => i !== item2)
        });
    };

    handlePaste2 = evt => {
        evt.preventDefault();

        var paste = evt.clipboardData.getData("text");
        var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

        if (emails) {
            var toBeAdded = emails.filter(email => !this.isInList2(email));

            this.setState({
                items2: [...this.state.items2, ...toBeAdded]
            });
        }
    };

    handleBlur2 = evt => {
        evt.preventDefault();

        var paste = document.getElementById("cc").value;
        var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

        if (emails) {
            var toBeAdded = emails.filter(email => !this.isInList2(email));

            this.setState({
                items2: [...this.state.items2, ...toBeAdded]
            });
        }
    };

    isValid2(email) {
        let error2 = null;

        if (this.isInList2(email)) {
            error2 = `${email} has already been added.`;
        }

        if (!this.isEmail2(email)) {
            error2 = `${email} is not a valid email address.`;
        }

        if (error2) {
            this.setState({ error2 });

            return false;
        }

        return true;
    }
    isInList2(email) {
        return this.state.items2.includes(email);
    }

    isEmail2(email) {
        return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
    }

    //ablove logic for cc


    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            showTos: '',
            showFrom: '',
            showSubject: '',
            showContent: '',
            showAttach: '',
            item: '',
            item2: '',
            content: ''

        });

    }
    onChangeHandler = (event) => {
        this.setState({
            attachment: event.target.files,
            //  attachment1:event.target.files[1],
            // attachment: this.setState({ files: [...this.state.files, ...e.target.files] }),
            loaded: 0,
        })
    }

    validate = () => {
        debugger;

        let from = (document.getElementById('from').value).trim();
        let tos = this.state.items.length
        // let ccs = this.state.items2.length   
        let subject = (document.getElementById('subject').value).trim();
        let content = (document.getElementById('content').value).trim();
        let attachment = document.getElementById('myInput').value;
        let tosArray = this.state.items
        let ccsArray = this.state.items2

        console.log("tos", tosArray, "    ", "cc", ccsArray)


        if (!attachment) {
            this.setState({ showAttach: true })
        }
        if (!content) {
            this.setState({ showContent: true })
        }
        if (!subject) {
            this.setState({ showSubject: true })
        }

        // if (!ccs) {
        //     this.setState({ showCCs: true })
        // }
        if (!tos) {
            this.setState({ showTos: true })
        }

        if (!from) {
            this.setState({ showFrom: true })
        }

        if (from != "" && tos != 0 && subject != "" && content != "" && attachment != "") {
            return true;
        } else {
            return false;
        }

    }







    sendEmail = (e) => {
        e.preventDefault()
        // console.log(this.state.items);
        // console.log(this.state.items2);


       
           
        //console.log()
        // console.log(this.state.items2)
        if (this.validate() == true) {
            debugger;
            if (!this.state.items2.includes(localStorage.getItem('email'))) {
           
                this.state.items2.push(localStorage.getItem('email'))
                if (this.state.from === "hr@testyantra.com" && !this.state.items2.includes("hr@testyantra.com")) {
                    this.state.items2.push("hr@testyantra.com")
                }
            }
            const data = new FormData()
            // data.append('file', this.state.attachment)

            for (var x = 0; x < this.state.attachment.length; x++) {
                data.append('file', this.state.attachment[x])
            }

            // console.log("state", this.state)
            // console.log("file", this.state.attachment)

            const headers = {
                'Content-Type': 'application/json',
                'from': this.state.from,
                'tos': JSON.stringify(this.state.items),
                'ccs': JSON.stringify(this.state.items2),
                'content': this.state.content,
                'subject': this.state.subject,
            }

            console.log("header info --", headers)
            Axios.post(
                'http://10.10.12.187:8081/send-email', data,

                { headers: headers }
            )
                .then((response) => {
                    // console.log("attachment-----------", this.state.attachment)
                    // console.log(" details" + this.state.email)
                    console.log(response.data)
                    if (response.data) {
                        this.notifySuccess();
                        this.setState({ items: [], items2: [] })
                        this.setState({ value: "" })
                        this.toggle()
                    } else if (response.data.statusCode === 401) {
                    }
                }).catch((error) => {
                    // console.log(error);
                    this.notifyFailure()
                })
        }
    }


    hideFrom = () => {
        this.setState({
            showFrom: false
        })
    }
    hideTos = () => {
        this.setState({
            showTos: false
        })
    }
    hideCcs = () => {
        this.setState({
            showCCs: false
        })
    }
    hideSubject = () => {
        this.setState({
            showSubject: false
        })
    }
    hideContent = () => {
        this.setState({
            showContent: false
        })
    }
    hideAttachment = () => {
        this.setState({
            showAttach: false
        })
    }




















    render() {
        return (
            <div >
                <ToastContainer autoClose={8000} pauseOnHover={true} pauseOnFocusLoss={false} />
                <MDBContainer>
                   {/*  <MDBBtn className="btn1" onClick={this.toggle}>Send Mail</MDBBtn> */}
                   <button onClick={this.toggle} className="btn1">SEND MAIL</button> 
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                        <MDBModalHeader toggle={this.toggle}>Send Mail</MDBModalHeader>
                        <MDBModalBody>

                            <form class="form-horizontal" onSubmit={(event) => { this.sendEmail(event) }} role="form">
                                <div class="form-group">

                                    <div className="row form-group">
                                        <div className="col-2">
                                            <label class="col-md-3" class="control-label">From:</label>
                                        </div >
                                        <div className="col-10 mb-3">
                                            <input value={this.state.from} id="from" type="email" class="input" placeholder="From" onChange={(event) => {
                                                this.setState({
                                                    from: event.target.value
                                                }); this.hideFrom()
                                            }} disabled />
                                        </div>
                                    </div>
                                    {this.state.showFrom ? <div id="errordiv" style={{ marginTop: '-10px', paddingLeft: '85px' }} className="container-fluid">Please fill out From field * </div> : null}

                                    <div className="row form-group">
                                        <div className="col-2">
                                            <label class="col-md-3" class="control-label">To:</label>
                                        </div >
                                        <div className="col-10  mb-3">
                                            <input id="to" type="email"
                                                className={"input " + (this.state.error && " has-error")}
                                                value={this.state.value}
                                                placeholder="Type or paste email addresses and press `Enter`..."
                                                onKeyDown={this.handleKeyDown}
                                                onChange={(event) => {
                                                    this.handleChange(event); this.hideTos()
                                                }}
                                                onPaste={this.handlePaste}
                                                onBlur={this.handleBlur}
                                                autoComplete="off"
                                            />
                                            {this.state.showTos ? <div id="errordiv" style={{ marginTop: '3px', paddingLeft: '0px', marginBottom: '-12px' }} className="container-fluid">Please fill out To field * </div> : null}
                                            {this.state.error && <p className="error">{this.state.error}</p>}

                                            {this.state.items.map(item => (
                                                <div className="tag-item" key={item}>
                                                    {item}
                                                    <button
                                                        type="button"
                                                        className="button"
                                                        onClick={() => this.handleDelete(item)}
                                                    >
                                                        &times;
            </button>
                                                </div>
                                            ))}

                                        </div>
                                    </div>


                                    <div className="row form-group">
                                        <div className="col-2">
                                            <label class="col-md-3" class="control-label">Cc:</label>
                                        </div >
                                        <div className="col-10 mb-3">

                                            <input id="cc" type="email"
                                                className={"input " + (this.state.error2 && " has-error")}

                                                placeholder="Type or paste email addresses and press `Enter`..."
                                                onKeyDown={this.handleKeyDown2}
                                                onChange={(event) => {
                                                    this.handleChange2(event); this.hideCcs()
                                                }}
                                                onPaste={this.handlePaste2}
                                                onBlur={this.handleBlur2}
                                                autoComplete="off"
                                            />
                                            {/* {this.state.showCCs ? <div id="errordiv"  style={{marginTop:'3px',paddingLeft:'0px' ,marginBottom:'-12px' }} className="container-fluid">Please fill out CC field * </div> : null} */}
                                            {this.state.error2 && <p className="error">{this.state.error2}</p>}

                                            {this.state.items2.map(item => (
                                                <div className="tag-item" key={item}>
                                                    {item}
                                                    <button
                                                        type="button"
                                                        className="button"
                                                        onClick={() => this.handleDelete2(item)}
                                                    >
                                                        &times;
            </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div class="row form-group">
                                        <div class="col-2" > <label class="control-label">Subject:</label></div>

                                        <div class="col-10 mb-3">
                                            <input autoComplete="off" id="subject" class=" form-control" class="input" type="text" placeholder="Subject" onChange={(event) => {
                                                this.setState({
                                                    subject: event.target.value
                                                }); this.hideSubject()
                                            }} />
                                        </div>
                                    </div>
                                    {this.state.showSubject ? <div id="errordiv" style={{ marginTop: '-10px', paddingLeft: '91px' }} className="container-fluid">Please fill out Subject field * </div> : null}

                                    <div className="row ">
                                        <div className="col-2">
                                            <label htmlFor="exampleFormControlTextarea1" >
                                                Content:
                                                  </label>
                                        </div>
                                        <div className="col-10">
                                            <textarea id="content" placeholder="Content"
                                                class="input" style={{ height: 100 }}
                                                value={this.state.content}
                                                rows="5" onChange={(event) => {
                                                   /*  if (this.state.checkMail) {
                                                        this.setState({
                                                            content: "HR Default content"
                                                        });
                                                    } else { */
                                                        this.setState({
                                                            content: event.target.value
                                                        });
                                                    } /* this.hideContent() */
                                                }
                                               // }

                                            />
                                            {this.state.showContent ? <div id="errordiv" style={{ marginTop: '-5px', paddingLeft: '0px' }} className="container-fluid">Please fill out Content field * </div> : null}
                                        </div>
                                    </div>


                                    <div class="row pl-2 mb-3">
                                        <label class="col-3" class="control-label">Attachment:</label>
                                        <div class="col-9">
                                            <div class="input-group" style={{ width: '112%', marginLeft: '-9px' }}>
                                                <div class="custom-file">
                                                    <input name="input2[]" type="file" class="custom-file-input" multiple data-show-upload="true" data-show-caption="true" id="myInput" aria-describedby="myInput" onBlur={this.fileName}

                                                        onChange={(event) => {
                                                            this.onChangeHandler(event); this.hideAttachment()
                                                        }}
                                                    />
                                                    <label class="custom-file-label text-left" for="myInput">Choose file</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.showAttach ? <div id="errordiv" style={{ marginTop: '-12px', paddingLeft: '90px' }} className="container-fluid">Please add attachment * </div> : null}
                                    <MDBModalFooter>
                                        <MDBBtn type="submit" color="primary">Send</MDBBtn>
                                          <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>

                                    </MDBModalFooter>
                                </div>
                            </form>

                        </MDBModalBody>

                    </MDBModal>
                </MDBContainer>


            </div>
        )
    }
}

export default MailComponent