import React from "react";
import styles from "./Slider.module.css";
import leftArrow from "./icons/left-arrow.svg";
import rightArrow from "./icons/right-arrow.svg";


import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faS } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";


export default function BtnSlider({ direction, moveSlide }) {
  console.log(direction, moveSlide);
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? `${styles.btn_slide} ${styles.next}` : `${styles.btn_slide} ${styles.prev}`}
    >
    
      {/* <img src={direction === "next" ? rightArrow : leftArrow} /> */}

      {direction==="next"?<FontAwesomeIcon style={{color:"grey",height:"100%"}} icon={faArrowAltCircleRight} />:<FontAwesomeIcon style={{color:"grey",height:"100%"}} icon={faArrowAltCircleLeft} />}
    </button>
  );
}
