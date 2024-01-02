import { createSlice } from "@reduxjs/toolkit";

const pathSlice = createSlice({
  name: "paths",
  initialState: [],
  reducers: {
    createPath(state, action) {
      const newPath = action.payload;
      state.push(newPath);
    },
    addReaction(state, action) {
      const { pathToUpdate, reactionName } = action.payload;

      let reactedPath;

      switch (reactionName) {
        case "nature":
          reactedPath = {
            ...pathToUpdate,
            nature: pathToUpdate.nature + 1,
          };
          break;

        case "fun":
          reactedPath = {
            ...pathToUpdate,
            fun: pathToUpdate.fun + 1,
          };
          break;
        case "exhausting":
          reactedPath = {
            ...pathToUpdate,
            exhausting: pathToUpdate.exhausting + 1,
          };
          break;
        default:
      }
      return state.map((path) =>
        path.ID === pathToUpdate.ID ? reactedPath : path
      );
    },

    setPaths(state, action) {
      return action.payload;
    },
  },
});

export const { createPath, setPaths, addReaction } = pathSlice.actions;
export default pathSlice.reducer;
