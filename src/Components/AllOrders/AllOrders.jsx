import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loader from "./../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { Helmet } from "react-helmet";

export default function AllOrders() {
  const { userId } = useContext(authContext);
  const [allOrders, setallOrders] = useState(null);
  const navigate = useNavigate();

  function getUserOrders() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((res) => {
        setallOrders(res.data);
      })
      .catch((err) => {
        setallOrders([]);
      });
  }
  useEffect(() => {
    getUserOrders();
  }, []);

  if (!allOrders) {
    return <Loader />;
  }

  function navigateToHome() {
    navigate("/");
  }

  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      {!allOrders || allOrders.length > 0 ? (
        <div className="container py-5 my-5">
          <div className="my-5">
            <h2 className="text-center text-success fw-bold mb-4">My Orders</h2>
            {allOrders.map((order, idx) => {
              return (
                <div
                  className="p-3 rounded-3 shadow my-3 cart-product"
                  key={idx}
                >
                  <div>
                    <h5 className="text-info">Order : {idx + 1}</h5>
                    <h5>
                      <span className="text-success">Payment Method :</span>
                      {order.paymentMethodType}
                    </h5>
                    <h5>
                      <span className="text-success">Order Price : </span>
                      {order.totalOrderPrice} LE
                    </h5>
                    <p>
                      This order is delivered to
                      <span className="text-success fw-bold mx-2">
                        {order.shippingAddress.city}
                      </span>
                      on phone number :
                      <span className="text-success fw-bold mx-2">
                        {order.shippingAddress.phone}
                      </span>
                      with details :
                      <span className="text-success fw-bold mx-2">
                        {order.shippingAddress.details}
                      </span>
                    </p>
                    <div className=" mt-4">
                      {order.cartItems.map((product, idx) => {
                        return (
                          <Link
                            key={idx}
                            to={`/Productdetails/${product.product._id}`}
                          >
                            <div className="d-flex align-items-center mb-4 gap-3">
                              <img
                                src={product.product.imageCover}
                                alt={product.product.title}
                                style={{ height: "100px", width: "100px" }}
                                className=" d-block"
                              />
                              <div>
                                <p className="m-0 text-success">
                                  {product.product.title}
                                </p>
                                <p className="m-0">Count : {product.count}</p>
                                <p className="m-0">Price : {product.price}</p>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="container py-5 my-5 text-center">
          <div className=" py-5 my-5">
            <h1 className="pt-5 mt-5">No orders Yet</h1>
            <button
              className="btn btn-success mt-3 py-3"
              onClick={navigateToHome}
            >
              Pess Here For Shopping
              <i className="fa-solid fa-cart-plus ms-2"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
