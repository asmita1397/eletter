import React, { useContext, useEffect, useState } from "react";
import { Home } from "../home";
import { UserConsumer } from "../Context/CustomContext";
import PdfContainer from "../PdfComponent/PdfContainer";
import TableComponent from "./TableComponent";
import FooterPart from "../LetterFooter/FooterPart";
import HeaderPart from "../LetterHeader/HeaderPart";

const AnnexureLetter = () => {
  const [tableData, setTableData] = useState([]);
  const context = useContext(UserConsumer);

  useEffect(() => {
    setTableData(
      context.annexureData[context.selectedSalaryRange.label] || null
    );
  }, [context.selectedSalaryRange.label, context.annexureData]);

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

  const getTableRows = (list) => {
    const copy = [...list];
    copy.forEach((item) => {
      delete item.columnKey;
      delete item.columnValue;
      delete item.remarks;
    });
    return copy;
  };

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
                <HeaderPart />
                <div className="card-body pb-0">
                  {tableData?.map((item) => renderTable(item))}
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
                </div>
                <FooterPart />
              </div>
            </PdfContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnexureLetter;
