import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./features/token";

export default configureStore({
  reducer: {
    token: tokenReducer,
  },
});
