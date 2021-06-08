import { createSlice } from '@reduxjs/toolkit';
import productApi from 'api/productsAPI';
const initalState = {
    allProducts : [],
    filterProducts : [],
    loading:false,
}

const product = createSlice({
    name: 'products',
    initialState: initalState,
    reducers: {
        AddToProduct: (state, action) => {
            state.allProducts.push(...action.payload);
        },
        AddToFilterProducts : (state,action) =>{
            state.filterProducts = action.payload
        },
        DeleteProduct: (state, action) => {
            const remove = async () => {
                await productApi.delete(action.payload)
            }
            remove()
            return state.allProducts.filter(item => item._id !== action.payload)
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
export const { DeleteProduct, EditProduct, AddToProduct, AdminAddProduct,AddToFilterProducts } = actions;
export default reducer;