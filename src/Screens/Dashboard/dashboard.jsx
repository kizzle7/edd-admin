import { useEffect, useState, useRef } from "react";
import { Input } from "../../Components/Input/index";
import { DashboardContainer } from "../../Components/DashboardContainer/Index";
import DashTable from "../../Components/Table/DashTable";
import "./index.css";
import axios from "axios";
import config from "../../config";
import { Loader } from "../../Components/Loader";
import Barchart from "./Chart/Barchart";
import { useHistory } from "react-router-dom";
import Linechart from "./Chart/LineChart";
import { DatePicker, Space, Button } from "antd";
export const Dashboard = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const history = useHistory();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState([]);
  const [maleData, setMaleData] = useState([]);
  const [femaleDate, setFemaleData] = useState([]);
  const [usersLenght, setUsersLenght] = useState(0);
  const [stats, setStats] = useState([]);
  const [stat, setStat] = useState({});
  const [userCount, setUserCount] = useState(0)
  const [orderCount, setOrderCount] = useState(0)
  const [prodCount, setProdCount] = useState(0)
  const [adminCount, setAdminCount] = useState(0)

  const [ySide, setySide] = useState([]);
  const [xSide, setxSide] = useState([]);

  let xAxis = [];
  let yAxis = [];

  const getUser = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}/users`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoad(false);
        // response.data.data.forEach((data, index) => {
        //   data.dob = moment(data.date_of_birth).format("DD-MMM ");
        //   data.name = data.name;
        // });

        setData(response.data.users?.slice(0,5));
        // setTotalItems(response.data.meta.totalPages * 10);
      })
      .catch((err) => {
        setLoad(false);
        console.log(err);
      });
  };

  const getUsers = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}/admin/stats`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response)
        setUserCount(response?.data?.allCounts?.docCount)
        setOrderCount(response?.data?.allCounts?.orderdocCount)
        setProdCount(response?.data?.allCounts?.proddocCount)
        setAdminCount(response?.data?.allCounts?.admindocCount)

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
      .get(`${config.baseUrl}/api/v1/admin/traderx-users/all?${queryString}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
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

  const getStatsNuumber = () => {
    axios
      .get(`${config.baseUrl}admin/dashboard/stats`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setStat(response.data.data);
        }
      })
      .catch((err) => {
        if (err) {
        }
      });
  };

  const getStats = () => {
    axios
      .get(`${config.baseUrl}admin/dashboard/charts`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        var arr = [];
        if (response.status === 200) {
          response?.data?.data?.ticketData?.map((d) => {
            xSide?.push(d.title);
          });
          response?.data?.data?.ticketData?.map((d) => {
            arr.push(d?.tickets)
            ySide?.push(d.tickets);
          });
          response?.data?.data?.ticketData?.map((d) => {
            stats?.push({
              label: d.title,
              fill: true,
              backgroundColor: "#6540D6",
              data: arr,
              radius: 5,
              borderRadius: 3,
              pointBorderWidth: 5,
              tension: 0.4,
            });
          });
          console.log(arr)
        }
      })
      .catch((err) => {
        if (err) {
        }
      });
  };

  useEffect(() => {
    getStats();
    getUser()
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  console.log(ySide);
  console.log(stats)

  return (
    <div>
      <DashboardContainer pageTitle="">
        <div className="row">
          <div className="col-md-3">
            <div className="border-metrics">
              <div className="px-2">
                <div className="lead-metric">TOTAL USER</div>
                <div className="pt-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="metric-count">
                      {userCount}{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="border-metrics">
              <div className="px-2">
                <div className="lead-metric">No of Orders</div>
                <div className="pt-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="metric-count">
                      {orderCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="border-metrics">
              <div className="px-2">
                <div className="lead-metric">Products</div>
                <div className="pt-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="metric-count">
                      {prodCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="border-metrics">
              <div className="px-2">
                <div className="lead-metric">TOTAL Admins</div>
                <div className="pt-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="metric-count">
                      {adminCount}{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <div className="card py-4 px-4">
              <div className="d-flex justify-content-between align-items-center">
              <div className="lead-dl">Users</div>

                <Button
                  onClick={() => {
                    history.push("/users");
                  }}
                >
                  View More
                </Button>
              </div>
              <div className="py-3">
                {load && <Loader />}

                {!load  && <DashTable data={data} />}
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <div className="card py-4 px-4">
                  <Barchart data={stats} label={xSide} y={ySide} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="card py-4 px-4">
                  <Linechart data={stats} label={xSide} y={ySide} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardContainer>
    </div>
  );
};
