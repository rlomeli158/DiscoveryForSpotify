import { createSlice } from "@reduxjs/toolkit";

export const databaseSlice = createSlice({
  name: "database",
  initialState: {
    db: null,
  },
  reducers: {
    setFirestore: (state, action) => {
      state.db = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFirestore } = databaseSlice.actions;

export default databaseSlice.reducer;
