import { createSlice } from "@reduxjs/toolkit";
import { statusList } from "src/scripts";
import { reducerName } from "./";
import { 
  fetchTMDBAPIConfig,
  fetchTMDBCountryConfig,
  fetchTMDBJobConfig,
  fetchTMDBLanguageConfig,
  fetchTMDBTLConfig 
} from "./thunks";


const initialState  = {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTMDBAPIConfig.pending, (state, action) => {
        state.status = statusList.loading;
      })
      .addCase(fetchTMDBAPIConfig.fulfilled, (state, action) => {
        state.config = action.payload;
        state.status = statusList.succeeded;
      })
      .addCase(fetchTMDBAPIConfig.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = statusList.failed;
      })
  }
});



export const { changeName } = tmdbConfigSlice.actions;
export const configReducer = tmdbConfigSlice.reducer;