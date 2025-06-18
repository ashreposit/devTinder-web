import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: 'connection',
  initialState: null,
  reducers: {
    addConnection: (state, action) => {
      return action.payload;
    },
    removeConnection: (state, action) => {
      let newArray = state.filter((connection)=> connection.connectionId !== action.payload);
      return newArray;
    }
  }
})

export const { addConnection, removeConnection } = connectionSlice.actions;

export default connectionSlice.reducer;