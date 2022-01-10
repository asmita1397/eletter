import { MDBBtn, MDBInput } from "mdbreact";
import React from "react";
import { Home } from "../home";
import TableComponent from "./TableComponent";

const Annexure = () => {
  const columns = [
    {
      headerName: "Basic and Other Allowances Details",
      colSpan: 3,
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

  return (
    <div>
      {/* <Home buttonShow={false} buttonVal={value.buttonVal} /> */}
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-auto container mt-5 pb-5">
              <div
                style={{ width: "800px" }}
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
                    Annexure
                  </h3>
                </div>
                <div className="card-body ">
                  <TableComponent
                    columns={columns}
                    subColumns={subColumns}
                    rows={[]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Annexure;
