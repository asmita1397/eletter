import React from "react";
import "./Temp.css";

const TableComponent = (props) => {
  const {
    columns = [],
    subColumns = [],
    rows = [],
    renderType = "advanced",
    classes = "",
    preview = false,
  } = props;

  const renderTableBody = (item, index) => {
    const rowObj = [];
    if (renderType === "normal") {
      Object.entries(item).forEach(([key, value]) => {
        rowObj.push(
          <td
            className={`${
              key === "monthly" || key === "yearly" ? "text-right" : "text-left"
            }`}
            style={{ width: "33%" }}
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
    } else if (renderType === "special") {
      rowObj.push(
        <>
          <td
            colSpan={2}
            className={
              index === 0
                ? "text-left border-right-0 bg-gray"
                : "text-left border-right-0"
            }
          >
            {item.columnName}
          </td>
          <td
            className={
              index === 0
                ? "text-right border-left-0 bg-gray"
                : "text-right border-left-0"
            }
          >
            {!preview ? item.columnValue : item.monthly}
          </td>
        </>
      );
    }
    return rowObj;
  };

  return (
    <div>
      <table className={`${classes}`}>
        <thead>
          <tr className="bg-gray">
            {columns.map((col) => {
              const {
                headerName = "",
                colSpan = 1,
                rowSpan = 1,
                width = 100,
                classStyle = "text-left",
              } = col;
              return (
                <th
                  colSpan={colSpan}
                  rowSpan={rowSpan}
                  className={`fw-700 ${classStyle}`}
                >
                  {headerName}
                </th>
              );
            })}
          </tr>
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
                style={{ width: "33%" }}
              >
                {headerName}
              </th>
            );
          })}
        </thead>
        <tbody>
          {rows.map((item, index) => (
            <tr>{renderTableBody(item, index)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
