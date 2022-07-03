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

    const [formInput, updateFormInput] = useState({name: '', symbol:''})
    const router = useRouter();

async function createItem(){
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const adr = await signer.getAddress();
    
     let contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
     const {name, symbol} = formInput;
     if(!name || !symbol ) {
            return
        }

        let transaction = await contract.createCollection(name,symbol,adr);
        await transaction.wait()
}

        return (
        <div className="flex justify-center">
            <div className="w-1/2 flex flex-col pb-12">
                <input 
                    placeholder="Collection Name"
                    className="mt-8 border rounded p-4"
                    onChange={e => updateFormInput({...formInput, name: e.target.value})}
                    />
                <textarea
                     placeholder="Collection Symbol"
                     className="mt-2 border rounded p-4"
                     onChange={e => updateFormInput({...formInput, symbol: e.target.value})}
                     />

                <button onClick={createItem}
                     className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
                     >Create Collection</button>
            </div>
        </div>
    )

}