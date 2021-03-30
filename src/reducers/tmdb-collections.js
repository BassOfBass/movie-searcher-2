import { 
  createSlice, 
  createAsyncThunk, 
  // createEntityAdapter 
} from "@reduxjs/toolkit";
import { statusList } from "src/scripts";
import { tmdbFetch } from "src/scripts/tmdb";

export const fetchTMDBCollectionDetails = createAsyncThunk(
  "tmdb-collection/fetchDetails",
  async (id) => {
    const collection = await tmdbFetch(`3/collection/${id}`);

    return collection;
  }
);

export const fetchTMDBImagesCollection = createAsyncThunk(
  "tmdb-collection/fetchImages",
  async (id) => {
    const collection = await tmdbFetch(`3/collection/${id}/images`);

    return collection;
  }
);

export const fetchTMDBTranslationsCollection = createAsyncThunk(
  "tmdb-collection/fetchTranslations",
  async (id) => {
    const collection = await tmdbFetch(`3/collection/${id}/translations`);

    return collection;
  }
);

const initialState = {
  collection: {
    details: {},
    images: {},
    translations: {}
  },
  status: statusList.idle,
  error: null
};

const tmdbCertificationsSlice = createSlice({
  name: "tmdb-collection",
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