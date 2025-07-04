"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ImgSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="mt-5 relative">
      <Slider {...settings}>
        {[
          "/images/slider-badging.jpg",
          "/images/slider-scale.jpg",
          "/images/slider-badag.jpg",
          "/images/slider-scales.jpg",
        ].map((src, index) => (
          <div key={index} className="px-1">
            <a className="block relative cursor-pointer rounded overflow-hidden group transition-all duration-300">
              <img
                src={src}
                alt=""
                className="w-full h-full rounded shadow-lg border-4 border-transparent group-hover:border-white group-hover:border-opacity-80 transition-all duration-300"
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImgSlider;
