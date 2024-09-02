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
  const [viewContent, setViewContent] = useState(false);
  const [contentData, setContentData] = useState({});

  const search = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSearch = (query) => {
    var updatedList = [...allData];
    updatedList = updatedList.filter((item) => {
      return (
        item.title?.toLowerCase().indexOf(query.toLowerCase()) !== -1 
      );
    });
    hanleUpdateData(updatedList);
  };
  const handleCancelContent = () => {
    setViewContent(false);
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

    const items = [
      {
        key: "1",
        label: (
          <div
            onClick={() => {
              onOpenDrawer(true);
              setData(data);
            }}
          >
            Update
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
                    title: `Are you sure want to delete this annnouncement?`,
                    icon: <ExclamationCircleOutlined />,
                    okText: "Yes",
                    okType: "danger",
                    cancelText: "No",
                    onOk() {
                        setLoadEvent(true);
                        axios
                          .put(
                            `${config.baseUrl}blog/${rowData?._id}`,
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
                                "Announcement removed successfully"
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
            Delete
          </div>
        ),
      },
    ];

    return (
      <div>
        <div className="d-flex align-items-center">
          <Button
            className="bg-primary mr-3 text-white"
            onClick={() => {
              setViewContent(true);
              setContentData(data);
            }}
          >
            <i className="fa fa-eye pr-2"></i> View Content
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
    <div className="">
       <div className="d-flex justify-content-end align-items-center">
        <div className="w-50">
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={search}
            value={value}
            placeholder="Search..."
          />
        </div>
      </div>
      <br />
      {data?.length > 0 ? (
        <DataTable
          value={data}
          tableStyle={{ minWidth: "50rem" }}
          className="table-sizee"
        >
          <Column sortable field="date" header="Date" />
          <Column sortable field="title" header="Title " />
          <Column sortable field="minutes" header="Minutes"></Column>
          <Column sortable field="views" header="Views" />
          <Column sortable field="" body={Action} header="Action" />
        </DataTable>
      ) : (
        <Empty type="Events List" />
      )}

      <Modal
        title="View Content"
        width={900}
        open={viewContent}
        footer={false}
        onCancel={handleCancelContent}
      >
        <div className="container">
          <div>{contentData?.content}</div>
          <br />
          {contentData?.images?.map((d) => {
            return (
              <div key={d}>
                <img src={d} className="w-100" />
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}
