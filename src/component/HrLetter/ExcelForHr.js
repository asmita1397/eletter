import React, { Component } from 'react'
import {
    ExcelExport,
    ExcelExportColumn,
    ExcelExportColumnGroup
  } from '@progress/kendo-react-excel-export';
export default class ExcelForHr extends Component {
    _exporter;
    export = () => {
        this._exporter.save();
    }
    render() {
        return (
            <div>
               <button  onClick={this.export}>Download Excel Format</button>
               <ExcelExport
                    fileName="hrLetter.xlsx"
                    ref={(exporter) => { this._exporter = exporter; }}
                >
                     <ExcelExportColumn field="salute" title="salute"  width={200} />
                     <ExcelExportColumn field="employeeName" title="employeeName" locked={true} width={200} />
                     <ExcelExportColumn field="employeeId" title="employeeId" locked={true} width={200} />
                      <ExcelExportColumn field="designation" title="designation" locked={true} width={200} />
                       <ExcelExportColumn field="joiningDate" title="joiningDate" locked={true} width={200} />
                </ExcelExport> 
            </div>
        )
    }
}
