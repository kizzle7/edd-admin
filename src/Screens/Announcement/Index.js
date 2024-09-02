import { useEffect, useState, useRef } from "react";
import { Input } from "../../Components/Input/index";
import { DashboardContainer } from "../../Components/DashboardContainer/Index";
import EventList from "../../Components/Table/AnnoucementTable";
import axios from "axios";
import config from "../../config";
import { Chart } from "primereact/chart";
import moment from "moment";
import { DatePicker, Space, Drawer, Select, notification } from "antd";
import { Button } from "../../Components/Button";
import { Loader } from "../../Components/Loader";
const dateFormat = "DD/MM/YYYY";
export const Annoucements = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loadEvent, setLoadEvent] = useState(false);
  const [type, setType] = useState("Select Event Type");
  const [theme, settheme] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [anchor, setAnchor] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [time, setTime] = useState("");
  const [zlink, setZlink] = useState("");
  const [yLink, setYLink] = useState("");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const [flier, setFlier] = useState("");
  const [booklet, setBooklet] = useState("");
  const [updateData, setUpdateData] = useState({});
  const [flierView, setFlierView] = useState("");

  const [load, setLoad] = useState(false);
  const [newEvent, setNewEvent] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState([]);

  const getannoucement = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}blog/all`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoad(false);
        response.data.data.forEach((data, index) => {
          data.date = moment(data.date).format("DD-MMM-YYYY h:mm A");
        });
        setData(response.data.data);
        setAllData(response.data.data);
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

  const createBlog = () => {
    const dataF = new FormData();
    dataF?.append("title", theme);
    dataF?.append("content", anchor);
    dataF?.append("minutes", tagLine);
    dataF?.append("image", flier);
    setLoadEvent(true);
    axios
      .post(`${config.baseUrl}blog/create`, dataF, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoadEvent(false);
        if (response.status === 201) {
          setLoadEvent(false);
          Notification("success", "Success", "Blog created successfully");
          getannoucement();
          setNewEvent(false);
          settheme("");
          setTagLine("");
          setType("");
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
      });
  };

  const handleUpdate = (data) => {
    const dataF = new FormData();
    dataF?.append("title", theme);
    dataF?.append("content", anchor);
    dataF?.append("minutes", tagLine);
    dataF?.append("image", flier);
    setLoadEvent(true);
    axios
      .put(`${config.baseUrl}blog/${updateData?._id}`, dataF, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoadEvent(false);
        if (response.status === 200) {
          setLoadEvent(false);
          Notification("success", "Success", "Event updated successfully");
          getannoucement();
          setNewEvent(false);
          settheme("");
          setTagLine("");
          setType("");
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

  useEffect(() => {
    getannoucement();
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
      settheme(updateData.title);
      setTagLine(updateData.minutes);
      setAnchor(updateData.content);
      setFlier(updateData.images[0]);
      setFlierView(updateData.images[0]);
    } else {
      settheme("");
      setTagLine("");
      setType("");
      setPrice("");
      setTime("");
      setYLink("");
      setZlink("");
      setLocation("");
      setContent("");
      setDate("");
      setEndDate("");
      setFlier("");
    }
  }, [updateData]);

  console.log(updateData);

  const hanleUpdateData = (data) => {
    setData(data);
  };

  return (
    <div>
      <DashboardContainer pageTitle="">
        <div className="row">
          <div className="col-md-12">
            <div className="card py-4 px-4 " style={{ height: "100vh" }}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="lead-dl">Annoucements</div>
                <div>
                  <Button
                    text="Add New Announcement +"
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
                    getannoucement={getannoucement}
                    hanleUpdateData={hanleUpdateData}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </DashboardContainer>

      <Drawer
        title={updateData._id ? "Edit Announcement" : "Add a New Announcement"}
        placement="right"
        onClose={onClose}
        maskClosable={false}
        width={"40%"}
        open={newEvent}
      >
        <div>
          <form>
            <div>
              <div className="mb-3">
                <label>Title</label>
                <Input
                  type="text"
                  className="input-className"
                  onChange={(e) => settheme(e.target.value)}
                  value={theme}
                />
              </div>
              <div className="mb-3">
                <label>Minutes</label>
                <Input
                  type="text"
                  className="input-className w-100"
                  onChange={(e) => setTagLine(e.target.value)}
                  value={tagLine}
                />
              </div>
              <div className="mb-3">
                <label>Content</label>
                <div>
                  <textarea
                    className="input-className w-100"
                    onChange={(e) => setAnchor(e.target.value)}
                    value={anchor}
                    rows={20}
                    cols={"100%"}
                  ></textarea>
                </div>
              </div>

              <div className="mb-3">
                <label>
                  {updateData?._id ? "Current Image" : "Flier Upload"}
                </label>
                {updateData?._id && (
                  <div className="pb-2">
                    <img src={flierView} className="w-25" />
                  </div>
                )}
                <input type="file" onChange={fileChnage1} />
              </div>

              <div className="w-100">
                <Button
                  text="Submit"
                  className="bg-info w-100 text-white"
                  loading={loadEvent}
                  onClick={updateData?._id ? handleUpdate : createBlog}
                />
              </div>
            </div>
          </form>
        </div>
      </Drawer>
    </div>
  );
};
