import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Loader from "./../Loader/Loader";
import { Navigate, useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import Slider from "react-slick";
import { TailSpin } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const { addProductToCart } = useContext(cartContext);
  const [loading, setloading] = useState(false);

  async function addProduct(id) {
    setloading(true);
    const res = await addProductToCart(id);
    if (res) {
      toast.success("Product Adeed Successfully", {
        duration: 1500,
        position: "top-right",
        style: { background: "#177448", color: "white" },
      });
      setloading(false);
    } else {
      toast.error("Error Occurred", {
        duration: 1500,
        position: "top-right",
        style: { background: "#F8D7DA", color: "#58151C" },
      });
      setloading(false);
    }
  }

  const { id } = useParams();

  function ProductDetails() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      {}
    );
  }

  const { data, isLoading, isError, error } = useQuery(
    `ProductDetails-${id}`,
    ProductDetails
  );

  if (isError || error) {
    return (
      <>
        <Navigate to="/products" />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  var settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    swipeToSlide: true,
  };

  const ProductDetail = data.data.data;

  return (
    <>
      <Helmet>
        <title>{ProductDetail.title.split(" ").slice(0, 2).join(" ")}</title>
      </Helmet>
      <div className="container py-5 my-5">
        <div className="row py-5 align-items-center gy-5">
          <div className="col-md-3">
            <div className="shadow">
              <Slider {...settings}>
                {ProductDetail.images.map((ProductImage, idx) => (
                  <figure key={idx} className=" rounded-4 overflow-hidden">
                    <img
                      src={ProductImage}
                      alt={ProductDetail.image}
                      className="w-100"
                    />
                    <h6 className="text-center text-success mt-2">
                      {ProductDetail.name}
                    </h6>
                  </figure>
                ))}
              </Slider>
            </div>
          </div>
          <div className="col-md-9">
            <div className="product-details shadow-lg  px-3 py-4 rounded-4 text-center">
              <h1 className="text-success my-4">{ProductDetail.title}</h1>
              <p>{ProductDetail.description}</p>
              <p className="fw-bolder h3 text-success">
                {ProductDetail.category.name}
              </p>
              <p className="fw-bolder">{ProductDetail.subcategory[0].name}</p>
              <div className="d-flex align-items-center justify-content-around flex-wrap">
                <p>
                  <span className="text-success">Available : </span>
                  {ProductDetail.quantity}
                </p>
                <p>
                  <span className="text-success">Sold : </span>
                  {ProductDetail.sold}
                </p>
                {ProductDetail.priceAfterDiscount ? (
                  <p>
                    <span className="text-success">
                      Price :
                      <span className=" text-decoration-line-through text-danger ps-1">
                        {ProductDetail.price}
                      </span>
                    </span>
                    - {ProductDetail.priceAfterDiscount} EGp
                  </p>
                ) : (
                  <p>
                    <span className="text-success">Price : </span>
                    {ProductDetail.price} EGp
                  </p>
                )}
                <p>
                  <span>
                    {ProductDetail.ratingsAverage}
                    <i
                      style={{ color: "yellowgreen" }}
                      className="fa-solid fa-star ps-1 pe-3"
                    ></i>
                  </span>
                  {ProductDetail.ratingsQuantity}
                  <span> ratings</span>
                </p>
              </div>
              <img
                src={ProductDetail.brand.image}
                alt={ProductDetail.brand.name}
                className="rounded-circle w-25 m-auto d-block mb-2"
              />
              <button
                className="btn-success text-white  btn w-100"
                onClick={() => addProduct(id)}
                disabled={loading}
              >
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <TailSpin
                      visible={true}
                      height="25"
                      width="25"
                      color="#fff"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                ) : (
                  "Add to carrt +"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
