import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Loader from "./../Loader/Loader";
import BadConnection from "../BadConnection/BadConnection";
import { Link } from "react-router-dom";

export default function Categories() {
  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories", {});
  }

  const { data, isLoading, isError, error, isFetched, isFetching } = useQuery(
    "getAllCategories",
    getAllCategories
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
          {data.data.data.map((cat, idx) => {
            return (
              <div className="col-md-3" key={idx}>
                <Link to={`/productSearchByCategory/${cat._id}`}>
                  <figure className="rounded-3 overflow-hidden border-1 border-dark-subtle border product">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="d-block w-100"
                      style={{ height: "300px" }}
                    />
                    <h4 className="text-success text-center py-3">
                      {cat.name}
                    </h4>
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
