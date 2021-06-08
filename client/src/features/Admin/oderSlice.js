import { createSlice } from '@reduxjs/toolkit';
const initalState = {
    order : [],
    totalOder : 0
};


const oder = createSlice({
    name: 'oder',
    initialState: initalState,
    reducers: {
        AddToOder: (state, action) => {
            state.order = (action.payload.order)
            state.totalOder = action.payload.countFullOrder
        },
        DeleteOder: (state, action) => {
            console.log("hello", action);
        },
        
    }  

});

const { reducer, actions } = oder;
export const { AddToOder, DeleteOder } = actions;
export default reducer;