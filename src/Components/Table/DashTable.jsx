import { useEffect, useState, useRef } from "react";
import "./index.css";
import moment from "moment";
import Empty from "../../Components/Empty";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
export const TableHeader = ({ data }) => {
  return (
    <div style={{ overflowX: "auto" }}>
      {data.length > 0 ? (
       <DataTable
       value={data}
       tableStyle={{ minWidth: "50rem" }}
       className="table-sizee"
     >
       <Column sortable field="firstName" header="First Name"  />
       <Column sortable field="lastName" header="Last Name"></Column>
       <Column sortable field="emailAddress" header="Email Address"></Column>
       <Column sortable field="phone" header="Phone Number" />
       
     </DataTable>
      ) : (
        <Empty type="Users List" />
      )}
    </div>
  );
};
export default TableHeader;
