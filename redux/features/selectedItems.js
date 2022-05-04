import { createSlice } from "@reduxjs/toolkit";

export const selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => {
        return item.id != action.payload.id;
      });
    },
    clearAllItems: (state) => {
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearAllItems } =
  selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;
