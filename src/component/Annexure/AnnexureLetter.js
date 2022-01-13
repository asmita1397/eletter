import React, { useContext, useEffect, useState } from "react";
import { Home } from "../home";
import { UserConsumer } from "../Context/CustomContext";
import PdfContainer from "../PdfComponent/PdfContainer";
import TableComponent from "./TableComponent";

const AnnexureLetter = () => {
  const [tableData, setTableData] = useState([]);
  const context = useContext(UserConsumer);

  useEffect(() => {
    setTableData(context.annexureData[context.selectedSalaryRange.label] || null);
  }, [context.selectedSalaryRange.label, context.annexureData]);

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

  const getTableRows = (list) => {
    const copy = [];
    list.forEach((item) => {
      if (context?.selectedSalaryRange?.type === "mod") {
        copy.push({
          columnKey: item.columnKey,
          columnName: item.columnName,
          columnValue: item.columnValue,
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

  return (
    <div>
      <div>
        <Home
          buttonShow={true}
          //   showWatermark={(data) => this.setState({ waterMark: data })}
          //   sendData={() => this.sendData()}
          //   setHeader={(data) => this.print()}
        />
        <div class="mainHeader">
          <div className="main" style={{ marginTop: "100px" }}>
            <PdfContainer
              id={"hrletter"}
              //   name={this.state.employee.employeeName}
              //   createPdf={this.createPdf}
            >
              <div className="card" id="AFourPage">
                <div className="card-body pb-0">
                  {/* {tableData?.map((item) => renderTable(item))} */}
                  <div className="waterMark">
                    <span
                      style={{
                        color: "rgba(38, 50, 72, 0.33)",
                        fontSize: "91px",
                        fontFamily: "sans-serif",
                        position: "absolute",
                        zIndex: "0",
                      }}
                    >
                      TES
                      <span
                        style={{
                          color: "rgba(248, 152, 28, 0.34)",
                          fontSize: "91px",
                          fontFamily: "sans-serif",
                          fontWeight: "600",
                        }}
                      >
                        TY
                      </span>
                      ANTRA
                    </span>
                  </div>
                  Display area
                </div>
              </div>
            </PdfContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnexureLetter;
