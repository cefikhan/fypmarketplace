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
import NFTCollection from "../artifacts/contracts/NFTCollection.sol/NFTcollection.json";
import { EtherscanProvider } from '@ethersproject/providers'


export default function updateCollection(){
const [collection,setCollections] = useState([]);
const [statecontract,setstatecontract] = useState();
const [flag,setflag] = useState(true);

const [fileUrl, setFileUrl] = useState(null)
const [formInput, updateFormInput] = useState({price: '', name: '', description:''})


async function onChange(e){
    const file = e.target.files[0];
    try{
        const added = await client.add(
            file,
            {
                progress:(prog)=>console.log(`received: ${prog}`)
            }
        )
              const url = `https://ipfs.infura.io/ipfs/${added.path}`
            setFileUrl(url)
    }catch(e){
        console.log('Error uploading file : ',e)
    }
}


async function createItem(){
    const {name,description,price} = formInput;
    if(!name||!description||!price ||!fileUrl){
        return
    }

    const data = JSON.stringify({
        name,description,image:fileUrl
    })

    try{

        const added = await client.add(data)
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
           createSale(url)
    }catch(error){
        console.log(`Error uploading file: `,error);
    }
}

async function createSale(url){

    let transaction = await statecontract.createToken(url)
    let tx = await transaction.wait()
    console.log('Transaction: ',tx)
    console.log('Transaction events: ',tx.events[0])
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber() 
        console.log(`tokenId is ${tokenId } is minted`);
}

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

async function updateStatecontract(collectionAddress){
     const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = await new ethers.Contract(collectionAddress,NFTCollection.abi,signer);
    setstatecontract(contract);
    let tx = await contract.name();

    console.log(`collectionAddress is ${collectionAddress}`)
    console.log(`contract name is ${tx}`);
}


async function getNFTSofSpecificCollection(collectionAddress){

    let tokenIds = await statecontract.AllTokenIds()
    console.log(tokenIds);

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



                    {flag&& <div className="flex justify-center">
            <div className="w-1/2 flex flex-col pb-12">
                <input 
                    placeholder="Asset Name"
                    className="mt-8 border rounded p-4"
                    onChange={e => updateFormInput({...formInput, name: e.target.value})}
                    />
                <textarea
                     placeholder="Asset description"
                     className="mt-2 border rounded p-4"
                     onChange={e => updateFormInput({...formInput, description: e.target.value})}
                     />
                <input 
                    placeholder="Asset Price in Eth"
                    className="mt-8 border rounded p-4"
                    type="number"
                    onChange={e => updateFormInput({...formInput, price: e.target.value})}
                    />
                    <input
                        type="file"
                        name="Asset"
                        className="my-4"
                        onChange={onChange}
                    />
                    {
                        fileUrl && (
                            <img
                            src={fileUrl}
                            alt="Picture of the author"
                            className="rounded mt-4"
                            width="350"
                          />
                        )
                    }
                    <button onClick={createItem}
                     className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
                     >Create NFT</button>
            </div>
        </div>
                    }








        </>
    )
}