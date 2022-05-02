import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./features/token";
import playingSoundReducer from "./features/playingSound";
import commentsTrayReducer from "./features/commentsTray";
import currentUserReducer from "./features/currentUser";
import selectedItemsReducer from "./features/selectedItems";

export default configureStore({
  reducer: {
    token: tokenReducer,
    playingSound: playingSoundReducer,
    commentsTray: commentsTrayReducer,
    currentUser: currentUserReducer,
    selectedItems: selectedItemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
