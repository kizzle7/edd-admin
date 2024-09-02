/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "./index.css";
import logo from "../../assets/images/wado.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Collapse,
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Dropdown } from "antd";
import menu from "../../constants/sidebars";
const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("");
  const getActive = (id) => {
    setActive(id);
  };

  const items = [
    {
      key: "1",
      label: (
        <div
          className="text-danger"
          onClick={() => {
            sessionStorage.setItem("token", "");
            window.location.href = "/";
          }}
        >
          Log Out{" "}
        </div>
      ),
    },
  ];

  const locationPath = useLocation();
  const currentLocation = locationPath.pathname.replace("/", "");

  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <aside className="sidebar" style={{ overflowY: "scroll", height: "100vh" }}>
      <div className="text-center ">
        <div className="side-logo pt-4">EDD office</div>
        <div className="container">
          <hr />
        </div>
      </div>
      <ul class="list-unstyled container mt-3">
        {menu.map((men) => {
          return (
            <li style={{ whiteSpace: "nowrap" }}>
              <div
                className={`${
                  currentLocation === men.path ? "active-li" : "inactive-li"
                }`}
              >
                <Link
                  to={"/" + men.path}
                  style={{
                    textDecoration: "none",
                    color: currentLocation === men.path ? "#e3e5e7" : "#000000",
                  }}
                >
                  <i style={{ paddingRight: "1rem" }} className={men.icon}></i>
                  {men.name}{" "}
                </Link>{" "}
              </div>
            </li>
          );
        })}{" "}
        <br />
        <li className="pt-2 text-center" style={{position:'absolute', left:'40%', bottom:'10px'}}>
          <div className="text-center">
            <Dropdown
              menu={{
                items,
              }}
            >
              <div>
                {/* <div className="circle-imgg"></div> */}
                <div>
                  <i className="fa text-dark fa-user-circle fa-2x"></i>
                </div>
                <div style={{ color: "#000000" }}>
                  {" "}
                  {sessionStorage.getItem("fname")}
                  
                </div>
                <div style={{ color: "#000000" }}>
                  {sessionStorage.getItem("email")}
                </div>
              </div>
            </Dropdown>
          </div>
        </li>
      </ul>{" "}
    </aside>
  );
};

export default SideBar;
