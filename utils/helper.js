export const requestToken = (writeToken, code, clientId, clientSecret) => {
  const params = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code
    })
  };

  fetch("https://dribbble.com/oauth/token", params)
    .then(r => r.json())
    .then(data => {
      if (data.access_token) {
        writeToken(data.access_token);
      }
    });
};

export const getCode = url =>
  url.substring(url.indexOf("code=") + 5, url.length);
