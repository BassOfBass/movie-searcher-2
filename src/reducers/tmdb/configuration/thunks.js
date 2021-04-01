import { createAsyncThunk } from "@reduxjs/toolkit";
import { tmdbFetch} from "scripts/tmdb";
import { thunkTypes } from "./";

export const fetchTMDBAPIConfig = createAsyncThunk(
  thunkTypes.api,
  async () => {
    const apiConfig = await tmdbFetch("/3/configuration");

    return apiConfig;
  }
);

export const fetchGenres = createAsyncThunk(
  thunkTypes.genres,
  async () => {
    /**
     * @type {TMDBEndpoints.Genres}
     */
    const movieGenres = await tmdbFetch("/3/genre/movie/list");
    /**
     * @type {TMDBEndpoints.Genres}
     */
    const tvGenres = await tmdbFetch("/3/genre/tv/list");

    return {
      movie: movieGenres.genres,
      tv: tvGenres.genres
    }
  }
)