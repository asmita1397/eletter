import React, { useContext, useEffect, useRef, useState } from "react";
import { Home } from "../home";
import { UserConsumer } from "../Context/CustomContext";
import PdfContainer from "../PdfComponent/PdfContainer";
import TableComponent from "./TableComponent";
import Header from "../LetterHeader/HeaderPart";
import Footer from "../LetterFooter/FooterPart";
import Doc from "../PdfComponent/DocService";

const AnnexureLetter = () => {
  const [tableData, setTableData] = useState([]);
  const context = useContext(UserConsumer);
  const bodyRef = useRef();
  const [state, setState] = useState({
    employee: [],
    waterMark: false,
  });
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
    if (item.hasOwnProperty("ctc")) {
      return (
        <TableComponent
          // columns={getColumns(item, 2, true)}
          preview={true}
          rows={getTableRows(item.ctc)}
          renderType="special"
        />
      );
    }
  };

  console.log(tableData);

  const print = (data) => {
    if (state.employee.withHeader) {
      setState(
        {
          pix: true,
        },
        () =>
          setTimeout(() => {
            window.print();
          }, 550)
      );
    } else {
      window.print();
    }
  };
  const createPdf = (html, name) => {
    window.scrollTo(0, 0);
    const ex = document.getElementsByClassName("pdf-body");
    Doc.createPdf(ex, name);
  };

  return (
    <div className="qwerty">
      <Home
        buttonShow={true}
        showWatermark={(data) => setState({ waterMark: data })}
        setHeader={(data) => print()}
      />
      <div class="mainHeader">
        <div className="main" style={{ marginTop: "100px" }}>
          <PdfContainer id={"hrletter"} name={"salary"} createPdf={createPdf}>
            <div className="card" ref={bodyRef} id="AFourPage">
              <div className="card-body pb-0">
                <div>
                  {state.waterMark ? (
                    <header className="headerimg">
                      <Header />
                    </header>
                  ) : null}

                  {state.waterMark ? (
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
                  ) : null}

                  <div className="mt-5">
                    {tableData?.map((item) => renderTable(item))}
                  </div>
                </div>
                {state.waterMark ? (
                  <div className={context.pdfVal ? "footerimg1" : "footerimg"}>
                    <Footer />
                  </div>
                ) : null}
              </div>
            </div>
          </PdfContainer>
        </div>
      </div>
    </div>
  );
};

export default AnnexureLetter;
