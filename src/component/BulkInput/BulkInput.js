//All files data in excecl format
import React, { Component } from 'react'
import { MDBBtnGroup, MDBIcon } from "mdbreact";
import { MDBBtn } from "mdbreact";
import { SheetJSFT } from '../types';
import XLSX from 'xlsx';
import { make_cols } from '../MakeColumns';
import HRExcel from './ExcelComponent/HRExcel';
import ConfirmationExcel from './ExcelComponent/ConfirmationExcel';
import CertificateExcel from './ExcelComponent/CertificateExcel';
import DepuationExcel from './ExcelComponent/DepuationExcel';
import DesignationExcel from './ExcelComponent/DesignationExcel';
import IncrementExcel from './ExcelComponent/IncrementExcel';
import IntentExcel from './ExcelComponent/IntentExcel';
import RelivingExcel from './ExcelComponent/RelivingExcel';
import TrainingCommitExcel from './ExcelComponent/TrainingCommitExcel';
import ExitExcel from './ExcelComponent/ExitExcel';
import InternshipExcel from './ExcelComponent/InternshipExcel';
import OfferLetterExcel from './ExcelComponent/OfferLetterExcel';
import HrPolicyExcel from './ExcelComponent/HrPolicyExcel';
import BDPolicyExcel from './ExcelComponent/BDPolicyExcel';
import ConsultantOfferExcel from './ExcelComponent/ConsultantOfferExcel';
import SalaryRevisionExcel from './ExcelComponent/SalaryRevisionExcel';
import ProjectPolicyExcel from './ExcelComponent/ProjectPolicyExcel';
import ITPolicyExcel from './ExcelComponent/ITPolicyExcel';
import DeliveryPolicyExcel from './ExcelComponent/DeliveryPolicyExcel';
import NoDueExcel from './ExcelComponent/NoDueExcel';
import $ from 'jquery';
import './bulkInput.css'
let url;
export default class BulkInput extends Component {

    constructor(props) {
        url = window.location.href.split('/')[3]
        super(props)
    }

    state = {
        uploadClick: false,
        data: '',
        fileValiation: false,
        errMsgFile: '',
        handleError :(val,msg)=>
        {
            this.setState({
                fileValiation: val,
                errMsgFile: msg
            })
        }


    }

    urlArray = ['hr', 'InputConfirmation', 'InputcertificateLetter', 'InputDepuationLetter', 'InputDesignationLetter', 'InputIncrementLetter', 'InputRelivingLetter', 'InputTrainingCommitLetter', 'InputExitLetter', 'InputInternship',
        'InputOfferLetter2', 'InputIntentLetter', 'InputHrPolicy', 'InputBDPolicy', 'InputProjectPolicy', 'InputConsultantOffer', 'InputSalaryRevision', 'InputDeliveryPolicy', 'InputITPolicy', 'InputNoDueLetter']


    myRef = React.createRef();


    handleChange = (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            this.setState({ file: files[0] }, () => this.handleFile())
        }
    };


    handleUpload = () => {
        this.setState({
            uploadClick: !this.state.uploadClick
        })
    }


    handleFile = async () => {
        debugger
        let fileElement = document.getElementById("inputGroupFile01");
        console.log(fileElement.value)

        let fileExtension = "";
        if (fileElement.value.lastIndexOf(".") > 0) {
            fileExtension = fileElement.value.substring(fileElement.value.lastIndexOf(".") + 1, fileElement.value.length);
        }
        if (fileExtension.toLowerCase() == "xlsx") {
            await this.setState({
                fileValiation: false,
                errMsgFile: ''
            })
        }
        else {
            await this.setState({
                fileValiation: true,
                errMsgFile: "It acccept only xlsx extension file"
            })
        }


       

        if (this.state.fileValiation == false) {

            const reader = new FileReader();
            const rABS = !!reader.readAsBinaryString;

            reader.onload = (e) => {
                /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
                // Get first worksheet
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */

                let data = XLSX.utils.sheet_to_json(ws);
                data = XLSX.utils.sheet_to_row_object_array(ws, { 'date_format': 'dd/mm/yyyy' });
                console.log(data.length)
     
                if(data.length==0)
                {
                    this.state.handleError(true,"File is empty")
                }  
                else{
                   this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
                    console.log(JSON.stringify(this.state.data, null, 2));
                    //this.props.clicked(this.state.data)
                    this.props.handleChildData(this.state.data)
                    console.log(JSON.stringify(this.state.data))
                    //this.props.history.push('/hrLetter')
                });

                }        
                /* Update state */
               
            };

            if (rABS) {
                reader.readAsBinaryString(this.state.file);
            } else {
                reader.readAsArrayBuffer(this.state.file);
            };
        }
        else {
            let data = ""
            this.props.handleChildData(data)
        }

    }

    export = () => {

        console.log(this.myRef.current)
        this.myRef.current.save();
    }

    componentDidMount() {
        $("span").attr("disabled", true);
    }

    render() {
        let handleRendering = () => {

            let indices = this.urlArray.map((e, i) => e === url ? i : '').filter(String)
            console.log(indices[0])

            switch (indices[0]) {
                case 0: return <HRExcel data={this.myRef} />;
                case 1: return <ConfirmationExcel data={this.myRef} />;
                case 2: return <CertificateExcel data={this.myRef} />;
                case 3: return <DepuationExcel data={this.myRef} />;
                case 4: return <DesignationExcel data={this.myRef} />;
                case 5: return <IncrementExcel data={this.myRef} />;
                case 6: return <RelivingExcel data={this.myRef} />;
                case 7: return <TrainingCommitExcel data={this.myRef} />;
                case 8: return <ExitExcel data={this.myRef} />;
                case 9: return <InternshipExcel data={this.myRef} />;
                case 10: return <OfferLetterExcel data={this.myRef} />;
                case 11: return <IntentExcel data={this.myRef} />;
                case 12: return <HrPolicyExcel data={this.myRef} />;
                case 13: return <BDPolicyExcel data={this.myRef} />;
                case 14: return <ProjectPolicyExcel data={this.myRef} />;
                case 15: return <ConsultantOfferExcel data={this.myRef} />;
                case 16: return <SalaryRevisionExcel data={this.myRef} />;
                case 17: return <DeliveryPolicyExcel data={this.myRef} />;
                case 18: return <ITPolicyExcel data={this.myRef} />;
                case 19: return <NoDueExcel data={this.myRef} />;
                default: return <HRExcel data={this.myRef} />;

            }
        }
        { console.log(url) }
        return (
            <>

                <div className="btn-toolbar mt-5 mb-5" role="toolbar">
                {handleRendering()}
                <form className="form">
                        <input
                            type="file"
                            className="custom-file-input1"
                            id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01"
                            accept={SheetJSFT}
                            placeholder={"Drag your files here or click in this area."}
                            onChange={this.handleChange}
                        />
                </form>


                    <div className="row">
                        <div style={{ color: "rgba(0, 0, 0, 0.29)", fontSize: "50px" }}/*  className="container-fluid" */>
                            <MDBIcon className="uploadIcon" icon="upload" />
                             
                             </div>
                    </div>

                    <div className="row">
                        {this.state.fileValiation ? 
                            <span className="errorMsg">{this.state.errMsgFile}</span> : <span className=" uploadtext" disabled>Drag your files here or click in this area.</span>}
                    </div>

                  

                    <div className="row container">
                        <div className="downloadbutton" onClick={this.export}>
                           
                            <MDBIcon icon="download" /> Download Excel Format
                         </div>
                    </div>

                </div>



            </>
        )
    }
}
