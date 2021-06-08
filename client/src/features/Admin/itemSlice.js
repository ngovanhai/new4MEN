import { createSlice } from '@reduxjs/toolkit';
const initalState = [];


const item = createSlice({
    name: 'item',
    initialState: initalState,
    reducers: {
        AddToItem: (state, action) => {
            console.log("action.payload",action.payload)
            state.push(action.payload)
        },
    }

});

const { reducer, actions } = item;
export const { AddToItem } = actions;
export default reducer;