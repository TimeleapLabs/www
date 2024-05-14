export const subscribe = (email, topic, token) =>
  fetch(window.location.origin + "/api/subscribe", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, topic, token }),
  });
