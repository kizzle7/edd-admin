import { useEffect, useState, useRef } from "react";
import {Input} from "../Components/Input/index"
import { DashboardContainer } from "../Components/DashboardContainer/Index";
export const Main = () => {
  return (
    <div>
      <DashboardContainer pageTitle="Romade's Dashboard">
        <div class="row">
          <div class="col-12 col-lg-8">
            <div class="d-flex justify-content-between align-items-center">
              <div>Romade's Dashboard</div>
              <Input placeholder="Search Keyword" />
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="card" style={{height:"100vh"}}>
              <div class="card-body mb-0 pb-0"></div>
            </div>
          </div>
        </div>
      </DashboardContainer>
    </div>
  );
};
