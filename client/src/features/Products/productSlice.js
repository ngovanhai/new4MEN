import { createSlice } from '@reduxjs/toolkit';
import productApi from 'api/productsAPI';
const initalState = [];


const product = createSlice({
    name: 'products',
    initialState: initalState,
    reducers: {
        AddToProduct: (state, action) => {
            state.push(...action.payload);
        },
        DeleteProduct: (state, action) => {
            const remove = async () => {
                await productApi.delete(action.payload)
            }
            remove()
            return state.filter(item => item._id !== action.payload)
        },
        EditProduct: (state, action) => {
            console.log("edit")
        },
        AdminAddProduct: (state, action) => {
            const addProduct = async () => {
                await productApi.state(action.payload)
            }
            addProduct();
        }

    }

});

const { reducer, actions } = product;
export const { DeleteProduct, EditProduct, AddToProduct, AdminAddProduct } = actions;
export default reducer;