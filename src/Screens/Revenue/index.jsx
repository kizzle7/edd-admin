import { useEffect, useState, useRef } from "react";
import { Button } from "../../Components/Button/index";
import { DashboardContainer } from "../../Components/DashboardContainer/Index";
import { Input } from "../../Components/Input/index";
import { TableHeader } from "../../Components/Table/index";
import  {RevenueStats} from "./revenue"
import { Tabs } from "antd";
import "./index.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

const { TabPane } = Tabs;

export const Revenue = () => {
  function callback(key) {
    console.log(key);
  }
  return (
    <div>
      <DashboardContainer pageTitle="Romade's Dashboard">
        <div class="row ">
          <div class="col-12 col-lg-12">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <span class="h2-primary">Revenue </span>{" "}
              </div>
              <div class="input-search mr-3">
                <div class="input-icons">
                  <i class="fa fa-search icon"></i>
                  <Input placeholder="Search Keyword" class="search" />
                </div>
              </div>
            </div>
            <br />
            {/* <div class="d-flex justify-content-between align-items-center pt-3">
              <div>
                <Button
                  color="white"
                  text="Filters"
                  className="stat-label-lite"
                  style={{
                    borderRadius: 0,
                    width: "130px",
                    backgroundColor: "#fff",
                    border: "1px solid #CACACA",
                    
                  }}
                />
              </div>
              <div class="d-flex justify-content-between align-items-center pt-4">
                <p class="pr-3 ">Sort By</p>
                <p style={{ fontWeight: "600", color: "#111111" }}>
                  Newest <i class="fa fa-chevron-down"></i>
                </p>
              </div>
            </div> */}
            <RevenueStats />
            <br />
            {/* <div className="tab-area">
              <div className="card">
                <div className="card-body">
                  <TableHeader />
                  <Tabs
                    defaultActiveKey="1"
                    onChange={callback}
                    tabBarStyle={{ color: "#707070" }}
                  >
                    <TabPane tab="All" key="1"></TabPane>
                    <TabPane tab="New requests" key="2">
                      Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Approved vendors" key="3">
                      Content of Tab Pane 3
                    </TabPane>
                    <TabPane tab="Suspended vendors" key="4">
                      Content of Tab Pane 3
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div> */}

            <div class="card-vendor-lists pt-3">
              <div class="card mb-4 ">
                <div class="card-body order-height mb-0 pb-0">
                  <div
                    style={{ backgroundColor: "#F6F8FA", borderRadius: "10px" }}
                  >
                    <div class="row font-weight-bold">
                      <div class="col-md-2">
                        <div class="d-flex justify-center align-items-center">
                          <img
                            src="https://res.cloudinary.com/victor-ent/image/upload/v1645360498/foodpanda_llqamd.png"
                            style={{ width: "50px" }}
                          />
                          <div className="pl-3 stat-label">Name</div>
                        </div>
                      </div>
                      <div className="stat-label col-md-2 d-flex justify-content align-items-center">
                        Revenue
                      </div>
                      <div className="stat-label col-md-2 d-flex justify-content align-items-center">
                        Outstanding Payment
                      </div>
                      <div className="stat-label col-md-2 d-flex justify-content align-items-center">
                        Settlement
                      </div>
                      <div className="stat-label col-md-2 d-flex justify-content align-items-center">
                        Actions
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {[1, 2, 3, 4, 5].map((d) => {
                return (
                  <div class="card mb-4">
                    <div class="card-body order-height mb-0 pb-0">
                      <div class="row">
                        <div class="col-md-2">
                          <div class="d-flex justify-center align-items-center">
                            <img
                              src="https://res.cloudinary.com/victor-ent/image/upload/v1645360498/foodpanda_llqamd.png"
                              style={{ width: "50px" }}
                            />
                            <div className="pl-3 stat-label">Syneout plc</div>
                          </div>
                        </div>
                        <div className="stat-label col-md-2 d-flex justify-content align-items-center">
                          100,000.000
                        </div>
                        <div className="stat-label col-md-2 d-flex justify-content align-items-center">
                          100,000.00
                        </div>
                        <div className="stat-label col-md-2 d-flex justify-content align-items-center">
                          100,000.00
                        </div>
                        <div className="col-md-2 d-flex justify-content align-items-center mt-1">
                          <Button class="" text="pay settlement"  style={{backgroundColor: '#171846', color: '#fff'}} />

                        </div>
                        
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <br />
      </DashboardContainer>
    </div>
  );
};
