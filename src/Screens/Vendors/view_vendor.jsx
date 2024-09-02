import { useEffect, useState, useRef } from "react";
import { Button } from "../../Components/Button/index";
import { DashboardContainer } from "../../Components/DashboardContainer/Index";
import { Input } from "../../Components/Input/index";
import { TableHeader } from "../../Components/Table/index";
import { Tabs } from "antd";
import { SalesInfo } from "./vendor-sales";
import { VendorStats } from "./vendor-stats";
import "./index.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

const { TabPane } = Tabs;

export const VendorView = () => {
  function callback(key) {
    console.log(key);
  }
  return (
    <div>
      <DashboardContainer pageTitle="Romade's Dashboard">
        <div class="row">
          <div class="col-12 col-lg-8">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <span class="h2-primary">
                  Store. R{" "}
                  <small class="pl-5" style={{ fontSize: "15px" }}>
                    store.r@email.com
                  </small>{" "}
                </span>{" "}
              </div>
              <div className="col-md-3 d-flex justify-content align-items-center mt-1">
                <Button
                  
                  text="Suspend"
                  style={{ backgroundColor: "#FF6B6B", color: "#fff" }}
                />{" "}
                <Button
                  className="ml-2"
                  text="Store info"
                  style={{ color: "#171846", backgroundColor: "#FFFFFF" }}
                />
              </div>
            </div>

            <br />

            <div class="">
              <VendorStats />
              <br />
              <div class="d-flex justify-content-between align-items-center pt-4">
                <h2 class="h2-primary">Inventory</h2>
                <p style={{ fontWeight: "600", color: "#111111" }}>
                Categories <i class="fa fa-chevron-down"></i>
                </p>
              </div>
            </div>
            <div class="card mb-4" style={{height:'80px'}}>
              <div class="card-body order-height mb-0 pb-0">
                <div class="row">
                  <div className="stat-label col-md-2 d-flex justify-content align-items-center ">
                    <Button
                      class=""
                      text="Products"
                      style={{
                        backgroundColor: "#171846",
                        color: "#fff",
                      }}
                    />
                  </div>
                  <div className="stat-label col-md-2 d-flex justify-content align-items-center">
                    Orders
                  </div>
                  <div className="stat-label col-md-2 d-flex justify-content align-items-center">
                    Delivery
                  </div>
                </div>
              </div>
            </div>

            <div class="card-vendor-lists pt-3">
              {[1, 2, 3, 4].map((d) => {
                return (
                  <div class="card mb-4">
                    <div class="card-body order-height mb-0 pb-0">
                      <div class="row">
                        <div class="col-md-2">
                            <img
                              src="https://res.cloudinary.com/victor-ent/image/upload/v1645360498/foodpanda_llqamd.png"
                              style={{ width: "50px" }}
                            />
                        
                        </div>
                        <div className="stat-label col-md-2 d-flex justify-content align-items-center">
                        Nike sb dunk
                        </div>
                        <div className="stat-label col-md-2 d-flex justify-content align-items-center">
                        17 Nov, 01:30 PM
                        </div>
                        <div className="stat-label font-weight-bold col-md-2 d-flex justify-content align-items-center">
                        ₦900
                        </div>
                        <div className="col-md-2 d-flex justify-content align-items-center mt-1">
                          <Button
                            class=""
                            text="Flag product"
                            style={{
                              backgroundColor: "#FF6B6B",
                              color: "#fff",
                            }}
                          />
                         
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="card" style={{ height: "100%" }}>
              <SalesInfo />
            </div>
          </div>
        </div>
        <br />
      </DashboardContainer>
    </div>
  );
};
