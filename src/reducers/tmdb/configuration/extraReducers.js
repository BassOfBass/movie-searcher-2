import { statusList } from "scripts";
import {
  fetchTMDBAPIConfig,
  fetchTMDBCountryConfig,
  fetchTMDBJobConfig,
  fetchTMDBLanguageConfig,
  fetchTMDBTLConfig,
  fetchTMDBTimezoneConfig
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
      // .addCase(fetchTMDBCountryConfig.pending, (state, action) => {
      //   state.countries.status = statusList.loading;
      // })
      // .addCase(fetchTMDBCountryConfig.filfilled, (state, action) => {
      //   state.countries.config = action.payload;
      //   state.countries.status = statusList.succeeded;
      // })
      // .addCase(fetchTMDBCountryConfig.rejected, (state, action) => {
      //   state.countries.error = action.error.message;
      //   state.countries.status = statusList.failed;
      // })
      // .addCase(fetchTMDBJobConfig.pending, (state, action) => {
      //   state.jobs.status = statusList.loading;
      // })
      // .addCase(fetchTMDBJobConfig.filfilled, (state, action) => {
      //   state.jobs.config = action.payload;
      //   state.jobs.status = statusList.succeeded;
      // })
      // .addCase(fetchTMDBJobConfig.rejected, (state, action) => {
      //   state.jobs.error = action.error.message;
      //   state.jobs.status = statusList.failed;
      // })
      // .addCase(fetchTMDBLanguageConfig.pending, (state, action) => {
      //   state.languages.status = statusList.loading;
      // })
      // .addCase(fetchTMDBLanguageConfig.filfilled, (state, action) => {
      //   state.languages.config = action.payload;
      //   state.languages.status = statusList.succeeded;
      // })
      // .addCase(fetchTMDBLanguageConfig.rejected, (state, action) => {
      //   state.languages.error = action.error.message;
      //   state.languages.status = statusList.failed;
      // })
      // .addCase(fetchTMDBTLConfig.pending, (state, action) => {
      //   state.primTranslations.status = statusList.loading;
      // })
      // .addCase(fetchTMDBTLConfig.filfilled, (state, action) => {
      //   state.primTranslations.config = action.payload;
      //   state.primTranslations.status = statusList.succeeded;
      // })
      // .addCase(fetchTMDBTLConfig.rejected, (state, action) => {
      //   state.primTranslations.error = action.error.message;
      //   state.primTranslations.status = statusList.failed;
      // })
      // .addCase(fetchTMDBTimezoneConfig.pending, (state, action) => {
      //   state.timezones.status = statusList.loading;
      // })
      // .addCase(fetchTMDBTimezoneConfig.filfilled, (state, action) => {
      //   state.timezones.config = action.payload;
      //   state.timezones.status = statusList.succeeded;
      // })
      // .addCase(fetchTMDBTimezoneConfig.rejected, (state, action) => {
      //   state.timezones.error = action.error.message;
      //   state.timezones.status = statusList.failed;
      // })
}