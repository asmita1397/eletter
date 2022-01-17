import { MDBBtn, MDBInput } from "mdbreact";
import React, { useContext, useEffect, useState } from "react";
import { Home } from "../home";
import TableComponent from "./TableComponent";
import { UserConsumer } from "../Context/CustomContext";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const Annexure = () => {
  const context = useContext(UserConsumer);
  const [colName, setColName] = useState();
  const [colValue, setColValue] = useState();
  const [Remarks, setRemarks] = useState(null);
  const [updateVal, setUpdatedValue] = useState([]);

  const [preview, setPreview] = useState(false);
  const [selectedSection, setSelectedSection] = useState("sts");
  const [tableData, setTableData] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [entersalary, setentersalary] = useState(null);
  const [CTCerror, setCTCerror] = useState(null);
  const [fieldserror, setfieldserror] = useState({
    tablesection: null,
    columnName: null,
    columnValue: null,
  });
  const [isCTCvalid, setisCTCvalid] = useState(false);
  const [selectedColKey, setSelectedColKey] = useState(null);
  useEffect(() => {
    setUpdatedValue(context.annexureData);
  }, [context.annexureData]);
  const subColumnsHome = [
    {
      headerName: "Ref No",
    },
    {
      headerName: "Column Name",
    },
    {
      headerName: "Column Value",
    },
  ];
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
  const sectionData = [
    {
      name: "Basic Basic and Other Allowances Details",
      value: "basic",
      index: 0,
    },
    {
      name: "Deductions",
      value: "deduction",
      index: 1,
    },
    {
      name: "Benefit",
      value: "benefit",
      index: 2,
    },
    {
      name: "CTC",
      value: "ctc",
      index: 3,
    },
  ];

  const updateFormulaValue = (formulaEntered, keyIndex, finalArray) => {
    const totalKeys = [];
    const totalValues = [];
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
    const finalArray = JSON.parse(JSON.stringify(updateVal));
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
    setUpdatedValue(finalArray);
  };

  const validation = () => {
    let err = { ...fieldserror };
    if (selectedSection !== "sts") {
      err.tablesection = null;
    } else {
      err.tablesection = "Please select table section.";
    }
    if (colName) {
      err.columnName = null;
    } else {
      err.columnName = "Please enter column name.";
    }
    if (colValue) {
      err.columnValue = null;
    } else {
      err.columnValue = "Please enter column value.";
    }
    setfieldserror(err);
    if (selectedSection !== "sts" && colName && colValue) {
      debugger;
      const copy = JSON.parse(JSON.stringify(updateVal));

      const prefix =
        selectedSection === 0
          ? "A"
          : selectedSection === 1
          ? "B"
          : selectedSection === 2
          ? "C"
          : "D";
      if (selectedColKey) {
        const index = copy[context.selectedSalaryRange.label][selectedSection][
          sectionData[selectedSection].value
        ].findIndex((item) => item.columnKey === selectedColKey);
        copy[context.selectedSalaryRange.label][selectedSection][
          sectionData[selectedSection].value
        ][index] = {
          columnName: colName,
          columnValue: colValue,
          columnKey: selectedColKey,
          monthly: 0,
          yearly: 0,
          remarks: Remarks,
        };
        setSelectedColKey(null);
      } else {
        copy[context.selectedSalaryRange.label][selectedSection][
          sectionData[selectedSection].value
        ].push({
          columnName: colName,
          columnValue: colValue,
          columnKey: `${prefix}${
            copy[context.selectedSalaryRange.label][selectedSection][
              sectionData[selectedSection].value
            ].length + 1
          }`,
          monthly: 0,
          yearly: 0,
          remarks: Remarks,
        });
      }
      debugger
      setUpdatedValue(copy);
      setColName("");
      setColValue("");
      setSelectedSection("sts");
      setRemarks("");
    }
  };

  console.log(context.selectedSalaryRange);

  useEffect(() => {
    setTableData(updateVal[context.selectedSalaryRange.label] || null);
  }, [context.selectedSalaryRange.label, updateVal]);

  const getColumns = (item, colSpanVal = 3, rightCol = false) => {
    if (!rightCol) {
      return [{ headerName: item.heading, colSpan: 3 }];
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

  const handleEdit = (item) => {
    setSelectedSection(
      item?.columnKey?.includes("A")
        ? 0
        : item?.columnKey?.includes("B")
        ? 1
        : 2
    );
    setColName(item.columnName);
    setColValue(item.columnValue);
    setSelectedColKey(item.columnKey);
  };

  const handleDelete = (current) => {
    debugger;
    const copy = JSON.parse(JSON.stringify(updateVal));
    const section = current?.columnKey?.includes("A")
      ? 0
      : current?.columnKey?.includes("B")
      ? 1
      : 2;
    const prefix = section === 0 ? "A" : section === 1 ? "B" : "C";
    const updatedList = copy[context.selectedSalaryRange.label][section][
      sectionData[section].value
    ].filter((item) => item.columnKey !== current.columnKey);
    const updateLatest = updatedList.map((ele, index) => {
      return {
        ...ele,
        columnKey: `${prefix}${index + 1}`,
      };
    });
    copy[context.selectedSalaryRange.label][section][
      sectionData[section].value
    ] = updateLatest;
    setUpdatedValue(copy);
  };

  const getTableRows = (list) => {
    const copy = [];
    list.forEach((item) => {
      if (context?.selectedSalaryRange?.type === "mod") {
        copy.push({
          columnKey: item.columnKey,
          columnName: item.columnName,
          columnValue: item.columnValue,
          edit: (
            <i className="fas fa-pen mx-3" onClick={() => handleEdit(item)}></i>
          ),
          delete: (
            <i
              class="fas fa-trash-alt mx-3"
              onClick={() => handleDelete(item)}
            ></i>
          ),
        });
      } else {
        copy.push({
          columnKey: item.columnKey,
          columnName: item.columnName,
          columnValue: item.columnValue,
        });
      }
    });
    return copy;
  };

  const getPreviewTableRows = (list) => {
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

  const renderTable = (item) => {
    if (item.hasOwnProperty("basic")) {
      return (
        <>
          <h5>{item.heading}</h5>
          <TableComponent
            subColumns={
              context?.selectedSalaryRange?.type === "mod"
                ? [
                    ...subColumnsHome,
                    { headerName: "Edit" },
                    { headerName: "Delete" },
                  ]
                : subColumnsHome
            }
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
            subColumns={
              context?.selectedSalaryRange?.type === "mod"
                ? [
                    ...subColumnsHome,
                    { headerName: "Edit" },
                    { headerName: "Delete" },
                  ]
                : subColumnsHome
            }
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
            subColumns={
              context?.selectedSalaryRange?.type === "mod"
                ? [
                    ...subColumnsHome,
                    { headerName: "Edit" },
                    { headerName: "Delete" },
                  ]
                : subColumnsHome
            }
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
            subColumns={
              context?.selectedSalaryRange?.type === "mod"
                ? [
                    ...subColumnsHome,
                    { headerName: "Edit" },
                    { headerName: "Delete" },
                  ]
                : subColumnsHome
            }
            renderType="normal"
            classes="my-3"
          />
        </>
      );
    }
  };

  const renderTableForPreview = (item) => {
    if (item.hasOwnProperty("basic")) {
      return (
        <TableComponent
          columns={getColumns(item)}
          subColumns={subColumns}
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

  const getRange = () => {
    const num = context.selectedSalaryRange.label.split("-");
    return (
      <span>
        <span>{`₹${Number(num[0]).toLocaleString("en-IN")}`}</span>
        <span className="mx-1 h3 bold">-</span>
        <span>{`₹${Number(num[1]).toLocaleString("en-IN")}`}</span>
      </span>
    );
  };

  const updateMainArray = () => {
    debugger;
    context.updateAnnexure(updateVal);
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
  useEffect(() => {
    if (
      preview === false &&
      context.selectedSalaryRange.label &&
      Object.keys(updateVal).length > 0 &&
      entersalary
    ) {
      setentersalary(null);
      const finalArray = JSON.parse(JSON.stringify(updateVal));
      const staticVal = ["basic", "deduction", "benefit", "ctc"];
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

      setUpdatedValue(finalArray);
    }
  }, [preview, context.selectedSalaryRange.label, updateVal]);

  return (
    <div>
      <Home buttonShow={false} buttonVal={context.buttonVal} />
      <div
        onKeyDown={(e) => {
          if (preview && e.keyCode === 27) {
            setPreview(false);
          }
          if (openConfirmation && e.keyCode === 27) {
            setOpenConfirmation(false);
          }
        }}
      >
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-auto container mt-5 pb-5">
              <div
                style={{ width: "50vw" }}
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
                    Annexure for {context.selectedSalaryRange.name}({getRange()}
                    )
                  </h3>
                  <span className="h6">
                    Please enter static fields first and E1 is reference number
                    for entered CTC*
                  </span>
                </div>
                <div className="row">
                  <div className="col-4 mt-4">
                    <select
                      class="browser-default custom-select my-auto"
                      autocomplete="off"
                      value={selectedSection}
                      name="salaryRange"
                      title="Table Section"
                      id="salaryRange"
                      defaultValue={"sts"}
                      onChange={(event) => {
                        setSelectedSection(parseInt(event.target.value));
                      }}
                    >
                      <option value="sts" hidden selected>
                        Select Table Section
                      </option>
                      {sectionData.map((val) => {
                        return <option value={val.index}>{val.name}</option>;
                      })}
                    </select>
                    {fieldserror.tablesection ? (
                      <div id="errordiv" className="p-0 mt-1">
                        {fieldserror.tablesection}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-4">
                    <MDBInput
                      autocomplete="off"
                      value={colName}
                      label="Column Name"
                      type="text"
                      name="ColumnName"
                      id="ColumnName"
                      title="ColumnName"
                      onChange={(event) => {
                        setColName(event.target.value);
                      }}
                    />
                    {fieldserror.columnName ? (
                      <div id="errordiv" className="p-0 mb-3">
                        {fieldserror.columnName}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-4">
                    <MDBInput
                      autocomplete="off"
                      value={colValue}
                      label="Column Value"
                      type="text"
                      name="ColumnValue"
                      id="ColumnValue"
                      title="ColumnValue"
                      onChange={(event) => {
                        setColValue(event.target.value);
                      }}
                    />
                    {fieldserror.columnValue ? (
                      <div id="errordiv" className="p-0 mb-3">
                        {fieldserror.columnValue}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <MDBInput
                      autocomplete="off"
                      value={Remarks}
                      label="Remarks"
                      type="textarea"
                      name="Remarks"
                      id="Remarks"
                      title="Remarks"
                      onChange={(event) => {
                        setRemarks(event.target.value);
                      }}
                    />
                  </div>

                  <div
                    className="col-4 mb-4"
                    style={{
                      margin: "0",
                      display: "flex",
                      alignItems: "end",
                    }}
                  >
                    <MDBBtn
                      outline
                      type="submit"
                      onClick={validation}
                      id="generate"
                      style={{
                        margin: "0",
                      }}
                      className=" form-control-plaintext  justify-content-center text-center"
                      color="primary"
                    >
                      {selectedColKey ? "Modify" : "Add"}
                    </MDBBtn>
                  </div>
                </div>

                <div className="card-body ">
                  {tableData?.map((item) => renderTable(item))}
                </div>
              </div>
              <div className="float-right">
                <Button
                  onClick={() => {
                    // calculatePreview();
                    setPreview(true);
                  }}
                >
                  {" "}
                  Test
                </Button>
                <Button onClick={() => setOpenConfirmation(true)}>
                  Submit
                </Button>
              </div>
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
                    {updateVal[context.selectedSalaryRange.label].map((item) =>
                      renderTableForPreview(item)
                    )}
                  </Modal.Body>
                </Modal>
              )}

              {openConfirmation && (
                <Modal
                  show={openConfirmation}
                  centered
                  size="md"
                  aria-labelledby="contained-modal-title-vcenter"
                  onHide={() => setOpenConfirmation(true)}
                >
                  <Modal.Header
                    closeButton
                    onClick={() => setOpenConfirmation(false)}
                  >
                    <Modal.Title>Annexure Confirmation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Click yes if you have tested once.</Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setOpenConfirmation(false)}
                    >
                      No
                    </Button>
                    <Link to="/cards">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          updateMainArray();
                          setOpenConfirmation(false);
                        }}
                      >
                        Yes
                      </Button>
                    </Link>
                  </Modal.Footer>
                </Modal>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Annexure;
