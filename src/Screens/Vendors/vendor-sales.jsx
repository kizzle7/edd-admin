import { useEffect, useState, useRef } from "react";
import { Button } from "../../Components/Button/index";
export const SalesInfo = () => {
  return (
    <div class="revenue-container">
      <div class="card success-card" style={{ height: "139px" }}>
        <div class="card-body mb-0 pb-0">
          <div class="stat-label">Revenue</div>
          <h4 class="d-flex justify-content-center align-items-center h-50 font-weight-bold">
            135,000,000
          </h4>
        </div>
      </div>{" "}
      <br />
      <p class="font-weight-bold">Revenue Breakdown</p>
      <div class="trans-lists">
        <div class="d-flex justify-content align-items-top">
          <div class="success-paper-bg">
            <div class="text-center">
              <img
                src="https://res.cloudinary.com/victor-ent/image/upload/v1645380590/XMLID_593__psescr.png              "
                className="w-100"
              />
            </div>
          </div>
          <div class="d-flex flex-column">
            <div className="pl-4 stat-label">Order 1232</div>
            <div className="pl-4 mt-auto pt-2 stat-label-lite">
              Vivian store
            </div>
          </div>
          <div className="pl-4 amt-label ml-auto">5,000,00</div>
        </div>
      </div>
      <div class="trans-lists">
        <div class="d-flex justify-content align-items-top">
          <div class="success-paper-bg">
            <div class="text-center">
              <img
                src="https://res.cloudinary.com/victor-ent/image/upload/v1645380590/XMLID_593__psescr.png              "
                className="w-100"
              />
            </div>
          </div>
          <div class="d-flex flex-column">
            <div className="pl-4 stat-label">Order 1232</div>
            <div className="pl-4 mt-auto pt-2 stat-label-lite">
              Vivian store
            </div>
          </div>
          <div className="pl-4 amt-label ml-auto">5,000,00</div>
        </div>
      </div>
      <div class="trans-lists">
        <div class="d-flex justify-content align-items-top">
          <div class="success-paper-bg">
            <div class="text-center">
              <img
                src="https://res.cloudinary.com/victor-ent/image/upload/v1645380590/XMLID_593__psescr.png              "
                className="w-100"
              />
            </div>
          </div>
          <div class="d-flex flex-column">
            <div className="pl-4 stat-label">Order 1232</div>
            <div className="pl-4 mt-auto pt-2 stat-label-lite">
              Vivian store
            </div>
          </div>
          <div className="pl-4 amt-label ml-auto">5,000,00</div>
        </div>
      </div>
      <div class="trans-lists">
        <div class="d-flex justify-content align-items-top">
          <div class="success-paper-bg">
            <div class="text-center">
              <img
                src="https://res.cloudinary.com/victor-ent/image/upload/v1645380590/XMLID_593__psescr.png              "
                className="w-100"
              />
            </div>
          </div>
          <div class="d-flex flex-column">
            <div className="pl-4 stat-label">Order 1232</div>
            <div className="pl-4 mt-auto pt-2 stat-label-lite">
              Vivian store
            </div>
          </div>
          <div className="pl-4 amt-label ml-auto">5,000,00</div>
        </div>
      </div>
      <div class="trans-lists">
        <div class="d-flex justify-content align-items-top">
          <div class="success-paper-bg">
            <div class="text-center">
              <img
                src="https://res.cloudinary.com/victor-ent/image/upload/v1645380590/XMLID_593__psescr.png              "
                className="w-100"
              />
            </div>
          </div>
          <div class="d-flex flex-column">
            <div className="pl-4 stat-label">Order 1232</div>
            <div className="pl-4 mt-auto pt-2 stat-label-lite">
              Vivian store
            </div>
          </div>
          <div className="pl-4 amt-label ml-auto">5,000,00</div>
        </div>
      </div>
      <div class="trans-lists">
        <div class="d-flex justify-content align-items-top">
          <div class="success-paper-bg">
            <div class="text-center">
              <img
                src="https://res.cloudinary.com/victor-ent/image/upload/v1645380590/XMLID_593__psescr.png              "
                className="w-100"
              />
            </div>
          </div>
          <div class="d-flex flex-column">
            <div className="pl-4 stat-label">Order 1232</div>
            <div className="pl-4 mt-auto pt-2 stat-label-lite">
              Vivian store
            </div>
          </div>
          <div className="pl-4 amt-label ml-auto">5,000,00</div>
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <Button text={"See More"} className="w-50 text-white" style={{backgroundColor: "#171846"}}  />
      </div>
    </div>
  );
};
