//This is No Due file. It contains required data in excel format.
import React, { Component } from 'react'
import {
    ExcelExport,
    ExcelExportColumn,

} from '@progress/kendo-react-excel-export';
export default class NoDueExcel extends Component {
   
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
                            <ExcelExportColumn field="relievingDate" title="relievingDate"  width={200} />

                        </ExcelExport>

            </div>
        )
    }
}
