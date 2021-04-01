import TMDBConfigJSON from "./tmdb-config.json";

// doing this to have intelisense in VSCode
/**
 * @type {TMDBEndpoints.Configuration.API}
 */
export const tmdbConfig = TMDBConfigJSON;

const configToPathsMap = new Map([
  ["backdrop_path", "backdrop_sizes"],
  ["logo_path", "logo_sizes"],
  ["poster_path", "poster_sizes"],
  ["profile_path", "profile_sizes"],
  ["still_path", "still_sizes"],
]);
const tmdbBaseUrl = "https://api.themoviedb.org/"
const tmdbToken = process.env.REACT_APP_TMDB_API_TOKEN;
const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;
const tmdbHeaders = new Headers([
  ["Authorization", `Bearer ${tmdbToken}`],
  ["Content-Type", "application/json;charset=utf-8"],
]);
export const tmdbQueries = {
  /**
   * https://developers.themoviedb.org/3/getting-started/append-to-response
   */
  appendToResponse: "append_to_response",
  /**
   * minimum: 1
   * @default 1
   */
  page: "page",
  apiKey: "api_key",
  /**
   * minLength: 2
   * pattern: `([a-z]{2})-([A-Z]{2})`
   */
  language: "language",
  /**
   * Allowed Values: 
   * - `original_order.asc`
   * - `original_order.desc`
   * - `release_date.asc`
   * - `release_date.desc`
   * - `title.asc`
   * - `title.desc`
   * - `vote_average.asc`
   * - `vote_average.desc`
   */
  sortBy: "sort_by"
}

/**
 * @param {RequestInfo} endpoint 
 * @param {RequestInit} options 
 */
export async function tmdbFetch(
  endpoint, 
  options = {
    method: "GET",
    headers: tmdbHeaders
  }
) {
  const url = new URL(endpoint, tmdbBaseUrl).toString();

  try {
    const response = await fetch(url, { ...options });

    if (!response.ok) {
      return {
        message: `Error ${response.status}: ${response.statusText}`
      }
    }

    const data = await response.json();

    if (data?.success === false) {
      const { status_code, error_message, status_message } = data;
      
      return {
        message: `Error ${status_code} ${status_message}: ${error_message}`
      }
    }

    return data;

  } catch (error) {
    console.error(error);
  }
  
}

/**
 * TODO: actually write it.
 */
async function tmdbThunkCallback() {}

export function createTMDBPagination(currentPage, totalPages, totalItems) {
  return {
    current: Number(currentPage),
    total: Number(totalPages),
    totalItems: Number(totalItems)
  }
}

/**
 * Movie, TV and person objects contain references to different file paths. 
 * In order to generate a fully working image URL, 3 pieces of data are needed: 
 * - `base_url`
 * - `file_size`
 * - `file_path`
 * 
 * The first two pieces can be retrieved by calling the API 
 * and the third is the file path you're wishing to grab on a particular media object. 
 * Here's what a full image URL looks like if the `poster_path` of `/vfgnhgjgh.jpg` was returned for a movie:
 * @example
 * "https://image.tmdb.org/t/p/w500/vfgnhgjgh.jpg"
 * @param {string} path 
 * @param {string} entry
 * @param {object} options
 * @param {TMDBEndpoints.Configuration.API} options.config
 * @param {Map<string, string} options.pathsMap
 * @returns {[string, string]} An array of `src`[0] and `srcset`[1] strings
 */
export function constructSRCSet(
  path,
  entry, 
  options = {
    config: tmdbConfig,
    pathsMap: configToPathsMap
  }
) {
  const baseURL = options.config.images.secure_base_url;
  // get the related size list
  const sizesField = options.pathsMap.get(entry);
  /**
   * @type {string[]}
   */
  const sizes = options.config.images[sizesField];

  let src;
  /**
   * @example
   * `${baseURL}${sizes[n]}${path} ${sizes[n]}, ${baseURL}${sizes[m]}${path} ${sizes[m]},
   * ${baseURL}${sizes[d]}${path}`
   * @type {string[])
   */
  let srcset = [];

  // iterate over sizes array
  for (let size of sizes) {

    if (size !== "original") {
      const string = `${baseURL}${size}${path}`;
      srcset.push(string);
    } else {
      src = `${baseURL}${size}${path}`;
    }
    
  }

  // add `original` at the end
  srcset.push(src);

  return [
    src,
    srcset.join(", ")
  ]
}
