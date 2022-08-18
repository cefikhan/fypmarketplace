import React from "react";
import styles from "./card.module.css"
import BuyNfts from "./Nftgrid"


function App(){
  return<>
     <h1 className={styles.headr}>NEW ITEMS</h1>
  <BuyNfts/>
  </>
}

export default App;