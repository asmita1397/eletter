import { MDBBtn, MDBInput } from "mdbreact";
import React, { useContext, useEffect, useState } from "react";
import { Home } from "../home";
import TableComponent from "./TableComponent";
import { UserConsumer } from "../Context/CustomContext";
import { Button, Modal } from "react-bootstrap";

const Annexure = () => {
  const context = useContext(UserConsumer);
  const [colName, setColName] = useState();
  const [colValue, setColValue] = useState();
  const [updateVal, setUpdatedValue] = useState(context.annexureData);

  const [preview, setPreview] = useState(false);
  const [previewTableRows, setPreviewTableRows] = useState(false);
  const [tableRows, setTableRows] = useState(context.annexureData.basic || []);
  const [selectedSection, setSelectedSection] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [entersalary, setentersalary] = useState(null);
  const [CTCerror, setCTCerror] = useState(null);
  const [isCTCvalid, setisCTCvalid] = useState(false);

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
  ];
  const getValue = (value) => {
    if (!isNaN(value)) {
      const getIndex = tableRows.findIndex((val, index) =>
        Object.values(val).includes(value)
      );
      return tableRows[getIndex].columnValue1;
    } else {
      return value;
    }
  };
  const validation = () => {
    if (colName && colValue) {
      debugger;
      const copy = JSON.parse(JSON.stringify(updateVal));

      // const formula = colValue.split("*");
      // const splitted =
      //   formula.length > 0 ? getValue(formula[0]) * formula[1] : colValue;
      // copy.push({
      //   columnName: colName,
      //   columnValue1: colValue,
      //   columnKey1: `A${tableRows.length + 1}`,
      //   columnKey2: `B${tableRows.length + 1}`,
      //   month: splitted,
      // });

      // context.annexureDataMethod(copy);
      // setTableRows(copy);
      const prefix =
        selectedSection === 0 ? "A" : selectedSection === 1 ? "B" : "C";
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
        monthly: "",
        yearly: "",
      });
      setUpdatedValue(copy);
      setColName("");
      setColValue("");
    }
  };
  const calculatePreview = () => {
    const copy = [];
    tableRows.map((val, index) => {
      copy.push({
        columnName: val.columnName,
        columnValue1: Math.trunc(val.month),
        columnValue2: parseInt(val.month) * 12,
      });
    });

    setPreviewTableRows(copy);
  };

  console.log(context.selectedSalaryRange);

  useEffect(() => {
    setTableData(updateVal[context.selectedSalaryRange.label] || null);
  }, [context.selectedSalaryRange.label, updateVal]);

  console.log(tableRows, tableData);

  const getColumns = (item) => {
    return [{ headerName: item.heading, colSpan: 3 }];
  };

  const getTableRows = (list) => {
    const copy = [];
    list.forEach((item) => {
      if (context?.selectedSalaryRange?.type === "mod") {
        copy.push({
          columnKey: item.columnKey,
          columnName: item.columnName,
          columnValue: item.columnValue,
          edit: <i className="fas fa-pen mx-3"></i>,
          delete: <i className="far fa-trash-alt mx-3"></i>,
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

  const from = parseInt(context.selectedSalaryRange.salaryFrom);
  const to = parseInt(context.selectedSalaryRange.salaryTo);
  const validateCTC = () => {
    if (!entersalary) {
      setCTCerror("Please enter CTC");
      setisCTCvalid(false);
    } else {
      if (entersalary >= from && entersalary <= to) {
        setCTCerror(null);
        setisCTCvalid(true);
      } else {
        setCTCerror("Invalid CTC.");
        setisCTCvalid(false);
      }
    }
  };

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
                style={{ width: "80vw" }}
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
                  <span className="h6">Please enter static fields first*</span>
                </div>
                <div className="row">
                  <div className="col-3 mt-4">
                    <select
                      class="browser-default custom-select my-auto"
                      autocomplete="off"
                      value={selectedSection}
                      name="salaryRange"
                      title="Salary Range"
                      placeholder="Please select the salary range"
                      id="salaryRange"
                      defaultValue="Please select the salary range"
                      onChange={(event) => {
                        setSelectedSection(parseInt(event.target.value));
                      }}
                    >
                      <option value="Please select the salary range" hidden>
                        Please select table section
                      </option>
                      {sectionData.map((val) => {
                        return <option value={val.index}>{val.name}</option>;
                      })}
                    </select>
                  </div>
                  <div className="col-3">
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
                  </div>
                  <div className="col-3">
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
                  </div>
                  <div className="col-3 mt-4">
                    <MDBBtn
                      outline
                      type="submit"
                      onClick={validation}
                      id="generate"
                      style={{ margin: "0" }}
                      className=" form-control-plaintext  justify-content-center text-center"
                      color="primary"
                    >
                      Add
                    </MDBBtn>
                  </div>
                </div>

                <div className="card-body ">
                  {/* <TableComponent
                    // columns={columns}
                    subColumns={subColumnsHome}
                    rows={tableRows}
                  /> */}
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
                          onClick={validateCTC}
                          id="generate"
                          style={{ margin: "0" }}
                          className=" form-control-plaintext  justify-content-center text-center"
                          color="primary"
                        >
                          Generate
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
                    <Button
                      variant="secondary"
                      onClick={() => {
                        updateMainArray();
                        setOpenConfirmation(false);
                      }}
                    >
                      Yes
                    </Button>
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
