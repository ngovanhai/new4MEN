import { createSlice } from '@reduxjs/toolkit';
const initalState = [];


const oder = createSlice({
    name: 'oder',
    initialState: initalState,
    reducers: {
        AddToOder: (state, action) => {
            state.push(action.payload)
        },
        DeleteOder: (state, action) => {
            console.log("hello", action);
        },

    }

});

const { reducer, actions } = oder;
export const { AddToOder, DeleteOder } = actions;
export default reducer;