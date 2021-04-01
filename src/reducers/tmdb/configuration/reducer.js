import { createSlice } from "@reduxjs/toolkit";
import { statusList } from "scripts";
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
  genres: {
    list: {
      tv: [],
      movie: []
    },
    status: statusList.idle,
    error: null
  },
  status: statusList.idle,
  error: null
}

const tmdbConfigSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {},
  extraReducers: extraReducers
});

export const {} = tmdbConfigSlice.actions;

export const tmdbConfigReducer = tmdbConfigSlice.reducer;