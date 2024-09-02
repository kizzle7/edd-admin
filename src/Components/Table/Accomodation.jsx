import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import config from "../../config";
import { Button, Dropdown } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Select, Drawer, Space, notification } from "antd";
import Empty from "../../Components/Empty";
import { Badge } from "../../Components/Badge";
const { Option } = Select;
export default function Registrations({
  data,
  allData,
  getHalls,
  setOpen,
  setUpdateData,
  onUpdate,
  handleUpdateData,
}) {
  const [value, setValue] = useState("");
  const [load, setLoad] = useState(false);
  const [chooseFamily, setChooseFamily] = useState("");
  const [userLists, setUserLists] = useState([]);
  const [leadersSeleccted, setLeadersSelected] = useState([]);
  const history = useHistory();
  const search = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSearch = (query) => {
    var updatedList = [...allData];
    updatedList = updatedList.filter((item) => {
      return (
        item.name?.toLowerCase().indexOf(query.toLowerCase()) !== -1 
      );
    });
    handleUpdateData(updatedList);
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
          All Hall
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
          Female Hall
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
          Male Hall
        </div>
      ),
    },
  ];

  const addLeaders = () => {
    if (leadersSeleccted?.length > 0) setLoad(true);
    axios
      .post(
        `${config.baseUrl}admin/family/${chooseFamily}`,
        {
          leaders: leadersSeleccted,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setLoad(false);
        if (response.status === 200) {
          setLoad(false);
          setOpen(false);
          setLeadersSelected([]);
          Notification("success", "Success", "Leaders Added successfully");
          getHalls();
        }
      })
      .catch((err) => {
        if (err) {
          setLoad(false);
          Notification("error", "Error", err?.response?.data?.message);
          console.log(err);
        }
      });
  };

  const Notification = (type, msgType, msg) => {
    notification[type]({
      message: msgType,
      description: msg,
    });
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

  const onClose = () => {
    setOpen(false);
    setLeadersSelected([]);
  };
  const handleChange = (value) => {
    setLeadersSelected(value);
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
    const onUpdate = () => {
      setOpen(true);
      setUpdateData(data);
    };

    const onViewResidents = () => {
      history.push({
        pathname: `/hostel-inmates/${data._id}`,
        state: data,
      });
    };
    return (
      <div className="d-flex align-items-center">
        <Button
          className="bg-primary mr-2 text-white"
          onClick={onViewResidents}
        >
          <i className="fa fa-eye pr-2"></i> View Residents
        </Button>
        <Button className="bg-info text-white" onClick={onUpdate}>
          <i className="fa fa-eye pr-2"></i> Update
        </Button>
      </div>
    );
  };

  return (
    <div className="d-card">
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
        <div className="ml-3">
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Button>Filter Halls</Button>
            </a>
          </Dropdown>
        </div>
      </div>
      <br />
      {data?.length > 0 ? (
        <DataTable
          value={data}
          tableStyle={{ minWidth: "50rem" }}
          className="table-sizee"
        >
          <Column sortable field="name" header="Name"></Column>
          <Column sortable field="no_of_beds" header="Number of Beds" />
          <Column sortable field="remaining_beds" header="Remaining Beds" />
          <Column sortable field="status" header="Status" body={Status} />
          <Column sortable field="" body={Action} header="Action" />
        </DataTable>
      ) : (
        <Empty type="Families" />
      )}
    </div>
  );
}
