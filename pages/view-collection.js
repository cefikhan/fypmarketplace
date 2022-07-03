import {useState } from 'react'
import {ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

import {
    nftmarketaddress
} from '../config';

import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';


import { EtherscanProvider } from '@ethersproject/providers'


export default function LaunchCollection(){
    const [collection,setCollections] = useState([]);

    const router = useRouter();

async function createItem(){
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
            <button onClick={createItem}
                     className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
                     >Get Collections</button>
                      <h1>COLLECTION DETAILS</h1>
                    {collection.map((obj)=>{
                        return(
                        <div  key={obj.name}>
                        <h1> Name : {obj.name}</h1>
                        <h1> Symbol : {obj.symbol}</h1>
                        <h1> Address : {obj.addr}</h1>
                    <br/>
                        </div>
                        )
                    })}
        </>
    )

}