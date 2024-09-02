import { useEffect, useState, useRef } from "react";
import { Input } from "../../Components/Input/index";
import { DashboardContainer } from "../../Components/DashboardContainer/Index";
import BudgetLists from "../../Components/Table/BudgetLists";
import "./index.css";
import axios from "axios";
import config from "../../config";
import { Chart } from "primereact/chart";
import moment from "moment";
import { DatePicker, Space, notification, Select } from "antd";
import { Loader } from "../../Components/Loader";
import { amountFormat } from "../../helperFunction";
import { Drawer } from "antd";
import { Button } from "../../Components/Button/index";
export const Budget = ({ id, tab }) => {
  const [data, setData] = useState([]);
  const [dataFam, setDataFam] = useState([]);
  const [allData, setAllData] = useState([]);
  const [load, setLoad] = useState(false);
  const [loadFam, setLoadFam] = useState(false);
  const [amountSpent, setAmountSpent] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [fam, setFam] = useState("");
  const [amount, setAmount] = useState("");
  const [page, setPage] = useState(1);
  const [updateData, setUpdateData] = useState({});
  const [newFam, setNewFam] = useState(false);
  const [totalItems, setTotalItems] = useState([]);

  const getBudgets = () => {
    setLoad(true);
    axios
      .get(`${config.baseUrl}admin/budgets/all`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoad(false);
        response.data.data.forEach((data, index) => {
          data.date = moment(data.createdAt).format("DD-MMM-YYYY h:mm A");
          data.totalAmount = amountFormat(data.totalAmount, "0", "$");
        });
        setData(response.data.data);
        console.log("response here");
        setAllData(response.data.data);
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
        `${config.baseUrl}admin/budgets/create`,
        {
          name: name,
          totalAmount: amount,
          familyName: fam,
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
        onClose();
        setComment("");
        Notification("success", "Success", "Budget created successfully");
        getBudgets();
      })
      .catch((err) => {
        if (err) {
          Notification("Error", "error", err?.respone?.data?.message);

          setLoad(false);
          console.log(err);
        }
      });
  };

  const updateFam = () => {
    setLoadFam(true);
    axios
      .post(
        `${config.baseUrl}admin/budgets/create`,
        {
          name: name,
          totalAmount: amount,
          familyName: fam,
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
        onClose();
        setComment("");
        Notification("success", "Success", "Budget created successfully");
        getBudgets();
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

  const getFam = () => {
    axios
      .get(`${config.baseUrl}admin/family/all?eventId=${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("response famiy is here");
        console.log(response.data.data);
        setDataFam(
          response?.data?.data?.map((d) => ({
            value: d.name,
            label: d.name,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pagination = (page, pageSize) => {
    console.log(page);
    setPage(page);
    const queryString = `?page=${page}&limit=${pageSize}`;
    getPaged(queryString);
  };

  useEffect(() => {
    getBudgets();
    getFam();
  }, [tab]);

  const handleUpdateData = (data) => {
    setData(data)
  }



  console.log(dataFam);

  return (
    <div>
      <div className="d-flex justify-content-end align-items-center pb-3">
        <Button
          text="Add New Budget +"
          className="bg-success w-25 px-3 text-white"
          onClick={() => {
            setNewFam(true);
            setUpdateData({});
          }}
        />
      </div>
      {load && <Loader />}

      {!load && (
        <BudgetLists
          data={data}
          allData={allData}
          getBudgets={getBudgets}
          setUpdateData={setUpdateData}
          handleUpdateData={handleUpdateData}
        />
      )}

      <Drawer
        title={!updateData?._id ? "Add a New Budget" : "Edit Budget"}
        placement="right"
        onClose={onClose}
        maskClosable={false}
        open={newFam}
      >
        <div>
          <form>
            <div>
              <div className="mb-3">
                <label>Budget Amount</label>
                <Input
                  type="number"
                  className="input-className"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                />
              </div>

              <div className="mb-3">
                <label>Budget Name</label>
                <Input
                  type="text"
                  className="input-className"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="mb-3">
                <label>Select Family </label>
                <Select
                  value={fam}
                  placeholder="Select Family"
                  style={{
                    width: "100%",
                    height: "45px",
                  }}
                  onChange={(value) => {
                    setFam(value);
                  }}
                  options={dataFam}
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
