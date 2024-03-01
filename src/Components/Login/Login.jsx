import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authContext } from "./../../Context/AuthContext";

export default function Login() {
  const userData = {
    email: "",
    password: "",
  };

  const [isSuccess, setisSuccess] = useState(false);
  const [errMsg, seterrMsg] = useState(undefined);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  const { token, setToken } = useContext(authContext);

  async function sendUserData(values) {
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        if (res.data.message === "success") {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          setisSuccess(true);
          setTimeout(() => {
            setisSuccess(false);
            navigate("/");
          }, 2000);
          setisLoading(false);
        }
      })
      .catch((res) => {
        if (res.response) {
          // The request was made and the server responded with a status code
          seterrMsg(res.response.data.message);
        } else if (res.request) {
          // The request was made but no response was received
          seterrMsg(
            "Network error occurred. Please check your internet connection and try again."
          );
        } else {
          // Something happened in setting up the request that triggered an error
          seterrMsg("An unexpected error occurred. Please try again later.");
        }
        setTimeout(() => {
          seterrMsg(undefined);
        }, 3000);
        setisLoading(false);
      });
  }

  // Validation using Yup
  const mySchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "must be a vaild email : ex@gamil.com"
      ),
    password: Yup.string()
      .required("Password is required")
      .min(6)
      .max(11)
      .matches(/(?=.*\d)/, "ensures there is at least one digit.")
      .matches(/(?=.*[A-Z])/, "ensures there is at least one uppercase letter.")
      .matches(/(?=.*[a-z])/, "ensures there is at least one lowercase letter.")
      .matches(
        /(?=.*[!@#$%^&*()\-_=+{};:,<.>])/,
        "ensures there is at least one special character."
      ),
  });

  function onSubmit(values) {
    sendUserData(values);
    setisLoading(true);
  }

  const myFormik = useFormik({
    initialValues: userData,
    onSubmit: onSubmit,
    validationSchema: mySchema,
  });

  return (
    <>
      <div className=" m-auto py-5 my-5">
        <div className="py-5 my-5">
          {isSuccess ? (
            <div className="alert alert-success text-center">
              Welcome Back !!
            </div>
          ) : (
            ""
          )}
          {errMsg ? (
            <div className="alert alert-danger text-center">{errMsg} </div>
          ) : (
            ""
          )}
          <div className="w-75 m-auto shadow-lg p-3 rounded-3 bg-main-light">
            <h2 className="text-center fw-light fa-3x">Login Now</h2>
            <form onSubmit={myFormik.handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="email"
                className="form-control mb-3"
                value={myFormik.values.email}
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
              />
              {myFormik.errors.email && myFormik.touched.email ? (
                <div className="errMsg alert alert-danger">
                  {myFormik.errors.email}
                </div>
              ) : (
                ""
              )}

              <label htmlFor="name">Password</label>
              <input
                id="password"
                type="password"
                placeholder="password"
                className="form-control mb-3"
                value={myFormik.values.password}
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
              />
              {myFormik.errors.password && myFormik.touched.password ? (
                <div className="errMsg alert alert-danger">
                  {myFormik.errors.password}
                </div>
              ) : (
                ""
              )}

              <button
                type="submit"
                className="btn bg-main p-2 rounded-3 text-white"
                disabled={isLoading || !myFormik.isValid}
              >
                {isLoading ? (
                  <TailSpin
                    visible={true}
                    height="30"
                    width="30"
                    color="#fff"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
