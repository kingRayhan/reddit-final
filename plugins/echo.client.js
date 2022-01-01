import Echo from "laravel-echo";

window.Pusher = require("pusher-js");

Pusher.Runtime.createXHR = () => {
  let xhr = new XMLHttpRequest();

  xhr.withCredentials = true;

  return xhr;
};

export default (_, inject) => {
  const echo = new Echo({
    broadcaster: "pusher",
    authEndpoint: process.env.NUXT_ENV_API + "/broadcasting/auth",
    key: process.env.NUXT_ENV_PUSHER_KEY,
    cluster: process.env.NUXT_ENV_PUSHER_CLUSTER,
    forceTLS: true
  });
  inject("echo", echo);
};
