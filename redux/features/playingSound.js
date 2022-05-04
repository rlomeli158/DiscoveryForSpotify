import { createSlice } from "@reduxjs/toolkit";

export const playingSoundSlice = createSlice({
  name: "playingSound",
  initialState: {
    value: false,
    source: "",
  },
  reducers: {
    setPlayingSound: (state, action) => {
      state.value = action.payload;
    },
    setSoundSource: (state, action) => {
      state.source = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPlayingSound, setSoundSource } = playingSoundSlice.actions;

export default playingSoundSlice.reducer;
