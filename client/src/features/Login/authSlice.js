import { createSlice } from '@reduxjs/toolkit';
const initalState = {
    "isAdmin": false,
    "accesstoken": "",
    "user":{}
};


const auth = createSlice({
    name: 'auth',
    initialState: initalState,
    reducers: {
        admin: (state, action) => {
            state.isAdmin = action.payload.isAdmin
        },
        addToUser : (state,action) => {
            state.user = action.payload
        }

    }

});

const { reducer, actions } = auth;
export const { rf_token, admin,addToUser } = actions;
export default reducer;