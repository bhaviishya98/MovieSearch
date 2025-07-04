const API_KEY = "9c9507db04f409d6558ccc85828c568d";
const BASE_URL = "https://api.themoviedb.org/3";

const getRequestToken = async () => {
  const url = `${BASE_URL}/authentication/token/new?api_key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.request_token;
  } catch (error) {
    console.error("Error getting request token:", error);
  }
};

const authenticateRequestToken = async (requestToken) => {
  window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/authenticate`;
};

const createSessionId = async (requestToken) => {
  const url = `${BASE_URL}/authentication/session/new?api_key=${API_KEY}&request_token=${requestToken}`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: "Bearer 9c9507db04f409d6558ccc85828c568d",
    },
    body: JSON.stringify({
      request_token: requestToken,
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("this is response", response);
    return data.session_id;
  } catch (error) {
    console.error("Error creating session ID:", error);
  }
};

const getAccountDetails = async (sessionId) => {
  const url = `${BASE_URL}/account?api_key=${API_KEY}&session_id=${sessionId}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting account details:", error);
  }
};

export {
  getRequestToken,
  authenticateRequestToken,
  createSessionId,
  getAccountDetails,
};
