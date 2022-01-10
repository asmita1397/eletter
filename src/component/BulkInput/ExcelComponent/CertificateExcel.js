//This is Bulk Certificate file. It contains required data in excel format.
import React, { Component } from 'react'
import {
    ExcelExport,
    ExcelExportColumn,

} from '@progress/kendo-react-excel-export';
export default class CertificateExcel extends Component {
   
    render() {
        console.log(this.props.data)
        return (
            <div>
                  <ExcelExport
                            fileName={window.location.href.split('/')[3].replace('Input','').concat(".xlsx")}
                            ref={this.props.data}      
                        >  
                            <ExcelExportColumn field="employeeName" title="employeeName"  width={200} />
                            <ExcelExportColumn field="checkedPUC" title="checkedPUC"  width={200} />
                            <ExcelExportColumn field="checkedSSC" title="checkedSSC"  width={200} />
                            <ExcelExportColumn field="checkedDegree" title="checkedDegree"  width={200} />
                            <ExcelExportColumn field="certificateType" title="certificateType"  width={200} />

                        </ExcelExport>

            </div>
        )
    }
}
