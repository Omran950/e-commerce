import React, { useEffect, useState } from "react";
import HomeSlider from "./../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import Products from "./../Products/Products";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="py-5 mt-3">
        <HomeSlider />
      </div>
      <div className="my-3">
        <CategorySlider />
      </div>
      <Products />
    </>
  );
}
