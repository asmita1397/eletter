import React, { useContext, useEffect, useState } from "react";
import { UserConsumer } from "../Context/CustomContext";
import { Home } from "../home";
import TableComponent from "./TableComponent";

function ViewAnnexure() {
  const context = useContext(UserConsumer);
  const dropdownVals = context.annexureDropdown || [];

  const subColumns = [
    {
      headerName: "Cash Flow Head",
    },
    {
      headerName: "Monthly",
    },
    {
      headerName: "Yearly",
    },
  ];

  const [selectedRange, setSelectedRange] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(context.annexureData[selectedRange] || null);
  }, [selectedRange, context.annexureData]);

  const getColumns = (item) => {
    return [{ headerName: item.heading, colSpan: 3 }];
  };

  const getTableRows = (list) => {
    const copy = [...list];
    copy.forEach((item) => {
      delete item.columnKey;
      delete item.columnValue;
    });
    return copy;
  };

  const renderTable = (item) => {
    if (item.hasOwnProperty("basic")) {
      return (
        <TableComponent
          columns={getColumns(item)}
          subColumns={subColumns}
          rows={getTableRows(item.basic)}
          renderType="normal"
        />
      );
    }
    if (item.hasOwnProperty("deduction") && item.deduction.length > 0) {
      return (
        <TableComponent
          columns={getColumns(item)}
          rows={getTableRows(item.deduction)}
          renderType="normal"
        />
      );
    }
    if (item.hasOwnProperty("benefit") && item.benefit.length > 0) {
      return (
        <TableComponent
          columns={getColumns(item)}
          rows={getTableRows(item.benefit)}
          renderType="normal"
        />
      );
    }
  };

  return (
    <>
      <Home buttonShow={false} buttonVal={context.buttonVal} />

      <div className="container mt-5">
        <div className="row">
          <div className="col-auto container mt-5 pb-5">
            <div
              style={{ width: "500px" }}
              className="card m-auto shadow-lg mt-5"
            >
              <div
                class="card-header"
                style={{
                  borderRadius: "0px !important",
                  background: "white",
                }}
              >
                <h3 className="text-center black-text font-bold ">
                  View Annexure
                </h3>
              </div>

              <div className="card-body">
                <select
                  class="browser-default custom-select my-3"
                  autocomplete="off"
                  value={selectedRange}
                  name="salaryRange"
                  title="Salary Range"
                  placeholder="Please select the salary range"
                  id="salaryRange"
                  defaultValue="Please select the salary range"
                  onChange={(event) => {
                    setSelectedRange(event.target.value);
                  }}
                >
                  <option value="Please select the salary range" hidden>
                    Please select the salary range
                  </option>
                  {dropdownVals?.map((val) => (
                    <option value={val.label}>{val.label}</option>
                  ))}
                </select>
                {tableData?.map((item) => renderTable(item))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewAnnexure;
