import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { cartContext } from "./../../Context/CartContext";
import { toast } from "react-hot-toast";

export default function Payment() {
  const userData = {
    details: "",
    phone: "",
    city: "",
  };

  const { cartId, getUserCart } = useContext(cartContext);
  const navigate = useNavigate();

  // Validation using Yup
  const mySchema = Yup.object({
    details: Yup.string()
      .required("Details is required")
      .min(3, "Details Min length is 3"),
    phone: Yup.string()
      .required("Phone is required")
      .min(11, "Must be 11 numbers")
      .max(11, "Must be 11 numbers")
      .matches(
        /^01[0-2 || 5]\d{8}$/,
        "It must be a vaild phone number and starts with 01 then (0 or 1 or 2 or 5) then 8 numbers"
      ),
    city: Yup.string()
      .required("City is required")
      .min(3, "City Min length is 3"),
    paymentMethod: Yup.string().required("Payment method is required"), // Add validation for paymentMethod
  });

  function onlinePayment(values) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        { shippingAddress: values },
        {
          headers: { token: localStorage.getItem("token") },
          params: { url: "https://Omran950.github.io/react-e-commerce" },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          window.open(res.data.session.url, "_self");
        }
      })
      .catch((err) => {
        toast.error("Error Occured", {
          duration: 1500,
          position: "top-center",
          style: { background: "#F8D7DA", color: "#58151C" },
        });
      });
  }

  function cashPayment(values) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress: values },
        {
          headers: { token: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Process Completed Successfully", {
            duration: 1500,
            position: "top-center",
            style: { background: "#177448", color: "white" },
          });
          getUserCart();
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((err) => {
        toast.error("Error Occured", {
          duration: 1500,
          position: "top-center",
          style: { background: "#F8D7DA", color: "#58151C" },
        });
      });
  }

  const myFormik = useFormik({
    initialValues: userData,
    onSubmit: (values, { setSubmitting }) => {
      if (values.paymentMethod === "cash") {
        cashPayment(values);
      } else if (values.paymentMethod === "online") {
        onlinePayment(values);
      }
      setSubmitting(false);
    },
    validationSchema: mySchema,
  });

  return (
    <>
      <div className=" m-auto py-5 my-5">
        <div className="py-5 my-5">
          <div className="w-75 m-auto shadow-lg p-3 rounded-3 bg-main-light">
            <h2 className="text-center fw-light fa-3x">Shipping Address</h2>
            <form onSubmit={myFormik.handleSubmit}>
              <label htmlFor="details">Details : </label>
              <textarea
                id="details"
                type="text"
                placeholder="Your Details..."
                className="form-control mb-3"
                value={myFormik.values.details}
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
              />
              {myFormik.errors.details && myFormik.touched.details ? (
                <div className="errMsg alert alert-danger">
                  {myFormik.errors.details}
                </div>
              ) : (
                ""
              )}

              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="text"
                placeholder="Your Phone..."
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

              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                placeholder="Your City..."
                className="form-control mb-3"
                value={myFormik.values.city}
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
              />
              {myFormik.errors.city && myFormik.touched.city ? (
                <div className="errMsg alert alert-danger">
                  {myFormik.errors.city}
                </div>
              ) : (
                ""
              )}

              <div className="d-flex align-items-center justify-content-center gap-3">
                <button
                  type="button"
                  className={`btn bg-success rounded-3 text-white w-50 ${
                    myFormik.values.paymentMethod === "cash" ? "bg-main" : ""
                  }`}
                  onClick={() => {
                    myFormik.setFieldValue("paymentMethod", "cash");
                  }}
                >
                  <i className="fa-solid fa-money-bill me-2"></i> Cash Payment
                </button>
                <button
                  type="button"
                  className={`btn bg-success rounded-3 text-white w-50 ${
                    myFormik.values.paymentMethod === "online" ? "bg-main" : ""
                  }`}
                  onClick={() => {
                    myFormik.setFieldValue("paymentMethod", "online");
                  }}
                >
                  <i className="fa-regular fa-credit-card me-2"></i> Online
                  Payment
                </button>
              </div>

              <button
                type="submit"
                className="btn bg-main mt-3 w-100 text-white"
                disabled={!myFormik.isValid || !myFormik.values.paymentMethod}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
