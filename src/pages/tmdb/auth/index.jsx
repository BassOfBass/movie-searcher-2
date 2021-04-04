import { useState } from "react"
import { tmdbAPI } from "scripts/tmdb/api";
import { 
  retrieveRequestToken, 
  setRequestToken,
  retriveAccessToken,
  setAccessToken,
  retrieveAccountID,
  setAccountID,
  retrieveApproval,
  approveRequest
} from "scripts/tmdb/session";

import styles from "./index.module.scss";

export function TMDBAuth() {
  let [reqToken, changeReqToken] = useState(retrieveRequestToken());
  let [accToken, changeAccToken] = useState(retriveAccessToken());
  let [accID, changeAccID] = useState(retrieveAccountID());
  let [isApproved, switchIsApproved] = useState(retrieveApproval());
  let [reqError, setReqError] = useState(
    /**
     * @type {TMDBEndpoints.Error}
     */
    (null)
  );
  let [accError, setAccError] = useState(
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
    changeReqToken(reqToken => reqToken = response.request_token);
    button.disabled = false;
  }

  /**
   * @param {import("react").FormEvent<HTMLFormElement} event
   */
  async function getAccessToken(event) {
    event.preventDefault();

    const form = event.target;
    /**
     * @type {HTMLButtonElement}
     */
    const button = form.querySelector('button[type="submit"]');

    button.disabled = true;
    const response = await tmdbAPI.auth.createAccessToken(reqToken);

    if (!response.access_token) {
      // response is an error
      setAccError(error => error = response);
      button.disabled = false;
      return;
    }
    
    approveRequest();
    setAccessToken(response.access_token);
    setAccountID(response.account_id);
    changeAccToken(token => token = response.access_token);
    changeAccID(id => id = response.account_id);
    switchIsApproved(approval => approval = true)
  }

  return (
    <>
      <h1>TMDB authentification</h1>
      <section>
        <h2>Tokens</h2>
        {!reqToken
          ? <form onSubmit={getRequestToken}>
              <button type="submit">
                Get request token
              </button>
              {reqError &&
                <output>{JSON.stringify(reqError)}</output>
              }
            </form>
            
          : <>
              {!isApproved && 
                <p>
                  Follow the <a href={`https://www.themoviedb.org/auth/access?request_token=${reqToken}`}>confirmation link</a>.
                </p>}
                
              {!accToken
                ? <form onSubmit={getAccessToken}>
                    <div>
                      <label htmlFor="request-token">
                        Your request token is:
                      </label>
                      <textarea 
                        name="request-token"  
                        id="request-token" 
                        rows="8"
                        readOnly
                      >{accToken}</textarea>
                      {accError &&
                        <output>{JSON.stringify(accError)}</output>
                      }
                    </div>
                    <div>
                      <button type="submit">
                        Get access token
                      </button>
                    </div>
                  </form>
                : <div>
                    <p>Account creds:</p>
                    <ul>
                      <li>
                        Request token:{" "}
                        <code>{reqToken}</code>
                      </li>
                      <li>
                        Access token:{" "}
                        <code>{accToken}</code>
                      </li>
                      <li>
                        Account ID:{" "}
                        <code>{accID}</code>
                      </li>
                    </ul>
                  </div>}
            </>
        }

      </section>
    </>
  )
}