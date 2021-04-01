import TMDBConfigJSON from "./tmdb-config.json";

/**
 * https://www.themoviedb.org/documentation/api/status-codes
 */
export const tmdbStatusCodes = {
  1: { status: 200, message: "Success." },
  2: { status: 501, message: "Invalid service: this service does not exist." },
  3: { status: 401, message: "Authentication failed: You do not have permissions to access the service." },
  4: { status: 405, message: "Invalid format: This service doesn't exist in that format." },
  5: { status: 422, message: "Invalid parameters: Your request parameters are incorrect." },
  6: { status: 404, message: "Invalid id: The pre-requisite id is invalid or not found." },
  7: { status: 401, message: "Invalid API key: You must be granted a valid key." },
  8: { status: 403, message: "Duplicate entry: The data you tried to submit already exists." },
  9: { status: 503, message: "Service offline: This service is temporarily offline, try again later." },
  10: { status: 401, message: "Suspended API key: Access to your account has been suspended, contact TMDb." },
  11: { status: 500, message: "Internal error: Something went wrong, contact TMDb." },
  12: { status: 201, message: "The item/record was updated successfully." },
  13: { status: 200, message: "The item/record was deleted successfully." },
  14: { status: 401, message: "Authentication failed." },
  15: { status: 500, message: "Failed." },
  16: { status: 401, message: "Device denied." },
  17: { status: 401, message: "Session denied." },
  18: { status: 400, message: "Validation failed." },
  19: { status: 406, message: "Invalid accept header." },
  20: { status: 422, message: "Invalid date range: Should be a range no longer than 14 days." },
  21: { status: 200, message: "Entry not found: The item you are trying to edit cannot be found." },
  22: { status: 400, message: "Invalid page: Pages start at 1 and max at 1000. They are expected to be an integer." },
  23: { status: 400, message: "Invalid date: Format needs to be YYYY-MM-DD." },
  24: { status: 504, message: "Your request to the backend server timed out. Try again." },
  25: { status: 429, message: "Your request count (#) is over the allowed limit of (40)." },
  26: { status: 400, message: "You must provide a username and password." },
  27: { status: 400, message: "Too many append to response objects: The maximum number of remote calls is 20." },
  28: { status: 400, message: "Invalid timezone: Please consult the documentation for a valid timezone." },
  29: { status: 400, message: "You must confirm this action: Please provide a confirm=true parameter." },
  30: { status: 401, message: "Invalid username and/or password: You did not provide a valid login." },
  31: { status: 401, message: "Account disabled: Your account is no longer active. Contact TMDb if this is an error." },
  32: { status: 401, message: "Email not verified: Your email address has not been verified." },
  33: { status: 401, message: "Invalid request token: The request token is either expired or invalid." },
  34: { status: 404, message: "The resource you requested could not be found." },
  35: { status: 401, message: "Invalid token." },
  36: { status: 401, message: "This token hasn't been granted write permission by the user." },
  37: { status: 404, message: "The requested session could not be found." },
  38: { status: 401, message: "You don't have permission to edit this resource." },
  39: { status: 401, message: "This resource is private." },
  40: { status: 200, message: "Nothing to update." },
  41: { status: 422, message: "This request token hasn't been approved by the user." },
  42: { status: 405, message: "This request method is not supported for this resource." },
  43: { status: 502, message: "Couldn't connect to the backend server." },
  44: { status: 500, message: "The ID is invalid." },
  45: { status: 403, message: "This user has been suspended." },
  46: { status: 503, message: "The API is undergoing maintenance. Try again later." },
  47: { status: 400, message: "The input is not valid." },
}
// doing this to have intelisense in VSCode
/**
 * @type {TMDBEndpoints.Configuration.API}
 */
const tmdbConfig = TMDBConfigJSON;

const configToPathsMap = new Map([
  ["backdrop_path", "backdrop_sizes"],
  ["logo_path", "logo_sizes"],
  ["poster_path", "poster_sizes"],
  ["profile_path", "profile_sizes"],
  ["still_path", "still_sizes"],
]);
const tmdbBaseUrl = "https://api.themoviedb.org/"
const tmdbToken = process.env.REACT_APP_TMDB_API_TOKEN;
// const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;
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
// async function tmdbThunkCallback() { }

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
   * `${baseURL}${sizes[n]}${path} ${sizes[n]}, 
   * ${baseURL}${sizes[m]}${path} ${sizes[m]},
   * ${baseURL}${sizes[d]}${path}`
   * @type {string[])
   */
  let srcset = [];

  // iterate over sizes array
  for (let size of sizes) {

    if (size !== "original") {
      const string = `${baseURL}${size}${path} ${size}`;
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
