import React from "react";
import "./Temp.css";

const PreviewTable = (props) => {
  const { columns = [], subColumns = [], rows = [] } = props;

  const renderTableBody = (item) => {
    debugger
    const rowObj = [];
    Object.entries(item).forEach(([key, value]) => {
      rowObj.push(<td>{value}</td>);
    });
    return rowObj;
  };

  return (
    <div>
      <table className="text-center">
        <thead>
          {columns.map((col) => {
            const {
              headerName = "",
              colSpan = 1,
              rowSpan = 1,
              width = 100,
            } = col;
            return (
              <tr className="bg-gray">
                <th
                  colSpan={colSpan}
                  rowSpan={rowSpan}
                  style={{ width }}
                  className="fw-700"
                >
                  {headerName}
                </th>
              </tr>
            );
          })}
          {subColumns.map((col) => {
            const { headerName = "", colSpan = 1, rowSpan = 1 } = col;
            return (
              <th colSpan={colSpan} rowSpan={rowSpan} className="fw-700">
                {headerName}
              </th>
            );
          })}
        </thead>
        <tbody>
          {rows.map((item) => (
            <tr>{renderTableBody(item)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PreviewTable;
