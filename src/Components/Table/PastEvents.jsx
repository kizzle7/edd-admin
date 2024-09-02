import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button, Dropdown, Modal, notification } from "antd";
import { useHistory } from "react-router-dom";
import Empty from "../../Components/Empty";
import axios from "axios";
import config from "../../config";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Badge } from "../../Components/Badge";
export default function EventList({
  data,
  allData,
  onOpenDrawer,
  setData,
  getEvents,
  hanleUpdateData,
}) {
  const [value, setValue] = useState("");
  const history = useHistory();
  const [loadEvent, setLoadEvent] = useState(false);
  const [rowData, setRowData] = useState({});

  const search = (e) => {
    setValue(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSearch = (query) => {
    var updatedList = [...allData];
    updatedList = updatedList.filter((item) => {
      return (
        item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.creator.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    });
    hanleUpdateData(updatedList);
  };

  const Status = (data) => {
    return <Badge value={data?.status} type={data?.status} />;
  };

  const Eventemp = (data) => {
    return (
      <div className="d-flex justify-content align-items-center">
        <div>
          <img
            width={30}
            style={{ borderRadius: "50%" }}
            src={
              data.image?.url
                ? data.image?.url
                : "https://res.cloudinary.com/dkfauaaqd/image/upload/v1705883046/gyzs29kp6qreb2hk2x0v.png"
            }
          />
        </div>
        <div className="pl-2">{data?.title}</div>
      </div>
    );
  };

  const Action = (data) => {
    setRowData(data);
    const viewDetails = (data) => {
      history.push({
        pathname: `/event-details/${data._id}`,
        state: data,
      });
    };
    const Notification = (type, msgType, msg) => {
      notification[type]({
        message: msgType,
        description: msg,
      });
    };

    const onEdit = () => {
      onOpenDrawer(true);
      setData(data);
    };

    const disableEvent = (id, toggle) => {
      setLoadEvent(true);
      axios
        .put(
          `${config.baseUrl}admin/event/delete/${id}?hideEvent=${
            toggle ? false : true
          }`,
          {},
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setLoadEvent(false);
          if (response.status === 200) {
            setLoadEvent(false);
            Notification("success", "Success", "Event removed successfully");
            getEvents();
          }
        })
        .catch((err) => {
          setLoadEvent(false);
          Notification("error", "Error", err?.response?.data?.message);
          console.log(err);
        });
    };

    const removeEvent = (id) => {
      setLoadEvent(true);
      axios
        .put(
          `${config.baseUrl}admin/event/delete/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setLoadEvent(false);
          if (response.status === 200) {
            setLoadEvent(false);
            Notification("success", "Success", "Event removed successfully");
            getEvents();
          }
        })
        .catch((err) => {
          setLoadEvent(false);
          Notification("error", "Error", err?.response?.data?.message);
          console.log(err);
        });
    };

    const confirmAction = (id, type, toggle) => {
      Modal.confirm({
        title: `Are you sure want to remove this event?`,
        icon: <ExclamationCircleOutlined />,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          if (type === "disable") {
            disableEvent(id, toggle);
          } else removeEvent(id);
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    };

    const items = [
      {
        key: "1",
        label: (
          <div
            onClick={() => {
              Modal.confirm({
                title: `Are you sure want to remove this event?`,
                icon: <ExclamationCircleOutlined />,
                okText: "Yes",
                okType: "danger",
                cancelText: "No",
                onOk() {
                  setLoadEvent(true);
                  axios
                    .put(
                      `${config.baseUrl}admin/event/delete/${
                        rowData?._id
                      }?hideEvent=${true}/${rowData?._id}`,
                      {},
                      {
                        headers: {
                          Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                          )}`,
                        },
                      }
                    )
                    .then((response) => {
                      setLoadEvent(false);
                      if (response.status === 200) {
                        setLoadEvent(false);
                        Notification(
                          "success",
                          "Success",
                          "Event removed successfully"
                        );
                        getEvents();
                      }
                    })
                    .catch((err) => {
                      if (err) {
                        setLoadEvent(false);
                        Notification(
                          "error",
                          "Error",
                          err?.response?.data?.message
                        );
                      }
                      console.log(err);
                    });
                },
                onCancel() {
                  console.log("Cancel");
                },
              });
            }}
          >
            Delete Temporarily
          </div>
        ),
      },
      {
        key: "2",
        label: (
          <div
            className="text-danger"
            onClick={() => {
              Modal.confirm({
                title: `Are you sure want to remove this event permanently?`,
                icon: <ExclamationCircleOutlined />,
                okText: "Yes",
                okType: "danger",
                cancelText: "No",
                onOk() {
                  setLoadEvent(true);
                  axios
                    .put(
                      `${config.baseUrl}admin/event/delete/${rowData?._id}`,
                      {},
                      {
                        headers: {
                          Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                          )}`,
                        },
                      }
                    )
                    .then((response) => {
                      setLoadEvent(false);
                      if (response.status === 200) {
                        setLoadEvent(false);
                        Notification(
                          "success",
                          "Success",
                          "Event removed permanently successfully"
                        );
                        getEvents();
                      }
                    })
                    .catch((err) => {
                      if (err) {
                        setLoadEvent(false);
                        Notification(
                          "error",
                          "Error",
                          err?.response?.data?.message
                        );
                        console.log(err);
                      }
                    });
                },
                onCancel() {
                  console.log("Cancel");
                },
              });
            }}
          >
            Delete Permanently
          </div>
        ),
      },
    ];

    return (
      <div>
        <div className="d-flex align-items-center">
          <Button className="bg-success mr-2 text-white" onClick={onEdit}>
            <i className="fa fa-edit pr-2"></i> Edit
          </Button>
          <Button
            className="bg-primary mr-3 text-white"
            onClick={viewDetails.bind(this, data)}
          >
            <i className="fa fa-eye pr-2"></i> View Details
          </Button>
          <Dropdown
            menu={{
              items,
            }}
          >
            <a
              style={{ cursor: "pointer" }}
              onClick={(e) => e.preventDefault()}
            >
              <i class="fa fa-ellipsis-v"></i>
            </a>
          </Dropdown>
        </div>
      </div>
    );
  };

  return (
    <div className="d-card">
      <div className="d-flex justify-content-end align-items-center pt-2">
        {/* <div className="w-50">
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={search}
            value={value}
            placeholder="Search..."
          />
        </div> */}
      </div>
      <br />
      {data?.length > 0 ? (
        <DataTable
          value={data}
          tableStyle={{ minWidth: "50rem" }}
          className="table-sizee"
        >
          <Column sortable field="title" header="Event Title" body={Eventemp} />
          <Column sortable field="date" header="Event StarT Date " />
          <Column sortable field="endDate" header="Event End Date"></Column>
          <Column sortable field="price" header="Price" />
          <Column sortable field="time" header="Time" />
          <Column sortable field="status" header="Status" body={Status} />
          <Column sortable field="creator" header="Creator" />
        </DataTable>
      ) : (
        <Empty type="Past Events List" />
      )}
    </div>
  );
}
