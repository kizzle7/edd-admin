import { useEffect, useState, useRef } from "react";
import { Button } from "../../Components/Button/index";
import { DashboardContainer } from "../../Components/DashboardContainer/Index";
import { Input } from "../../Components/Input/index";
import { TableHeader } from "../../Components/Table/index";
import "./index.css";
import { Menu, Dropdown, Tabs } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

const { TabPane } = Tabs;

export const Products = () => {
  function callback(key) {
    console.log(key);
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          In transit
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Pending
        </a>
    
      </Menu.Item>
      
    </Menu>
  )
  return (
    <div>
      <DashboardContainer pageTitle="Romade's Dashboard">
        <div class="row ">
          <div class="col-12 col-lg-12">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <span class="h2-primary">Products </span>{" "}
              </div>
              <div class="input-search">
                <div class="input-icons">
                  <i class="fa fa-search icon"></i>
                  <Input placeholder="Search Keyword" class="search" />
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center pt-3">
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
              <div class="d-flex justify-content-between align-items-center ">
                <p class="pr-3 pt-3">Sort By</p>
                <Dropdown overlay={menu}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                    style={{ fontWeight: "600", color: "#111111" }}
                  >
                    In Stock <DownOutlined />
                  </a>
                </Dropdown>
                {/* <p style={{ fontWeight: "600", color: "#111111" }}>
                  Newest <i class="fa fa-chevron-down"></i>
                </p> */}
              </div>
            </div>
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
                        Amount
                      </div>
                      <div className="stat-label col-md-2 d-flex justify-content align-items-center">
                        Vendor 
                      </div>
                      <div className="stat-label col-md-2 d-flex justify-content align-items-center">
                        Status
                      </div>
                      <div className="stat-label col-md-2 d-flex justify-content align-items-center">
                        Actions
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {[1, 2].map((d) => {
                return (
                  <>
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
                          Gbenga
                        </div>
                        <div className="stat-label col-md-2 d-flex justify-content align-items-center">
                          {" "}
                          <div className="transit order-status">
                            <span className="dot-transit"></span> In Transit
                          </div>
                        </div>
                        <div className="col-md-2 d-flex justify-content align-items-center mt-1">
                          <Button
                            class=""
                            text="Flag"
                            className="mr-2"
                            style={{
                              backgroundColor: "#FFF9DB",
                              color: "#FF6B6B",
                            }}
                          />
                          <Button
                            class=""
                            text="Details"
                            style={{
                              backgroundColor: "#171846",
                              color: "#fff",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
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
                          Amos
                        </div>
                        <div className="stat-label col-md-2 d-flex justify-content align-items-center">
                          {" "}
                          <div className="transit order-status">
                            <span className="dot-transit"></span> In Transit
                          </div>
                        </div>
                        <div className="col-md-2 d-flex justify-content align-items-center mt-1">
                          <Button
                            class=""
                            text="Restock"
                            className="mr-2"
                            style={{
                              backgroundColor: "#C5F6FA",
                              color: "#0C8599",
                            }}
                          />
                          <Button
                            class=""
                            text="Details"
                            style={{
                              backgroundColor: "#171846",
                              color: "#fff",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
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
                          Amos
                        </div>
                        <div className="stat-label col-md-2 d-flex justify-content align-items-center">
                          {" "}
                          <div className="transit order-status">
                            <span className="dot-transit"></span> In Transit
                          </div>
                        </div>
                        <div className="col-md-2 d-flex justify-content align-items-center mt-1">
                          <Button
                            class=""
                            text="Activate"
                            className="mr-2"
                            style={{
                              backgroundColor: "#D8F5A2",
                              color: "#74B816",
                            }}
                          />
                          <Button
                            class=""
                            text="Details"
                            style={{
                              backgroundColor: "#171846",
                              color: "#fff",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  </>
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
