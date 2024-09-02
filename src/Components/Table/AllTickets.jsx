import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import Empty from "../../Components/Empty";
import { Badge } from "../../Components/Badge";
export default function Registrations({ data, allData, hanleUpdateData }) {
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
    const viewDetails = (data) => {
      history.push({
        pathname: `/event-details/${data._id}`,
        state: data,
      });
    };
    return (
      <Button
        className="bg-primary text-white"
        onClick={viewDetails.bind(this, data)}
      >
        <i className="fa fa-eye pr-2"></i> View Details
      </Button>
    );
  };

  return (
    <div className="">
      <div className="d-flex justify-content-end align-items-center">
        <div className="w-50">
          <input
            type="email"
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
        </DataTable>
      ) : (
        <Empty type="Events List" />
      )}
    </div>
  );
}
