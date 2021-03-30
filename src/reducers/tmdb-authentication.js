import { 
  createSlice, 
  createAsyncThunk, 
  // createEntityAdapter 
} from "@reduxjs/toolkit";
import { statusList } from "src/scripts";
import { tmdbFetch } from "src/scripts/tmdb";

export const createTMDBGuestSession = createAsyncThunk(
  "tmdb-auth/createGuestSession",
  async () => {
    const session = await tmdbFetch(`3/authentication/guest_session/new`);

    return session;
  }
);

export const createTMDBRequestToken = createAsyncThunk(
  "tmdb-auth/createRequestToken",
  async () => {
    const token = await tmdbFetch(`3/authentication/token/new`);

    return token;
  }
);

const initialState = {
  guestSession: {},
  session: {},
  status: statusList.idle,
  error: null
};

const tmdbAuthSlice = createSlice({
  name: "tmdb-auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTMDBGuestSession.pending, (state, action) => {
        state.status = statusList.loading;
      })
      .addCase(createTMDBGuestSession.fulfilled, (state, action) => {
        state.guestSession = action.payload;
        state.status = statusList.succeeded;
      })
      .addCase(createTMDBGuestSession.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = statusList.failed;
      })
  }
});

export const {} = tmdbAuthSlice.actions;
export const tmdbAccountReducer = tmdbAuthSlice.reducer;