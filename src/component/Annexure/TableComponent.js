import React from "react";

const TableComponent = (props) => {
  const { columns = [], subColumns = [], rows = [] } = props;

  const renderTableBody = (item) => {
    const rowObj = [];
    Object.entries(item).forEach(([key, value]) => {
      rowObj.push(<td>{value}</td>);
    });
    return rowObj;
  };

  return (
    <div>
      <table className="table table-bordered text-center">
        <thead>
          {columns.map((col) => {
            const { headerName = "", colSpan = 1, rowSpan = 1 } = col;
            return (
              <tr>
                <th colSpan={colSpan} rowSpan={rowSpan}>
                  {headerName}
                </th>
              </tr>
            );
          })}
          {subColumns.map((col) => {
            const { headerName = "", colSpan = 1, rowSpan = 1 } = col;
            return (
              <th colSpan={colSpan} rowSpan={rowSpan}>
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

export default TableComponent;
