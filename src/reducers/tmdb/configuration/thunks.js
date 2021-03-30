import { createAsyncThunk } from "@reduxjs/toolkit";
import { tmdbFetch} from "src/scripts/tmdb";
import { thunks } from "./";

export const fetchTMDBAPIConfig = createAsyncThunk(
  thunks.api,
  async () => {
    const apiConfig = await tmdbFetch("/3/configuration");

    return apiConfig;
  }
)
export const fetchTMDBCountryConfig = createAsyncThunk(
  thunks.countries,
  async () => {
    const countryConfig = await tmdbFetch("/3/configuration/countries");

    return countryConfig;
  }
);
export const fetchTMDBJobConfig = createAsyncThunk(
  thunks.jobs,
  async () => {
    const jobConfig = await tmdbFetch("/3/configuration/jobs");

    return jobConfig;
  }
);
export const fetchTMDBLanguageConfig = createAsyncThunk(
  thunks.languages,
  async () => {
    const languageConfig = await tmdbFetch("/3/configuration/languages");

    return languageConfig;
  }
);
export const fetchTMDBTLConfig = createAsyncThunk(
  thunks.primTranslations,
  async () => {
    const tlConfig = await tmdbFetch("/3/configuration/primary_translations");

    return tlConfig;
  }
);
export const fetchTMDBCountryConfig = createAsyncThunk(
  thunks.timezones,
  async () => {
    const tzConfig = await tmdbFetch("/3/configuration/timezones");

    return tzConfig;
  }
);