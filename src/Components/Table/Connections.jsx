import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button, notification, Modal, Select, Space } from "antd";
import { useHistory } from "react-router-dom";
import Empty from "../../Components/Empty";
import { Badge } from "../../Components/Badge";
import config from "../../config";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import UserList from "./UsersTable";
const { Option } = Select;
export default function ConnTbales({
  data,
  allData,
  getCons,
  hanleUpdateData,
}) {
  const [value, setValue] = useState("");
  const [openView, setOpenView] = useState(false);
  const [tab, setTab] = useState("one");
  const [openLeaders, setOpenLeaders] = useState(false);
  const [viewData, setViewData] = useState({});
  const [loadEvent, setLoadEvent] = useState(false);
  const [dataL, settDataL] = useState([]);
  const [dataM, settDataM] = useState([]);
  const [userlists, setUserLists] = useState([]);
  const [leadersSelected, setLeadersSelected] = useState([]);

  const history = useHistory();
  const search = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSearch = (query) => {
    var updatedList = [...allData];
    updatedList = updatedList.filter((item) => {
      return item.name?.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    hanleUpdateData(updatedList);
  };

  const getUsers = () => {
    axios
      .get(`${config.baseUrl}admin/users/all`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUserLists(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (value) => {
    setLeadersSelected(value);
  };

  const addLeadersFunc = () => {
    if (leadersSelected?.length > 0) setLoadEvent(true);
    setLoadEvent(true);
    axios
      .post(
        `${config.baseUrl}admin/team/update_leaders/${viewData?._id}`,
        {
          leaders: leadersSelected,
        },
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
          setOpenLeaders(false);
          setLeadersSelected([]);
          Notification("success", "Success", "Leaders Updated successfully");
          getCons();
        }
      })
      .catch((err) => {
        setLoadEvent(false);
        Notification("error", "Error", err?.response?.data?.message);
        console.log(err);
      });
  };

  const handleCancelLeaders = () => setOpenLeaders(false);

  const handleCancelContent = () => setOpenView(false);

  const Status = (data) => {
    return <Badge value={data?.status} type={data?.status} />;
  };

  const confirmAction = (e, typeAcc) => {
    e.preventDefault();
    Modal.confirm({
      title: `Are you sure want to remove this team?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        if (typeAcc === "approve") {
          approveTeam();
        } else {
          rejectTeam();
        }
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

  const approveTeam = () => {
    axios
      .post(
        `${config.baseUrl}admin/team/approve/${viewData?._id}`,
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
          Notification(
            "success",
            "Success",
            "Connection Approved successfully"
          );
          getCons();
        }
      })
      .catch((err) => {
        setLoadEvent(false);
        Notification("error", "Error", err?.response?.data?.message);
        console.log(err);
      });
  };

  const rejectTeam = () => {
    axios
      .post(
        `${config.baseUrl}admin/team/reject/${viewData?._id}`,
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
          Notification(
            "success",
            "Success",
            "Connection rejected successfully"
          );
          getCons();
        }
      })
      .catch((err) => {
        setLoadEvent(false);
        Notification("error", "Error", err?.response?.data?.message);
        console.log(err);
      });
  };

  const Action = (data) => {
    const viewDetails = () => {
      setOpenView(true);
      setViewData(data);
      console.log(data.leaders);
      console.log(data.members);
      settDataL(data.leaders);
      settDataM(
        data.members.forEach((data, index) => {
          data.name = data._id.first_name + " " + data._id.last_name;
        })
      );
    };
    return (
      <Button className="bg-primary text-white" onClick={viewDetails}>
        <i className="fa fa-eye pr-2"></i> View Details
      </Button>
    );
  };

  const ActionTab = (data) => {
    const viewDetails = () => {
      setOpenView(true);
      setViewData(data);
    };

    const rejectMember = (id) => {
      axios
        .post(
          `${config.baseUrl}admin/team/member/reject/${id}`,
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
            Notification(
              "success",
              "Success",
              "Connection member rejected successfully"
            );
            getCons();
          }
        })
        .catch((err) => {
          setLoadEvent(false);
          Notification("error", "Error", err?.response?.data?.message);
          console.log(err);
        });
    };

    const approveMember = (id) => {
      axios
        .post(
          `${config.baseUrl}admin/team/member/approve/${id}`,
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
            Notification(
              "success",
              "Success",
              "Connection member approved successfully"
            );
            getCons();
          }
        })
        .catch((err) => {
          setLoadEvent(false);
          Notification("error", "Error", err?.response?.data?.message);
          console.log(err);
        });
    };

    const removeMember = (id) => {
      axios
        .post(
          `${config.baseUrl}admin/team/member/remove/${id}`,
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
            Notification(
              "success",
              "Success",
              "Connection Member removed successfully"
            );
            getCons();
          }
        })
        .catch((err) => {
          setLoadEvent(false);
          Notification("error", "Error", err?.response?.data?.message);
          console.log(err);
        });
    };

    const confirmActionMember = (typeAcc, id) => {
      Modal.confirm({
        title: `Are you sure want to ${typeAcc} this team?`,
        icon: <ExclamationCircleOutlined />,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          if (typeAcc === "approve") {
            approveMember(id);
          } else if (typeAcc === "reject") {
            rejectMember(id);
          } else {
            removeMember(id);
          }
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    };

    return (
      <>
        {data?.status === "APPROVED" && (
          <Button
            color="bg-primary text-white"
            className="px-4 mr-3"
            onClick={() => {
              confirmActionMember("remove", data?._id);
            }}
          >
            Remove Member
          </Button>
        )}

        {data?.status === "PENDING" && (
          <Button
            color="bg-danger text-white"
            className="px-4 mr-3"
            onClick={() => {
              confirmActionMember("reject", data?._id);
            }}
          >
            Reject Member
          </Button>
        )}

        {data?.status === "PENDING" && (
          <Button
            color="bg-success text-white"
            className="px-4 mr-3"
            onClick={() => {
              confirmActionMember("approve", data._id);
            }}
          >
            Approve Member
          </Button>
        )}
      </>
    );
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="d-card">
      <div className="d-flex justify-content-end align-items-center">
        <div className="w-50">
          <input
            type="email"
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
          <Column sortable field="date" header="Date Created " />
          <Column sortable field="name" header="Name"></Column>
          <Column sortable field="status" header="Status" body={Status} />
          <Column sortable field="action" header="Action" body={Action} />
        </DataTable>
      ) : (
        <Empty type="Connections" />
      )}

      <Modal
        title="Connection Details"
        width={900}
        open={openView}
        footer={false}
        onCancel={handleCancelContent}
      >
        <div className="pt-3">
          {loadEvent && (
            <div className="text-center py-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          <div className="">
            <div className="d-flex justify-content-between align-items-center">
              <div className="font-weight-bold">
                Reason for Creating Connection :{" "}
              </div>
              <div>{viewData?.reason} </div>
            </div>
            <br />
            <div className="d-flex justify-content-between align-items-center">
              <div className="font-weight-bold">Connection Advantage : </div>
              <div>{viewData?.advantage}</div>
            </div>
            <br />
            <div className="d-flex justify-content-between align-items-center">
              <div className="font-weight-bold">Benefit of Connection : </div>
              <div>{viewData.benefits}</div>
            </div>
            <br />
            <h5>Connection Users</h5>
            <div>
              <Tabs
                defaultTab="one"
                onChange={(tabId) => {
                  setTab(tabId);
                }}
              >
                <TabList>
                  <Tab tabFor="one">Leaders</Tab>
                  <Tab tabFor="two">Members</Tab>
                </TabList>
                <br />
                <TabPanel tabId="one">
                  <div>
                    <div className="d-flex justify-content-end align-items-center">
                      <Button
                        color="bg-success text-white"
                        className="px-4 mr-3"
                        onClick={() => {
                          setOpenLeaders(true);
                        }}
                      >
                        Update Leader
                      </Button>
                    </div>
                    <br />
                    {dataL?.length > 0 ? (
                      <DataTable
                        value={dataL}
                        tableStyle={{ minWidth: "50rem" }}
                        className="table-sizee"
                      >
                        <Column
                          sortable
                          field="first_name"
                          header="First Name"
                        />
                        <Column sortable field="last_name" header="Last Name" />
                        <Column sortable field="email" header="Email"></Column>
                        <Column sortable field="phone_number" header="Phone" />
                        <Column sortable field="state" header="State" />
                      </DataTable>
                    ) : (
                      <Empty type="Connections Leaders" />
                    )}
                  </div>
                </TabPanel>
                <TabPanel tabId="two">
                  <div>
                    {dataM?.length > 0 ? (
                      <DataTable
                        value={dataM}
                        tableStyle={{ minWidth: "50rem" }}
                        className="table-sizee"
                      >
                        <Column sortable field="name" header="Name"></Column>
                        <Column sortable field="email" header="Email"></Column>

                        <Column
                          sortable
                          field="action"
                          header="Action"
                          body={ActionTab}
                        />
                      </DataTable>
                    ) : (
                      <Empty type="Connections members" />
                    )}
                  </div>
                </TabPanel>
              </Tabs>
              <hr />
            </div>

            <div className="d-flex justify-content-between align-items-center">
              {viewData.status === "PENDING" && (
                <div>
                  <Button
                    color="bg-success text-white"
                    onClick={() => {
                      confirmAction("approve");
                    }}
                    className="px-4 mr-3"
                  >
                    Approve Connection
                  </Button>
                </div>
              )}
              <div>
                <Button
                  color="bg-danger text-white"
                  onClick={() => {
                    confirmAction("reject");
                  }}
                  className="px-4 mr-3"
                >
                  Reject Connection
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        title="Add Leaders"
        open={openLeaders}
        footer={false}
        maskClosable={false}
        onCancel={handleCancelLeaders}
      >
        <div className="pt-3">
          {loadEvent && (
            <div className="text-center py-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          <div>
            <div className="mb-3">
              <Select
                mode="multiple"
                style={{
                  width: "100%",
                }}
                placeholder="select leaders"
                defaultValue={[]}
                onChange={handleChange}
                optionLabelProp="label"
              >
                {userlists?.map((d) => {
                  return (
                    <Option
                      key={d?._id}
                      value={d?._id}
                      label={d?.first_name + " " + d?.last_name}
                    >
                      <Space>{d?.first_name + " " + d?.last_name}</Space>
                    </Option>
                  );
                })}
              </Select>
            </div>

            <br />
            <div className="d-flex justify-content-end align-items-center">
              <Button onClick={addLeadersFunc} className="bg-info text-white">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
