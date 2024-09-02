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
export default function Payments({ id,tab }) {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

  const getTickets = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}admin/users/${id}/payments`, {
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
                      <Column sortable field="amount" header="Amount"></Column>
                      <Column
                        sortable
                        field="payment"
                        header="Payment Channel"
                      />
                      <Column
                        sortable
                        field="payment_status"
                        header="Payment Status"
                      />
                      <Column
                        sortable
                        field="payment_type"
                        header="Payment Type"
                      />
                    </DataTable>
                  ) : (
                    <Empty type="payments" />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
    </>
  );
}
