import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button, Modal, notification } from "antd";
import { useHistory } from "react-router-dom";
import Empty from "../../Components/Empty";
import { Badge } from "../../Components/Badge";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import config from "../../config";
export default function Registrations({
  data,
  allData,
  onOpenDrawer,
  setData,
  getAdmins,
  hanleUpdateData,
}) {
  const [value, setValue] = useState("");
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
        item.state?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.first_name?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.last_name?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.email?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.role?.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    });
    hanleUpdateData(updatedList);
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

  const Action = (data) => {
    return (
      <div className="d-flex align-items-center">
        <Button
          className="bg-success mr-3 text-white"
          onClick={() => {
            onOpenDrawer(true);
            setData(data);
          }}
        >
          Update 
        </Button>
        
      </div>
    );
  };

  return (
    <div className="">
    
      <br />
      {data?.length > 0 ? (
        <DataTable
          value={data}
          tableStyle={{ minWidth: "50rem" }}
          className="table-sizee"
        >
          <Column sortable field="paymentID" header="Payment ID" />
          <Column sortable field="paymentIssues" header="Payment Issues"></Column>
          <Column sortable field="paymentMethod" header="Payment Method"></Column>
          <Column sortable field="paymentIssuedDate" header="Payment Issued DATE" />
          <Column sortable field="paymenStatus" header="Payment Status" />
          <Column sortable field="action" header="Action" body={Action} />
        </DataTable>
      ) : (
        <Empty type=" Payment Record" />
      )}
    </div>
  );
}
