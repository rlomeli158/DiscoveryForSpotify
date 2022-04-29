import { createSlice } from "@reduxjs/toolkit";

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    user: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
