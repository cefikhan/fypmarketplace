import React,{useState} from 'react';
import {ethers} from 'ethers';

import Button from "./Button.js"
import styles from "./Navbar.module.css";
import Dropdown from "./Dropdown.js";
import Link from 'next/link';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faS } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Web3Modal from "web3modal"

function Navbar(){


      async function buyNFT(){
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    //sign the transaction
    const signer = provider.getSigner();

}



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
                       <Link href='/launch-collection'>
                        Launch Collection
                    </Link>
                    </li>
                <li className={styles.nav_items}>
                 <Link href='/create-item'>
                    Create NFT
                    </Link>
                </li>
               
            </ul>

            <button className={styles.btn_main}
            
        onClick={()=>buyNFT()}
            
            >Connect wallet</button>


        </nav>

    </div>)
}

export default Navbar