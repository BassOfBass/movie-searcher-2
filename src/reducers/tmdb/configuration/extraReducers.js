import { statusList } from "scripts";
import {
  fetchTMDBAPIConfig,
  fetchGenres
} from "./thunks";

/**
 * @param {import("@reduxjs/toolkit").ActionReducerMapBuilder<TMDBStore.Configuration>} builder 
 */
export function extraReducers(builder) {
    builder
      .addCase(fetchTMDBAPIConfig.pending, (state, action) => {
        state.api.status = statusList.loading;
      })
      .addCase(fetchTMDBAPIConfig.fulfilled, (state, action) => {
        state.api.config = action.payload;
        state.api.status = statusList.succeeded;
      })
      .addCase(fetchTMDBAPIConfig.rejected, (state, action) => {
        state.api.error = action.error.message;
        state.api.status = statusList.failed;
      })
      .addCase(fetchGenres.pending, (state, action) => {
        state.genres.status = statusList.loading;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres.list.tv = action.payload.tv;
        state.genres.list.movie = action.payload.movie;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.genres.status = statusList.failed;
        state.genres.error = action.error.message;
      })
      
}