import {configureStore} from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from 'next-redux-wrapper'

import nftReducer from "./nftSlice"

export const store =()=> configureStore({
    reducer:{
        nftReducer:nftReducer
    }
})

export const wrapper = createWrapper(store, { debug: true });