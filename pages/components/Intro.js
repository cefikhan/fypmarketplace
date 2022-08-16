import React from 'react'
import styles from "./Intro.module.css"
function Intro() {
  return (
    <div className={styles.prt}>

    <h1 className={styles.headr}>
        Create, sell or collect digital items.
    </h1>

    <p className={styles.lead}>
        Unit of data stored on a digital ledger, called a blockchain, that certifies a digital asset to be unique and therefore not interchangeable
    </p>

<button className={styles.btn_main}>
    Explore
</button>


<div className={styles.listing}>

    <div>
    <h3>Unique</h3>
    <h5>Collectibles</h5>
    </div>

<div>
    <h3>Create</h3>
    <h5>nfts</h5>
</div>

<div>
    <h3>Show</h3>
    <h5>Creativity</h5>
</div>

</div>

    </div>
  )
}

export default Intro