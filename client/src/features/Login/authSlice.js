import { createSlice } from '@reduxjs/toolkit';
const initalState = {
    "isAdmin": false,
    "accesstoken": ""
};


const auth = createSlice({
    name: 'auth',
    initialState: initalState,
    reducers: {
        admin: (state, action) => {
            state.isAdmin = action.payload.isAdmin
        }

    }

});

const { reducer, actions } = auth;
export const { rf_token, admin } = actions;
export default reducer;