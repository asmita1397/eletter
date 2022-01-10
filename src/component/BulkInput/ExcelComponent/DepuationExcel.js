//This is Bulk Deputation file. It contains required data in excel format.
import React, { Component } from 'react'
import {
    ExcelExport,
    ExcelExportColumn,

} from '@progress/kendo-react-excel-export';
export default class DepuationExcel extends Component {
   
    render() {
        console.log(this.props.data)
        return (
            <div>
                  <ExcelExport
                            fileName={window.location.href.split('/')[3].replace('Input','').concat(".xlsx")}
                            ref={this.props.data}      
                        >
                           
                            <ExcelExportColumn field="employeeName" title="employeeName"  width={200} />
                            <ExcelExportColumn field="clientName" title="clientName"  width={200} />
                            <ExcelExportColumn field="clientLocation" title="clientLocation"  width={200} />
                            <ExcelExportColumn field="contactPerson" title="contactPerson"  width={200} />
                            <ExcelExportColumn field="reportingDate" title="reportingDate"  width={200} />
                            <ExcelExportColumn field="reportingTime" title="reportingTime"  width={200} />
                        </ExcelExport>

            </div>
        )
    }
}
