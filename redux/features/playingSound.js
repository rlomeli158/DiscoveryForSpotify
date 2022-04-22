import { createSlice } from "@reduxjs/toolkit";

export const playingSoundSlice = createSlice({
  name: "playingSound",
  initialState: {
    value: false,
  },
  reducers: {
    setPlayingSound: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPlayingSound } = playingSoundSlice.actions;

export default playingSoundSlice.reducer;
