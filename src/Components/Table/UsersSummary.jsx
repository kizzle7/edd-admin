import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button, Dropdown } from "antd";
import { useHistory } from "react-router-dom";
import Empty from "../../Components/Empty";
import { Badge } from "../../Components/Badge";
export default function UserList({ data, allData, onUpdate, hanleUpdateData }) {
  const [value, setValue] = useState("");
  const history = useHistory();
  const search = (e) => {
    setValue(e.target.value);
    handleSearch(e.target.value);
  };

  const items = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            onUpdate("all");
          }}
        >
          All{" "}
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            onUpdate("female");
          }}
        >
          {" "}
          Female
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          onClick={() => {
            onUpdate("male");
          }}
        >
          Male
        </div>
      ),
    },
  ];

  const handleSearch = (query) => {
    var updatedList = [...allData];
    updatedList = updatedList.filter((item) => {
      return (
        item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.email.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.phone.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.city.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.state.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.gender.toLowerCase().indexOf(query.toLowerCase()) !== -1 
      );
    });
    hanleUpdateData(updatedList);
  };

  const Status = (data) => {
    return <Badge value={data?.status} type={data?.status} />;
  };

  const Usertemp = (data) => {
    return (
      <div className="d-flex justify-content align-items-center">
        <div>
          <img
            width={30}
            style={{ borderRadius: "45px" }}
            height={30}
            src={
              data.profile_image?.url
                ? data.profile_image?.url
                : "https://res.cloudinary.com/dkfauaaqd/image/upload/v1705883046/gyzs29kp6qreb2hk2x0v.png"
            }
          />
        </div>
        <div className="pl-2">{data?.first_name + " " + data.last_name}</div>
      </div>
    );
  };

  const Action = (data) => {
    const viewDetails = (data) => {
      history.push({
        pathname: `/user-details/${data._id}`,
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
    <div className="d-card">
      <div className="d-flex justify-content-end align-items-center">
        <div className="w-50">
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={search}
            value={value}
            className="w-75"
            style={{height:'50px'}}
            placeholder="Search..."
          />
        </div>
        <div className="ml-3">
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>Filter</a>
          </Dropdown>
        </div>
      </div>
      <br />
      {data?.length > 0 ? (
        <DataTable
          value={data}
          tableStyle={{ minWidth: "50rem" }}
          className="table-sizee"
        >
          <Column sortable field="name" header="Name" body={Usertemp} />
          <Column sortable field="email" header="Email Address"></Column>
          <Column sortable field="phone_number" header="Phone Number" />
          <Column sortable field="city" header="City" />
          <Column sortable field="state" header="State" />
          <Column sortable field="dob" header="DOB" />
          <Column sortable field="gender" header="Gender" />
          <Column sortable field="" body={Action} header="Action" />
        </DataTable>
      ) : (
        <Empty type="Events List" />
      )}
    </div>
  );
}
