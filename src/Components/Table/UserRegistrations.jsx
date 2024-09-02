import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "antd";
import config from "../../config";
import moment from "moment";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { DashboardContainer } from "../DashboardContainer/Index";
import Empty from "../../Components/Empty";
import { Loader } from "../Loader";
import { Badge } from "../../Components/Badge";
export default function Reg({ id, tab }) {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

  const getTickets = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}admin/users/${id}/tickets`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoad(false);
        response.data.data.forEach((data, index) => {
          data.date = moment(data.createdAt).format("DD-MMM-YYYY h:mm A");
        });
        setData(response.data.data);
      })
      .catch((err) => {
        setLoad(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getTickets();
  }, [tab]);
  return (
    <>
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
                    <Column sortable field="date" header="Date " />
                    <Column
                      sortable
                      field="number_of_tickets"
                      header="No of Registrations"
                    ></Column>
                    <Column
                      sortable
                      field="dietary_restrictions"
                      header="Dietry Restrictions"
                    />
                    <Column
                      sortable
                      field="t_shirt_size"
                      header="T-shirt Size"
                    />
                  </DataTable>
                ) : (
                  <Empty type="Registrations" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
