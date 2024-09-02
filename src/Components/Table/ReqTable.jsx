import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button , Dropdown} from "antd";
import { useHistory } from "react-router-dom";
import Empty from "../../Components/Empty";
import { Badge } from "../../Components/Badge";
export default function Registrations({ data, allData,onUpdate, handleUpdateData }) {
  const [value, setValue] = useState("");
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
        item.recipient_name?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.request?.toLowerCase().indexOf(query.toLowerCase()) !== -1 || 
        item.team?.toLowerCase().indexOf(query.toLowerCase()) !== -1


      );
    });
    handleUpdateData(updatedList);
  };

  const items = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            onUpdate(true);
          }}
        >
          Read Event Request
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            onUpdate(false);
          }}
        >
          {" "}
          Unread Event Request
        </div>
      ),
    },
    
  ]

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
    const viewReq = () => {
      history.push({
        pathname: `/event-request-details/${data._id}`,
        state: data,
      });
    };
    return (
      <div className="d-flex justify-content-between align-jtems-center">
        <Button
          className="bg-success text-white"
          onClick={viewReq.bind(this, data)}
        >
          <i className="fa fa-eye pr-2"></i> View Request
        </Button>
      
      </div>
    );
  };

  return (
    <div className="d-card">
      {/* <div className="d-flex justify-content-end align-items-center">
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
      </div> */}
       <div className="d-flex justify-content-end align-items-center">
        <Dropdown
          menu={{
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Button>Filter Request</Button>
          </a>
        </Dropdown>
      </div>
      
      <br />
      {data?.length > 0 ? (
        <DataTable
          value={data}
          tableStyle={{ minWidth: "50rem" }}
          className="table-sizee"
        >
          <Column sortable field="date" header="Date Reequested " />
          <Column sortable field="name" header=" Name"></Column>
          <Column sortable field="recipient_name" header="Receipient Name" />
          <Column sortable field="request" header="Request" />
          <Column sortable field="team" header="Team" />
          <Column sortable field="acttion" header="Action" body={Action} />

        </DataTable>
      ) : (
        <Empty type="Event Request" />
      )}
    </div>
  );
}
