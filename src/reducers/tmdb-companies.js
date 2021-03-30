import { 
  createSlice, 
  createAsyncThunk, 
  // createEntityAdapter 
} from "@reduxjs/toolkit";
import { statusList } from "src/scripts";
import { tmdbFetch } from "src/scripts/tmdb";

export const fetchTMDBCompanyDetails = createAsyncThunk(
  "tmdb-companies/fetchDetails",
  async (id) => {
    const company = await tmdbFetch(`3/company/${id}`);

    return company;
  }
);

export const fetchTMDBCompanyImages = createAsyncThunk(
  "tmdb-companies/fetchImages",
  async (id) => {
    const images = await tmdbFetch(`3/company/${id}/images`);

    return images;
  }
);

export const fetchTMDBCompanyAltNames = createAsyncThunk(
  "tmdb-companies/fetchAltNames",
  async (id) => {
    const names = await tmdbFetch(`3/company/${id}//alternative_names`);

    return names;
  }
);

const initialState = {
  company: {
    details: {},
    images: {},
    altNames: {}
  },
  status: statusList.idle,
  error: null
};

const tmdbCompaniesSlice = createSlice({
  name: "tmdb-companies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTMDBCompanyDetails.pending, (state, action) => {
        state.status = statusList.loading;
      })
      .addCase(fetchTMDBCompanyDetails.fulfilled, (state, action) => {
        state.certifications.movie = action.payload;
        state.status = statusList.succeeded;
      })
      .addCase(fetchTMDBCompanyDetails.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = statusList.failed;
      })
  }
});

export const {} = tmdbCompaniesSlice.actions;
export const tmdbCompanyReducer = tmdbCompaniesSlice.reducer;