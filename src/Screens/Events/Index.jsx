import { useEffect, useState, useRef } from "react";
import { Input } from "../../Components/Input/index";
import { DashboardContainer } from "../../Components/DashboardContainer/Index";
import UserTable from "../../Components/Table/UsersTable";
import "./index.css";
import axios from "axios";
import config from "../../config";
import { Chart } from "primereact/chart";
import { DatePicker, Space } from "antd";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import { EventDetailsInfo } from "./EventDetails";
import { RegistrationListss } from "./Registrations";
import { Family } from "./Family";
import { Accomodation } from "./Accomodation";
import { Reservations } from "./HostelReservations";
import { EventRequests } from "./Requests";
import { Food } from "./Food";
import { Transport } from "./Transport";
import { TransportSchedule } from "./TransportSchedule";
import { Budget } from "./Budget";

export const EventDetails = (props) => {
  const [tab, setTab] = useState("one");
  var data = props.history.location.state ? props.history.location.state : {};
  const [fams, setFams] = useState([]);



  return (
    <div>
      <DashboardContainer pageTitle="">
        <div className="row">
          <div className="col-md-12">
            <div className="card py-4 px-4" style={{ height: "100%" }}>
              <div className="lead-dl">Event Details</div>
              <div className="py-2">
                <Tabs
                  defaultTab="one"
                  onChange={(tabId) => {
                    setTab(tabId);
                  }}
                >
                  <TabList>
                    <Tab tabFor="one">Event Info</Tab>
                    <Tab tabFor="two">Registration</Tab>
                    <Tab tabFor="three">Families</Tab>
                    <Tab tabFor="four">Accomodation</Tab>
                    <Tab tabFor="five">Hostel Reservation</Tab>
                    <Tab tabFor="six">Event Request</Tab>
                    <Tab tabFor="bd">Budget</Tab>
                    {/* <Tab tabFor="tps">Transport Scheduule</Tab> */}
                    <Tab tabFor="tp">Transport Pickups</Tab>
                    <Tab tabFor="food">Food</Tab>
                  </TabList>
                  <br />
                  <TabPanel tabId="one">
                    <div>
                      <EventDetailsInfo data={data} />
                    </div>
                  </TabPanel>
                  <TabPanel tabId="two">
                    <div>
                      <RegistrationListss id={data._id} tab={tab} />
                    </div>
                  </TabPanel>
                  <TabPanel tabId="three">
                    <div>
                      <Family id={data._id} tab={tab} />
                    </div>
                  </TabPanel>
                  <TabPanel tabId="four">
                    <div>
                      <Accomodation id={data._id} tab={tab} />
                    </div>
                  </TabPanel>
                  <TabPanel tabId="five">
                    <div>
                      <Reservations id={data._id} tab={tab} />
                    </div>
                  </TabPanel>
                  <TabPanel tabId="six">
                    <div>
                      <EventRequests id={data._id} tab={tab} />
                    </div>
                  </TabPanel>
                  <TabPanel tabId="bd">
                    <div>
                      {" "}
                      <Budget  id={data._id} tab={tab} />
                    </div>
                  </TabPanel>
                  <TabPanel tabId="tp">
                    <div>
                      <Transport   id={data._id} tab={tab}  />
                    </div>
                  </TabPanel>
                  <TabPanel tabId="food">
                    <div>
                      <Food  id={data._id} tab={tab}  />
                    </div>
                  </TabPanel>
                  {/* <TabPanel tabId="tps">
                    <div>
                      <TransportSchedule />
                    </div>
                  </TabPanel> */}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </DashboardContainer>
    </div>
  );
};
