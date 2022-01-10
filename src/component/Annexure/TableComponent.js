import React from "react";

const TableComponent = (props) => {
  const { columns = [], subColumns = [], rows = [] } = props;

  const renderTableBody = (item) => {
    Object.entries(item).forEach();
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
        {/* <tbody>{renderTableBody()}</tbody> */}
      </table>
    </div>
  );
};

export default TableComponent;
