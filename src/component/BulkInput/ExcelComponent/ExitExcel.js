//This is Bulk exit file. It contains required data in excel format.
import React, { Component } from 'react'
import {
    ExcelExport,
    ExcelExportColumn,

} from '@progress/kendo-react-excel-export';
export default class ExitExcel extends Component {
   
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
                            <ExcelExportColumn field="designation" title="designation"  width={200} />
                            <ExcelExportColumn field="joiningDate" title="joiningDate"  width={200} />
                            <ExcelExportColumn field="exitDate" title="exitDate" width={200} />
                            <ExcelExportColumn field="location" title="location"  width={200} />
                            <ExcelExportColumn field="salaryDeduction" title="salaryDeduction"  width={200} />
                            <ExcelExportColumn field="salaryDeduction" title="salaryDeduction"  width={200} />
                            <ExcelExportColumn field="deductionTDS" title="deductionTDS"  width={200} />
                            <ExcelExportColumn field="gratuity" title="gratuity"  width={200} />
                            <ExcelExportColumn field="fundDue" title="fundDue"  width={200} />

                        </ExcelExport>

            </div>
        )
    }
}
