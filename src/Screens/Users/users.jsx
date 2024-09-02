import { useEffect, useState, useRef } from "react";
import { Input } from "../../Components/Input/index";
import { DashboardContainer } from "../../Components/DashboardContainer/Index";
import UserTable from "../../Components/Table/UsersTable";
import "./index.css";
import axios from "axios";
import config from "../../config";
import { Chart } from "primereact/chart";
import { DatePicker, Space } from "antd";
import { Bars } from "react-loader-spinner";
import { Loader } from "../../Components/Loader";
import { Drawer, notification } from "antd";
import { Button } from "../../Components/Button/index";
import moment from "moment";
export const Users = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [maleResp, setMaleResp] = useState([]);
  const [femaleResp, setFemaleResp] = useState([]);
  const [load, setLoad] = useState(false);
  const [newEvent, setNewEvent] = useState(false);
  const [page, setPage] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [totalItems, setTotalItems] = useState([]);
  const [loadEvent, setLoadEvent] = useState(false);

  const getUsers = () => {
    setLoad(true);
    axios
      .get(
        `${config.baseUrl}/get-profiles/${sessionStorage?.getItem("adminID")}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setLoad(false);
        response.data.profiles.forEach((data, index) => {
          data.dateCreated = moment(data.dateCreated).format(
            "DD-MMM-YYYY h:mm A"
          );
          data.sn = index + 1;
        });
        setData(response.data.profiles);
        setAllData(response.data.profiles);
      })
      .catch((err) => {
        setLoad(false);
        console.log(err);
      });
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const getPaged = (queryString) => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}admin/users/all?${queryString}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setLoad(false);

          setData(res.data.data);
          setTotalItems(res.data.meta.totalPages * 10);
        }
      })
      .catch((err) => {
        if (err) {
        }
      });
  };

  const pagination = (page, pageSize) => {
    console.log(page);
    setPage(page);
    const queryString = `?page=${page}&limit=${pageSize}&gender=`;
    getPaged(queryString);
  };

  const onUpdate = (type) => {
    console.log(type);
    if (type === "male") {
      setData(maleResp);
    } else if (type === "female") {
      setData(femaleResp);
    } else {
      setData(allData);
    }
  };
  const hanleUpdateData = (data) => {
    setData(data);
  };

  const createEvent = (e) => {
    e.preventDefault();
    const datar = {
      email: email,
      firstname: firstName,
      lastname: lastName,
      password: password,
      adminID: sessionStorage?.getItem("adminID"),
    };
    setLoadEvent(true);
    axios
      .post(`${config.baseUrl}/add-profile`, datar, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoadEvent(false);
        if (response.status === 201) {
          Notification(
            "success",
            "Success",
            "Edd Profile created successfully"
          );
          getUsers();
          setEmail("");
          setPassword("");
          setFirstName("");
          setLastName("");
          setNewEvent(false);
        }
      })
      .catch((err) => {
        setLoadEvent(false);
        Notification("error", "Error", err?.response?.data?.message);
      });
  };

  const Notification = (type, msgType, msg) => {
    notification[type]({
      message: msgType,
      description: msg,
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <DashboardContainer pageTitle="">
        <div className="row">
          <div className="col-md-12">
            <div className="card py-4 px-4 " style={{ height: "100%" }}>
              <div className="lead-dl">Profiles</div>
              <div className="d-flex justify-content-end align-items-center">
                <div>
                  <Button
                    text="Add New Profile +"
                    className="bg-success px-3 mb-2 text-white"
                    onClick={() => {
                      setNewEvent(true);
                    }}
                  />
                </div>
              </div>

              <div className="">
                {load && <Loader />}

                {!load && (
                  <UserTable
                    data={data}
                    allData={allData}
                    onUpdate={onUpdate}
                    page={page}
                    totalItems={totalItems}
                    pagination={pagination}
                    hanleUpdateData={hanleUpdateData}
                    getUsers={getUsers}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </DashboardContainer>

     

      <Drawer
        title={"Add New Profile"}
        placement="right"
        onClose={() => {
          setNewEvent(false);
          setEmail("");
          setFirstName("");
          setLastName("");
          setPassword("");
        }}
        maskClosable={false}
        open={newEvent}
      >
        <div>
          <form>
            <div>
              <div className="mb-3">
                <label>Profile Email</label>
                <Input
                  type="text"
                  className="input-className w-100"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div className="mb-3">
                <label>First Name</label>
                <Input
                  type="text"
                  className="input-className w-100"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </div>
              <div className="mb-3">
                <label>Last Name </label>
                <Input
                  type="text"
                  className="input-className w-100"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <Input
                  type="text"
                  className="input-className w-100"
                  onChange={(e) => setPassword(e.target.value)}
                  value={[password]}
                />
              </div>

              <br />
              <div className="w-100">
                <Button
                  text="Submit"
                  className="bg-info w-100 text-white"
                  loading={loadEvent}
                  onClick={createEvent}
                />
              </div>
            </div>
          </form>
        </div>
      </Drawer>
    </div>
  );
};
