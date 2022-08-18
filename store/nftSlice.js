import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import Web3Modal from "web3modal"
import { nftaddress, nftmarketaddress } from '../config';
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import axios from 'axios';
import { ethers } from "ethers";
import {useDispatch,useSelector} from "react-redux"

const initialState={
    nftItems:[],
    isLoading:true
}

export const getnftItems = createAsyncThunk("name/getCartItems",async(name,thunkAPI)=>{
    try{

   // const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/4fa55521d0f647f28c1a179e85f454da");
    // const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/187f77dc14dd4f0c8f0224ef0c7d6158");
 const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/")

       const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider);

    const data = await marketContract.fetchMarketItems();


    const items = await Promise.all(data.map(async i => {
       const tokenUri = await tokenContract.tokenURI(i.tokenId);
       const meta = await axios.get(tokenUri);
       let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
       let item = {
         price,
         tokenId: i.tokenId.toNumber(),
         seller: i.seller,
         owner: i.owner,
         image: meta.data.image,
         name: meta.data.name,
         description: meta.data.description,
       }
       return item;
    }));

        return items
    }catch(e){
        return thunkAPI.rejectWithValue('something went wrong')
    }
})





export const buynftItem = createAsyncThunk("name/buynftitems",async(nft,thunkAPI)=>{
    try{
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
  

    }catch(e){
        return thunkAPI.rejectWithValue('something went wrong')
    }
})













const nftSlice = createSlice({
   name:"createSlice",
initialState,
reducers:{
    clearCart:(state)=>{
        state.cartItems=[]
    },
      upCart:(state)=>{
        state.cartItems=[{"title":"Saffi"},{"title":"ali"},{"title":"chaudhary"}]
    }
},
extraReducers:{
    [getnftItems.pending]:(state)=>{
        state.isLoading = true;
    },
    [getnftItems.fulfilled]: (state, action) => {
      // console.log(action);
      state.isLoading = false;
      state.nftItems = action.payload;
    },
    [getnftItems.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },


    [buynftItem.pending]:(state)=>{
        state.isLoading = true;
    },
    [buynftItem.fulfilled]: (state, action) => {
      // console.log(action);
      state.isLoading = false;

    },
    [buynftItem.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },



}
})

export const {clearCart,upCart} = nftSlice.actions

export default nftSlice.reducer;