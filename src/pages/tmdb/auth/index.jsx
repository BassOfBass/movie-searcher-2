import { useState } from "react"
import { tmdbAPI } from "scripts/tmdb/api";
import { retrieveRequestToken, setRequestToken } from "scripts/tmdb/session";

import styles from "./index.module.scss";

export function TMDBAuth() {
  let [reqToken, setReqToken] = useState(retrieveRequestToken());
  let [reqError, setReqError] = useState(
    /**
     * @type {TMDBEndpoints.Error}
     */
    (null)
  );

  /**
   * @param {import("react").FormEvent<HTMLFormElement} event
   */
  async function getRequestToken(event) {
    event.preventDefault();

    /**
     * @type {HTMLFormElement}
     */
    const form = event.target;
    /**
     * @type {HTMLButtonElement}
     */
    const button = form.querySelector('button[type="submit"]');

    button.disabled = true;
    const response = await tmdbAPI.auth.createRequestToken();

    // response is an error
    if (!response.request_token) {
      setReqError(error => error = response);
      button.disabled = false;
      return;
    }

    setRequestToken(response.request_token);
    setReqToken(reqToken => reqToken = response.request_token);
    button.disabled = false;
  }

  return (
    <>
      <h1>TMDB authentification</h1>
      <section>
        <h2>Tokens</h2>
        {!reqToken
          ? <form onSubmit={getRequestToken}>
              <button type="submit">
                Request token
              </button>
              {reqError &&
                <output>{reqError}</output>
              }
             
            </form>
            
          : <p>
              Your request token is <code>{reqToken}</code>
            </p>
        }
      </section>
    </>
  )
}