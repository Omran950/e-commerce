import React from "react";
import Slider from "react-slick";
import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";
import { Link } from 'react-router-dom';

export default function CategorySlider() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery("getCategories", getCategories);
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    swipeToSlide: true,
  };

  return (
    <>
      <h2 className="text-success">Shop Popular Categories</h2>
      <Slider {...settings}>
        {data.data.data.map((category, idx) => (
          <div key={idx}>
              <Link to={`/productSearchByCategory/${category._id}`}>
              <img
                src={category.image}
                alt={category.image}
                className="w-100"
                style={{ height: "200px" }}
              />
              <h6 className="text-center text-success mt-2">{category.name}</h6>
          </Link>
            </div>
        ))}
      </Slider>
    </>
  );
}
