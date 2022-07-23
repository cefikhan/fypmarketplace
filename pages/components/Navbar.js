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


    const [click,setClick] = useState(false);
    const [dropdown,setDropdown] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu=()=>setClick(false)

    const onMouseEnter = ()=>{
        if(window.innerWidth<960){
            setDropdown(false)
        }else{
            setDropdown(true)
        }
    }

        const onMouseLeave = ()=>{
        if(window.innerWidth<960){
            setDropdown(false)
        }else{
            setDropdown(false)
        }
    }


    return(<>
    <div className={styles.prt}>
        <nav className={styles.navbar}>
        <Link href='/' className={styles.navbar_logo}>
            EPIC
        </Link>


        <div className={styles.menu_icon} onClick={handleClick}>
          {click?<FontAwesomeIcon icon={faTimes} />:<FontAwesomeIcon icon={faBars}/>}
        </div>


        <ul className={click ?`${styles.nav_menu} ${styles.active}`:`${styles.nav_menu}`}>

               <li className={styles.nav_item}>
                      <Link href='/' className={styles.nav_links}  onClick={closeMobileMenu}>
                              Home            
                    </Link>
              </li>

              <li className={styles.nav_item}   onMouseEnter={onMouseEnter}  onMouseLeave={onMouseLeave}>          
                <Link href='/' className={styles.nav_links}  onClick={closeMobileMenu}>
                <>  Services <FontAwesomeIcon icon={faCaretDown} />        
                    </></Link>
                {dropdown && <Dropdown/>}
            </li>


        <li className={styles.nav_item}>
            <Link href='/' className={styles.nav_links}  onClick={closeMobileMenu}>
             Contact Us            
            </Link>
        </li>

        <li className={styles.nav_item}>
            <Link href='/' className={styles.nav_links}  onClick={closeMobileMenu}>
             Sign Up        
            </Link>
        </li>
        </ul>

<Button/>


        </nav>
        </div>
    </>)
}

export default Navbar