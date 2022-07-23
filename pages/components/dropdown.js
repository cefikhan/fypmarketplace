import React,{useState} from 'react';
import {MenuItems} from "./MenuItems.js"
import styles from "./Dropdown.module.css";
import Link from 'next/link';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faS } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Dropdown(){

    const [click,setClick] = useState(false);
    const handleClick = ()=> setClick(!click);
    return<div className={styles.prt}>

        <ul onClick={handleClick} 
        className={click? `${styles.dropdown_menu} ${styles.clicked}`:`${styles.dropdown_menu}`}
        >
{MenuItems.map((item,index)=>{
    return(<li key={index}>

<Link className={item.cName} href={item.path}
onClick = {()=>setClick(false)}
>{item.title}</Link>

    </li>)
})}


        </ul>




    </div>
}

export default Dropdown;