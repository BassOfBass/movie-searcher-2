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
  appendToResponse: "append_to_response",
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
};

export const tmdbAPI = {
  list: {
    /**
     * This method will retrieve a list by id.
     * Private lists can only be accessed by their owners 
     * and therefore require a valid user access token.
     * @param {object} params 
     * @param {number| string} params.listID
     * @param {URLSearchParams} params.query
     */
    async getList({
      listID = "",
      query = new URLSearchParams([
        [ tmdbAPIqueries.language, "en-US" ]
        // [ tmdbAPIqueries.sortBy, "" ]
      ])
    }) {
      /**
       * @type {TMDBEndpoints.List.GetList}
       */
      const list = await tmdbFetch(
        `4/list/${listID}`, 
        { method: "GET" }, 
        query
      );

      return list;
    }
  },
  movies: {
    /**
     * Get the primary information about a movie.
     * @param {object} params
     * @param {number | string} params.movieID
     * @param {URLSearchParams} params.query
     * 
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
      const details = await tmdbFetch(
        `/3/movie/${movieID}`,
        { method: "GET" },
        query
      );

      return details;
    }
  },

};