import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button, Modal, notification } from "antd";
import { useHistory } from "react-router-dom";
import Empty from "../../Components/Empty";
import { Badge } from "../../Components/Badge";
import axios from "axios";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import config from "../../config";
export default function Registrations({
  data,
  allData,
  getRegs,
  handleUpdateData,
}) {
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [load, setLoad] = useState(false);
  const [checkModal, setCheckModal] = useState(false);
  const [check1, setCheck1] = useState(false);

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
        item.firstName?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.lastName?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.hallname?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.state?.toLowerCase().indexOf(query.toLowerCase()) !== -1 
      );
    });
    handleUpdateData(updatedList);
  };

    const confirmActionCheckin = () => {
      Modal.confirm({
        title: `Are you sure want to confirm accomodation checkin for this user ?`,
        icon: <ExclamationCircleOutlined />,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
         setLoad(true);
                  axios
                    .post(
                      `${config.baseUrl}accomodation/reservation/check_in/${id}`,
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
                        setCheckModal(false);
                        getRegs();
                        Notification(
                          "success",
                          "Success",
                          "Accomodation checked in Successfully"
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

  const Notification = (type, msgType, msg) => {
    notification[type]({
      message: msgType,
      description: msg,
    });
  };

  const handleCancel = () => {
    setCheckModal(false);
  };

  const Action = (data) => {
    setId(data?._id);
    const viewDetails = (data) => {
      history.push({
        pathname: `/event-details/${data._id}`,
        state: data,
      });
    };

    return (
      <div>
        {!data?.isCheckedIn && (
          <Button
            className="bg-primary text-white"
            onClick={() => {
              setCheckModal(true);
            }}
          >
            <i className="fa fa-eye pr-2"></i> Check In
          </Button>
        )}
      </div>
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
          <Column sortable field="firstName" header="First Name " />
          <Column sortable field="lastName" header="Last Name"></Column>
          <Column sortable field="bedNumber" header="Bed Number" />
          <Column sortable field="state" header="State" />
                      <Column sortable field="hallname" header="Hall Name" />

             
          <Column sortable field="action" header="Action" body={Action} />
        </DataTable>
      ) : (
        <Empty type="Hostel Reservations" />
      )}

      <Modal
        title="Checkin User FOR Accomodation"
        open={checkModal}
        footer={false}
        maskClosable={false}
        onCancel={handleCancel}
      >
        <div className="container">
          <br />
          {load && <div className='text-center'>Checking User IN... </div>}

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
              id="flexCheckDefault2"
              checked={check1}
            />
            <label class="form-check-label" for="flexCheckDefault2">
              Click to Check In user for Accomodation
            </label>
          </div>
        </div>
        <br />
      </Modal>
    </div>
  );
}
