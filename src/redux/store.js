import { configureStore } from "@reduxjs/toolkit";

import customerReducer from './reducers/customerReducers'


export const store = configureStore({
    reducer:{
        customers: customerReducer,
    }
}) 