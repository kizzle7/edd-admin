import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button, notification, Modal, Drawer, Select } from "antd";
import { useHistory } from "react-router-dom";
import { Input } from "../Input";
import Empty from "../../Components/Empty";
import { Badge } from "../../Components/Badge";
import axios from "axios";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import config from "../../config";

export default function Registrations({
  data,
  allData,
  getPaymentss,
  hanleUpdateData,
}) {
  const [value, setValue] = useState("");
  const [load, setLoad] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openItems, setOpenItems] = useState([]);
  const [deliveryTrack, setDeliveryTrack] = useState({});
  const [deliverInfo, setDeliverInfo] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [orderID, setOrderId] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [time, setTime] = useState("");
  const history = useHistory();
  const search = (e) => {
    setValue(e.target.value);
    handleSearch(e.target.value);
  };

  const Notification = (type, msgType, msg) => {
    notification[type]({
      message: msgType,
      description: msg,
    });
  };

  const onUpdate = () => {
    const data = {
      name: name,
      location: location,
      status: status,
      time: time,
    };
    if (time && status && name && location) {
      setLoad(true);
      axios
        .put(`${config.baseUrl}/admin/deliveries/${orderID}`, data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setLoad(false);
          setOpenView(false)
          setOpenModal(false)
          getPaymentss()
          Notification("success", "Success", "Updated Successfully");

        })
        .catch((err) => {
          setLoad(false);
          console.log(err);
        });
    } else {
      Notification("error", "Error", "Fields are all required");
    }
  };

  const closeView = () => {
    setOpenView(false);
  };

  const handleSearch = (query) => {
    var updatedList = [...allData];
    updatedList = updatedList.filter((item) => {
      return (
        item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.creator.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    });
    hanleUpdateData(updatedList);
  };

  const Status = (data) => {
    return <Badge value={data?.order_status} type={data?.order_status} />;
  };

  const Status2 = (data) => {
    return <Badge value={data?.payment_status} type={data?.payment_status} />;
  };

  const Action = (data) => {
    const viewUUser = () => {
      history.push({
        pathname: `/user-details/${data.user}`,
        state: data,
      });
    };

    const Notification = (type, msgType, msg) => {
      notification[type]({
        message: msgType,
        description: msg,
      });
    };

    const getTracks = (id) => {
      setLoad(true);
      axios
        .get(`${config.baseUrl}/admin/deliveries/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setLoad(false);
          setDeliveryTrack(response.data.delivery);
        })
        .catch((err) => {
          setLoad(false);
          console.log(err);
        });
    };

    const onOpen = () => {
      setOpenView(true);
      setOpenItems(data.orders);
      setDeliverInfo(data?.deliveryInfo);
      getTracks(data?._id);
      setOrderId(data?._id)
    };

    return (
      <div className="d-flex  align-items-center">
        <Button className="bg-success text-white" onClick={onOpen}>
          <i className="fa fa-eye pr-2"></i> View Order
        </Button>
      </div>
    );
  };

  return (
    <div className="">
      <div className="d-flex justify-content-end align-items-center"></div>
      <br />
      {data?.length > 0 ? (
        <DataTable
          value={data}
          tableStyle={{ minWidth: "30rem" }}
          className="table-sizee"
        >
          <Column sortable field="date" header="Date " />
          <Column sortable field="ref" header="Order Reference " />
          <Column sortable field="amount" header="Total Amount" />
          <Column sortable field="user_email" header="Customer"></Column>
          <Column
            sortable
            field="order_status"
            header="Order Status"
            body={Status}
          ></Column>
          <Column
            sortable
            field="payment_status"
            header="Payment Status"
            body={Status2}
          ></Column>
          <Column sortable field="action" header="Action" body={Action} />
        </DataTable>
      ) : (
        <Empty type="Orders" />
      )}

      <Drawer
        title={"View Order Items"}
        placement="right"
        onClose={closeView}
        maskClosable={false}
        open={openView}
        width={"50%"}
      >
        <div>
          {openItems?.length > 0 ? (
            <form>
              <div>
                <h4>Items</h4>
              </div>
              {openItems?.map((d, i) => {
                return (
                  <div className="bdd-hr ">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div>Item {i + 1}</div>
                        <div className="pt-3">
                          <div className="font-weight-">
                            Name : {d?.name} /{" "}
                            <b>
                              @unit price of $
                              {d?.unitPrice
                                ?.toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                            </b>
                          </div>
                          <div></div>
                        </div>
                        <div>
                          <div className="font-weight-">
                            KG Requested : {d?.selctedMoq} KG
                          </div>
                          <div></div>
                        </div>
                        <div>
                          <div className="font-weight-">
                            Quantity Requested: {d?.qty}
                          </div>
                          <div></div>
                        </div>
                        <br />
                      </div>
                      <div>
                        <img src={d?.image} className="w-100" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </form>
          ) : (
            <div className="d-flex justify-content-center align-items-center h-100">
              <p>No Order items</p>
            </div>
          )}
        </div>
        <hr />
        <div>
          <h4>Delivery Informations</h4>
          <br />
          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>Contact Phone Number</div>
              <div>{deliverInfo?.phone}</div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>Address</div>
              <div>{deliverInfo?.address}</div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>Postal Code</div>
              <div>{deliverInfo?.code}</div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>City</div>
              <div>{deliverInfo?.city}</div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>State</div>
              <div>{deliverInfo?.state}</div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>Country</div>
              <div>{deliverInfo?.country}</div>
            </div>
          </div>
        </div>
        <hr />
        {load && (
          <div className="text-center">
            <p>Loading Delivery Tracking...</p>
          </div>
        )}
        {!load && (
          <div>
            <div className="d-flex align-items-center justify-content-between">
              <h4>Delivery Tracking</h4>
              <Button
                className="bg-success text-white"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                <i className="fa fa-eye pr-2"></i> Update Delivery
              </Button>
            </div>
            <br />
            <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>Current Delivery Status</div>
                <div>
                  <Badge
                    value={deliveryTrack?.delivery_status}
                    type={deliveryTrack?.delivery_status}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>Current Location</div>
                <div>
                  {deliveryTrack?.currentLocation
                    ? deliveryTrack?.currentLocation
                    : "NA"}
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>Expected Time of Delivery</div>
                <div>
                  {deliveryTrack?.timeDelivery
                    ? deliveryTrack?.timeDelivery
                    : "NA"}
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>Rider Name</div>
                <div>
                  {deliveryTrack?.riderName ? deliveryTrack?.riderName : "NA"}
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      <Modal
        title="Update Delivey"
        open={openModal}
        footer={null}
        onCancel={() => {
          setOpenModal(false);
          setLocation("");
          setName("");
          setTime("");
          setStatus("");
        }}
      >
        <form className="py-4">
          <div className="mb-3">
            <label>Epected Time of Delivery</label>
            <Input
              type="text"
              className="input-className"
              onChange={(e) => setTime(e.target.value)}
              value={time}
            />
          </div>

          <div className="mb-3">
            <label>Current Location</label>
            <Input
              type="text"
              className="input-className"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            />
          </div>
          <div className="mb-3">
            <label>Rider Name</label>
            <Input
              type="text"
              className="input-className"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="mb-3">
            <label>Status</label>
            <Select
              value={status}
              placeholder="Select Status"
              style={{
                width: "100%",
                height: "45px",
              }}
              onChange={(value) => {
                setStatus(value);
              }}
              options={[
                { value: "PENDING", label: "PENDING" },
                { value: "DELIVERED", label: "DELIVERED" },
                { value: "TRANSIT", label: "TRANSIT" },
                { value: "STOCKED", label: "STOCKED" },
                { value: "AIRBOURNE", label: "AIRBOURNE" },
                { value: "LOADED", label: "LOADED" },
              ]}
            />
          </div>
          <br />
          <Button className="bg-success text-white" onClick={onUpdate}>
            {load ? 'Updating' : 'Update'}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
