import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./features/token";
import playingSoundReducer from "./features/playingSound";
import commentsTrayReducer from "./features/commentsTray";
import currentUserReducer from "./features/currentUser";
import databaseReducer from "./features/database";

export default configureStore({
  reducer: {
    token: tokenReducer,
    playingSound: playingSoundReducer,
    commentsTray: commentsTrayReducer,
    currentUser: currentUserReducer,
    database: databaseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
