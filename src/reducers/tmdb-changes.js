import { 
  createSlice, 
  createAsyncThunk, 
  // createEntityAdapter 
} from "@reduxjs/toolkit";
import { statusList } from "src/scripts";
import { tmdbFetch } from "src/scripts/tmdb";

export const fetchTMDBMovieChangeList = createAsyncThunk(
  "tmdb-changelist/fetchMovies",
  async () => {
    const list = await tmdbFetch(`3/movie/changes`);

    return list;
  }
);

export const fetchTMDBTVChangeList = createAsyncThunk(
  "tmdb-changelist/fetchTVs",
  async () => {
    const list = await tmdbFetch(`3/tv/changes`);

    return list;
  }
);

export const fetchTMDBPersonChangeList = createAsyncThunk(
  "tmdb-changelist/fetchPeople",
  async () => {
    const list = await tmdbFetch(`3/person/changes`);

    return list;
  }
);

const initialState = {
  list: {
    movie: {},
    tv: {},
    person: {}
  },
  status: statusList.idle,
  error: null
};

const tmdbCertificationsSlice = createSlice({
  name: "tmdb-changelist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieChangeList.pending, (state, action) => {
        state.status = statusList.loading;
      })
      .addCase(fetchMovieChangeList.fulfilled, (state, action) => {
        state.certifications.movie = action.payload;
        state.status = statusList.succeeded;
      })
      .addCase(fetchMovieChangeList.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = statusList.failed;
      })
  }
});

export const {} = tmdbCertificationsSlice.actions;
export const tmdbAccountReducer = tmdbCertificationsSlice.reducer;