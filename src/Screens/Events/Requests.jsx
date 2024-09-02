import { useEffect, useState, useRef } from "react";
import { Input } from "../../Components/Input/index";
import { DashboardContainer } from "../../Components/DashboardContainer/Index";
import Requesttable from "../../Components/Table/ReqTable";
import "./index.css";
import axios from "axios";
import config from "../../config";
import { Chart } from "primereact/chart";
import moment from "moment";
import { DatePicker, Space } from "antd";
import { Loader } from "../../Components/Loader";
export const EventRequests = ({ id, tab }) => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [type,setType]= useState(false)
  const [totalItems, setTotalItems] = useState([]);

  const getReqs = () => {
    setLoad(true);
    axios
      .get(
        `${config.baseUrl}admin/event_request/all?eventId=${id}&isRead=${type}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setLoad(false);
        response.data.data.forEach((data, index) => {
          data.date = moment(data.createdAt).format("DD-MMM-YYYY h:mm A");
          data.name = data.first_name + " " + data.last_name;
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

  const onUpdate = (type) => {
    setType(type)
      getReqs();
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
    getReqs();
  }, [tab]);

  const handleUpdateData = (data) => {
    setData(data)
  }

  console.log(data);

  return (
    <div>
      {load && <Loader />}

      {!load && (
        <Requesttable data={data} allData={allData} onUpdate={onUpdate} handleUpdateData={handleUpdateData}/>
      )}
    </div>
  );
};
