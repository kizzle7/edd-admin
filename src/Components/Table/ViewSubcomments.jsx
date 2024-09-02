import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button, Modal , notification} from "antd";
import config from "../../config";
import moment from "moment";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { DashboardContainer } from "../DashboardContainer/Index";
import Empty from "../../Components/Empty";
import { Loader } from "../Loader";
import { Badge } from "../../Components/Badge";
import { ExclamationCircleOutlined } from "@ant-design/icons";
export default function Inmates(props) {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const history =  useHistory()
  const [load, setLoad] = useState(false);
  var datar = props.history.location.state ? props.history.location.state : {};

  const getSubComments = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}/admin/discussion/${datar?._id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoad(false);
        response.data.data.forEach((data, index) => {
          data.name = data.author.first_name + " " + data.author.last_name;
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
    getSubComments();
  }, []);

  const Action = (data) => {
    const viewContent = (data) => {
      history.push({
        pathname: `/discussion-details/${data._id}`,
        state: data,
      });
    };
    const confirmAction = (id) => {
      Modal.confirm({
        title: `Are you sure want to delete this comment ?`,
        icon: <ExclamationCircleOutlined />,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          remove(id);
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    };

    const Notification = (type, msgType, msg) => {
      notification[type]({
        message: msgType,
        description: msg,
      });
    };

    const remove = (id) => {
      axios
        .delete(`${config.baseUrl}discussion/comment/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            Notification(
              "success",
              "Success",
              "Content removed successfully"
            );
            getSubComments();
          }
        })
        .catch((err) => {
          Notification("error", "Error", err?.response?.data?.message);
          console.log(err);
        });
    };

    return (
      <div className="d-flex align-items-center">
        <Button
          className="bg-primary text-white"
          onClick={() => {
            history.push({
              pathname: `/user-details/${data._id}`,
              state: {},
            });
          }}
        >
          <i className="fa fa-eye pr-2"></i> View Commenter
        </Button>
        <Button
          className="bg-danger ml-2 text-white"
          onClick={confirmAction.bind(this, data)}
        >
          <i className="fa fa-eye pr-2"></i> Remove
        </Button>
      </div>
    );
  };

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
                      <Column sortable field="date" header="Date " />
                      <Column
                        sortable
                        field="name"
                        header="Sub Commnter's Name"
                      ></Column>
                      <Column
                        sortable
                        style={{ wordWrap: "break-word" }}
                        field="content"
                        header="Content"
                      />
                      <Column
                        sortable
                        field="action"
                        header="Action"
                        body={Action}
                      />
                    </DataTable>
                  ) : (
                    <Empty type="Subcomments" />
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
