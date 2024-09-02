import { useEffect, useState, useRef } from "react";
import cartBlue from "../../assets/png/cart-blue.svg"
import { Button } from "../../Components/Button/index";
export const VendorStats = () => {
  return (
    <div class="row">
    <div class="col-12 col-md-6">
      <div
        class="card"
        style={{ backgroundColor: "#171846", height: "190px" }}
      >
        <div class="card-body mb-0 pb-0 text-center pt-4">
          <div class="stat-label text-white">
            Outstanding payment
          </div>
          <br />
          <div
            className="pt-1 stat-label text-white font-weight-bold"
            style={{ fontSize: "23px" }}
          >
            135,000,000.00
          </div>
          <Button
            text="Pay Out"
            color="#171846"
            className="w-25 mt-4"
          />
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6 col-12">
            <div
              class="card text-center"
              style={{
                backgroundColor: "#fff",
                height: "190px",
              }}
            >
              <div class="card-body mb-0 pb-0 text-center pt-4">
                <div
                  class="stat-label font-weight-bold"
                  style={{ color: "#171846" }}
                >
                  cash on delivery
                </div>
                <img
                  src="https://res.cloudinary.com/victor-ent/image/upload/v1645380590/XMLID_593__psescr.png" style={{width: '50px'}}
                  className="mt-2"
                />
                <div
                  className="stat-label pt-1 d-flex justify-content-center align-items-center font-weight-bold"
                  style={{ fontSize: "16px", color: "#171846" }}
                >
                  135,000,000.00
                </div>
                <Button
                text="Request"
                color="#fff"
                style={{backgroundColor:'#171846', color: '#fff'}}
                className="w-100 mt-3"
              />
              </div>
             
            </div>
          </div>
          <div class="col-md-6 col-12">
            <div
              class="card"
              style={{
                backgroundColor: "#fff",
                height: "190px",
              }}
            >
               <div class="card-body mb-0 pb-0 text-center pt-4">
                <div
                  class="stat-label font-weight-bold"
                  style={{ color: "#171846" }}
                >
                  Completed orders
                </div>
                <img
                  src={cartBlue} style={{width: '50px'}}
                  className="mt-4"
                />
                <div
                  className="stat-label mt-4 d-flex justify-content-center align-items-center font-weight-bold"
                  style={{ fontSize: "20px", color: "#171846" }}
                >
                  75
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
