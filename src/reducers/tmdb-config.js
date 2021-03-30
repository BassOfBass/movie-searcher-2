import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { statusList } from "src/scripts";
import { tmdbBaseUrl, tmdbHeaders } from "src/scripts/tmdb";

export const fetchConfig = createAsyncThunk(
  "configuration/fetchConfig",
  async () => {
    const response = await fetch(
      new URL("3/configuration", tmdbBaseUrl).toString(),
      {
        method: "GET",
        headers: tmdbHeaders
      }
    );

    if (!response.ok) {
      return {
        message: `Error ${response.status}: ${response.statusText}`
      }
    }

    const data = await response.json();
    console.log(data);

    return data;
  }
)

const initialState  = {
  config: {},
  status: statusList.idle,
  error: null
}

const tmdbConfigSlice = createSlice({
  name:"configuration",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfig.pending, (state, action) => {
        state.status = statusList.loading;
      })
      .addCase(fetchConfig.fulfilled, (state, action) => {
        state.config = action.payload;
        state.status = statusList.succeeded;
      })
      .addCase(fetchConfig.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = statusList.failed;
      })
  }
});



export const { changeName } = tmdbConfigSlice.actions;
export const configReducer = tmdbConfigSlice.reducer;