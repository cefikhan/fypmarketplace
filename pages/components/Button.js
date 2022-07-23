import React from 'react'
import Link from 'next/link'
import styles from "./Button.module.css"


function Button() {
  return (
    <div className="prt">

 
    <Link href='/'>
  
<button       className={styles.btn}>Sign Up</button>
    </Link>
       </div>
  )
}

export default Button