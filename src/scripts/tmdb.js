export const tmdbBaseUrl = "https://api.themoviedb.org/"

export const tmdbToken = process.env.REACT_APP_TMDB_API_TOKEN;
export const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;

export const tmdbHeaders = new Headers([
  ["Authorization", `Bearer ${tmdbToken}`],
  ["Content-Type", "application/json;charset=utf-8"],
]);

/**
 * 
 * @param {Request} endpoint 
 * @param {*} options 
 */
export async function tmdbFetch(endpoint, options) {}