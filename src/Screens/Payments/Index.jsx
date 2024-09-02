import { useEffect, useState, useRef } from "react";
import { Input } from "../../Components/Input/index";
import { DashboardContainer } from "../../Components/DashboardContainer/Index";
import PaymentsTable from "../../Components/Table/Payments";
import axios from "axios";
import config from "../../config";
import { Chart } from "primereact/chart";
import { DatePicker, Space } from "antd";
import { Bars } from "react-loader-spinner";
import { Loader } from "../../Components/Loader";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import moment from "moment";
export const Payments = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [maleResp, setMaleResp] = useState([]);
  const [femaleResp, setFemaleResp] = useState([]);
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("event");
  const [totalItems, setTotalItems] = useState([]);

  const getpayments = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}/admin/orders`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoad(false);
        response.data.orders?.forEach((data, index) => {
          data.date = moment(data.date).format("DD-MMM-YYYY h:mm A");
          data.amount = data.totalAmt ? '$' + (data?.totalAmt)?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") : 0;
        });

        setData(response.data.orders);
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
      .get(
        `${config.baseUrl}/admin/payments/all?payment_type=${type}?${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
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
    const queryString = `page=${page}&limit=${pageSize}`;
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

  useEffect(() => {
    getpayments();
  }, []);

  return (
    <div>
      <DashboardContainer pageTitle="">
        <div className="row">
          <div className="col-md-12">
            <div className="card py-4 px-4 " style={{ height: "100%" }}>
              <div className="lead-dl">Customer Orders</div>

              <div className="">
                {load && <Loader />}

                {!load && (
                  <div>
                    <PaymentsTable
                      data={data}
                      allData={allData}
                      getpaymentss={getpayments}
                      onUpdate={onUpdate}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DashboardContainer>
    </div>
  );
};
