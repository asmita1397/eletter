import { MDBBtn, MDBInput } from "mdbreact";
import React, { useContext, useEffect, useState } from "react";
import { Home } from "../home";
import TableComponent from "./TableComponent";
import { UserConsumer } from "../Context/CustomContext";
import { Button, Modal } from "react-bootstrap";

function ViewAnnexure() {
  const context = useContext(UserConsumer);
  const dropdownVals = context.annexureDropdown || [];

  const subColumns = [
    {
      headerName: "Column Name",
      classStyle: "text-left",
    },
    {
      headerName: "Column Value",
      classStyle: "text-left",
    },
  ];

  const subColumns1 = [
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
  const [entersalary, setentersalary] = useState(null);
  const [selectedRange, setSelectedRange] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [preview, setPreview] = useState(false);
  const [CTCerror, setCTCerror] = useState(null);
  const [isCTCvalid, setisCTCvalid] = useState(false);
  useEffect(() => {
    setTableData(context.annexureData[selectedRange] || null);
  }, [selectedRange, context.annexureData]);

  const getColumns = (item, colSpanVal = 3, rightCol = false) => {
    if (!rightCol) {
      return [
        {
          headerName: item.heading,
          colSpan: colSpanVal,
          classStyle: item.heading.includes("Basic")
            ? "text-center"
            : "text-left",
        },
      ];
    }
    return [
      {
        headerName: item.heading,
        colSpan: colSpanVal,
        classStyle: item.heading.includes("Basic")
          ? "text-center"
          : "text-left border-right-0",
      },
      {
        headerName: item.value,
        colSpan: 1,
        classStyle: "text-right border-left-0",
      },
    ];
  };

  const getTableRows = (list) => {
    const copy = JSON.parse(JSON.stringify(list));
    copy.forEach((item) => {
      delete item.monthly;
      delete item.yearly;
      delete item.columnKey;
      delete item.remarks;
    });
    return copy;
  };

  const renderTable = (item) => {
    if (item.hasOwnProperty("basic")) {
      return (
        <>
          <h5>{item.heading}</h5>
          <TableComponent
            subColumns={subColumns}
            rows={getTableRows(item.basic)}
            renderType="normal"
            classes="my-3"
          />
        </>
      );
    }
    if (item.hasOwnProperty("deduction")) {
      return (
        <>
          <h5>{item.heading}</h5>
          <TableComponent
            rows={getTableRows(item.deduction)}
            subColumns={subColumns}
            renderType="normal"
            classes="my-3"
          />
        </>
      );
    }
    if (item.hasOwnProperty("benefit")) {
      return (
        <>
          <h5>{item.heading}</h5>
          <TableComponent
            rows={getTableRows(item.benefit)}
            subColumns={subColumns}
            renderType="normal"
            classes="my-3"
          />
        </>
      );
    }
    if (item.hasOwnProperty("ctc")) {
      return (
        <>
          <h5>{item.heading}</h5>
          <TableComponent
            rows={getTableRows(item.ctc)}
            subColumns={subColumns}
            renderType="normal"
            classes="my-3"
          />
        </>
      );
    }
  };
  const validateCTC = () => {
    const from = parseInt(context.selectedSalaryRange.salaryFrom);
    const to = parseInt(context.selectedSalaryRange.salaryTo);
    if (!entersalary) {
      setCTCerror("Please enter CTC");
      setisCTCvalid(false);
      return false;
    } else {
      if (entersalary >= from && entersalary <= to) {
        setCTCerror(null);
        setisCTCvalid(true);
        return true;
      } else {
        setCTCerror(`CTC must be in the range ${from} - ${to}.`);
        setisCTCvalid(false);
        return false;
      }
    }
  };
  const getPreviewTableRows = (list) => {
    debugger;
    const copy = [];
    list.forEach((item) => {
      copy.push({
        columnName: item.columnName,
        monthly: isCTCvalid ? item.monthly : 0,
        yearly: isCTCvalid ? item.yearly : 0,
      });
    });
    return copy;
  };
  const renderTableForPreview = (item) => {
    if (item.hasOwnProperty("basic")) {
      return (
        <TableComponent
          columns={getColumns(item)}
          subColumns={subColumns1}
          rows={getPreviewTableRows(item.basic)}
          renderType="normal"
        />
      );
    }
    if (item.hasOwnProperty("deduction") && item.deduction.length > 0) {
      return (
        <TableComponent
          columns={getColumns(item)}
          rows={getPreviewTableRows(item.deduction)}
          renderType="normal"
        />
      );
    }
    if (item.hasOwnProperty("benefit") && item.benefit.length > 0) {
      return (
        <TableComponent
          columns={getColumns(item)}
          rows={getPreviewTableRows(item.benefit)}
          renderType="normal"
        />
      );
    }
    if (item.hasOwnProperty("ctc")) {
      return (
        <TableComponent
          // columns={getColumns(item, 2, true)}
          rows={getPreviewTableRows(item.ctc)}
          renderType="special"
          preview={preview}
        />
      );
    }
  };

  const updateFormulaValue = (formulaEntered, keyIndex, finalArray) => {
    const totalKeys = ["E1"];
    const totalValues = [entersalary];
    const staticVal = ["basic", "deduction", "benefit", "ctc"];
    finalArray[keyIndex].forEach((val) => {
      staticVal.forEach((key) => {
        if (val[key]) {
          val[key].forEach((value) => {
            totalKeys.push(value.columnKey);
            totalValues.push(value.monthly);
          });
        }
      });
    });
    let formula = formulaEntered.toString();
    formula = formula.includes("=") ? formula.replace("=", "") : formula;
    formula.replace("=", "");
    formula = formula.includes("%") ? formula.replace("%", "/100") : formula;
    totalKeys.forEach((val, index) => {
      if (formula.includes(val)) {
        formula = formula.replace(val, totalValues[index]);
      }
    });
    return formula;
  };

  const calculation = (keyIndex) => {
    const finalArray = JSON.parse(JSON.stringify(context.annexureData));
    const staticVal = ["basic", "deduction", "benefit", "ctc"];
    finalArray[keyIndex].forEach((val, index) => {
      staticVal.forEach((key) => {
        if (key in finalArray[keyIndex][index])
          finalArray[keyIndex][index][key].forEach((value, colIndex) => {
            const valueCol = parseInt(value.columnValue);
            if (!isNaN(valueCol)) {
              finalArray[keyIndex][index][key][colIndex].monthly = valueCol;
              finalArray[keyIndex][index][key][colIndex].yearly = valueCol * 12;
            }
          });
      });
    });
    finalArray[keyIndex].forEach((val, index) => {
      staticVal.forEach((key) => {
        if (key in finalArray[keyIndex][index])
          finalArray[keyIndex][index][key].forEach((value, colIndex) => {
            const valueCol = parseInt(value.columnValue);
            if (!isNaN(valueCol)) {
              finalArray[keyIndex][index][key][colIndex].monthly = valueCol;
              finalArray[keyIndex][index][key][colIndex].yearly = valueCol * 12;
            } else {
              const returnValue = updateFormulaValue(
                value.columnValue,
                keyIndex,
                finalArray
              );
              const result = eval(returnValue);
              if (returnValue) {
                finalArray[keyIndex][index][key][colIndex].monthly =
                  Math.floor(result);
                finalArray[keyIndex][index][key][colIndex].yearly =
                  Math.floor(result) * 12;
              }
            }
          });
      });
    });
    context.updateAnnexure(finalArray);
  };
  useEffect(() => {
    if (
      preview === false &&
      context.selectedSalaryRange.label &&
      Object.keys(context.annexureData).length > 0 &&
      entersalary
    ) {
      setentersalary(null);
      const finalArray = JSON.parse(JSON.stringify(context.annexureData));
      const staticVal = ["basic", "deduction", "benefit"];
      finalArray[context.selectedSalaryRange.label].forEach((val, index) => {
        staticVal.forEach((key) => {
          if (key in finalArray[context.selectedSalaryRange.label][index])
            finalArray[context.selectedSalaryRange.label][index][key].forEach(
              (value, colIndex) => {
                const valueCol = 0;
                finalArray[context.selectedSalaryRange.label][index][key][
                  colIndex
                ].monthly = valueCol;
                finalArray[context.selectedSalaryRange.label][index][key][
                  colIndex
                ].yearly = valueCol * 12;
              }
            );
        });
      });

      context.updateAnnexure(finalArray);
    }
  }, [preview, context.selectedSalaryRange.label, context.annexureData]);

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
                    <option
                      value={val.label}
                    >{`${val.name}(${val.displayLabel})`}</option>
                  ))}
                </select>
                {tableData?.map((item) => renderTable(item))}
              </div>
            </div>
            {selectedRange && (
              <Button
                onClick={() => {
                  // calculatePreview();
                  setPreview(true);
                }}
              >
                {" "}
                Test
              </Button>
            )}
            {preview && (
              <Modal show={preview} onHide={() => setPreview(true)}>
                <Modal.Header closeButton onClick={() => setPreview(false)}>
                  <Modal.Title>Annexure Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row col-12 m-0 p-0">
                    <div className="col-5 mr-2 p-0">
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
                    <div className="col-5 ml-3 p-0 mt-3">
                      <MDBBtn
                        outline
                        type="submit"
                        onClick={() => {
                          const isValid = validateCTC();
                          if (isValid) {
                            calculation(context.selectedSalaryRange.label);
                          }
                        }}
                        id="generate"
                        style={{ margin: "0" }}
                        className=" form-control-plaintext  justify-content-center text-center"
                        color="primary"
                      >
                        Test
                      </MDBBtn>
                    </div>
                  </div>
                  {tableData.map((item) => renderTableForPreview(item))}
                </Modal.Body>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewAnnexure;
