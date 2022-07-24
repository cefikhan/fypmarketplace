import React,{useState} from 'react';
import Button from "./Button.js"
import styles from "./Navbar.module.css";
import Dropdown from "./Dropdown.js";
import Link from 'next/link';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faS } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar(){

  const [dropdown, setDropdown] = useState(false);
const onMouseEnter = () => {
  setDropdown(true)
  };

  const onMouseLeave = () => {
 
      setDropdown(false);
  
  };
    return(<div className={styles.prt}>
        <nav className={styles.navbar}>
            <Link href='/'
     
            >
                <div className={styles.navbar_logo}>
                NFTLAND
                </div>
            
            </Link>

            <ul className={styles.nav_menu}
                           

            >
                 <li className={styles.nav_items}
               onMouseEnter={onMouseEnter}
               onMouseLeave={onMouseLeave}
                 >
                            { dropdown &&  <Dropdown/>}
                      <Link href='/'>
                        Explore
                    </Link>

         

                </li>
                <li className={styles.nav_items}>
                       <Link href='/'>
                        Launch Collection
                    </Link>
                    </li>
                <li className={styles.nav_items}>
                 <Link href='/'>
                    Create NFT
                    </Link>
                </li>
               
            </ul>

            <button className={styles.btn_main}>Connect wallet</button>

        </nav>

    </div>)
}

export default Navbar