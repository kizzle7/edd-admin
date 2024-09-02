import { useEffect, useState, useRef } from "react";
import { Button } from "../../Components/Button/index";
export const RevenueStats = () => {
  return (
    <div class="row">
      <div class="col-12 col-md-4">
        <div
          class="card"
          style={{ backgroundColor: "#171846", height: "180px" }}
        >
          <div class="card-body mb-0 pb-0 text-center pt-4">
            <div class="h6 stat-label text-white">Total Revenue</div>
            <div
              className="pt-3 stat-label text-white font-weight-bold"
              style={{ fontSize: "23px" }}
            >
              <i class="fa fa-chevron-down"></i>
            </div>

            <div
              className="pt-3 stat-label text-white font-weight-bold"
              style={{ fontSize: "23px" }}
            >
              135,000,000.00
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8">
        <div class="col-md-12">
          <div
            class="card"
            style={{ backgroundColor: "#fff", color: "red", height: "180px" }}
          >
            <div class="revenue-card">
              <div class="d-flex justify-content align-items-center">
                <div className="stat-label" style={{ width: "50%" }}>
                  <div class=" mb-0 pb-0 text-center">
                    <div class="h6 stat-label">Outstanding payment</div>
                    <div
                      className="pt-3 stat-label font-weight-bold"
                      style={{ fontSize: "23px" }}
                    >
                      <i class="fa fa-chevron-down"></i>
                    </div>

                    <div
                      className="pt-3 stat-label font-weight-bold"
                      style={{ fontSize: "23px" }}
                    >
                      135,000,000.00
                    </div>
                  </div>
                </div>

                <div className="revenue-line ml-5"></div>
                <div className="stat-label" style={{ width: "50%" }}>
                  <div class=" mb-0 pb-0 text-center">
                    <div class="h6 stat-label">Cash On delivery</div>
                    <div
                      className="pt-3 stat-label font-weight-bold"
                      style={{ fontSize: "23px" }}
                    >
                      <i class="fa fa-chevron-down"></i>
                    </div>

                    <div
                      className="pt-3 stat-label font-weight-bold"
                      style={{ fontSize: "23px" }}
                    >
                      135,000,000.00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
