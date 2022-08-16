import React from 'react'
import styles from "./styling/home.module.css"
import Intro from './components/Intro'
import Slider from "./slider/Slider"
import Cards from "./components/Card"
import Car from "./components/Carousel"
import Footer from "./components/Footer"
function homepage() {
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