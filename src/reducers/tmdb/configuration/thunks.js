import { createAsyncThunk } from "@reduxjs/toolkit";
import { tmdbFetch} from "src/scripts/tmdb";
import { thunkTypes } from "./";

export const fetchTMDBAPIConfig = createAsyncThunk(
  thunkTypes.api,
  async () => {
    const apiConfig = await tmdbFetch("/3/configuration");

    return apiConfig;
  }
)
export const fetchTMDBCountryConfig = createAsyncThunk(
  thunkTypes.countries,
  async () => {
    const countryConfig = await tmdbFetch("/3/configuration/countries");

    return countryConfig;
  }
);
export const fetchTMDBJobConfig = createAsyncThunk(
  thunkTypes.jobs,
  async () => {
    const jobConfig = await tmdbFetch("/3/configuration/jobs");

    return jobConfig;
  }
);
export const fetchTMDBLanguageConfig = createAsyncThunk(
  thunkTypes.languages,
  async () => {
    const languageConfig = await tmdbFetch("/3/configuration/languages");

    return languageConfig;
  }
);
export const fetchTMDBTLConfig = createAsyncThunk(
  thunkTypes.primTranslations,
  async () => {
    const tlConfig = await tmdbFetch("/3/configuration/primary_translations");

    return tlConfig;
  }
);
export const fetchTMDBTimezoneConfig = createAsyncThunk(
  thunkTypes.timezones,
  async () => {
    const tzConfig = await tmdbFetch("/3/configuration/timezones");

    return tzConfig;
  }
);