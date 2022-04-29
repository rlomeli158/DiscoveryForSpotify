import { createSlice } from "@reduxjs/toolkit";

export const commentsTraySlice = createSlice({
  name: "commentsTray",
  initialState: {
    open: false,
    data: null,
  },
  reducers: {
    openTray: (state, action) => {
      state.open = true;
      state.data = action.payload;
    },
    closeTray: (state) => {
      state.open = false;
      state.data = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openTray, closeTray } = commentsTraySlice.actions;

export default commentsTraySlice.reducer;
