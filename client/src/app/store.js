import { configureStore } from '@reduxjs/toolkit';
import productReducer from 'features/Products/productSlice';
import cartReducer from 'features/Cart/cartSlice';
import oderReducer from 'features/Admin/oderSlice';
import authReducer from 'features/Login/authSlice';
import itemReducer from 'features/Admin/itemSlice';


const rootReducer = {
    products: productReducer,
    cart: cartReducer,
    oder: oderReducer,
    auth: authReducer,
    item: itemReducer
}
const store = configureStore({
    reducer: rootReducer,
});

export default store;