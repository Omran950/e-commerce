import React, { useContext } from "react";
import { WishListContext } from "../../Context/WishListContext";
import { useNavigate } from "react-router-dom";
import ChildProducts from "../ChildProducts/ChildProduct";
import Loader from "../Loader/Loader";

export default function WishList() {
  const navigate = useNavigate();

  const { WishListProducts } = useContext(WishListContext);

  function navigateToHome() {
    navigate("/");
  }

  if (!WishListProducts) {
    return <Loader />;
  }

  return (
    <>
      {WishListProducts.length ? (
        <div className="container  py-5">
          <div className="row gy-4 gx-2 py-5">
            {WishListProducts.map((product) => {
              return (
                <div key={product.id} className="col-md-3">
                  <ChildProducts product={product} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="container py-5 my-5 text-center">
          <div className=" py-5 my-5">
            <h1 className="pt-5 mt-5">Wishlist Empty</h1>
            <button
              className="btn btn-success mt-3 py-3"
              onClick={navigateToHome}
            >
              Pess Here To Add Products
              <i className="fa-solid fa-cart-plus ms-2"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
