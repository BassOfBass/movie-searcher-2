export function retrieveRequestToken() {
  const reqToken = localStorage.getItem("request_token");

  return reqToken;
}

/**
 * @param {string} token 
 */
export function setRequestToken(token) {
  localStorage.setItem("request_token", token);
}