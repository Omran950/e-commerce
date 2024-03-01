import React from "react";
import SimpleSlider from "./../SimpleSlider/SimpleSlider";

export default function HomeSlider() {
  return (
    <>
      <div className="row g-0">
        <div className="col-9">
          <SimpleSlider />
        </div>
        <div className="col-3">
          <img
            src={require("../../images/blog-img-1.jpeg")}
            className="w-100"
            alt="vegetables"
            style={{ height: "200px" }}
          />
          <img
            src={require("../../images/blog-img-2.jpeg")}
            className="w-100"
            alt="vegetables"
            style={{ height: "200px" }}
          />
        </div>
      </div>
    </>
  );
}
