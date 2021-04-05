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
  sortBy: "sort_by",
};

export const tmdbAPI = {
  auth: {
    /**
     * This method generates a new request token that you can ask a user to approve. 
     * This is the first step in getting permission from a user to read and write data on their behalf. 
     * [You can read more about this system here](https://developers.themoviedb.org/4/auth/user-authorization-1).
     * 
     * Note that there is an optional body you can post alongside this request 
     * to set a redirect URL or callback that will be executed
     * once a request token has been approved on TMDb.
     * @param {object} params
     * @param {string} params.redirectURL
     */
    async createRequestToken({ redirectURL } = {}) {
      /**
       * @type {string}
       */
      let redirURL;

      if (redirectURL && String(redirectURL) && redirectURL.length !== 0) {
        redirURL = new URL(redirectURL).toString();
      }

      /**
       * @type {TMDBEndpoints.Auth.RequestToken}
       */
      const token = await tmdbFetch(
        "4/auth/request_token",
        {
          method: "POST",
          body: redirURL && JSON.stringify({
            "redirect_to": redirURL
          })
        }
      );

      return token;
    },
    /**
     * This method will finish the user authentication flow 
     * and issue an official user access token. 
     * The request token in this request is sent along as part of the POST body. 
     * You should still use your standard API read access token for authenticating this request.
     * 
     * https://developers.themoviedb.org/4/auth/create-access-token
     * @param {string} requestToken
     */
    async createAccessToken(requestToken) {
      /**
       * @type {TMDBEndpoints.Auth.AccessToken}
       */
      const response = await tmdbFetch(
        "/4/auth/access_token",
        { 
          method: "POST",
          body: JSON.stringify({ "request_token": requestToken })
        }
      );

      return response;
    },
    /**
     * This method gives your users the ability to log out of a session.
     * @param {string} accessToken 
     */
    async logout(accessToken) {
      /**
       * @type {TMDBEndpoints.Auth.Logout}
       */
      const response = await tmdbFetch("/4/auth/access_token",
      {
        method: "DELETE",
        body: JSON.stringify({ "access_token": accessToken })
      });

      return response;
    }
  },
  list: {
    /**
     * TODO: fix sorting query
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
        // [ tmdbAPIqueries.sortBy, "original_order\.asc" ]
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
    },
    /**
     * This method will create a new list.
     * You will need to have valid user access token in order to create a new list.
     * @param {TMDBEndpoints.List.CreateListBody} body 
     */
    async createList(body) {
      /**
       * @type {TMDBEndpoints.List.CreateList}
       */
      const response = await tmdbFetch("/4/list", {
        method: "POST",
        body: JSON.stringify(body)
      })

      return response;
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