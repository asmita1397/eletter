import { MDBBtn } from "mdbreact";
import React, { useContext, useState } from "react";
import { UserConsumer } from "../Context/CustomContext";
import { Home } from "../home";

export default function UpdateAnnexure(props) {
  const context = useContext(UserConsumer);
  const [error, setError] = useState(null);
  const [selectedAnnexure, setSelectedAnnexure] = useState(null);

  const validation = () => {
    if (selectedAnnexure) {
      context.updateSalaryRange({
        ...context.annexureDropdown.find(
          (item) => item.name === selectedAnnexure
        ),
        type: "mod",
      });
      props.history.push("/InputAnnexure");
      setError(null);
    } else {
      setError("This field is required");
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
                  Modify Annexure
                </h3>
              </div>

              <div className="card-body">
                <select
                  class="browser-default custom-select my-3"
                  autocomplete="off"
                  value={selectedAnnexure}
                  name="salaryRange"
                  title="Salary Range"
                  placeholder="Please select the salary range"
                  id="salaryRange"
                  defaultValue="Please select the salary range"
                  onChange={(event) => {
                    setSelectedAnnexure(event.target.value);
                  }}
                >
                  <option value="Please select the salary range" hidden>
                    Please select Annexure name
                  </option>
                  {context.annexureDropdown?.map((val) => (
                    <option value={val.name}>{val.name}</option>
                  ))}
                </select>
                {error ? (
                  <div id="errordiv" className="p-0">
                    {error}
                  </div>
                ) : null}
                <MDBBtn
                  outline
                  type="submit"
                  onClick={validation}
                  id="generate"
                  style={{ margin: "0" }}
                  className=" form-control-plaintext justify-content-center text-center col-4 float-right"
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
  );
}
