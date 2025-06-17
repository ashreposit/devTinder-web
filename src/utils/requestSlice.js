import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:"request",
    initialState:null,
    reducers:{
        addRequest:(state,action)=>{
            return action.payload;
        },
        removeRequest:(state,action)=>{
            return null;
        }
    }
});

export const {addRequest,RemoveRequest} = requestSlice.actions;

export default requestSlice.reducer;