import { createSlice } from '@reduxjs/toolkit';
const initalState = [];


const item = createSlice({
    name: 'item',
    initialState: initalState,
    reducers: {
        AddToItem: (state, action) => {
            state.push(action.payload)
        },
    }

});

const { reducer, actions } = item;
export const { AddToItem } = actions;
export default reducer;