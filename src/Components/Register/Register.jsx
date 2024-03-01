import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  const userData = {
    name: "",
    phone: "",
    email: "",
    password: "",
    rePassword: "",
  };

  const [isSuccess, setisSuccess] = useState(false);
  const [errMsg, seterrMsg] = useState(undefined);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  async function sendUserData(values) {
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((res) => {
        setisSuccess(true);
        setTimeout(() => {
          setisSuccess(false);
          navigate("/login");
        }, 2000);
        setisLoading(false);
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
    name: Yup.string()
      .required("Name Must Be required")
      .min(3, "At least 3 Characters")
      .max(20, "Max 12 chars"),
    phone: Yup.string()
      .required("Phone is required")
      .min(11, "Must be 11 numbers")
      .max(11, "Must be 11 numbers")
      .matches(
        /^01[0-2 || 5]\d{8}$/,
        "It must be a vaild phone number and starts with 01 then (0 or 1 or 2 or 5) then 8 numbers"
      ),
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
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Validation using validate
  // function checkValidation(values) {
  //   const errors = {};

  //   const phoneRegex = /^01[0-2 || 5]\d{8}$/;
  //   const passRegex = /(?=.*\d)/;
  //   const passRegex2 = /(?=.*[A-Z])/;
  //   const passRegex3 = /(?=.*[a-z])/;
  //   const passRegex4 = /(?=.*[!@#$%^&*()\-_=+{};:,<.>])/;

  //   if (phoneRegex.test(values.phone) == false) {
  //     errors.phone = "Enter vaild number";
  //   }

  //   if (passRegex.test(values.password) == false) {
  //     errors.password = "ensures there is at least one digit.";
  //   }

  //   if (passRegex2.test(values.password) == false) {
  //     errors.password = "ensures there is at least one uppercase letter.";
  //   }

  //   if (passRegex3.test(values.password) == false) {
  //     errors.password = "ensures there is at least one lowercase letter.";
  //   }

  //   if (passRegex4.test(values.password) == false) {
  //     errors.password = "ensures there is at least one special character.";
  //   }

  //   return errors;
  // }

  function onSubmit(values) {
    sendUserData(values);
    setisLoading(true);
  }

  const myFormik = useFormik({
    initialValues: userData,
    onSubmit: onSubmit,
    validationSchema: mySchema,
    // validate: checkValidation,
  });

  // const [
  //   values,
  //   handleSubmit,
  //   handleChange,
  //   errors,
  //   touched,
  //   handleBlur,
  //   isValid,
  // ] = useFormik({
  //   initialValues: userData,
  //   onSubmit: onSubmit,
  //   validationSchema: mySchema,
  // });

  return (
    <>
      <div className="w-75 m-auto py-5 my-5">
        {isSuccess ? (
          <div className="alert alert-success text-center">
            You account has been created successfully
          </div>
        ) : (
          ""
        )}
        {errMsg ? (
          <div className="alert alert-danger text-center">{errMsg} </div>
        ) : (
          ""
        )}
        <div className="m-auto shadow-lg p-3 rounded-3 bg-main-light">
          <h2 className="text-center fw-light fa-3x">Register Now</h2>
          <form onSubmit={myFormik.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="name"
              className="form-control mb-3"
              value={myFormik.values.name}
              onChange={myFormik.handleChange}
              onBlur={myFormik.handleBlur}
            />
            {myFormik.errors.name && myFormik.touched.name ? (
              <div className="errMsg alert alert-danger">
                {myFormik.errors.name}
              </div>
            ) : (
              ""
            )}

            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="text"
              placeholder="phone"
              className="form-control mb-3"
              value={myFormik.values.phone}
              onChange={myFormik.handleChange}
              onBlur={myFormik.handleBlur}
            />
            {myFormik.errors.phone && myFormik.touched.phone ? (
              <div className="errMsg alert alert-danger">
                {myFormik.errors.phone}
              </div>
            ) : (
              ""
            )}

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

            <label htmlFor="rePassword">RePassword</label>
            <input
              id="rePassword"
              type="password"
              placeholder="rePassword"
              className="form-control mb-3"
              value={myFormik.values.rePassword}
              onChange={myFormik.handleChange}
              onBlur={myFormik.handleBlur}
            />
            {myFormik.errors.rePassword && myFormik.touched.rePassword ? (
              <div className="errMsg alert alert-danger">
                {myFormik.errors.rePassword}
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
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
