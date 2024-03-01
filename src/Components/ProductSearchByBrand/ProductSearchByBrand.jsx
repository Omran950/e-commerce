import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";
import ChildProducts from "../ChildProducts/ChildProduct";
import BadConnection from "../BadConnection/BadConnection";
import { useParams } from "react-router-dom";
import noProducts from "../../images/no-products.jpg";

export default function ProductSearchByBrand() {
  const { id } = useParams();

  function getAllProductsByBrand() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products", {
      params: { brand: id },
    });
  }

  const { data, isLoading, isError, error, isFetched, isFetching } = useQuery(
    "getAllProductsByBrand",
    getAllProductsByBrand
  );

  if ((isLoading, isFetching)) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (data.data.results === 0) {
    return (
      <>
        <div className="container py-5 my-5">
        <figure>
            <img
              src={noProducts}
              alt="No products available"
              className="w-50 d-block m-auto"
            />
          </figure>
        </div>
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
        <div className="row gy-4 gx-2 py-5 justify-content-center">
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
