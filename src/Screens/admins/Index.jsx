import { useEffect, useState, useRef } from "react";
import { Input } from "../../Components/Input/index";
import { DashboardContainer } from "../../Components/DashboardContainer/Index";
import EventList from "../../Components/Table/Admin";
import axios from "axios";
import { TextInput } from "../../Components/Input/Text";
import config from "../../config";
import { Chart } from "primereact/chart";
import moment from "moment";
import { DatePicker, Space, Drawer, Select, notification } from "antd";
import { Button } from "../../Components/Button";
import { Loader } from "../../Components/Loader";
import UserList from "../../Components/Table/UsersSummary";
import { TypeIcon } from "antd/es/message/PurePanel";
const dateFormat = "DD/MM/YYYY";
export const Admins = ({ id }) => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loadEvent, setLoadEvent] = useState(false);
  const [type, setType] = useState("Select Event Type");
  const [theme, settheme] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [anchor, setAnchor] = useState("");
  const [loadText,setLoadText] = useState(false)
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
  const [text, setText] = useState("");

  const [paymentIssuedDate, setPaymentIssuedDate] = useState("");
  const [paymentID, setPaymentID] = useState("");
  const [paymentIssues, setPaymentIssues] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymenStatus, setPaySstatus] = useState("");
  const [load, setLoad] = useState(false);
  const [newEvent, setNewEvent] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState([]);

  const getAdmins = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}/getPaymentText/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoad(false);
        setData(response.data.payments);
        setText(response?.data?.payments[0].paymentText)
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

  const createEvent = (e) => {
    e.preventDefault();
    const datar = {
      paymentIssues,
      paymentIssuedDate,
      paymentID,
      paymentMethod,
      paymenStatus,
      profile_id: id,
    };
    setLoadEvent(true);
    axios
      .post(`${config.baseUrl}/profile-payment-create`, datar, {
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
            "Payment Record created successfully"
          );
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
          setPaySstatus("");
          setPaymentID("");
          setPaymentID("");
          setPaymentIssues("");
          setPaymentIssuedDate("");
        }
      })
      .catch((err) => {
        setLoadEvent(false);
        Notification("error", "Error", err?.response?.data?.message);
      });
  };

  const handleEventUpdate = () => {
    const data = {
      paymentIssues,
      paymentIssuedDate,
      paymentID,
      paymentMethod,
      paymenStatus,
      profile_id: id,
    };
    setLoadEvent(true);
    axios
      .put(`${config.baseUrl}/profile-payment-edit`, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoadEvent(false);
        if (response.status === 200) {
          setLoadEvent(false);
          Notification(
            "success",
            "Success",
            "Payment Record updated successfully"
          );
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
          setPaySstatus("");
          setPaymentID("");
          setPaymentID("");
          setPaymentIssues("");
          setPaymentIssuedDate("");
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
      setPaySstatus(updateData.paymenStatus);
      setPaymentID(updateData.paymentID);
      setPaymentIssuedDate(updateData?.paymentIssuedDate);
      setPaymentMethod(updateData.paymentMethod);
      setPaymentIssues(updateData.paymentIssues);
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

  const updatePaymentText = () => {
    setLoadText(true)
    axios
      .put(
        `${config.baseUrl}/profile-payment-text`,
        {
          profile_id: id,
          text: text,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setLoadText(false)
        Notification("success", "Success", 'Payment Section Text Updated');


      })
      .catch((err) => {
        setLoadText(false)
        console.log(err);
      });
  };

  console.log(updateData);

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="card py-4 px-4 " style={{ height: "100%" }}>
            <ul className="container">
              <li>
                <p>
                  <u>Payment History Section</u>
                </p>
                <div>
                  <div className="mb-3">
                    <TextInput
                      type="text"
                      className="input-className w-75"
                      onChange={(e) => setText(e.target.value)}
                      value={text}
                      placeholder="Type text here"
                    />
                  </div>
                </div>
                <div>
                  <Button
                    text="Update"
                    className="bg-info px-3 w-25 text-white"
                    loading={loadText}
                    onClick={updatePaymentText}
                  />
                </div>
              </li>
              <br />
              <li>
                <>
                  <p>
                    <u>Payment Record Section</u>
                  </p>
                  <div className="d-flex justify-content-end align-items-center">
                    <div>
                      <Button
                        text="Add New Payment +"
                        className="bg-success px-3 text-white"
                        onClick={() => {
                          setNewEvent(true);
                        }}
                      />
                    </div>
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
                </>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Drawer
        title={
          updateData._id ? "Update Payment Record" : "Add a New Payment Record"
        }
        placement="right"
        onClose={onClose}
        maskClosable={false}
        open={newEvent}
      >
        <div>
          <form>
            <div>
              <div className="mb-3">
                <label>Payment Issue Date</label>
                <Input
                  type="text"
                  className="input-className w-100"
                  onChange={(e) => setPaymentIssuedDate(e.target.value)}
                  value={paymentIssuedDate}
                />
              </div>

              <div className="mb-3">
                <label>Payment Issued</label>
                <Input
                  type="text"
                  className="input-className w-100"
                  onChange={(e) => setPaymentIssues(e.target.value)}
                  value={paymentIssues}
                />
              </div>
              <div className="mb-3">
                <label>Payment ID</label>
                <Input
                  type="text"
                  className="input-className w-100"
                  onChange={(e) => setPaymentID(e.target.value)}
                  value={paymentID}
                />
              </div>
              <div className="mb-3">
                <label>Payment Method</label>
                <Input
                  type="text"
                  className="input-className w-100"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  value={paymentMethod}
                />
              </div>
              <div className="mb-3">
                <label>Payment Status</label>
                <Input
                  type="text"
                  className="input-className w-100"
                  onChange={(e) => setPaySstatus(e.target.value)}
                  value={paymenStatus}
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
