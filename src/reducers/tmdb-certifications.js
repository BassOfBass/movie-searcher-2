import { 
  createSlice, 
  createAsyncThunk, 
  // createEntityAdapter 
} from "@reduxjs/toolkit";
import { statusList } from "src/scripts";
import { tmdbFetch } from "src/scripts/tmdb";

export const fetchTMDBMovieCertifications = createAsyncThunk(
  "tmdb-certifications/fetchMovieCertifications",
  async () => {
    const list = await tmdbFetch(`3/certification/movie/list`);

    return list;
  }
);

export const fetchTMDBTVCertifications = createAsyncThunk(
  "tmdb-certifications/fetchTVCertifications",
  async () => {
    const list = await tmdbFetch(`3/certification/tv/list`);

    return list;
  }
);

const initialState = {
  certifications: {
    movie: {},
    tv: {}
  },
  status: statusList.idle,
  error: null
};

const tmdbCertificationsSlice = createSlice({
  name: "tmdb-certifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTMDBMovieCertifications.pending, (state, action) => {
        state.status = statusList.loading;
      })
      .addCase(fetchTMDBMovieCertifications.fulfilled, (state, action) => {
        state.certifications.movie = action.payload;
        state.status = statusList.succeeded;
      })
      .addCase(fetchTMDBMovieCertifications.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = statusList.failed;
      })
      .addCase(fetchTMDBTVCertifications.pending, (state, action) => {
        state.status = statusList.loading;
      })
      .addCase(fetchTMDBTVCertifications.fulfilled, (state, action) => {
        state.certifications.tv = action.payload;
        state.status = statusList.succeeded;
      })
      .addCase(fetchTMDBTVCertifications.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = statusList.failed;
      })
  }
});

export const {} = tmdbCertificationsSlice.actions;
export const tmdbAccountReducer = tmdbCertificationsSlice.reducer;