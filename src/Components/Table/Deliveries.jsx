import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button, notification, Modal, Drawer } from "antd";
import { useHistory } from "react-router-dom";
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
  const [deliverInfo,setDeliverInfo] = useState({})
  const history = useHistory();
  const search = (e) => {
    setValue(e.target.value);
    handleSearch(e.target.value);
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

    const onOpen = () => {
      setOpenView(true);
      setOpenItems(data.orders);
      setDeliverInfo(data?.deliveryInfo)
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
                          <div className="font-weight-">Name : {d?.name} / <b>@unit price of ${(d?.unitPrice)?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</b></div>
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
        <div></div>
      </Drawer>
    </div>
  );
}
