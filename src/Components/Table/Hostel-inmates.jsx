import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "antd";
import config from "../../config";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { DashboardContainer } from "../DashboardContainer/Index";
import Empty from "../../Components/Empty";
import { Loader } from "../Loader";
import { Badge } from "../../Components/Badge";
export default function Inmates(props) {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  var datar = props.history.location.state ? props.history.location.state : {};


  const getInmates = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}/admin/halls/reservation?hallId=${datar?._id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoad(false);
        response.data.data.forEach((data, index) => {
          data.fname = data.user.first_name;
          data.lname = data.user.last_name;
          data.state = data.user.state;
          data.hall = data.hall_number;
        });
        setData(response.data.data);
      })
      .catch((err) => {
        setLoad(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getInmates();
  }, []);
  return (
    <>
      <DashboardContainer pageTitle="">
        <div className="row">
          <div className="col-md-12">
            <div className="card py-4 px-4" style={{ height: "100%" }}>
              {load && <Loader />}
              {!load && (
                <div className="d-card">
                  <br />
                  {data?.length > 0 ? (
                    <DataTable
                      value={data}
                      tableStyle={{ minWidth: "50rem" }}
                      className="table-sizee"
                    >
                      <Column sortable field="fname" header="First Name " />
                      <Column
                        sortable
                        field="lname"
                        header="Last Name"
                      ></Column>
                      <Column sortable field="state" header="State" />
                      <Column sortable field="hall" header="Hall Number" />
                    </DataTable>
                  ) : (
                    <Empty type="Hostel Inmates" />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardContainer>
    </>
  );
}
