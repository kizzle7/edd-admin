import { useEffect, useState, useRef } from "react";
import { Input } from "../../Components/Input/index";
import { DashboardContainer } from "../../Components/DashboardContainer/Index";
import AccomodationLists from "../../Components/Table/Accomodation";
import "./index.css";
import axios from "axios";
import config from "../../config";
import { Chart } from "primereact/chart";
import moment from "moment";
import { DatePicker, Space, notification, Select } from "antd";
import { Loader } from "../../Components/Loader";
import { Drawer } from "antd";
import { Button } from "../../Components/Button/index";
export const Accomodation = ({ id, tab }) => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [load, setLoad] = useState(false);
  const [loadFam, setLoadFam] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [maleResp, setMaleResp] = useState([]);
  const [femaleResp, setFemaleResp] = useState([]);
  const [beds, setBeds] = useState("");
  const [page, setPage] = useState(1);
  const [updateData, setUpdateData] = useState({});
  const [newFam, setNewFam] = useState(false);
  const [totalItems, setTotalItems] = useState([]);

  const getHalls = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}/admin/halls/all`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoad(false);
        const male = response?.data?.data?.filter((d) => d?.gender === "male");
        const female = response?.data?.data?.filter(
          (d) => d?.gender === "female"
        );
        setMaleResp(male);
        setFemaleResp(female);
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
    setBeds("");
  };

  const Notification = (type, msgType, msg) => {
    notification[type]({
      message: msgType,
      description: msg,
    });
  };

  const editHall = () => {
    setLoadFam(true);
    axios
      .put(
        `${config.baseUrl}admin/hall/${updateData?._id}`,
        {
          name: name,
          no_of_beds: beds,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setLoadFam(false);
        setName("");
        setNewFam(false);
        setBeds("");
        Notification("success", "Success", "Hall created successfully");
        getHalls();
      })
      .catch((err) => {
        if (err) {
          Notification("Error", "error", err?.respone?.data?.message);
          setLoad(false);
          console.log(err);
        }
      });
  };

  const addFam = () => {
    setLoadFam(true);
    axios
      .post(
        `${config.baseUrl}admin/hall/create`,
        {
          name: name,
          no_of_beds: beds,
          gender: gender,
          location: "sango",
          price: 3,
          event: id,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setLoadFam(false);
        setName("");
        setNewFam(false);
        setBeds("");
        Notification("success", "Success", "Hall updated successfully");
        getHalls();
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
        setLoad(false);
        const male = response?.data?.data?.filter((d) => d?.gender === "male");
        const female = response?.data?.data?.filter(
          (d) => d?.gender === "female"
        );
        setMaleResp(male);
        setFemaleResp(female);
        setData(response.data.data);
        setAllData(response.data.data);
        setTotalItems(response.data.data.meta.totalPages * 10);
      })
      .catch((err) => {
        if (err) {
        }
      });
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

  const pagination = (page, pageSize) => {
    console.log(page);
    setPage(page);
    const queryString = `?page=${page}&limit=${pageSize}`;
    getPaged(queryString);
  };

  useEffect(() => {
    getHalls();
  }, [tab]);

  const updateHall = (type) => {
    console.log(type);
  };

  useEffect(() => {
    if (updateData?._id) {
      setName(updateData?.name);
      setBeds(updateData?.no_of_beds);
      setGender(updateData?.gender);
    } else {
      setName("");
      setBeds("");
      setGender("");
    }
  }, [updateData]);

  console.log(data);

  const handleUpdateData = (data) => {
    setData(data)
  }

  return (
    <div>
      <div className="d-flex justify-content-end align-items-center pb-3">
        <Button
          text="Add New Hall +"
          className="bg-success w-25 px-3 text-white"
          onClick={() => {
            setNewFam(true);
          }}
        />
      </div>
      {load && <Loader />}

      {!load && (
        <AccomodationLists
          data={data}
          allData={allData}
          getHalls={getHalls}
          setOpen={setNewFam}
          setUpdateData={setUpdateData}
          onUpdate={onUpdate}
          handleUpdateData={handleUpdateData}
        />
      )}

      <Drawer
        title={updateData._id ? "Update Hall" : "Add a New Hall"}
        placement="right"
        onClose={onClose}
        maskClosable={false}
        open={newFam}
      >
        <div>
          <form>
            <div>
              <div className="mb-3">
                <label>Name</label>
                <Input
                  type="text"
                  className="input-className"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="mb-3">
                <label>No of Beds</label>
                <Input
                  type="text"
                  className="input-className"
                  onChange={(e) => setBeds(e.target.value)}
                  value={beds}
                />
              </div>
              <div className="mb-3">
                <label>Gender</label>
                <Select
                  value={gender}
                  placeholder="Select Gender"
                  style={{
                    width: "100%",
                    height: "45px",
                  }}
                  onChange={(value) => {
                    setGender(value);
                  }}
                  options={[
                    { value: "Femaile", label: "Female" },
                    { value: "Male", label: "Male" },
                  ]}
                />
              </div>
              <br />
              <div className="w-100">
                <Button
                  text="Submit"
                  className="bg-info w-100 text-white"
                  loading={loadFam}
                  onClick={updateData?._id ? editHall : addFam}
                />
              </div>
            </div>
          </form>
        </div>
      </Drawer>
    </div>
  );
};
