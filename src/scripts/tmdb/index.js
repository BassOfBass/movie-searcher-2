export const tmdbBaseUrl = "https://api.themoviedb.org/"

export const tmdbToken = process.env.REACT_APP_TMDB_API_TOKEN;
export const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;

export const tmdbHeaders = new Headers([
  ["Authorization", `Bearer ${tmdbToken}`],
  ["Content-Type", "application/json;charset=utf-8"],
]);

export const tmdbQueries = {
  /**
   * https://developers.themoviedb.org/3/getting-started/append-to-response
   */
  appendToResponse: "append_to_response"
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