//This is Increment. It contains required data in excel format.
import React, { Component } from 'react'
import {
    ExcelExport,
    ExcelExportColumn,

} from '@progress/kendo-react-excel-export';
export default class IncrementExcel extends Component {
   
    render() {
        console.log(this.props.data)
        return (
            <div>
                  <ExcelExport
                            fileName={window.location.href.split('/')[3].replace('Input','').concat(".xlsx")}
                            ref={this.props.data}      
                        >

                            
                            <ExcelExportColumn field="employeeName" title="employeeName"  width={200} />
                            <ExcelExportColumn field="employeeId" title="employeeId"  width={200} />
                            <ExcelExportColumn field="designation" title="designation"  width={200} />
                            <ExcelExportColumn field="companyLocation" title="companyLocation"  width={200} />
                            <ExcelExportColumn field="annualCompensationYear" title="annualCompensationYear"  width={200} />
                            <ExcelExportColumn field="salaryIncremented" title="salaryIncremented"  width={200} />
                            <ExcelExportColumn field="incrementInEffectDate" title="incrementInEffectDate"  width={200} />
                        </ExcelExport>

            </div>
        )
    }
}
