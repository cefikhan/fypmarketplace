import {useState } from 'react'
import {ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import axios from 'axios'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

import {
    nftmarketaddress
} from '../config';

import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import { EtherscanProvider } from '@ethersproject/providers'
import NFTCollection from "../artifacts/contracts/NFTCollection.sol/NFTcollection.json";


export default function LaunchCollection(){
    const [collection,setCollections] = useState([]);
    const [statecontract,setstatecontract] = useState();

    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState(false);



    const router = useRouter();








    //













async function getNFTCollectionContract(){
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



async function updateSpecificCollection(collectionAddress){
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(collectionAddress,NFTCollection.abi,signer);

    setstatecontract(contract);
    let tx = await contract.name();

    console.log(`collectionAddress is ${collectionAddress}`)
    console.log(`contract name is ${tx}`);
}




async function getNFTSofSpecificCollection(collectionAddress){
     const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(collectionAddress,NFTCollection.abi,signer);
    // await setstatecontract( contract);
    // let tx = await contract.name();

    let tokenIds = await contract.AllTokenIds()

    tokenIds.map(obj=>console.log(obj.toString()));
    console.log(tokenIds);





    
    const items = await Promise.all(tokenIds.map(async i => {
      const tokenUri = await contract.tokenURI(i.toString())
      const meta = await axios.get(tokenUri)
      
      console.log(meta.data);
      let item = {
    
        tokenId: i.toString(),
     name:meta.data.name,
        image: meta.data.image,
      }
      return item
    }))
    setNfts(items)
    setLoadingState(true) 







}

        return (
        <>
     <button onClick={()=>getNFTCollectionContract()}
                     className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
                     >Get Collections</button>
                      <h1>COLLECTION DETAILS</h1>
                    {collection.map((obj)=>{
                        return(
                        <div  key={obj.name} >
                        <h1> Name : {obj.name}</h1>
                        <h1> Symbol : {obj.symbol}</h1>
                        <h1> Address : {obj.addr}</h1>
                        <button 
                        className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
                        onClick={()=>updateSpecificCollection(obj.addr)}>Insert NFT into Collection</button>
                       <button 
                        className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
                        onClick={()=>getNFTSofSpecificCollection(obj.addr)}>GET NFT for this Collection</button>


                    <br/>
                        </div>
                        )
                    })}








     { loadingState && <div className="flex justify-center">
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
         

                <img
                            src={nft.image}
                            alt="Picture of the author"
                            className="rounded"
                            width="350"
                          />
           
              </div>
            ))
          }
        </div>
      </div>
    </div>}




































        </>
    )

}