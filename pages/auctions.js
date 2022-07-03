import {ethers} from "ethers";
import { useState,useEffect } from "react";
import axios from 'axios';
import Web3Modal from "web3modal";
import {auctionmarketaddress} from "../config";

import AuctionMarket from "../artifacts/contracts/AuctionMarket.sol/AuctionMarket.json";

export default function Auctions(){
    const [loadingState,setLoadingState] = useState('not-loaded');

    async function loadAuctions(){
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const marketContract = new ethers.Contract(auctionmarketaddress, AuctionMarket.abi, signer);

    const data = await marketContract.getAuctions();
    console.log(data);
    }



}