import { useEffect, useState, useRef } from "react";
export const CurrentOrders = () => {
  return (
    <div>
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <span class="h2-primary">Current </span>{" "}
          <span class="lite">Orders</span>
        </div>
        <div class="d-flex justify-content-between align-items-center pt-4">
          <p class="pr-3 ">Sort By</p>
          <p style={{ fontWeight: "600", color: "#111111" }}>
            Newest <i class="fa fa-chevron-down"></i>
          </p>
        </div>
      </div>
      <br />
      <div class="orders-lists">
        <div class="card mb-4">
          <div class="card-body order-height mb-0 pb-0">
            <div class="row">
              <div class="col-12 col-lg-4">
                <div class="d-flex justify-content align-items-center">
                  <div>Bag of Rice (20kg)</div>
                  <div class="d-flex flex-column">
                    <div className="pl-4 stat-label">Order # NN1236</div>
                    <div className="pl-4 mt-auto pt-2 stat-label-lite">
                      17 Nov, 01:30 PM
                    </div>
                  </div>
                  <div className="order-line ml-5"></div>
                </div>
              </div>
              <div class="col-12 col-lg-4">
                <div class="d-flex justify-content align-items-center">
                  
                  <div class="d-flex flex-column">
                    <div className="pl-4 stat-label">
                      <i className="fa fa-user"></i> Amanda Chavez
                    </div>
                    <div className="pl-4 mt-auto pt-2 stat-label-lite">
                      <i className="fa fa-card"></i> $680 (COD)
                    </div>
                  </div>
                  <div className="order-line ml-5"></div>
                </div>
              </div>

              <div class="col-12 col-lg-4">
                <div class="d-flex justify-content align-items-center">
                  <div className="delivered order-status">
                    <span className="dot-success"></span> Delivered
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
        <div class="card mb-4">
          <div class="card-body order-height mb-0 pb-0">
            <div class="row">
              <div class="col-12 col-lg-4">
                <div class="d-flex justify-content align-items-center">
                  <img
                    src="https://res.cloudinary.com/victor-ent/image/upload/v1645360498/foodpanda_llqamd.png"
                    style={{ width: "50px" }}
                  />
                  <div class="d-flex flex-column">
                    <div className="pl-4 stat-label">Order # NN1236</div>
                    <div className="pl-4 mt-auto pt-2 stat-label-lite">
                      17 Nov, 01:30 PM
                    </div>
                  </div>
                  <div className="order-line ml-5"></div>
                </div>
              </div>
              <div class="col-12 col-lg-4">
                <div class="d-flex justify-content align-items-center">
               
                  <div class="d-flex flex-column">
                    <div className="pl-4 stat-label">
                      <i className="fa fa-user"></i> Amanda Chavez
                    </div>
                    <div className="pl-4 mt-auto pt-2 stat-label-lite">
                      <i className="fa fa-card"></i> ₦900 (Paid Online)
                    </div>
                  </div>
                  <div className="order-line ml-5"></div>
                </div>
              </div>

              <div class="col-12 col-lg-4">
                <div class="d-flex justify-content align-items-center">
                  <div className="transit order-status">
                    <span className="dot-transit"></span> In Transit
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
        <div class="card mb-4">
          <div class="card-body order-height mb-0 pb-0">
            <div class="row">
              <div class="col-12 col-lg-4">
                <div class="d-flex justify-content align-items-center">
                  <img
                    src="https://res.cloudinary.com/victor-ent/image/upload/v1645360498/foodpanda_llqamd.png"
                    style={{ width: "50px" }}
                  />
                  <div class="d-flex flex-column">
                    <div className="pl-4 stat-label">Order # NN1236</div>
                    <div className="pl-4 mt-auto pt-2 stat-label-lite">
                      17 Nov, 01:30 PM
                    </div>
                  </div>
                  <div className="order-line ml-5"></div>
                </div>
              </div>
              <div class="col-12 col-lg-4">
                <div class="d-flex justify-content align-items-center">
               
                  <div class="d-flex flex-column">
                    <div className="pl-4 stat-label">
                      <i className="fa fa-user"></i> Amanda Chavez
                    </div>
                    <div className="pl-4 mt-auto pt-2 stat-label-lite">
                      <i className="fa fa-card"></i> ₦900 (Paid Online)
                    </div>
                  </div>
                  <div className="order-line ml-5"></div>
                </div>
              </div>

              <div class="col-12 col-lg-4">
                <div class="d-flex justify-content align-items-center">
                  <div className="pending order-status">
                    <span className="dot-pending"></span> Pending
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
        <div class="card mb-4">
          <div class="card-body order-height mb-0 pb-0">
            <div class="row">
              <div class="col-12 col-lg-4">
                <div class="d-flex justify-content align-items-center">
                  <img
                    src="https://res.cloudinary.com/victor-ent/image/upload/v1645360498/foodpanda_llqamd.png"
                    style={{ width: "50px" }}
                  />
                  <div class="d-flex flex-column">
                    <div className="pl-4 stat-label">Order # NN1236</div>
                    <div className="pl-4 mt-auto pt-2 stat-label-lite">
                      17 Nov, 01:30 PM
                    </div>
                  </div>
                  <div className="order-line ml-5"></div>
                </div>
              </div>
              <div class="col-12 col-lg-4">
                <div class="d-flex justify-content align-items-center">
                 
                  <div class="d-flex flex-column">
                    <div className="pl-4 stat-label">
                      <i className="fa fa-user"></i> Amanda Chavez
                    </div>
                    <div className="pl-4 mt-auto pt-2 stat-label-lite">
                      <i className="fa fa-card"></i> ₦900 (Paid Online)
                    </div>
                  </div>
                  <div className="order-line ml-5"></div>
                </div>
              </div>

              <div class="col-12 col-lg-4">
                <div class="d-flex justify-content align-items-center">
                  <div className="pending order-status">
                    <span className="dot-pending"></span> Pending
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
