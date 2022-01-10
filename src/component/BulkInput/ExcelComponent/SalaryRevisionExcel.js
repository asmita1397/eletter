//This is Salary Revision file. It contains required data in excel format.
import React, { Component } from 'react'
import {
    ExcelExport,
    ExcelExportColumn,

} from '@progress/kendo-react-excel-export';
export default class SalaryRevisionExcel extends Component {
   
    render() {
        console.log(this.props.data)
        return (
            <div>
                  <ExcelExport
                            fileName={window.location.href.split('/')[3].replace('Input','').concat(".xlsx")}
                            ref={this.props.data}      
                        >
 


                            <ExcelExportColumn field="salute" title="salute" width={200} />
                            <ExcelExportColumn field="employeeName" title="employeeName"  width={200} />
                            <ExcelExportColumn field="employeeId" title="employeeId"  width={200} />
                            <ExcelExportColumn field="incrementInEffectDate" title="incrementInEffectDate"  width={200} />
                            <ExcelExportColumn field="salaryIncrementedFrom" title="salaryIncrementedFrom"  width={200} />
                            <ExcelExportColumn field="salaryIncrementedTo" title="salaryIncrementedTo"  width={200} />
                        </ExcelExport>

            </div>
        )
    }
}
