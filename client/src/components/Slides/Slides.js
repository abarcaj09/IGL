import "./Slides.css";
import React, { useState } from "react";
import ChevronLeftSharpIcon from "@material-ui/icons/ChevronLeftSharp";
import ChevronRightSharpIcon from "@material-ui/icons/ChevronRightSharp";

const Slides = ({ photos }) => {
  const [current, setCurrent] = useState(0);
  const length = photos.length;

  const nextSlide = () => {
    setCurrent(current + 1);
  };

  const previousSlide = () => {
    setCurrent(current - 1);
  };

  return (
    <div className="slides">
      {current !== 0 && (
        <div className="slides-arrow arrow-left" onClick={previousSlide}>
          <ChevronLeftSharpIcon />
        </div>
      )}

      {current !== length - 1 && (
        <div className="slides-arrow arrow-right" onClick={nextSlide}>
          <ChevronRightSharpIcon />
        </div>
      )}

      {photos.map((photo, index) => {
        return (
          <div
            className={index === current ? "active slide" : "slide"}
            key={index}
          >
            {index === current && <img src={photo} alt="slide image" />}
          </div>
        );
      })}
    </div>
  );
};

export default Slides;
