import React from "react";
import {useEffect, useState } from 'react'
import {ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import axios from 'axios'
import Link from "next/link";

import Carousel from "react-elastic-carousel";
import styles from "./carousel.module.css";



const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
import {
    nftmarketaddress
} from '../../config';
import Market from '../../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import { EtherscanProvider } from '@ethersproject/providers'
import NFTCollection from "../../artifacts/contracts/NFTCollection.sol/NFTcollection.json";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function App() {


      const [collection,setCollections] = useState([]);





   useEffect(()=>{
        readCollections();
    },[])

async function readCollections(){
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();

    const adr = await signer.getAddress();
    
     let contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
     

        let transaction = await contract.getCollections();
        console.log(transaction);
        setCollections(transaction);

}









  return (
    <>
      {/* <h1 style={{ textAlign: "center" }}>Example to setup your carousel in react</h1> */}
  <h1 className={styles.headr}>COLLECTIONS</h1>
        <div className="App">
        <Carousel breakPoints={breakPoints}>
{
  collection.map((nft,i)=>(


<Link key={i} href="/view-collection">

        <div key={i} className={styles.item}>
          
          <div>{nft.name}</div>
          
        <div>
          {nft.symbol}

        </div>
        
        </div>
      
</Link>
))}
        </Carousel>
      </div>
    </>
  )
}

export default App