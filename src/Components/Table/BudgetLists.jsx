import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import config from "../../config";
import { Button } from "antd";
import { Input } from "../Input";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Select, Drawer, Space, notification, Modal } from "antd";
import Empty from "../../Components/Empty";
import moment from "moment";
import { Badge } from "../../Components/Badge";
import "./index.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { amountFormat } from "../../helperFunction";
const { Option } = Select;
export default function BudgetLists({
  data,
  allData,
  getBudgets,
  setUpdateData,
  handleUpdateData,
}) {
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [load, setLoad] = useState(false);
  const [chooseFamily, setChooseFamily] = useState("");
  const [userLists, setUserLists] = useState([]);
  const [ID, setID] = useState("");
  const [leadersSeleccted, setLeadersSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openBudgetItem, setopenBudgetItem] = useState(false);
  const [openBudgetInfo, setopenBudgetInfo] = useState([]);
  const history = useHistory();
  const search = (e) => {
    setValue(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSearch = (query) => {
    var updatedList = [...allData];
    updatedList = updatedList.filter((item) => {
      return (
        item.name?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.familyName?.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    });
    handleUpdateData(updatedList);
  };

  const addLeaders = () => {
    if (leadersSeleccted?.length > 0) setLoad(true);
    axios
      .post(
        `${config.baseUrl}admin/family/${chooseFamily}`,
        {
          leaders: leadersSeleccted,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setLoad(false);
        if (response.status === 200) {
          setLoad(false);
          setOpen(false);
          setLeadersSelected([]);
          Notification(
            "success",
            "Success",
            "Budget record removed successfully"
          );
          getBudgets();
        }
      })
      .catch((err) => {
        if (err) {
          setLoad(false);
          Notification("error", "Error", err?.response?.data?.message);
          console.log(err);
        }
      });
  };

  const Notification = (type, msgType, msg) => {
    notification[type]({
      message: msgType,
      description: msg,
    });
  };

  const closeView = () => {
    setOpenView(false);
  };

  const getUsers = () => {
    axios
      .get(`${config.baseUrl}admin/users/all`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUserLists(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClose = () => {
    setOpen(false);
    setLeadersSelected([]);
  };
  const handleChange = (value) => {
    setLeadersSelected(value);
  };

  const Status = (data) => {
    return <Badge value={data?.status} type={data?.status} />;
  };

  const remove = (id, type) => {
    axios
      .delete(
        `${config.baseUrl}admin/budgets/remove_item`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
        {
          budgetId: ID,
          budgetItemId: id,
          type: type,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          Notification("success", "Success", "Budget removed successfully");
          getBudgets();
        }
      })
      .catch((err) => {
        Notification("error", "Error", err?.response?.data?.message);
        console.log(err);
      });
  };

  const onRemmove = (id, type) => {
    Modal.confirm({
      title: `Are you sure want to delete this budget record ?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        remove(id, type);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const Eventemp = (data) => {
    return (
      <div className="d-flex justify-content align-items-center">
        <div>
          <img
            width={30}
            style={{ borderRadius: "50%" }}
            src={
              data.image?.url
                ? data.image?.url
                : "https://res.cloudinary.com/dkfauaaqd/image/upload/v1705883046/gyzs29kp6qreb2hk2x0v.png"
            }
          />
        </div>
        <div className="pl-2">{data?.title}</div>
      </div>
    );
  };

  const addItem = () => {
    setLoad(true);
    axios
      .put(
        `${config.baseUrl}admin/budgets/add_item/${ID}`,
        {
          name: name,
          amount: amount,
          type: type,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setLoad(false);
        setName("");
        onClose();
        setopenBudgetItem(false);
        getBudgets();
        Notification("success", "Success", "Budget item added successfully");
        getBudgets();
      })
      .catch((err) => {
        setLoad(false);
        if (err) {
          Notification("Error", "error", err?.respone?.data?.message);
          console.log(err);
        }
      });
  };

  const Action = (data) => {
    const onViewFamily = (data) => {
      history.push({
        pathname: `/event-families/${data._id}`,
        state: data,
      });
    };

    const onViewBudget = () => {
      setOpenView(true);
      setID(data._id);
      setopenBudgetInfo(data.budgetItems);
    };

    const onEdit = () => {
      setUpdateData(data);
      setID(data._id);
      setopenBudgetItem(true);
    };

    const closeItem = () => {
      setopenBudgetItem(false);
    };

    const onAddLeaders = () => {
      setOpenView(true);
      setChooseFamily(data._id);
    };
    return (
      <div className="d-flex align-items-center">
        <Button className="bg-info mr-2 text-white" onClick={onViewBudget}>
          <i className="fa fa-eye pr-2"></i> View Budget
        </Button>
        <Button className="bg-success mr-2 text-white" onClick={onEdit}>
          Add Budget Item +
        </Button>
      </div>
    );
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="d-card">
      <div className="d-flex justify-content-end align-items-center">
        <div className="w-50">
          <input
            type="texxt"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={search}
            value={value}
            placeholder="Search..."
          />
        </div>
      </div>
      <br />
      {data?.length > 0 ? (
        <DataTable
          value={data}
          tableStyle={{ minWidth: "50rem" }}
          className="table-sizee"
        >
          <Column sortable field="date" header="Created On" />
          <Column sortable field="name" header="Budget Name"></Column>
          <Column sortable field="familyName" header="Family" />
          <Column sortable field="totalAmount" header="Total Amount Budgeted" />
          <Column sortable field="totalSpent" header="Total Spent" />

          <Column sortable field="" body={Action} header="Action" />
        </DataTable>
      ) : (
        <Empty type="Budget" />
      )}

      <Drawer
        title={"View Budget Items"}
        placement="right"
        onClose={closeView}
        maskClosable={false}
        open={openView}
      >
        <div>
          {openBudgetInfo?.length > 0 ? (
            <form>
              {openBudgetInfo?.map((d) => {
                return (
                  <div className="bdd-hr">
                    <div>
                      <div className="font-weight-">
                        Date :{" "}
                        {moment(data.createdAt).format("DD-MMM-YYYY h:mm A")}
                      </div>
                      <div></div>
                    </div>
                    <div>
                      <div className="font-weight-">Name : {d?.name}</div>
                      <div></div>
                    </div>
                    <div>
                      <div className="font-weight-">
                        Amount : {amountFormat(d.amount, "0", "$")}{" "}
                      </div>
                      <div></div>
                    </div>
                    <div>
                      <div className="font-weight-">Type: </div>
                      <div>{d?.type}</div>
                    </div>
                    <br />
                    <div>
                      <Button
                        className="bg-danger text-white"
                        onClick={onRemmove.bind(this, d?._id, d?.type)}
                      >
                        <i className="fa fa-eye pr-2"></i> Remove item
                      </Button>
                    </div>
                  </div>
                );
              })}
            </form>
          ) : (
            <div className="d-flex justify-content-center align-items-center h-100">
              <p>No budget items</p>
            </div>
          )}
        </div>
      </Drawer>

      <Drawer
        title={"Add Budget Items"}
        placement="right"
        onClose={() => {
          setopenBudgetItem(false);
        }}
        maskClosable={false}
        open={openBudgetItem}
      >
        <div>
          <div className="mb-3">
            <label>Item Name</label>
            <Input
              type="text"
              className="input-className"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="mb-3">
            <label>Item Amount</label>
            <Input
              type="number"
              className="input-className"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
          </div>
          <div className="mb-3">
            <label>Item Type</label>
            <Select
              value={type}
              placeholder="Select Type"
              style={{
                width: "100%",
                height: "45px",
              }}
              onChange={(value) => {
                setType(value);
              }}
              options={[
                {
                  value: "add",
                  label: "Add",
                },
                {
                  value: "spent",
                  label: "Spent",
                },
              ]}
            />
          </div>
          <br />
          <div className="w-100">
            <Button
              text="Submit"
              className="bg-info w-100 text-white"
              loading={load}
              onClick={addItem}
            >
              Submit
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
