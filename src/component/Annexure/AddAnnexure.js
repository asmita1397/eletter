import { MDBBtn, MDBInput } from "mdbreact";
import React, { useContext, useEffect, useState } from "react";
import { UserConsumer } from "../Context/CustomContext";
import { Home } from "../home";

export default function AddAnnexure() {
  const context = useContext(UserConsumer);
  const [salaryRange, setSalaryRange] = useState({});
  const [error, setError] = useState({});

  const salValidation = () => {
    let errObj = error;
    if (!salaryRange.name) {
      errObj["name"] = "This field is required";
    } else {
      errObj["name"] = null;
    }

    if (!salaryRange.from) {
      errObj["from"] = "This field is required";
    } else if (!Number(salaryRange.from)) {
      errObj["from"] = "Salary From must be positive whole number";
    } else {
      errObj["from"] = null;
    }
    if (!salaryRange.to) {
      errObj["to"] = "This field is required";
    } else if (!Number(salaryRange.to)) {
      errObj["to"] = "Salary To must be positive whole number";
    } else {
      errObj["to"] = null;
    }
    if (Number(salaryRange.from) && Number(salaryRange.to)) {
      errObj = {};
    }
    setError(errObj);
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

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
                    {error.name ? (
                      <div id="errordiv" className="container-fluid">
                        {error.name}
                      </div>
                    ) : null}
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
                    {error.from ? (
                      <div id="errordiv" className="container-fluid">
                        {error.from}
                      </div>
                    ) : null}
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
                    {error.to ? (
                      <div id="errordiv" className="container-fluid">
                        {error.to}
                      </div>
                    ) : null}
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
