import { useEffect, useState, useRef } from "react";
import { Input } from "../../Components/Input/index";
import { DashboardContainer } from "../../Components/DashboardContainer/Index";
import ConnTbales from "../../Components/Table/Connections";
import axios from "axios";
import { Chart } from "primereact/chart";
import moment from "moment";
import { DatePicker, Space , notification} from "antd";
import { Loader } from "../../Components/Loader";
import config from '../../config'
import {  Drawer } from "antd";
import { Button } from "../../Components/Button/index";
export const Connection = ({ id, tab }) => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [load, setLoad] = useState(false);
  const [loadFam, setLoadFam] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [page, setPage] = useState(1);
  const [newFam, setNewFam] = useState(false);
  const [totalItems, setTotalItems] = useState([]);

  const getCons = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}admin/team/all`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
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

  const onClose = () => {
    setNewFam(false);
    setName("");
    setComment("");
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
        `${config.baseUrl}admin/family/create`,
        {
          name: name,
          comment: comment,
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
        setName('')
        setNewFam(false)
        setComment('')
        Notification('success','Success','Family created successfully')
        getCons()
      })
      .catch((err) => {
        if(err){

          Notification('Error','error',err?.respone?.data?.message)

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
    getCons();
  }, [tab]);

  const hanleUpdateData = (data) => {
    setData(data)
  }

  console.log(data);

  return (
    <div>
      
      {load && <Loader />}

      {!load && <ConnTbales data={data} allData={allData} getCons={getCons} hanleUpdateData={hanleUpdateData} />}

      <Drawer
        title={"Add a New family"}
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
              <label>Comment</label>
                <Input
                  type="text"
                  className="input-className"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
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
