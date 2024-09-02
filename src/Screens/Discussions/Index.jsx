import { useEffect, useState, useRef } from "react";
import { Input } from "../../Components/Input/index";
import { DashboardContainer } from "../../Components/DashboardContainer/Index";
import Discussion from "../../Components/Table/Discussions";
import axios from "axios";
import config from "../../config";
import { Chart } from "primereact/chart";
import { DatePicker, Space } from "antd";
import { Bars } from "react-loader-spinner";
import { Loader } from "../../Components/Loader";
import moment from "moment";
export const Discussions = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [maleResp, setMaleResp] = useState([]);
  const [femaleResp, setFemaleResp] = useState([]);
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState([]);

  const getDiscussions = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}discussion/all`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoad(false);
        response.data.data.forEach((data, index) => {
          data.date = moment(data.createdAt).format("DD-MMM-YYYY h:mm A");
          data.author =
            data?.author?.first_name + " " + data?.author?.last_name;
        });

        setData(response.data.data);
        setAllData(response.data.data);
        setTotalItems(response.data.meta.totalPages * 10);
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

  const hanleUpdateData = (data) => {
    setData(data);
  };

  useEffect(() => {
    getDiscussions();
  }, []);

  return (
    <div>
      <DashboardContainer pageTitle="">
        <div className="row">
          <div className="col-md-12">
            <div className="card py-4 px-4 " style={{ height: "100vh" }}>
              <div className="lead-dl">Discussions</div>

              <div className="">
                {load && <Loader />}

                {!load && data.length > 0 && (
                  <Discussion
                    data={data}
                    allData={allData}
                    getDiscussions={getDiscussions}
                    onUpdate={onUpdate}
                    hanleUpdateData={hanleUpdateData}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </DashboardContainer>
    </div>
  );
};
