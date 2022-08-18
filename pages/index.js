import React,{useEffect} from 'react'
import { Button } from '@mui/material'
import styles from "./styling/home.module.css"
import Intro from './components/Intro'
import Slider from "./slider/Slider"
import Cards from "./components/Card"
import Car from "./components/Carousel"
import Footer from "./components/Footer"
import {useSelector,useDispatch} from "react-redux";
import {getnftItems} from "../store/nftSlice"

function homepage() {
 const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getnftItems())
  },[])
  return (
    <div className={styles.prt}>

      <div className={styles.homepg}>
        <div className={styles.intro}>
            <Intro/>
         </div>
        <div className={styles.right_panel}>
             <Slider/>
         </div>
      </div>
<div className={styles.cards}>
  <Cards/>
</div>
<div className={styles.car}>
  <Car/>
</div>
<div className={styles.foter}>
  <Footer/>
</div>
    </div>
  )
}

export default homepage