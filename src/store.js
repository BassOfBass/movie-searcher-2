import { configureStore } from "@reduxjs/toolkit";
import { configReducer } from "./reducers/tmdb-config";

export const store = configureStore({
  reducer: {
    tmdbConfig: configReducer
  }
});