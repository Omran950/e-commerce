import React from "react";
import notFoundImg from "../../images/error.svg";
export default function NotFound() {
  return (
    <>
      <div className="py-5 my-5">
        <h2 className="text-success text-center my-4">
          Sorry, this page isn't available.
        </h2>
        <img
          src={notFoundImg}
          alt="Error 404"
          className="w-50 m-auto d-block"
        />
      </div>
    </>
  );
}
