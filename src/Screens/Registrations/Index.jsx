import { useEffect, useState, useRef } from "react";
import { Input } from "../../Components/Input/index";
import { DashboardContainer } from "../../Components/DashboardContainer/Index";
import EventList from "../../Components/Table/ConfigSys";
import axios from "axios";
import config from "../../config";
import { Chart } from "primereact/chart";
import moment from "moment";
import { DatePicker, Space, Drawer, Select, notification } from "antd";
import { Button } from "../../Components/Button";
import { Loader } from "../../Components/Loader";
import UserList from "../../Components/Table/UsersSummary";
import { TypeIcon } from "antd/es/message/PurePanel";
const dateFormat = "DD/MM/YYYY";
export const ConfigSys = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loadEvent, setLoadEvent] = useState(false);
  const [type, setType] = useState("Select Event Type");
  const [theme, settheme] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [anchor, setAnchor] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [time, setTime] = useState("");
  const [zlink, setZlink] = useState("");
  const [yLink, setYLink] = useState("");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const [UserList, setUserLists] = useState([]);
  const [flier, setFlier] = useState("");
  const [booklet, setBooklet] = useState("");
  const [updateData, setUpdateData] = useState({});
  const [flierView, setFlierView] = useState("");

  const [load, setLoad] = useState(false);
  const [newEvent, setNewEvent] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState([]);

  const getAdmins = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}/admin/configs`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoad(false);
        // response.data.data.forEach((data, index) => {
        //   data.name = data.first_name + " " + data.last_name;
        // });
        setData(response.data.configs);
        setAllData(response.data.configs);
        // setTotalItems(response.data.data.meta.totalPages * 10);
      })
      .catch((err) => {
        setLoad(false);
        console.log(err);
      });
  };

  const onClose = () => {
    setNewEvent(false);
    settheme("");
    setTagLine("");
    setType("");
    setPrice("");
    setUpdateData({});
    setTime("");
    setYLink("");
    setZlink("");
    setLocation("");
    setContent("");
    setDate("");
    setEndDate("");
    setFlier("");
    setBooklet(null);
    setFlier(null);
    setFlierView(false);
  };

  const onChangeStart = (date, dateString) => {
    console.log(date, dateString);
    setDate(dateString);
  };

  const onChangeEnd = (date, dateString) => {
    console.log(date, dateString);
    setEndDate(dateString);
  };

  const getPaged = (queryString) => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}/api/v1/admin/traderx-users/all?${queryString}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setLoad(false);
          res.data.data.records.forEach((data, index) => {
            data.date = moment(data.date).format("DD-MMM-YYYY h:mm A");
            data.endDate = moment(data.endDate).format("DD-MMM-YYYY h:mm A");
            data.creator =
              data.creator.first_name + " " + data.creator.last_name;
            data.status = data.hideEvent ? "INACTIVE" : "ACTIVE";
          });
          setData(res.data.data);
          setAllData(res.data.data);
          setTotalItems(res.data.meta.totalPages * 10);
        }
      })
      .catch((err) => {
        if (err) {
        }
      });
  };

  const createEvent = () => {
    const data = {
      role: role,
      email: email,
      password: password,
      name: name,
      isAdmin: true,
    };
    setLoadEvent(true);
    axios
      .post(`${config.baseUrl}/register-admin`, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoadEvent(false);
        if (response.status === 200) {
          setLoadEvent(false);
          Notification("success", "Success", "Admin created successfully");
          getAdmins();
          setNewEvent(false);
          setRole("");
          setName("");
          setPassword("");
          setEmail("");
          setTime("");
          setYLink("");
          setZlink("");
          setLocation("");
          setContent("");
          setDate("");
          setEndDate("");
          setFlier("");
          setBooklet(null);
          setFlier(null);
          setFlierView(false);
        }
      })
      .catch((err) => {
        setLoadEvent(false);
        Notification("error", "Error", err?.response?.data?.message);
      });
  };

  const handleEventUpdate = () => {
    const data = {
      value: role,
      description: password,
      name: name,
    };
    setLoadEvent(true);
    axios
      .put(`${config.baseUrl}/admin/config/${updateData?._id}`, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoadEvent(false);
        if (response.status === 200) {
          setLoadEvent(false);
          Notification("success", "Success", "Config updated successfully");
          getAdmins();
          setNewEvent(false);
          setRole("");
          setName("");
          setPassword("");
          setEmail("");
          setPrice("");
          setTime("");
          setYLink("");
          setZlink("");
          setLocation("");
          setContent("");
          setDate("");
          setEndDate("");
          setFlier("");
          setBooklet(null);
          setFlier(null);
          setFlierView(false);
        }
      })
      .catch((err) => {
        setLoadEvent(false);
        Notification("error", "Error", err?.response?.data?.message);
        console.log(err);
      });
  };

  const Notification = (type, msgType, msg) => {
    notification[type]({
      message: msgType,
      description: msg,
    });
  };

  const pagination = (page, pageSize) => {
    console.log(page);
    setPage(page);
    const queryString = `page=${page}&limit=${pageSize}`;
    getPaged(queryString);
  };

  const getUsers = () => {
    axios
      .get(`${config.baseUrl}admin/users/all?limit=100&page=1&gender=`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUserLists(
          response.data.data?.map((d) => ({
            label: d.first_name + " " + d.last_name,
            value: d._id,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const onOpen = () => {
    setNewEvent(true);
  };

  const fileChnage1 = (e) => {
    console.log(e);
    var file = e.target.files([0]);
    console.log(file);
    setFlier(file);
  };

  const fileChnage2 = (e) => {
    var file = e.target.files([0]);
    setBooklet(file);
  };

  useEffect(() => {
    if (updateData._id) {
      setName(updateData.name);
      setRole(updateData.value);
      setPassword(updateData.description);
    } else {
      setRole("");
      setName("");
      setPassword("");
      setEmail("");
    }
  }, [updateData]);

  const hanleUpdateData = (data) => {
    setData(data);
  };

  console.log(updateData);

  return (
    <div>
      <DashboardContainer pageTitle="">
        <div className="row">
          <div className="col-md-12">
            <div className="card py-4 px-4 " style={{ height: "100%" }}>
              <div className="d-flex justify-content-between align-items-center">
                
              </div>

              <div className="">
                {load && <Loader />}

                {!load && (
                  <EventList
                    data={data}
                    allData={allData}
                    onOpenDrawer={onOpen}
                    setData={setUpdateData}
                    getAdmins={getAdmins}
                    hanleUpdateData={hanleUpdateData}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </DashboardContainer>

      <Drawer
        title={"Update Config"}
        placement="right"
        onClose={onClose}
        maskClosable={false}
        open={newEvent}
      >
        <div>
          <form>
            <div>
            

              <div className="mb-3">
                <label>Name</label>
                <Input
                  type="text"
                  className="input-className w-100"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div className="mb-3">
                <label>Value</label>
                <Input
                  type="text"
                  className="input-className w-100"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                />
              </div>
             
              <div className="mb-3">
                <label>Description</label>
                <Input
                  type="text"
                  className="input-className w-100"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <br />
              <div className="w-100">
                <Button
                  text="Submit"
                  className="bg-info w-100 text-white"
                  loading={loadEvent}
                  onClick={updateData?._id ? handleEventUpdate : createEvent}
                />
              </div>
            </div>
          </form>
        </div>
      </Drawer>
    </div>
  );
};
