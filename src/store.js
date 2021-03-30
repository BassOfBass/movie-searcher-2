import { configureStore } from "@reduxjs/toolkit";
import { configReducer } from "./reducers/tmdb-config";
import { tmdbListReducer } from "./reducers/tmdb-list";

export const store = configureStore({
  reducer: {
    tmdbConfig: configReducer,
    tmdbList: tmdbListReducer
  }
});