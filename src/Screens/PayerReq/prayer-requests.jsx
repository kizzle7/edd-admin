import { useEffect, useState, useRef } from "react";
import { Input } from "../../Components/Input/index";
import { DashboardContainer } from "../../Components/DashboardContainer/Index";
import PrayerReqs from "../../Components/Table/prayerReq";
import axios from "axios";
import config from "../../config";
import { Chart } from "primereact/chart";
import { DatePicker, Space } from "antd";
import { Bars } from "react-loader-spinner";
import { Loader } from "../../Components/Loader";
import moment from 'moment'
export const PrayerReq = () => {
 
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [load, setLoad] = useState(false);
    const [page, setPage] = useState(1);
    const [type,setType]= useState(true)
    const [totalItems, setTotalItems] = useState([]);
  
    const getReqs = () => {
      setLoad(true);
      axios
        .get(
          `${config.baseUrl}admin/prayer/all?isRead=${type}`,
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
    };
  
    const onChange = (date, dateString) => {
      console.log(date, dateString);
    };
  
    const getPaged = (queryString) => {
      setLoad(true);
      axios
        .get(`${config.baseUrl}/aadmin/prayer/all?isRead=${type}${queryString}`, {
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
    }, [type]);

    const hanleUpdateData = (data) => {
      setData(data)
    }
  

  return (
    <div>
 
      <DashboardContainer pageTitle="">
        <div className="row">
          <div className="col-md-12">
          <div className="card py-4 px-4 " style={{height:'100%'}}>
          <div className="lead-dl">Prayer Requests</div>

              <div className="">
                {load && <Loader />}

                {!load && <PrayerReqs data={data} allData={allData} onUpdate={onUpdate} hanleUpdateData={hanleUpdateData} />}
              </div>
            </div>
          </div>
        </div>
      </DashboardContainer>
    </div>
  );
};
