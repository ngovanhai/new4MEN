import { createSlice } from '@reduxjs/toolkit';

let itemCart = JSON.parse(localStorage.getItem('cart'))
if (itemCart === null) {
    itemCart = []
}

const initalState = itemCart

const cart = createSlice({
    name: 'cart',
    initialState: initalState,
    reducers: {
        addProductToCart: (state, action) => {
            if (itemCart === null) {
                const a = [action.payload]
                localStorage.setItem("cart", JSON.stringify(a))

            } else {
                const a = [...itemCart, action.payload]
                localStorage.setItem("cart", JSON.stringify(a))
            }
            console.log(action.payload)
            state.push(action.payload)
        },
        DeleteProductToCart: (state, action) => {
            const deleteItemCartId = action.payload;
            if (itemCart != null) {
                const filterCart = itemCart.filter(item => item.idCart !== deleteItemCartId)
                localStorage.setItem('cart', JSON.stringify(filterCart));

            }
            return state.filter(item => item.idCart !== deleteItemCartId);
        },
        deleteAllCart: (state, action) => {
            console.log(action)
            localStorage.removeItem('cart')
            return state.filter(item => item.idCart == action.payload);
        }

    }
});

const { reducer, actions } = cart;
export const { deleteAllCart, DeleteProductToCart, addProductToCart } = actions;

export default reducer;
