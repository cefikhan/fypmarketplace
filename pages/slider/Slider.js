import React, {useState} from 'react'
import { useEffect } from 'react';
import styles from './Slider.module.css'
import BtnSlider from './BtnSlider'
import dataSlider from './dataSlider'
import {useSelector} from "react-redux"
export default function Slider() {

  const [slideIndex, setSlideIndex] = useState(1)
  const [loadingState, setLoadingState] = useState('not-loaded');
  const {nftItems} = useSelector((store)=>store.nftReducer)

    const nextSlide = () => {
        if(slideIndex !== dataSlider.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === dataSlider.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(dataSlider.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    return (
        <div className={styles.container_slider}>
            {nftItems.map((obj, index) => {
                return (
                    <div
                    key={obj.id}
                    className={slideIndex === index + 1 ? `${styles.slide} ${styles.active_anim}` : `${styles.slide}`}
                    >
                        <img 
                        src={obj.image}
                           title="Simple Risotto" 
                        />
                    </div>
                )
            })}
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

            <div className={styles.container_dots}>
                {Array.from({length: 5}).map((item, index) => (
                    <div key={index}
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ?  `${styles.dot} ${styles.active}` : `${styles.dot}`}
                    ></div>
                ))}
            </div>
        </div>
    )
}