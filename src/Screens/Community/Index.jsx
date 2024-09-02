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
import { Family } from "./Family";
import { Connection } from "./Connection";

export const Community = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [maleResp, setMaleResp] = useState([]);
  const [femaleResp, setFemaleResp] = useState([]);
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState([]);
  const [tab, setTab] = useState('')


  return (
    <div>
      <DashboardContainer pageTitle="">
        <div className="row">
          <div className="col-md-12">
            <div className="card py-4 px-4 " style={{ height: "100vh" }}>
              <div className="lead-dl">Community</div>

              <div className="">
                <Tabs
                  defaultTab="one"
                  onChange={(tabId) => {
                    setTab(tabId);
                  }}
                >
                  <TabList>
                    <Tab tabFor="one">Families</Tab>
                    <Tab tabFor="two">Connections</Tab>
                  </TabList>
                  <br />
                  <TabPanel tabId="one">
                    <div>
                      <Family data={data} tab={tab}  />
                    </div>
                  </TabPanel>
                  <TabPanel tabId="two">
                    <div>
                      <Connection id={data._id} tab={tab} />
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
