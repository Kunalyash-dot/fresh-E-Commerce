import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productReducer from './product.Slice';
import cartReducer from './cartProduct'
import addressReducer from './addressSlice'
import orderReducer from './orderSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        product : productReducer,
        cartItem : cartReducer,
    addresses : addressReducer,
    orders : orderReducer
},});