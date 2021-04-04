import { tmdbFetch } from ".";

const tmdbAPIqueries = {
  apiKey: "api_key",
  /**
   * Pass a ISO 639-1 value to display translated data 
   * for the fields that support it.
   * - minLength: 2
   * - pattern: `([a-z]{2})-([A-Z]{2})`
   * - default: "en-US"
   */
  language: "language",
  /**
   * Append requests within the same namespace to the response.
   * pattern: `([\w]+)`
   */
  appendToResponse: "append_to_response"
};

export const tmdbAPI = {
  list: "",
  movies: {
    /**
     * Get the primary information about a movie.
     * @param {number | string} movieID
     */
    async getDetails({ 
      movieID, 
      query = new URLSearchParams([
        [tmdbAPIqueries.language, "en-US"],
        [tmdbAPIqueries.appendToResponse, ""]
      ])
    }) {
      /**
       * @type {TMDBEndpoints.Movies.Details}
       */
      const data = await tmdbFetch(
        `/3/movie/${movieID}`,
        { method: "GET" },
        query
      );

      return data;
    }
  },

};