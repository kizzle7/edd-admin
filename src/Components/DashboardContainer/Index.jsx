/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import SideBar from "./Sidebar";
import "./index.css";
import { NotificationIcon } from "../../assets/svgs";
import { useSelector } from "react-redux";
import { Drawer, Button, Dropdown } from "antd";
import moment from "moment";
import axios from "axios";
import config from "../../config";
import { Input } from "../Input";
export const DashboardContainer = ({ children, pageTitle }) => {
  const [showModal, setShowModal] = useState(false);

  //   if (!sessionStorage.getItem("token")) {
  //     window.location.href = "/login";
  //   }

  const togglePopup = () => {
    setShowModal(!showModal);
  };

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Admin User
        </a>
      ),
    },
    {
      key: "2",
      label: <div className="text-danger">Log Out</div>,
    },
  ];

  const getStatsNuumber = () => {
    axios
      .get(`${config.baseUrl}admin/dashboard/stats`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        if (err) {
          var status = err?.response.status;
          if(status === 401){
            window.location.href = '/'
          }
        }
      });
  };

  useEffect(() => {
    getStatsNuumber()
  },[])

  return (
    <div className="">
      <div class="page-container">
        <SideBar />
        <div class="page-content">
          <div class="main-wrapper mt-4">
            <div class="row">
              <div class="col-12">
                <div className="top-navv">
                  <div className="d-flex justify-contejnt-between align-items-center">
                    <div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="pr-5">
                          <div class="input-search">
                            <div class="input-icons">
                              <Input
                                placeholder="Search Keyword"
                                class="search"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="text-mute">
                          {moment(new Date()).format("DD-MMM-YYYY h:mm A")}{" "}
                          <i class="fa fa-chevron-down"></i>{" "}
                        </div>
                      </div>
                    </div>
                    {/* <div>
                      <Button>
                        <i className="fa fa-user-circle pr-2"></i>Admin
                      </Button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div>{children} </div>
          </div>{" "}
        </div>{" "}
      </div>
    </div>
  );
};
