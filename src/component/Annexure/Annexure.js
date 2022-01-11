import { MDBBtn, MDBInput } from "mdbreact";
import React, { useContext, useEffect, useState } from "react";
import { Home } from "../home";
import TableComponent from "./TableComponent";
import { UserConsumer } from "../Context/CustomContext";
import { Button, Modal } from "react-bootstrap";
import PreviewTable from "./PreviewTable";

const Annexure = () => {
  const [colName, setColName] = useState();
  const [colValue, setColValue] = useState();
  const context = useContext(UserConsumer);
  const [preview, setPreview] = useState(false);
  const [previewTableRows, setPreviewTableRows] = useState(false);
  const [tableRows, setTableRows] = useState(context.annexureData.basic);
  const columns = [
    {
      headerName: "Basic and Other Allowances Details",
      colSpan: 3,
    },
  ];

  const subColumnsHome = [
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
    debugger;
    if (colName && colValue) {
      debugger;
      const copy = tableRows;
      const formula = colValue.split("*");
      const splitted =
        formula.length > 0 ? getValue(formula[0]) * formula[1] : colValue;
      copy.push({
        columnName: colName,
        columnValue1: colValue,
        columnKey1: `A${tableRows.length + 1}`,
        columnKey2: `B${tableRows.length + 1}`,
        month: splitted,
      });

      context.annexureDataMethod(copy);
      setTableRows(copy);
      setColName('')
      setColValue('')
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

  return (
    <div>
      <Home buttonShow={false} buttonVal={context.buttonVal} />
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-auto container mt-5 pb-5">
              <div
                style={{ width: "1200px" }}
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
                    Annexure for ({context.selectedSalaryRange})
                  </h3>
                </div>
                <div className="row">
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
                  </div>
                  <div className="col-3 mt-2">
                    <MDBBtn
                      outline
                      type="submit"
                      onClick={validation}
                      id="generate"
                      className=" form-control-plaintext  justify-content-center text-center"
                      color="primary"
                    >
                      Add
                    </MDBBtn>
                  </div>
                </div>

                <div className="card-body ">
                  <TableComponent
                    // columns={columns}
                    subColumns={subColumnsHome}
                    rows={tableRows}
                  />
                </div>
              </div>
              <Button
                onClick={() => {
                  calculatePreview();
                  setPreview(true);
                }}
              >
                {" "}
                Preview
              </Button>

              <Modal show={preview} onHide={() => setPreview(true)}>
                <Modal.Header closeButton onClick={() => setPreview(false)}>
                  <Modal.Title>Annexure Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <PreviewTable
                    // columns={columns}
                    subColumns={subColumns}
                    rows={previewTableRows}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setPreview(false)}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Annexure;
