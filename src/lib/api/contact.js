export const contact = (subject, body, name, topic, email) =>
  fetch(window.location.origin + "/api/contact", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subject, body, topic, name, email }),
  });
