import { useEffect, useState, useRef } from "react";
import "./index.css";

export const TableHeader = () => {
  return (
    <div>
      <div class="card table-header-bg ">
        <div class="card-body order-height mb-0 pb-0" >
            <div class="d-flex justify-content-between align-items-center">
                <div>Name</div>
                <div>Revenue</div>
                <div>Outstanding Payment</div>
                <div>Status</div>
                <div>Actions</div>
            </div>
            
        </div>
      </div>
    </div>
  );
};
