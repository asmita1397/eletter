//This is Training Commit file. It contains required data in excel format.
import React, { Component } from 'react'
import {
    ExcelExport,
    ExcelExportColumn,

} from '@progress/kendo-react-excel-export';
export default class TrainingCommitExcel extends Component {

    render() {
        console.log(this.props.data)
        return (
            <div>
                <ExcelExport
                    fileName={window.location.href.split('/')[3].replace('Input', '').concat(".xlsx")}
                    ref={this.props.data}
                >

                    <ExcelExportColumn field="employeeName" title="employeeName"  width={200} />
                    <ExcelExportColumn field="employeeId" title="employeeId"  width={200} />
                    <ExcelExportColumn field="designation" title="designation"  width={200} />
                    <ExcelExportColumn field="joiningDate" title="joiningDate"  width={200} />
                    <ExcelExportColumn field="courseName" title="courseName"  width={200} />
                    <ExcelExportColumn field="companyLocation" title="companyLocation" width={200} />
                    <ExcelExportColumn field="trainingStartDate" title="trainingStartDate"  width={200} />
                    <ExcelExportColumn field="trainingEndDate" title="trainingEndDate"  width={200} />
                    <ExcelExportColumn field="branchName" title="branchName"  width={200} />
                    <ExcelExportColumn field="branchLocation" title="branchLocation"  width={200} />
                </ExcelExport>

            </div>
        )
    }
}
