import { MDBBtn, MDBInput } from "mdbreact";
import React, { useContext, useEffect, useState } from "react";
import { UserConsumer } from "../Context/CustomContext";
import { Home } from "../home";
import TableComponent from "./TableComponent";

export default function GenerateInputAnnexure(props) {
  const context = useContext(UserConsumer);
  const dropdownVals = context.annexureDropdown || [];
  const [entersalary, setentersalary] = useState(null);
  const [CTCerror, setCTCerror] = useState(null);

  const [isSelect, setIsSelect] = useState(false);
  const subColumns = [
    {
      headerName: "Cash Flow Head",
      classStyle: "text-left",
    },
    {
      headerName: "Monthly",
      classStyle: "text-right",
    },
    {
      headerName: "Yearly",
      classStyle: "text-right",
    },
  ];

  const [selectedRange, setSelectedRange] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(context.annexureData[selectedRange] || null);
  }, [selectedRange, context.annexureData]);

  const getColumns = (item) => {
    return [
      {
        headerName: item.heading,
        colSpan: 3,
        classStyle: item.heading.includes("Basic")
          ? "text-center"
          : "text-left",
      },
    ];
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
    if (item.hasOwnProperty("deduction")) {
      return (
        <TableComponent
          columns={getColumns(item)}
          rows={getTableRows(item.deduction)}
          renderType="normal"
        />
      );
    }
    if (item.hasOwnProperty("benefit")) {
      return (
        <TableComponent
          columns={getColumns(item)}
          rows={getTableRows(item.benefit)}
          renderType="normal"
        />
      );
    }
  };
  const validateCTC = () => {
    const from = parseInt(context.selectedSalaryRange.salaryFrom);
    const to = parseInt(context.selectedSalaryRange.salaryTo);
    if (!entersalary) {
      setCTCerror("Please enter CTC");
      return false;
    } else {
      if (entersalary >= from && entersalary <= to) {
        setCTCerror(null);
        return true;
      } else {
        setCTCerror(`CTC must be in the range ${from} - ${to}.`);
        return false;
      }
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
                  Generate Annexure
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
                    <option
                      value={val.label}
                    >{`${val.name}(${val.displayLabel})`}</option>
                  ))}
                </select>
                {isSelect ? (
                  <div id="errordiv" className="p-0 mb-3">
                    {isSelect}
                  </div>
                ) : null}
                {selectedRange && (
                  <div className="row col-12 m-0 p-0">
                    <div className="col-12 mr-2 p-0">
                      <MDBInput
                        autocomplete="off"
                        value={entersalary}
                        label="Enter CTC"
                        type="number"
                        name="ColumnName"
                        id="ColumnName"
                        title="Enter CTC"
                        onChange={(event) => {
                          setentersalary(event.target.value);
                        }}
                      />
                      {CTCerror ? (
                        <div id="errordiv" className="p-0 mb-3">
                          {CTCerror}
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
                <MDBBtn
                  outline
                  type="submit"
                  onClick={() => {
                    if (selectedRange) {
                      setIsSelect("");
                      const isValid = validateCTC();
                      if (isValid) {
                        const getObject = dropdownVals.find(
                          (val) => val.label === selectedRange
                        );
                        context.updateSalaryRange(getObject);
                        props.history.push("/AnnexureLetter");
                      }
                    } else {
                      setIsSelect("Please select salray range");
                    }
                  }}
                  id="generate"
                  style={{ margin: "0" }}
                  className=" form-control-plaintext  justify-content-center text-center col-4 float-right"
                  color="primary"
                >
                  Generate
                </MDBBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
