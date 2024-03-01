import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Loader from "./../Loader/Loader";
import ChildProducts from "./../ChildProducts/ChildProduct";
import BadConnection from "../BadConnection/BadConnection";

export default function Products() {
  // const [allProducts, setallProducts] = useState(null);

  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products", {});

    // const { data } = await axios.get(
    //   "https://ecommerce.routemisr.com/api/v1/products",
    //   {}
    // );
    // setallProducts(data.data);
  }

  const { data, isLoading, isError, error, isFetched, isFetching } = useQuery(
    "getAllProducts",
    getAllProducts
  );

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (isError || error) {
    return (
      <>
        <BadConnection />
      </>
    );
  }

  return (
    <>
      <div className="container  py-5">
        <div className="row gy-4 gx-2 py-5">
          {data.data.data.map((product) => {
            return (
              <div key={product.id} className="col-md-3">
                <ChildProducts product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
{
  /* 
in case we used useEffect and useState instead of useQuery
{allProducts ? (
        <div className="container mt-5 py-5">
          <div className="row gy-4 gx-2">
            {allProducts.map((product, idx) => {
              return (
                <div key={idx} className="col-md-3">
                  <div className="product overflow-hidden rounded-3">
                    <img
                      src={product.imageCover}
                      alt=""
                      className="w-100 mb-2"
                    />
                    <div className="px-2">
                      <h3 className="h6 text-main text-center fw-bold">
                        {product.category.name}
                      </h3>
                      <h2 className="h6 text-center fw-bolder mb-4">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h2>
                      <img
                        src={product.brand.image}
                        alt=""
                        className="w-50 d-block m-auto"
                      />
                      <p className="text-center">
                        Quantity : {product.quantity}
                      </p>
                      <div className="d-flex justify-content-between mt-5">
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-opacity-50 bg-success">
          <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            outerCircleColor="#4fa94d"
            innerCircleColor="#4fa94d"
            barColor="#4fa94d"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )} */
}
