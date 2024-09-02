import { useEffect, useState, useRef } from "react";
import { Input } from "../../Components/Input/index";
import { DashboardContainer } from "../../Components/DashboardContainer/Index";
import ReservationLists from "../../Components/Table/Reservations";
import "./index.css";
import axios from "axios";
import config from "../../config";
import { Chart } from "primereact/chart";
import moment from "moment";
import { DatePicker, Space } from "antd";
import { Loader } from "../../Components/Loader";
export const Reservations = ({ id, tab }) => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState([]);

  const getReservations = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}admin/halls/reservation?eventId=${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoad(false);
        response.data.data.forEach((data, index) => {
          data.firstName = data.user.first_name;
          data.lastName =  data.user.last_name;
          data.state =  data.user.state;
          data.bedNumber =  data.hall_number
          data.hallname = data.hall?.name
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

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleUpdateData = (DATA) => {
    setData(DATA)
  }

  


  useEffect(() => {
    getReservations();
  }, [tab]);

  console.log(data);

  return (
    <div>
      {load && <Loader />}

      {!load && (
        <ReservationLists data={data} allData={allData} getRegs={getReservations} handleUpdateData={handleUpdateData} />
      )}
    </div>
  );
};
