import { 
  createSlice, 
  createAsyncThunk, 
  // createEntityAdapter 
} from "@reduxjs/toolkit";
import { statusList } from "src/scripts";
import { tmdbFetch } from "src/scripts/tmdb";

export const fetchTMDBList = createAsyncThunk(
  "tmdb-list/fetchList",
  async ( id = 1 ) => {
    /**
     * @type {TMDBEndpoints.List}
     */
    const list = await tmdbFetch(`4/list/${id}`);

    return list;
  }
);

/**
 * @type {TMDBStore.List}
 */
const initialState = {
  list: {},
  status: statusList.idle,
  error: null
};

const tmdbListSlice = createSlice({
  name: "tmdb-list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTMDBList.pending, (state, action) => {
        state.status = statusList.loading;
      })
      .addCase(fetchTMDBList.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = statusList.succeeded;
      })
      .addCase(fetchTMDBList.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = statusList.failed;
      })
  }
});

export const {} = {};
export const tmdbListReducer = tmdbListSlice.reducer;