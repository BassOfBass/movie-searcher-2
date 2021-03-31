import { configureStore } from "@reduxjs/toolkit";
import { tmdbAccountReducer } from "./reducers/tmdb-account";
import { tmdbConfigReducer } from "./reducers/tmdb/configuration/reducer";
import { tmdbListReducer } from "./reducers/tmdb/list/tmdb-list";

export const store = configureStore({
  reducer: {
    tmdbConfig: tmdbConfigReducer,
    tmdbList: tmdbListReducer,
    tmdbAccount: tmdbAccountReducer
  }
});