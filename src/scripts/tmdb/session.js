const session = {
  request: "request_token",
  isApproved: "is_request_approved",
  access: "access_token",
  id: "account_id"
};

export function retrieveRequestToken() {
  const reqToken = localStorage.getItem(session.request);

  return reqToken;
}

/**
 * @param {string} token 
 */
export function setRequestToken(token) {
  localStorage.setItem("request_token", token);
}

export function retrieveApproval() {
  const approval = localStorage.getItem(session.isApproved);

  return Boolean(approval);
}

export function approveRequest() {
  localStorage.setItem(session.isApproved, String(true))
};

export function retriveAccessToken() {
  const accToken = localStorage.getItem(session.access);

  return accToken;
}

/**
 * @param {string} token 
 * @param {string} accountID 
 */
export function setAccessToken(token) {
  localStorage.setItem(session.access, token)
}

export function retrieveAccountID() {
  const accID = localStorage.getItem(session.id);
  return accID;
}

/**
 * @param {string} accountID 
 */
export function setAccountID(accountID) {
  localStorage.setItem(session.id, accountID)
}