import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/freshcart-logo.svg";
import { authContext } from "./../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";

export default function NavBar() {
  const { token, setToken } = useContext(authContext);
  const navigate = useNavigate();
  const { numOfCartItems } = useContext(cartContext);
  const { wishlistCount } = useContext(WishListContext);

  function logOut() {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top py-3 z-3">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <img src={logo} alt="Fresh-Cart-Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
                {/* <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li> */}
                <li className="nav-item  mx-2">
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/brands">
                    Brands
                  </Link>
                </li>
                <li className="nav-item position-relative mx-2">
                  <Link className="nav-link" to="/wishlist">
                    My Wishlist
                  </Link>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success z-2">
                    {wishlistCount ? wishlistCount : ""}
                    {wishlistCount ? (
                      <i className="fa-solid fa-heart ms-2"></i>
                    ) : (
                      ""
                    )}
                  </span>
                </li>
                <li className="nav-item position-relative mx-2">
                  <Link className="nav-link" to="/cart">
                    My Cart
                  </Link>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success z-2">
                    {numOfCartItems ? numOfCartItems : ""}
                    {numOfCartItems ? (
                      <i className="fa-solid fa-cart-shopping ms-2"></i>
                    ) : (
                      ""
                    )}
                    {/* Same Meaning 3shan law el cart b zero my3rdsh 7aga */}
                    {/* {numOfCartItems ?? ""} */}
                  </span>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/allOrders">
                    My Orders
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <ul className="d-flex list-unstyled gap-3 px-2 me-4">
                  <li>
                    <Link
                      to={"https://www.instagram.com/muhamed_omran/?hl=en"}
                      target="_blank"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"https://www.facebook.com/mohammed.omran.1466"}
                      target="_blank"
                    >
                      <i className="fa-brands fa-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to={"https://twitter.com/M__Omran"} target="_blank">
                      <i className="fa-brands fa-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"https://www.linkedin.com/in/mohammedomran95/"}
                      target="_blank"
                    >
                      <i className="fa-brands fa-linkedin"></i>
                    </Link>
                  </li>
                </ul>
              </li>
              {token ? (
                <li className="nav-item">
                  <span role="button" className="nav-link" onClick={logOut}>
                    SignOut
                  </span>
                </li>
              ) : (
                <>
                  <li className="nav-item me-2">
                    <Link className="nav-link" to="/">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
