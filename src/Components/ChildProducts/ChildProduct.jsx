import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import toast from "react-hot-toast";

export default function ChildProducts({ product }) {
  const { addProductToCart } = useContext(cartContext);
  const { addProductToWishList, removeProductToWishList } =
    useContext(WishListContext);

  async function addProduct(id) {
    const res = await addProductToCart(id);
    if (res) {
      toast.success("Product Adeed Successfully", {
        duration: 1500,
        position: "top-right",
        style: { background: "#177448", color: "white" },
      });
    } else {
      toast.error("Error Occurred", {
        duration: 1500,
        position: "top-right",
        style: { background: "#F8D7DA", color: "#58151C" },
      });
    }
  }

  return (
    <div className="product overflow-hidden rounded-3">
      <div className="p-3 d-flex align-items-center justify-content-between">
        <i
          className="fa-solid fa-heart fa-2x text-success wishlist"
          onClick={() => {
            addProductToWishList(product.id);
          }}
          style={{ cursor: "pointer" }}
        ></i>
        <i
          className="fa-solid fa-heart-crack fa-2x text-success wishlist"
          onClick={() => {
            removeProductToWishList(product.id);
          }}
          style={{ cursor: "pointer" }}
        ></i>
      </div>
      <Link to={`/Productdetails/${product.id}`}>
        <img src={product.imageCover} alt="" className="w-100 mb-2" />
        <div className="px-2">
          <h3 className="h6 text-main text-center fw-bold">
            {product.category.name}
          </h3>
          <h2 className="h6 text-center fw-bolder mb-2">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h2>
          <img
            src={product.brand.image}
            alt=""
            className="w-50 d-block m-auto"
          />
          <div className="d-flex align-items-center justify-content-around">
            {product.priceAfterDiscount ? (
              <p>
                <span className="text-decoration-line-through text-danger">
                  {product.price}
                </span>
                - {product.priceAfterDiscount} EGp
              </p>
            ) : (
              <p>{product.price} EGp</p>
            )}
            <p>
              <span>
                <i
                  style={{ color: "yellowgreen" }}
                  className="fa-solid fa-star"
                ></i>
              </span>
              {product.ratingsAverage}
            </p>
          </div>
        </div>
      </Link>
      <button
        className="btn-success text-white  btn w-100"
        onClick={() => addProduct(product.id)}
      >
        Add to carrt +
      </button>
    </div>
  );
}
