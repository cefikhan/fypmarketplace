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
    return(<div className={styles.prt}>
        <ul className={click?`${styles.dropdown_menu} ${styles.clicked}`:`${styles.dropdown_menu}`}
        onClick={handleClick}
        >
            <li>
                <Link href='/buynft' >
                    <div className={styles.dropdown_link}   >
                        Buy NFT
                    </div>
                </Link>
            </li>
            
                <li>
                    <Link href='/view-collection'>
                        <div className={styles.dropdown_link}>
                                Collection
                        </div>
                     </Link>
                </li>
                
                <li><Link href='/my-assets'>
                
                      <div className={styles.dropdown_link}   >
                        My NFT
                    </div>
                    </Link>
                </li>
                   <li><Link href='/creator-dashboard'>
                
                      <div className={styles.dropdown_link}   >
                     Dashboard
                    </div>
                    </Link>
                </li>


                <li>
                    <Link href='/update-col'>
                      <div className={styles.dropdown_link}   >
                     Update Collection
                    </div>
                    </Link>
                </li>
        </ul>

    </div>)
}

export default Dropdown;