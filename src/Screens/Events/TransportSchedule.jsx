import { useEffect, useState, useRef } from "react";
import { Input } from "../../Components/Input/index";
import { DashboardContainer } from "../../Components/DashboardContainer/Index";
import TransportTable from "../../Components/Table/TransportTableSchedule";
import "./index.css";
import axios from "axios";
import config from "../../config";
import { Chart } from "primereact/chart";
import moment from "moment";
import { DatePicker, Space, notification } from "antd";
import { Loader } from "../../Components/Loader";
import { Drawer, Select } from "antd";
import { Button } from "../../Components/Button/index";
export const TransportSchedule = ({ id, tab }) => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [load, setLoad] = useState(false);
  const [loadFam, setLoadFam] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [page, setPage] = useState(1);
  const [noPickip, setNoPicup] = useState("");
  const [newFam, setNewFam] = useState(false);
  const [show, setShow] = useState(false);
  const [totalItems, setTotalItems] = useState([]);

  const [day, setDay] = useState("Select Day");
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");

  const getFams = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}admin/transportation/all`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoad(false);
        response.data.data.forEach((data, index) => {
          data.date = moment(data.createdAt).format("DD-MMM-YYYY h:mm A");
          //   data.lunch = data.lunch.name;
          //   data.breakfast = data.breakfast.name;
          //   data.dinner = data.dinner.name;
        });
        setData(response.data.data);
        setAllData(response.data.data);
        setTotalItems(response.data.data.meta.totalPages * 10);
      })
      .catch((err) => {
        setLoad(false);
        console.log(err);
      });
  };

  const getSchedules = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}admin/transportation/all`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoad(false);
        response.data.data.forEach((data, index) => {
          data.date = moment(data.createdAt).format("DD-MMM-YYYY h:mm A");
          //   data.lunch = data.lunch.name;
          //   data.breakfast = data.breakfast.name;
          //   data.dinner = data.dinner.name;
        });
        setData(response.data.data);
        setAllData(response.data.data);
        setTotalItems(response.data.data.meta.totalPages * 10);
      })
      .catch((err) => {
        setLoad(false);
        console.log(err);
      });
  };

  const onClose = () => {
    setNewFam(false);
    setName("");
    setComment("");
    setDay("");
    setBreakfast("");
    setLunch("");
    setDinner("");
  };

  const Notification = (type, msgType, msg) => {
    notification[type]({
      message: msgType,
      description: msg,
    });
  };

  const addFam = () => {
    setLoadFam(true);
    axios
      .post(
        `${config.baseUrl}admin/food_schedules/create`,
        {
          event: id,
          data: [
            {
              name: day,
              breakfast: {
                name: breakfast,
              },
              lunch: {
                name: lunch,
              },
              dinner: {
                name: dinner,
              },
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setLoadFam(false);
        setDay("");
        setBreakfast("");
        setLunch("");
        setDinner("");
        setNewFam(false);
        setComment("");
        Notification(
          "success",
          "Success",
          "Food schedule created successfully"
        );
        getFams();
      })
      .catch((err) => {
        if (err) {
          Notification("Error", "error", err?.respone?.data?.message);
          setLoad(false);
          console.log(err);
        }
      });
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const getPaged = (queryString) => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}/admin/events/${id}/tickets${queryString}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setLoad(false);
          response.data.data.forEach((data, index) => {
            data.date = moment(data.createdAt).format("DD-MMM-YYYY h:mm A");
          });
          setData(response.data.data);
          setAllData(response.data.data);
          setTotalItems(response.data.data.meta.totalPages * 10);
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
    const queryString = `?page=${page}&limit=${pageSize}`;
    getPaged(queryString);
  };

  useEffect(() => {
    getSchedules();
  }, [tab]);

  console.log(data);

  return (
    <div>
      <div className="d-flex justify-content-end align-items-center pb-3">
        <Button
          text="Add Transport Schedule +"
          className="bg-success w-25 px-3 text-white"
          onClick={() => {
            setNewFam(true);
          }}
        />
      </div>
      {load && <Loader />}

      {!load && (
        <TransportTable data={data} allData={allData} getFams={getFams} />
      )}

      <Drawer
        title={"Add a New Food Schedule "}
        placement="right"
        onClose={onClose}
        maskClosable={false}
        open={newFam}
      >
        <div>
          <form>
            <div>
              <div className="mb-3">
                <Select
                  value={day}
                  placeholder="Select Day"
                  style={{
                    width: "100%",
                    height: "45px",
                  }}
                  onChange={(value) => {
                    setDay(value);
                  }}
                  options={[
                    { value: "monday", label: "Monday" },
                    { value: "tuesday", label: "Tuesday" },
                    { value: "wednesday", label: "Wednesday" },
                    { value: "thursday", label: "Thursday" },
                    { value: "friday", label: "Friday" },
                    { value: "saturday", label: "Saturday " },
                  ]}
                />
              </div>
              <div className="mb-3">
                <label>Number of pickups schedule</label>

                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    onChange={(e) => setNoPicup(e.target.value)}
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={() => {
                      if (noPickip > 0) {
                        setShow(true);
                        console.log("clicked now");
                        for (let index = 0; index < noPickip.length; index++) {
                          console.log(index);
                        }
                      } else {
                        setShow(false);
                      }
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div>
                {[1, 2, 3, 4]?.map((d, i) => {
                  <div className="mb-3">
                    <label>Schedule Pickup Time {i + 1}</label>
                    <Input
                      type="time"
                      className="input-className"
                      onChange={(e) => setLunch(e.target.value)}
                      value={lunch}
                    />
                  </div>;
                })}
              </div>

              <br />
              <div className="w-100">
                <Button
                  text="Submit"
                  className="bg-info w-100 text-white"
                  loading={loadFam}
                  onClick={addFam}
                />
              </div>
            </div>
          </form>
        </div>
      </Drawer>
    </div>
  );
};
