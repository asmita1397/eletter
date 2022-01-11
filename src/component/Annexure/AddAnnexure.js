import { MDBBtn, MDBInput } from "mdbreact";
import React, { useContext, useEffect, useState } from "react";
import { UserConsumer } from "../Context/CustomContext";
import { Home } from "../home";

export default function AddAnnexure() {
  const context = useContext(UserConsumer);
  const [salaryRange, setSalaryRange] = useState({});
  const [error, setError] = useState([]);

  const salValidation = () => {
    if (salaryRange.from && salaryRange.to) {
    //   if (Number(salaryRange.from)) {
    //   } else {
    //   }
    }
  };

  return (
    <div>
      <Home buttonShow={false} buttonVal={context.buttonVal} />
      <div className="container-fluid mt-5">
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
                  Add Annexure
                </h3>
              </div>

              <div className="card-body ">
                <div className="row">
                  <h5 className="text-center col-12">Salary Range</h5>
                  <div className="col-4">
                    <MDBInput
                      autocomplete="off"
                      value={salaryRange.name}
                      label="Name"
                      type="text"
                      name="name"
                      id="name"
                      title="Name"
                      onChange={(event) => {
                        setSalaryRange({ name: event.target.value });
                      }}
                    />
                  </div>
                  <div className="col-4">
                    <MDBInput
                      autocomplete="off"
                      value={salaryRange.from}
                      label="From"
                      type="number"
                      name="from"
                      min="1"
                      step="1"
                      id="from"
                      title="Salary from"
                      onChange={(event) => {
                        setSalaryRange({ from: event.target.value });
                      }}
                    />
                  </div>
                  <div className="col-4">
                    <MDBInput
                      autocomplete="off"
                      value={salaryRange.to}
                      label="To"
                      type="number"
                      name="to"
                      id="to"
                      title="Salary to"
                      onChange={(event) => {
                        setSalaryRange({ to: event.target.value });
                      }}
                    />
                  </div>
                  <div className="mt-2 mx-auto">
                    <MDBBtn
                      outline
                      type="submit"
                      onClick={salValidation}
                      id="generate"
                      className="form-control-plaintext justify-content-center text-center"
                      color="primary"
                    >
                      Generate
                    </MDBBtn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
