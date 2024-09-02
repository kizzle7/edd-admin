import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import config from "../../config";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Select, Drawer, Space, notification } from "antd";
import Empty from "../../Components/Empty";
import { Badge } from "../../Components/Badge";
const { Option } = Select;
export default function Registrations({ data, allData, getFams, handleUpdateData }) {
  const [value, setValue] = useState("");
  const [load, setLoad]  = useState(false)
  const [chooseFamily, setChooseFamily] = useState('')
  const [userLists, setUserLists] = useState([]);
  const [leadersSeleccted, setLeadersSelected] = useState([]);
  const [open, setOpen] = useState(false);
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
        item.name?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.breakfast?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.lunch?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.dinner?.toLowerCase().indexOf(query.toLowerCase()) !== -1 
      );
    });
    handleUpdateData(updatedList);
  };

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
          getFams();
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
    setLeadersSelected([])
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
    const onViewFamily = (data) => {
      history.push({
        pathname: `/event-families/${data._id}`,
        state: data,
      });
    };

    const onAddLeaders = () => {
      setOpen(true);
      setChooseFamily(data._id)
    };
    return (
      <div className="d-flex align-items-center">
        <Button className="bg-primary mr-2 text-white" onClick={onAddLeaders}>
          <i className="fa fa-eye pr-2"></i> Add Leaders
        </Button>
        <Button className="bg-info text-white" onClick={onViewFamily}>
          <i className="fa fa-eye pr-2"></i> View Family
        </Button>
      </div>
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
          <Column sortable field="date" header="Created On" />
          <Column sortable field="name" header="Day"></Column>
          <Column sortable field="breakfast" header="Break Fast"></Column>
          <Column sortable field="lunch" header="Lunch"></Column>
          <Column sortable field="dinner" header="Dinner"></Column>

          {/* <Column sortable field="createdBy" header="Created By" /> */}
        </DataTable>
      ) : (
        <Empty type="Families" />
      )}

      <Drawer
        title={"Add Leaders"}
        placement="right"
        onClose={onClose}
        maskClosable={false}
        open={open}
      >
        <div>
          <form>
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
                  {userLists?.map((d) => {
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
              <div className="mb-3">
                <div className="w-100">
                  <Button
                    className="bg-info text-white"
                    onClick={addLeaders}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Drawer>
    </div>
  );
}
