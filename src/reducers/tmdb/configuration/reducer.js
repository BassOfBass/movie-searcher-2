import { createSlice } from "@reduxjs/toolkit";
import { statusList } from "src/scripts";
import { reducerName } from "./";
import { extraReducers } from "./extraReducers";


/**
 * @type {TMDBStore.Configuration}
 */
const initialState = {
  api: {
    config: {},
    status: statusList.idle,
    error: null
  },
  countries: {
    config: {},
    status: statusList.idle,
    error: null
  },
  jobs: {
    config: {},
    status: statusList.idle,
    error: null
  },
  languages: {
    config: {},
    status: statusList.idle,
    error: null
  },
  primTranslations: {
    config: {},
    status: statusList.idle,
    error: null
  },
  timeZones: {
    config: {},
    status: statusList.idle,
    error: null
  },
  status: statusList.idle,
  error: null
}

const tmdbConfigSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
  },
  extraReducers: extraReducers
});

export const {} = tmdbConfigSlice.actions;
export const tmdbConfigReducer = tmdbConfigSlice.reducer;