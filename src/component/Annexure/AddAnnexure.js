import { MDBBtn, MDBInput } from "mdbreact";
import React, { useContext, useState } from "react";
import { UserConsumer } from "../Context/CustomContext";
import { Home } from "../home";

export default function AddAnnexure(props) {
  const context = useContext(UserConsumer);
  const [salaryRange, setSalaryRange] = useState({});
  const [error, setError] = useState({});

  const salValidation = () => {
    let errObj = { ...error };
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
    if (
      Number(salaryRange.from) &&
      Number(salaryRange.to) &&
      salaryRange.name
    ) {
      const updateDropdown = [
        ...context.annexureDropdown,
        {
          salaryFrom: salaryRange.from,
          salaryTo: salaryRange.to,
          label: `${salaryRange.from}-${salaryRange.to}`,
          name: salaryRange.name,
          displayLabel: `₹${Number(salaryRange.from).toLocaleString(
            "en-IN"
          )} - ₹${Number(salaryRange.to).toLocaleString("en-IN")}`,
        },
      ];
      const newObject = {};
      newObject[`${salaryRange.from}-${salaryRange.to}`] = [
        {
          heading: "Basic and Other Allowances Details",
          basic: [],
        },
        {
          heading: "Deductions",
          deduction: [],
        },
        {
          heading: "Benefit",
          benefit: [],
        },
      ];
      const updateAnnexureVal = { ...context.annexureData, ...newObject };
      errObj = {};
      context.updateAnnexureDropdown(updateDropdown);
      context.updateAnnexure(updateAnnexureVal);
      context.updateSalaryRange({
        salaryFrom: salaryRange.from,
        salaryTo: salaryRange.to,
        label: `${salaryRange.from}-${salaryRange.to}`,
        name: salaryRange.name,
      });
      props.history.push("/InputAnnexure");
    }

    setError(errObj);
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
                  <div className="col-12">
                    <MDBInput
                      autocomplete="off"
                      value={salaryRange.name}
                      label="Annexure Name"
                      type="text"
                      name="name"
                      id="name"
                      title="Annexure Name"
                      onChange={(event) => {
                        setSalaryRange({
                          ...salaryRange,
                          name: event.target.value,
                        });
                      }}
                    />
                    {error.name ? (
                      <div id="errordiv" className="p-0">
                        {error.name}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-6">
                    <MDBInput
                      autocomplete="off"
                      value={salaryRange.from}
                      label="Salary From"
                      type="number"
                      name="from"
                      min="1"
                      step="1"
                      id="from"
                      title="Salary From"
                      onChange={(event) => {
                        setSalaryRange({
                          ...salaryRange,
                          from: event.target.value,
                        });
                      }}
                    />
                    {error.from ? (
                      <div id="errordiv" className="p-0">
                        {error.from}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-6">
                    <MDBInput
                      autocomplete="off"
                      value={salaryRange.to}
                      label="Salary To"
                      type="number"
                      name="to"
                      id="to"
                      title="Salary to"
                      onChange={(event) => {
                        setSalaryRange({
                          ...salaryRange,
                          to: event.target.value,
                        });
                      }}
                    />
                    {error.to ? (
                      <div id="errordiv" className="p-0">
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
