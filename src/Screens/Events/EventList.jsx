import { useEffect, useState, useRef } from "react";
import { Input } from "../../Components/Input/index";
import { DashboardContainer } from "../../Components/DashboardContainer/Index";
import EventList from "../../Components/Table/EventsTable";
import "./index.css";
import axios from "axios";
import config from "../../config";
import { Chart } from "primereact/chart";
import moment from "moment";
import { DatePicker, Space, Drawer, Select, notification } from "antd";
import { Button } from "../../Components/Button";
import { Loader } from "../../Components/Loader";
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";
const dateFormat = "DD/MM/YYYY";
export const EventLists = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loadEvent, setLoadEvent] = useState(false);
  const [stock, setStock] = useState("");
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
  const [rate, setRate] = useState("");
  const [content, setContent] = useState("");
  const [flier, setFlier] = useState("");
  const [booklet, setBooklet] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [updateData, setUpdateData] = useState({});
  const [flierView, setFlierView] = useState("");
  const [load, setLoad] = useState(false);
  const [newEvent, setNewEvent] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState([]);
  const [file, setFile] = useState("");
  const uploader = Uploader({
    apiKey: "free", // Get production API keys from Upload.io
  });
  const options = { multi: true };
  const getEvents = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}/products`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoad(false);
        // response.data.data.data.forEach((data, index) => {
        //   data.date = moment(data.date).format("DD-MMM-YYYY h:mm A");
        //   data.endDate = moment(data.endDate).format("DD-MMM-YYYY h:mm A");
        //   data.creator = data.creator.first_name + " " + data.creator.last_name;
        //   data.status = data.hideEvent ? "INACTIVE" : "ACTIVE";
        // });
        setData(response.data.products);
        setAllData(response.data.products);
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
    setRate("");
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
      name: theme,
      origin: type,
      price: price,
      stock: stock,
      moq: tagLine,
      description: anchor,
      image: imgUrl,
      rate: rate,
      image2: file[1].originalFile.fileUrl,
      image3: file[2].originalFile.fileUrl,
      image4: file[3].originalFile.fileUrl,
    };
    setLoadEvent(true);
    axios
      .post(`${config.baseUrl}/admin/product`, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoadEvent(false);
        if (response.status === 201) {
          setLoadEvent(false);
          Notification("success", "Success", "Product created successfully");
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
          setStock("");
          setEndDate("");
          setFlier("");
          setBooklet(null);
          setRate("");
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
      name: theme,
      origin: type,
      price: price,
      stock: stock,
      moq: tagLine,
      description: anchor,
      image: imgUrl,
      rate: rate,
      image2: file[1].originalFile.fileUrl,
      image3: file[2].originalFile.fileUrl,
      image4: file[3].originalFile.fileUrl,
    };
    setLoadEvent(true);
    axios
      .put(`${config.baseUrl}/admin/product/${updateData?._id}`, data, {
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
          setRate("");
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
      settheme(updateData.name);
      setTagLine(updateData.moq);
      setType(updateData.origin);
      setPrice(updateData.price);
      setAnchor(updateData?.description);
      setImgUrl(updateData.image);
      setStock(updateData.stock);
    } else {
      settheme("");
      setTagLine("");
      setType("");
      setStock("");
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
                <div className="lead-dl">Products</div>
                <div>
                  <Button
                    text="Add New Product +"
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
                    getEvents={getEvents}
                    hanleUpdateData={hanleUpdateData}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </DashboardContainer>

      <Drawer
        title={updateData._id ? "Edit Product" : "Add a New Product"}
        placement="right"
        onClose={onClose}
        maskClosable={false}
        open={newEvent}
      >
        <div>
          <form>
            <div>
              <div className="mb-3">
                <label>Product Origin</label>
                <Select
                  value={type}
                  placeholder="Select Product Origin"
                  style={{
                    width: "100%",
                    height: "45px",
                  }}
                  onChange={(value) => {
                    setType(value);
                  }}
                  options={[
                    { value: "OSUN", label: "Osun" },
                    { value: "EKITI", label: "Ekiti" },
                  ]}
                />
              </div>
              <div className="mb-3">
                <label>Name</label>
                <Input
                  type="text"
                  className="input-className"
                  onChange={(e) => settheme(e.target.value)}
                  value={theme}
                />
              </div>
              <div className="mb-3">
                <label>Stock</label>
                <Input
                  type="text"
                  className="input-className w-100"
                  onChange={(e) => setStock(e.target.value)}
                  value={stock}
                />
              </div>
              <div className="mb-3">
                <label>MOQ</label>
                <Input
                  type="text"
                  className="input-className w-100"
                  onChange={(e) => setTagLine(e.target.value)}
                  value={tagLine}
                />
              </div>
              <div className="mb-3">
                <label>Description</label>
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
                <label>Rating</label>
                <Input
                  type="number"
                  className="input-className"
                  onChange={(e) => setRate(e.target.value)}
                  value={rate}
                />
              </div>
              <div className="mb-3">
                {!imgUrl ? (
                  <UploadButton
                    uploader={uploader}
                    options={options}
                    onComplete={(files) => {
                      setImgUrl(files[0].originalFile.fileUrl);
                      setFile(files);
                    }}
                  >
                    {({ onClick }) => (
                      <div onClick={onClick} className="upload-ch">
                        <div className="d-flex justify-content-center align-items-center">
                          <div>
                            <div>upload product image</div>
                            <div className="text-center pt-1">
                              <img
                                src={"https://i.stack.imgur.com/0dKeS.png"}
                                width={"25%"}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </UploadButton>
                ) : (
                  <div>
                    <div
                      className="text-right text-danger font-weigh"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setImgUrl(null);
                      }}
                    >
                      Change Image
                    </div>
                    {file?.length > 0 &&
                    <div>
                    {file?.map((d) => {
                      return (
                        <img src={d?.originalFile.fileUrl} className="w-25" />
                      );
                    })}
                    </div>}
                    <br />
                  </div>
                )}
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
