import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown, Pagination, Modal, notification } from "antd";
import { useHistory } from "react-router-dom";
import { Badge } from "../../Components/Badge";
import { Input } from "../../Components/Input/index";
import axios from "axios";
import config from "../../config";
import Empty from "../../Components/Empty";
import { Button } from "antd";
export default function UserList({
  data,
  allData,
  onUpdate,
  page,
  totalItems,
  pagination,
  hanleUpdateData,
  getUsers,
}) {
  const [value, setValue] = useState("");
  const [pass, setPass] = useState("");
  const [loadPass, setLoadPass] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loadEvent, setLoadEvent] = useState(false);
  const [userID, setUserId] = useState("");
  const history = useHistory();
  const search = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
    handleSearch(e.target.value);
  };

  const chnagePassword = (e) => {
    e.preventDefault();
    const datar = {
      password: pass,
      id: userID,
    };
    setLoadPass(true);
    axios
      .put(`${config.baseUrl}/admin/change-password`, datar, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoadPass(false);
        if (response.status === 200) {
          Notification("success", "Success", "Password changed successfully");
          getUsers();
        }
      })
      .catch((err) => {
        setLoadPass(false);
        Notification("error", "Error", err?.response?.data?.message);
      });
  };

  const Notification = (type, msgType, msg) => {
    notification[type]({
      message: msgType,
      description: msg,
    });
  };

  const items = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            onUpdate("all");
          }}
        >
          All{" "}
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            onUpdate("female");
          }}
        >
          {" "}
          Female
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          onClick={() => {
            onUpdate("male");
          }}
        >
          Male
        </div>
      ),
    },
  ];

  const handleSearch = (query) => {
    const lowercasedInput = query.toLowerCase();
    const filtered = allData.filter((record) =>
      Object.values(record).some((value) =>
        value.toString().toLowerCase().includes(lowercasedInput)
      )
    );
    hanleUpdateData(filtered);
  };

  const Status = (data) => {
    return <Badge value={data?.status} type={data?.status} />;
  };

  const Usertemp = (data) => {
    return (
      <div className="d-flex justify-content align-items-center">
        <div>
          <img
            width={30}
            style={{ borderRadius: "45px" }}
            height={30}
            src={
              data.profile_image?.url
                ? data.profile_image?.url
                : "https://res.cloudinary.com/dkfauaaqd/image/upload/v1705883046/gyzs29kp6qreb2hk2x0v.png"
            }
          />
        </div>
        <div className="pl-2">{data?.first_name + " " + data.last_name}</div>
      </div>
    );
  };

  const Action = (data) => {
    const viewDetails = () => {
      history.push({
        pathname: `/user-details`,
        state: data,
      });
    };

    const changePasswordModal = () => {
      setOpenPassword(true);
      setPassword(data.password);
      setPass(data.password);
      setUserId(data?._id);
    };

    return (
      <div className="d-flex align-items-center">
        <Button
          className="bg-primary text-white"
          onClick={viewDetails.bind(this, data)}
        >
          <i className="fa fa-eye pr-2"></i> View Details
        </Button>
        <Button
          className="bg-danger text-white"
          onClick={changePasswordModal.bind(this, data)}
        >
          <i className="fa fa-eye pr-2"></i> Change Password
        </Button>
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
        <>
          <DataTable
            value={data}
            tableStyle={{ minWidth: "50rem" }}
            className="table-sizee"
          >
            <Column sortable field="sn" header="S/N" />

            <Column sortable field="dateCreated" header="Date Created" />

            <Column sortable field="firstname" header="First Name" />
            <Column sortable field="lastname" header="Last Name"></Column>
            <Column sortable field="email" header="Email Address"></Column>
            <Column sortable field="password" header="Password" />
            <Column sortable field="action" header="More" body={Action} />
          </DataTable>
        </>
      ) : (
        <Empty type="Profile List" />
      )}

      <Modal
        title=""
        width={400}
        open={openPassword}
        footer={false}
        onCancel={() => {
          setOpenPassword(false);
        }}
      >
        <div>
          <div className="mb-3">
            <label>Password</label>
            <Input
              type="text"
              className="input-className w-100"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
          </div>
          <div className="d-flex justify-content-end align-items-center">
            <Button className="bg-success text-white" onClick={chnagePassword} loading={loadPass}>
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
