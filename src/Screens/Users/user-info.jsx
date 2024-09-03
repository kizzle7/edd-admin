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
  const [lastPayment, setLastPayment] = useState("");
  const [workSearchRequirement, setWorkSearchRequirement] = useState("");
  const [benefitYear, setBenefitYear] = useState("");
  const [actionReqMain, setActionReqMain] = useState("");
  const [actionText2, setActionText2] = useState("");
  const [claimStatusContent, setClaimStatusContent] = useState("");
  const [claimStatusTitle, setClaimStatusTitle] = useState("");
  const [backDateContent, setBackDateContent] = useState("");
  const [backDateTitle, setBackDateTitle] = useState("");
  const [load, setLoad] = useState("");

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
          setActionText(data?.actionText);
          setBackDateContent(data?.backDateContent);
          setActionReqMain(data.actionReqMain);
          setActionText2(data.actionText2);
          setBackDateTitle(data?.backDateTitle);
          setBenefitYear(data?.benefitYear);
          setClaimBalance(data?.claimBalance);
          setClaimStatusTitle(data?.claimStatusTitle);
          setClaimStatusContent(data?.claimStatusContent);
          setLastPayment(data?.lastPayment);
          setWeek1(data?.week1);
          setWeek2(data?.week2);
          setWeeklyBenefit(data?.weeklyBenefit);
          setWorkSearchRequirement(data?.workSearchRequirement);
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
        `${config.baseUrl}/admin/profile-update`,
        {
          actionText,
          claimBalance,
          weeklyBenefit,
          week1,
          week2,
          lastPayment,
          workSearchRequirement,
          benefitYear,
          claimStatusContent,
          claimStatusTitle,
          backDateTitle,
          actionReqMain,
          actionText2,
          backDateContent,
          profile_id: data?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          Notification("success", "Success", res.data.message);
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
    getUserInfo();
  }, []);

  useEffect(() => {
    if (data?._id) {
      setActionText(data?.actionText);
      setBackDateContent(data?.backDateContent);
      setBackDateTitle(data?.backDateTitle);
      setBenefitYear(data?.benefitYear);
      setClaimBalance(data?.claimBalance);
      setActionReqMain(data.actionReqMain);
      setActionText2(data.actionText2);
      setClaimStatusTitle(data?.claimStatusTitle);
      setClaimStatusContent(data?.claimStatusContent);
      setLastPayment(data?.lastPayment);
      setWeek1(data?.week1);
      setWeek2(data?.week2);
      setWeeklyBenefit(data?.weeklyBenefit);
      setWorkSearchRequirement(data?.workSearchRequirement);
    }
  }, [data]);

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
                <p>Action Required Bracket Text (Inside Bracket)</p>
                <div className="mb-3">
                  <Input
                    type="text"
                    className="input-className w-75"
                    onChange={(e) => setActionReqMain(e.target.value)}
                    value={actionReqMain}
                    placeholder="Type text here for text inside the bracket"
                  />
                </div>
              </li>
              <li>
                <p>
                  <u>Actions Required Section (Inside Box)</u>
                </p>
                <div>
                  <div className="mb-3">
                    <TextInput
                      type="text"
                      className="input-className w-75"
                      onChange={(e) => setActionText(e.target.value)}
                      value={actionText}
                      placeholder="Type text here for first text"
                    />
                  </div>
                  <div className="mb-3">
                    <TextInput
                      type="text"
                      className="input-className w-75"
                      onChange={(e) => setActionText2(e.target.value)}
                      value={actionText2}
                      placeholder="Type text here for second text"
                    />
                  </div>
                </div>
              </li>
              <li>
                <p>
                  <u>Back Dating Edd Section</u>
                </p>
                <div>
                  <div className="mb-3">
                    <TextInput
                      type="text"
                      className="input-className w-75"
                      onChange={(e) => setBackDateTitle(e.target.value)}
                      value={backDateTitle}
                      placeholder="Type BackDating Title Here"
                    />
                  </div>
                  <div className="mb-3">
                    <TextInput
                      type="text"
                      className="input-className w-75"
                      onChange={(e) => setBackDateContent(e.target.value)}
                      value={backDateContent}
                      placeholder="Type BackDating Body Content Here"
                    />
                  </div>
                </div>
              </li>
              <li>
                <p>
                  <u>Claim Status Section</u>
                </p>
                <div>
                  <div className="mb-3">
                    <TextInput
                      type="text"
                      className="input-className w-75"
                      onChange={(e) => setClaimStatusTitle(e.target.value)}
                      value={claimStatusTitle}
                      placeholder="Type Claim Status Title Here"
                    />
                  </div>
                  <div className="mb-3">
                    <TextInput
                      type="text"
                      className="input-className w-75"
                      onChange={(e) => setClaimStatusContent(e.target.value)}
                      value={claimStatusContent}
                      placeholder="Type Claim Status Body Content Here"
                    />
                  </div>
                </div>
              </li>
              <li>
                <p>
                  <u>Claim Summary Section</u>
                </p>
                <div>
                  <div className="mb-4">
                    <Input
                      type="text"
                      className="input-className w-75"
                      placeholder="Benefit Year"
                      onChange={(e) => setBenefitYear(e.target.value)}
                      value={benefitYear}
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      type="text"
                      className="input-className w-75"
                      placeholder="Work Search Requirements"
                      onChange={(e) => setWorkSearchRequirement(e.target.value)}
                      value={workSearchRequirement}
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      type="text"
                      className="input-className w-75"
                      placeholder="Week 1 Certification Status"
                      onChange={(e) => setWeek1(e.target.value)}
                      value={week1}
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      type="text"
                      className="input-className w-75"
                      placeholder="Week 2 Certification Status"
                      onChange={(e) => setWeek2(e.target.value)}
                      value={week2}
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      type="text"
                      className="input-className w-75"
                      placeholder="Last Payment Issued"
                      onChange={(e) => setLastPayment(e.target.value)}
                      value={lastPayment}
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      type="text"
                      className="input-className w-75"
                      placeholder="Claim Balance"
                      onChange={(e) => setClaimBalance(e.target.value)}
                      value={claimBalance}
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      type="text"
                      className="input-className w-75"
                      placeholder="Weekly Benefit Amount"
                      onChange={(e) => setWeeklyBenefit(e.target.value)}
                      value={weeklyBenefit}
                    />
                  </div>
                  <div className="mt-2">
                    <Button
                      text="Update Info "
                      className="bg-info w-25 text-white"
                      loading={load}
                      onClick={updateUio}
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
