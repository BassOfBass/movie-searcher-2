import { 
  createSlice, 
  createAsyncThunk, 
  // createEntityAdapter 
} from "@reduxjs/toolkit";
import { statusList } from "src/scripts";
import { tmdbFetch } from "src/scripts/tmdb";

export const fetchTMDBAccount = createAsyncThunk(
  "tmdb-account/fetchAccount",
  async () => {
    const list = await tmdbFetch(`3/account`);

    return list;
  }
);

const initialState = {
  account: {},
  status: statusList.idle,
  error: null
};

const tmdbAccountSlice = createSlice({
  name: "tmdb-account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTMDBAccount.pending, (state, action) => {
        state.status = statusList.loading;
      })
      .addCase(fetchTMDBAccount.fulfilled, (state, action) => {
        state.account = action.payload;
        state.status = statusList.succeeded;
      })
      .addCase(fetchTMDBAccount.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = statusList.failed;
      })
  }
});

export const {} = tmdbAccountSlice.actions;
export const tmdbAccountReducer = tmdbAccountSlice.reducer;