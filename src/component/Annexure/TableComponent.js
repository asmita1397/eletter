import React from "react";
import "./Temp.css";

const TableComponent = (props) => {
  const {
    columns = [],
    subColumns = [],
    rows = [],
    renderType = "advanced",
    classes = "",
  } = props;

  const renderTableBody = (item) => {
    const rowObj = [];
    if (renderType === "normal") {
      Object.entries(item).forEach(([key, value]) => {
        rowObj.push(
          <td
            className={`${
              key === "monthly" || key === "yearly" ? "text-right" : "text-left"
            }`}
            style={{ width:"33%"  }}
          >
            {value}
          </td>
        );
      });
    } else if (renderType === "advanced") {
      subColumns.forEach((value, index) => {
        const keys = Object.keys(item);
        const value1 = item[keys[index]];
        const value2 = item[keys[index + 2]];
        rowObj.push(<td>{`${value1}${index === 0 ? `(${value2})` : ""}`}</td>);
      });
    }
    return rowObj;
  };

  return (
    <div>
      <table className={`${classes}`}>
        <thead>
          {columns.map((col) => {
            const {
              headerName = "",
              colSpan = 1,
              rowSpan = 1,
              width = 100,
              classStyle = "text-left",
            } = col;
            return (
              <tr className="bg-gray">
                <th
                  colSpan={colSpan}
                  rowSpan={rowSpan}
                  className={`fw-700 ${classStyle}`}
                >
                  {headerName}
                </th>
              </tr>
            );
          })}
          {subColumns.map((col) => {
            const {
              headerName = "",
              colSpan = 1,
              rowSpan = 1,
              classStyle = "text-left",
            } = col;
            return (
              <th
                colSpan={colSpan}
                rowSpan={rowSpan}
                className={`fw-700 ${classStyle}`}
                style={{width:"33%"}}
              >
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
