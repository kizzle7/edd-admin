import { useEffect, useState, useRef } from "react";
import { Button } from "../../Components/Button/index";
import {useHistory} from 'react-router-dom'
export const Stats = () => {
  const navigate = useHistory();
  return (
    <div class="row">
      <div class="col-12 col-lg-6">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-12 col-lg-6 mb-4">
              <div class="card stats-boxes">
                <div class="card-body mb-0 pb-0">
                  <div class="stat-label">Total Orders</div>
                  <div className="stat-num">28,345</div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-6 mb-4">
              <div
                class="card stats-boxes"
                style={{ backgroundColor: "#f4fce3" }}
              >
                <div class="card-body mb-0 pb-0">
                  <div class="stat-label" style={{ color: "#5c940d" }}>
                    Total Orders Today
                  </div>
                  <div className="stat-num">28,345</div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-6 mb-4">
              <div class="card stats-boxes">
                <div class="card-body mb-0 pb-0">
                  <div class="stat-label">Vendors</div>
                  <div className="stat-num">28,345</div>
                </div>
              </div>{" "}
            </div>
            <div class="col-12 col-lg-6 mb-4">
              <div class="card stats-boxes">
                <div class="card-body mb-0 pb-0">
                  <div class="stat-label">Customers</div>
                  <div className="stat-num">28,345</div>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6 pr-4">
        <div class="card card-pending-approval">
          <div class="card-body mb-0 pb-0">
            <div class="stat-label text-white">Pending Approvals</div>
            <div class="stat-label text-white pt-2">
              Approve pending request of vendors
            </div>
            <br />
            <div className="mt-1">
              <img
                src="https://res.cloudinary.com/victor-ent/image/upload/v1645355691/Page-1_yjb6xt.svg"
                style={{ width: "50px" }}
              />
            </div>
            <br />
            <div class="mb-3">
              <Button text={"Aprove Vendors"} className="w-50"   onClick={() => navigate.push("/vendors")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
