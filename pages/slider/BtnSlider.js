import React from "react";
import styles from "./Slider.module.css";
import leftArrow from "./icons/left-arrow.svg";
import rightArrow from "./icons/right-arrow.svg";

export default function BtnSlider({ direction, moveSlide }) {
  console.log(direction, moveSlide);
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? `${styles.btn_slide} ${styles.next}` : `${styles.btn_slide} ${styles.prev}`}
    >
      <img src={direction === "next" ? rightArrow : leftArrow} />
    </button>
  );
}
