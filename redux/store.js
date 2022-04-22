import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./features/token";
import playingSoundReducer from "./features/playingSound";

export default configureStore({
  reducer: {
    token: tokenReducer,
    playingSound: playingSoundReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
