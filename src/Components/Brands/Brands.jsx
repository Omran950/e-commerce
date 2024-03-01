import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Loader from "./../Loader/Loader";
import BadConnection from "../BadConnection/BadConnection";
import { Link } from "react-router-dom";

export default function Brands() {
  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands", {
      params: { limit: 50 },
    });
  }

  const { data, isLoading, isError, error, isFetched, isFetching } = useQuery(
    "getAllBrands",
    getAllBrands
  );

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
      <div className="container py-5 mt-5">
        <div className="row py-5 justify-content-center">
          {data.data.data.map((brand, idx) => {
            return (
              <div className="col-md-3" key={idx}>
                <Link to={`/ProductSearchByBrand/${brand._id}`}>
                  <figure className="rounded-3 overflow-hidden border-1 border-dark-subtle border product">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-100 d-block"
                    />
                  </figure>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
