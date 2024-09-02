import { useEffect, useState, useRef } from "react";
import { Input } from "../../Components/Input/index";
import { DashboardContainer } from "../../Components/DashboardContainer/Index";
import UserTable from "../../Components/Table/UsersTable";
import axios from "axios";
import config from "../../config";
import { Chart } from "primereact/chart";
import { DatePicker, Space } from "antd";
import { Bars } from "react-loader-spinner";
import { Loader } from "../../Components/Loader";
import moment from "moment";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import Reg from "../../Components/Table/UserRegistrations";
import { Admins } from "../../Screens/admins/Index";
import { UserInfo } from "./user-info";
import Profile from "./Profile"
export const Details = (props) => {
  const [tab, setTab] = useState("");

  var data = props.history.location.state ? props.history.location.state : {};

  console.log(data);
  return (
    <div>
      <DashboardContainer pageTitle="">
        <div className="row">
          <div className="col-md-12">
            <div className="card py-4 px-4 " style={{ height: "100%" }}>
              <h4 className="lead-dl">Profile Details</h4>
              <div>
                Name - {data?.firstname + " " + data?.lastname} | {data?.email}
              </div>
              <br />
              <div className="">
                <Tabs
                  defaultTab="one"
                  onChange={(tabId) => {
                    setTab(tabId);
                  }}
                >
                  <TabList>
                    <Tab tabFor="one">UI Online Home</Tab>
                    <Tab tabFor="two">Payments</Tab>
                    <Tab tabFor="four">Profile</Tab>
                  </TabList>
                  <br />
                  <TabPanel tabId="one">
                    <div>
                      <UserInfo data={data} tab={tab} />
                    </div>
                  </TabPanel>
                  <TabPanel tabId="two">
                    <div>
                      <Admins id={data._id} tab={tab} />
                    </div>
                  </TabPanel>

                  <TabPanel tabId="four">
                    <div>
                      <Profile id={data._id} data={data} tab={tab} />
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default Details;
