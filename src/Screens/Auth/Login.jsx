import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Error from "../../Components/Error";
import Logo from "../../assets/images/d-log.svg";
import { Input } from "../../Components/Input";
import { success, error } from "../../Components/Alert";
import config from "../../config";
import "./index.css";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { Spin } from "antd";
import { notification } from "antd";
import { Button } from "../../Components/Button/index";

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [eye, seteye] = useState(false);
  const [load, setLoad] = useState(false);

  const email = watch("username");
  const password = watch("password");

  const Login = async (data) => {
    if (email && password) {
      setLoad(true);
      const data = {
        email: email,
        password: password,
      };
      axios
        .post(`${config.baseUrl}/login-admin`, data)
        .then((resp) => {
          setLoad(false);
          if (resp.status === 200) {
            sessionStorage.setItem("fname", resp.data.userAdmin?.name);
            sessionStorage.setItem("token", resp.data.userAdmin.token);
            sessionStorage.setItem("adminID", resp.data.userAdmin.id);

            Notification("success", "Success", "Login Successful!");
            window.location.href = "/profiles";
          } else {
            Notification("error", "Error", "Login Failed, check credentials!");
          }
        })
        .catch((err) => {
          setLoad(false);
          Notification("error", "Error", "Login Failed, check credentials!");
        });
    } else {
      error("error", "Fields are all required");
    }
  };

  const Notification = (type, msgType, msg) => {
    notification[type]({
      message: msgType,
      description: msg,
    });
  };

  return (
    <div className="">
      <div className="px-3 back-log">
        <div className="d-flex justify-content-center align-items-center h-100">
          <div>
            <div className="d-flex justify-content-center align-items-center">
              <div className="auth-border">
                <div className="text-center">
                  <h4>EDD PORTAL</h4>
                </div>
                <form className="w-100 container-fluid">
                  {load && (
                    <div className="text-center">
                      <Spin />
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="font-weight-bold">Username</label>
                    <div>
                      <Input
                        {...register("username", {
                          required: "Username is required",
                        })}
                        type="text"
                        className="input-className text-dark"
                      />
                      <Error errorName={errors.username} />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="">
                      <div className="font-weight-bold">Password</div>
                      <div
                        className="mt-2 d-block w-100 d-flex align-items-center justify-content-between"
                        style={{
                          borderRadius: "10px",
                          border: "1px solid #f0f3f4",
                          background: "#f0f3f4",
                        }}
                      >
                        <div
                          className="pl-2"
                          style={{
                            width: "90%",
                            border: "1px solid #f0f3f4",
                          }}
                        >
                          <input
                            type={!eye ? "password" : "text"}
                            placeholder="your password"
                            {...register("password", {
                              required: "Password is required",
                            })}
                            className="d-block w-100 rive-fornm"
                            style={{
                              borderTopRightRadius: 3,
                              borderBottomRightRadius: 3,
                              borderTop: 0,
                              outline: 0,
                              height: 45,
                              borderBottom: 0,
                              borderLeft: 0,
                            }}
                          />
                        </div>
                        <div
                          className="d-flex align-items-center justify-content-center h-100 pointer"
                          onClick={() => seteye(!eye)}
                          style={{
                            width: "10%",
                          }}
                        >
                          {!eye ? <BsEye /> : <BsEyeSlash />}
                        </div>
                      </div>
                    </div>
                    <Error errorName={errors.password} />
                  </div>
                  <br />
                  <Button
                    text="Login"
                    className="w-100 bg-success text-white"
                    onClick={handleSubmit(Login)}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
