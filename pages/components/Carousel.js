import React from "react";
import Carousel from "react-elastic-carousel";
import styles from "./carousel.module.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function App() {
  return (
    <>
      {/* <h1 style={{ textAlign: "center" }}>Example to setup your carousel in react</h1> */}
            <h1>Example to setup your carousel in react</h1>
      <div className="App">
        <Carousel breakPoints={breakPoints}>
        <div className={styles.item}>ONE</div>
        <div className={styles.item}>TWO</div>
        <div className={styles.item}>THREE</div>
        <div className={styles.item}>FOUR</div>
        <div className={styles.item}>FIVE</div>
        <div className={styles.item}>SIX</div>
        <div className={styles.item}>SEVEN</div>
        </Carousel>
      </div>
    </>
  )
}

export default App