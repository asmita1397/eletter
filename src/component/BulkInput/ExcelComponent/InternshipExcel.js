//This is Internship file. It contains required data in excel format.
import React, { Component } from 'react'
import {
    ExcelExport,
    ExcelExportColumn,

} from '@progress/kendo-react-excel-export';
export default class InternshipExcel extends Component {
   
    render() {
        console.log(this.props.data)
        return (
            <div>
                  <ExcelExport
                            fileName={window.location.href.split('/')[3].replace('Input','').concat(".xlsx")}
                            ref={this.props.data}      
                        > 

                            <ExcelExportColumn field="salute" title="salute" width={200} />
                            <ExcelExportColumn field="internName" title="internName"  width={200} />
                            <ExcelExportColumn field="internType" title="internType"  width={200} />
                            <ExcelExportColumn field="internId" title="internId"  width={200} />
                            <ExcelExportColumn field="companyLocation" title="companyLocation"  width={200} />
                            <ExcelExportColumn field="startDate" title="startDate"  width={200} />
                            <ExcelExportColumn field="endDate" title="endDate"  width={200} />
                            
                        </ExcelExport>

            </div>
        )
    }
}
