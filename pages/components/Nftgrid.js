import {ethers} from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from "web3modal"
import { nftaddress, nftmarketaddress } from '../../config';
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import {useSelector} from "react-redux"

export default function Home() {
  
  const [loadingState, setLoadingState] = useState('not-loaded');
  const {nftItems} = useSelector((store)=>store.nftReducer)

  async function buyNFT(nft){
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    //sign the transaction
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

    //set the price
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');

    //make the sale
    const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
      value: price
    });
    await transaction.wait();

 
  }

  if(loadingState === 'loaded' && nfts.length===0) return (
    <h1 className="px-20 py-10 text-3xl">No items in market place</h1>
  )

  return (
   <div className="flex justify-center">
     <div className="px-4" style={{ maxWidth: '1600px'}}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {
          nftItems.map((nft, i) =>(
            <div key={i} className="border shadow rounded-xl overflow-hidden">
             
              <img
                  src={nft.image}
                  className="bg-white"
                  alt="Picture of the author"
style={{height:"374px",width:"374px"}}
                  width="500"
                   height="500"
                  // blurDataURL="data:..." automatically provided
                  // placeholder="blur" // Optional blur-up while loading
                />
                        <div className="p-4 bg-slate-50	text-black">
                <p style={{ height: '64px'}} className="text-2xl font-semibold">
                  {nft.name}
                </p>
                <div style={{ height: '70px', overflow: 'hidden'}}>
                  <p className="text-white-400">{nft.description}</p>
                </div>
              </div>
              <div className="p-4 bg-black">
                <p className="text-2xl mb-4 font-bold text-white">
                  {nft.price} ETH
                </p>
                <button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                onClick={() => buyNFT(nft)}>Buy NFT</button>
            </div>
            </div>
          ))
        }
      </div>
     </div>
   </div>
  )
}
