import { useEffect, useState, useRef } from "react";
import { Input } from "../../Components/Input/index";
import { DashboardContainer } from "../../Components/DashboardContainer/Index";
import EventList from "../../Components/Table/PastEvents";
import "./index.css";
import axios from "axios";
import config from "../../config";
import { Chart } from "primereact/chart";
import moment from "moment";
import { DatePicker, Space, Drawer, Select, notification } from "antd";
import { Button } from "../../Components/Button";
import { Loader } from "../../Components/Loader";
const dateFormat = "DD/MM/YYYY";
export const PastEvents = () => {
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

  const getEvents = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}admin/events/all?hideEvent=true`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoad(false);
        response.data.data.data.forEach((data, index) => {
          data.date = moment(data.date).format("DD-MMM-YYYY h:mm A");
          data.endDate = moment(data.endDate).format("DD-MMM-YYYY h:mm A");
          data.creator = data.creator.first_name + " " + data.creator.last_name;
          data.status = data.hideEvent ? "INACTIVE" : "ACTIVE";
        });
        setData(response.data.data.data);
        setAllData(response.data.data.data);
        setTotalItems(response.data.data.meta.totalPages * 10);
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
    const dataF = new FormData();
    dataF?.append("title", theme);
    dataF?.append("subtitle", tagLine);
    dataF?.append("date", date ? new Date(date) : new Date(date));
    dataF?.append("time", time);
    dataF?.append("location", location);
    dataF?.append("content", content);
    if (endDate) dataF?.append("endDate", new Date(endDate));
    if (zlink) dataF?.append("zoom_link", zlink);
    if (price) dataF?.append("price", price ? price : 0);
    if (yLink) dataF?.append("youtube_link", yLink);
    if (anchor) dataF?.append("anchor_verse", anchor);
    dataF?.append("category", type);
    if (flier) dataF?.append("image_1", flier);
    if (booklet) dataF?.append("program_booklet", booklet);
    setLoadEvent(true);
    axios
      .post(`${config.baseUrl}admin/event/create`, dataF, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoadEvent(false);
        if (response.status === 201) {
          setLoadEvent(false);
          Notification("success", "Success", "Event created successfully");
          getEvents();
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

  const handleEventUpdate = (data) => {
    const dataF = new FormData();
    dataF?.append("title", theme);
    dataF?.append("subtitle", tagLine);
    dataF?.append("date", date ? new Date(date) : new Date(date));
    dataF?.append("time", time);
    dataF?.append("location", location);
    dataF?.append("content", content);
    if (endDate) dataF?.append("endDate", new Date(endDate));
    if (zlink) dataF?.append("zoom_link", zlink);
    if (price) dataF?.append("price", price ? price : 0);
    if (yLink) dataF?.append("youtube_link", yLink);
    if (anchor) dataF?.append("anchor_verse", anchor);
    dataF?.append("category", type);
    if (flier) dataF?.append("image_1", flier);
    if (booklet) dataF?.append("program_booklet", booklet);
    setLoadEvent(true);
    axios
      .put(`${config.baseUrl}admin/event/update/${updateData?._id}`, dataF, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoadEvent(false);
        if (response.status === 200) {
          setLoadEvent(false);
          Notification("success", "Success", "Event updated successfully");
          getEvents();
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
    getEvents();
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
      setTagLine(updateData.subtitle);
      setType(updateData.category);
      setPrice(updateData.price);
      setTime(updateData.time);
      setAnchor(updateData?.anchor_verse);
      setYLink(updateData.youtube_link);
      setZlink(updateData.zoom_link);
      setLocation(updateData.location);
      setContent(updateData.content);
      setDate(moment(updateData.date).format("DD/MM/YYYY"));
      setEndDate(moment(updateData.endDate).format("DD/MM/YYYY"));
      setFlierView(updateData.image.url);
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

  return (
    <div>
      <DashboardContainer pageTitle="">
        <div className="row">
          <div className="col-md-12">
            <div className="card py-4 px-4 " style={{ height: "100vh" }}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="lead-dl">Past Events</div>
              
              </div>

              <div className="">
                {load && <Loader />}

                {!load && (
                  <EventList
                    data={data}
                    allData={allData}
                    onOpenDrawer={onOpen}
                    setData={setUpdateData}
                    getEvents={getEvents}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </DashboardContainer>

      <Drawer
        title={updateData._id ? "Edit Event" : "Add a New Event"}
        placement="right"
        onClose={onClose}
        maskClosable={false}
        open={newEvent}
      >
        <div>
          <form>
            <div>
              <div className="mb-3">
                <Select
                  value={type}
                  placeholder="Select Event Type"
                  style={{
                    width: "100%",
                    height: "45px",
                  }}
                  onChange={(value) => {
                    setType(value);
                  }}
                  options={[
                    { value: "MONTHLY", label: "Monthly Family Meetings" },
                    { value: "EDEN", label: "Eden Conference" },
                    { value: "ANNUAL", label: "Annual Conference" },
                  ]}
                />
              </div>
              <div className="mb-3">
                <label>Theme</label>
                <Input
                  type="text"
                  className="input-className"
                  onChange={(e) => settheme(e.target.value)}
                  value={theme}
                />
              </div>
              <div className="mb-3">
                <label>Tag Line</label>
                <Input
                  type="text"
                  className="input-className w-100"
                  onChange={(e) => setTagLine(e.target.value)}
                  value={tagLine}
                />
              </div>
              <div className="mb-3">
                <label>Anchor Verse</label>
                <div>
                  <textarea
                    className="input-className w-100"
                    onChange={(e) => setAnchor(e.target.value)}
                    value={anchor}
                    rows={5}
                    cols={"100%"}
                  ></textarea>
                </div>
              </div>

              <div className="mb-3">
                <label>Price</label>
                <Input
                  type="number"
                  className="input-className"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>
              <div className="mb-3">
                <label>Start Date</label>
                <div>
                  {/* <DatePicker
                    onChange={onChangeStart}
                    value={moment(date, dateFormat)}
                    placeholder="End Date"
                    className="w-100"
                  />{" "} */}
                  <Input
                    type="date"
                    className="input-className"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label>End Date</label>
                <div>
                  <Input
                    type="date"
                    className="input-className"
                    onChange={(e) => setEndDate(e.target.value)}
                    value={endDate}
                  />
                  {/* <DatePicker
                    onChange={onChangeEnd}
                    value={moment(endDate, dateFormat)}
                    placeholder="End Date"
                    className="w-100"
                  /> */}
                </div>
              </div>
              <div className="mb-3">
                <label>Time</label>

                <Input
                  type="time"
                  className="input-className"
                  onChange={(e) => setTime(e.target.value)}
                  value={time}
                />
              </div>
              <div className="mb-3">
                <label>Zoom Link</label>

                <Input
                  type="text"
                  className="input-className"
                  onChange={(e) => setZlink(e.target.value)}
                  value={zlink}
                />
              </div>
              <div className="mb-3">
                <label>Youtube Link</label>

                <Input
                  type="text"
                  className="input-className"
                  onChange={(e) => setYLink(e.target.value)}
                  value={yLink}
                />
              </div>
              <div className="mb-3">
                <label>Location</label>

                <Input
                  type="text"
                  className="input-className"
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                />
              </div>
              <div className="mb-3">
                <label>Content</label>
                <div>
                  <textarea
                    className="input-className w-100"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    rows="5"
                    cols={"100%"}
                  ></textarea>
                </div>
              </div>
              <div className="mb-3">
                <label>
                  {" "}
                  {updateData?._id ? "Current Imahe" : "Flier Upload"}
                </label>
                {updateData?._id && (
                  <div className="pb-2">
                    <img src={flierView} className="w-25" />
                  </div>
                )}
                <input type="file" onChange={fileChnage1} />
              </div>
              <div className="mb-3">
                <label>Booklet Upload</label>

                <input type="file" onChange={fileChnage2} />
              </div>

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
