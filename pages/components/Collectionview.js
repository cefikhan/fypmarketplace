import {useEffect, useState } from 'react'
import {ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import axios from 'axios'
import styles from "./card.module.css"


const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
import {
    nftmarketaddress
} from '../../config';
import Market from '../../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import { EtherscanProvider } from '@ethersproject/providers'
import NFTCollection from "../../artifacts/contracts/NFTCollection.sol/NFTcollection.json";
export default function ViewCollection(){
    const [collection,setCollections] = useState([]);

    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState(false);





    const router = useRouter();

    useEffect(()=>{
        readCollections();
    },[])


    
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
   
              <div className="flex justify-center">
     <div className="px-4" style={{ maxWidth: '1600px'}}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {
          collection.map((nft, i) =>(
            <div key={i} className="border shadow rounded-xl overflow-hidden">
             

                        <div className="p-4 bg-slate-50	text-black">
                <p style={{ height: '64px'}} className="text-2xl font-semibold">
                  {nft.name}
                </p>
                <div style={{ height: '70px', overflow: 'hidden'}}>
                  <p className="text-white-400">{nft.symbol}</p>
                </div>
              </div>
              <div className="p-4 bg-black">
                <p className="text-2xl mb-4 font-bold text-white">
             
                </p>
                <button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                onClick={()=>getNFTSofSpecificCollection(nft.addr)}
                >VIEW COLLECTION</button>
            </div>
            </div>
          ))
        }
      </div>
     </div>
   </div>









<br />
<br />




{ loadingState && <>

     <h1 className={styles.headr}
     
     style={{marginBottom:"20px",marginTop:"50px"}}
     
     >NFTS oF COLLECTION</h1>


 <div className="flex justify-center">
     <div className="px-4" style={{ maxWidth: '1600px'}}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {
          nfts.map((nft, i) =>(
            <div key={i} className="border shadow rounded-xl overflow-hidden">
             
              <img
                  src={nft.image}
                  className="bg-white"
                  alt="Picture of the author"
style={{height:"374px",width:"374px"}}
                  width="500"
                   height="500"  />


            <div className="p-4 	text-white bg-black">
              
                <p style={{ height: '64px'}} className="text-2xl font-semibold">
                  {nft.name}
                </p>


                <div style={{ height: '70px', overflow: 'hidden'}}>
                  <p className="text-white-400">{nft.tokenId} TokenId</p>
                </div>

            </div>


              {/* <div className="p-4 bg-black">
                <p className="text-2xl mb-4 font-bold text-white">
                  {nft.price} ETH
                </p>
                <button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                onClick={() => buyNFT(nft)}>Buy NFT</button>
            </div> */}
            </div>
          ))
        }
      </div>
     </div>
   </div>

    
    
    </>
    
    }

        </>
    )

}






































{/* <div className="flex justify-center">
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
         

                <img
                            src={nft.image}
                            alt="Picture of the author"
                            className="rounded"
                            width="350"  />
           
              </div>
            ))
          }
        </div>
      </div>
    </div> */}