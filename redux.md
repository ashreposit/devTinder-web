# redux toolkit

- install te redux toolkit npm install @reduxjs/toolkit react-redux
- create a store  ==> configureStore ==> Provider ==> createSlice ==> add reducer to the store

import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
    user:userReducer
    },
});

- create a slice 

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState :null,
    reducers:{
        addUser:(status,action)=>{
            return action.payload;
        },
        removeUser:(stuatus,action)=>{
            return null;
        }
    }
});

export const { addUser,removeUser}=userSlice.actions;

export default userSlice.reducer;