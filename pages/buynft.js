import {ethers} from 'ethers';
import { useEffect, useState } from 'react';
import {useDispatch,useSelector} from "react-redux"
import {getnftItems,buynftItem} from "../store/nftSlice"

export default function Home() {
  const [loadingState, setLoadingState] = useState('not-loaded');
  const {nftItems,isLoading} = useSelector((store)=>store.nftReducer)
  const dispatch = useDispatch()
  useEffect(()=>{
     dispatch(getnftItems());
  }, []);


  async function buyNFT(nft){
     dispatch(buynftItem(nft));
     dispatch(getnftItems());
    
  }

  if(loadingState === 'loaded' && nfts.length===0) return (
    <h1 className="px-20 py-10 text-3xl">No items in market place</h1>
  )

  return (
   <div className="flex justify-center">
     <div className="px-4" style={{ maxWidth: '1600px'}}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {
  
         nftItems.map((nft,i)=>(
            <div key={i} className="border shadow rounded-xl overflow-hidden">
             
              <img
                  src={nft.image}
                  alt="Picture of the author"
style={{height:"374px",width:"374px"}}
                  width="500"
                   height="500"
                />
                        <div className="p-4">
                <p style={{ height: '64px'}} className="text-2xl font-semibold">
                  {nft.name}
                </p>
                <div style={{ height: '70px', overflow: 'hidden'}}>
                  <p className="text-gray-400">{nft.description}</p>
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
