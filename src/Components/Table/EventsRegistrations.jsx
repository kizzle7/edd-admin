import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Column } from "primereact/column";
import { Button, Modal, notification } from "antd";
import { useHistory } from "react-router-dom";
import Empty from "../../Components/Empty";
import axios from "axios";
import config from "../../config";
import { Badge } from "../../Components/Badge";
export default function Registrations({
  data,
  allData,
  getRegs,
  handleUpdateData,
}) {
  const [value, setValue] = useState("");
  const [load, setLoad] = useState(false);
  const [id,setId] = useState('')
  const [checkInmodal, setCheckIn] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  const history = useHistory();
  const search = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSearch = (query) => {
    var updatedList = [...allData];
    updatedList = updatedList.filter((item) => {
      return (
        item.location?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.first_name?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.last_name?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.state?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.source?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.dietary_restrictions
          ?.toLowerCase()
          .indexOf(query.toLowerCase()) !== -1
      );
    });
    handleUpdateData(updatedList);
  };

    const confirmActionCheckin = () => {
      Modal.confirm({
        title: `Are you sure want to confirm this user for check in ?`,
        icon: <ExclamationCircleOutlined />,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          setLoad(true);
          axios.post(
                      `${config.baseUrl}tickets/check_in/${id}`,
                      {},
                      {
                        headers: {
                          Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                          )}`,
                        },
                      }
                    )
                    .then((res) => {
                      setLoad(false);
                      if (res.status === 200) {
                        setCheck1(true);
                        setCheckIn(false);
                        getRegs();
                        Notification(
                          "success",
                          "Success",
                          "Registration checked in Successfully"
                        );
                      }
                    })
                    .catch((err) => {
                      setLoad(false);
                      Notification(
                        "error",
                        "Error",
                        err?.response?.data?.message
                      );
                    });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    };


  const Notification = (type, msgType, msg) => {
    notification[type]({
      message: msgType,
      description: msg,
    });
  };


  const Status = (data) => {
    return <Badge value={data?.status} type={data?.status} />;
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

  const handleCancel = () => setCheckIn(false);

  const Action = (data) => {
    setId(data?._id)
    const viewDetails = (data) => {
      history.push({
        pathname: `/event-details/${data._id}`,
        state: data,
      });
    };

    const confirmActionPay = () => {
      Modal.confirm({
        title: `Are you sure want to confirm this payment ?`,
        icon: <ExclamationCircleOutlined />,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          confirmPay();
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    };

    const confirmPay = () => {
      setLoad(true);
      axios
        .put(
          `${config.baseUrl}admin/payments/accept/${data._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setLoad(false);
          if (res.status === 200) {
            console.log("i got here");
            getRegs();
            Notification(
              "success",
              "Success",
              "Payment Confirmed Successfully"
            );
          }
        })
        .catch((err) => {
          setLoad(false);
          Notification("error", "Error", err?.response?.data?.message);
        });
    };

    const Notification = (type, msgType, msg) => {
      notification[type]({
        message: msgType,
        description: msg,
      });
    };

    return (
      <>
        {data?.payment_status !== "PAID" && (
          <Button
            className="bg-info w-100 text-white"
            onClick={confirmActionPay}
          >
            Confirm Payment
          </Button>
        )}
        {data?.payment_status === "PAID" && !data?.isCheckedIn  && (
          <Button
            className="bg-success w-100 text-white"
            onClick={() => {
              setCheckIn(true);
            }}
          >
            Check IN
          </Button>
        )}
      </>
    );
  };

  return (
    <div className="d-card">
      <div className="d-flex justify-content-end align-items-center">
        <div className="w-50">
          <input
            type="text"
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
          <Column sortable field="date" header="Date " />
          <Column sortable field="name" header="Name"></Column>
          <Column sortable field="amount" header="Amount" />
          <Column sortable field="location" header="Location" />

          <Column sortable field="source" header="Source" />
          <Column sortable field="state" header="State" />
          <Column sortable field="t_shirt_size" header="T-shirt size" />
          <Column
            sortable
            field="dietary_restrictions"
            header="Diet Restrictions"
          />
          <Column sortable field="number_of_tickets" header="Tickets" />
          <Column
            sortable
            field="number_of_tickets"
            header="Action"
            body={Action}
          />
        </DataTable>
      ) : (
        <Empty type="Events List" />
      )}

      <Modal
        title="Checkin User"
        open={checkInmodal}
        footer={false}
        maskClosable={false}
        onCancel={handleCancel}
      >
        <div className="container">
          <br />
          {load &&
          <div className="text-center">Cheking in...</div>}
          <br />
          <div class="form-check mb-3">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              onChange={(e) => {
                if (e.target.checked) {
                  confirmActionCheckin()
                } else {
                  setCheck1(false);
                }
              }}
              id="flexCheckDefault1"
              checked={check1}
            />
            <label class="form-check-label" for="flexCheckDefault1">
              Click to check in user for event registration
            </label>
          </div>
      
          <br />
          
        </div>
        <br />
      </Modal>
    </div>
  );
}
