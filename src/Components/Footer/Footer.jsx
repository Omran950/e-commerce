import React from "react";

export default function Footer() {
  return (
    <>
      <div className=" bg-main-light py-5">
        <div className="container">
          <h2 className="h5">Get the FreshCart app</h2>
          <p className="fw-light">
            We will send you a link , open it on your phone to download the app
          </p>
          <div className="row gy-3">
            <div className="col-md-10">
              <input
                type="email"
                placeholder="Email..."
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <button className="btn btn-success">Share App Link</button>
            </div>
            <p className="text-center border-1 border-top border-black pt-4 mt-5">
              
              &copy; 2024 Mohammed Omran , All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
