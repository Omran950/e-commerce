import React, { useContext, useState } from "react";
import { WishListContext } from "../../Context/WishListContext";
import { useNavigate } from "react-router-dom";
import ChildProducts from "../ChildProducts/ChildProduct";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";

export default function WishList() {
  const navigate = useNavigate();

  const { WishListProducts } = useContext(WishListContext);
  const [wishHeart, setwishHeart] = useState(true);

  function navigateToHome() {
    navigate("/");
  }

  if (!WishListProducts) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      {WishListProducts.length ? (
        <div className="container  py-5">
          <div className="row gy-4 gx-2 py-5 justify-content-center">
            {WishListProducts.map((product) => {
              return (
                <div key={product.id} className="col-md-3">
                  <ChildProducts product={product} wishHeart={wishHeart} />
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
