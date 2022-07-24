import React from 'react'
import styles from "./styling/home.module.css"
import Intro from './components/Intro'
import Slider from "./slider/Slider"
function homepage() {
  return (
    <div>

      <div className={styles.homepg}>
        <div className={styles.intro}>
            <Intro/>
         </div>
        <div className={styles.right_panel}>
             <Slider/>
         </div>
      </div>

    </div>
  )
}

export default homepage