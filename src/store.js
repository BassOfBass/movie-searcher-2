import { configureStore } from "@reduxjs/toolkit";
import { tmdbAccountReducer } from "./reducers/tmdb-account";
import { configReducer } from "./reducers/tmdb/configuration/reducer";
import { tmdbListReducer } from "./reducers/tmdb-list";

export const store = configureStore({
  reducer: {
    tmdbConfig: configReducer,
    tmdbList: tmdbListReducer,
    tmdbAccount: tmdbAccountReducer
  }
});