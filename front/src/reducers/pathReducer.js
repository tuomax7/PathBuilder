import { createSlice } from "@reduxjs/toolkit";

const pathSlice = createSlice({
  name: "paths",
  initialState: [],
  reducers: {
    createPath(state, action) {
      const newPath = action.payload;
      state.push(newPath);
    },
    setPaths(state, action) {
      return action.payload;
    },
  },
});

export const { createPath, setPaths } = pathSlice.actions;
export default pathSlice.reducer;
