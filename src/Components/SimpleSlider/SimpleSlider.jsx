import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <Slider {...settings}>
      <div>
        <img
          src={require("../../images/slider-image-1.jpeg")}
          alt="Vegetables bag"
          className="w-100"
          style={{ height: "400px" }}
        />
      </div>
      <div>
        <img
          src={require("../../images/slider-image-2.jpeg")}
          alt="chocozay - wafer rolls - Red Velvet"
          className="w-100"
          style={{ height: "400px" }}
        />
      </div>
      <div>
        <img
          src={require("../../images/slider-image-3.jpeg")}
          alt="cokoladni Kolutici"
          className="w-100"
          style={{ height: "400px" }}
        />
      </div>
    </Slider>
  );
}
