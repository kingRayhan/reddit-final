import Echo from "laravel-echo";
window.Pusher = require("pusher-js");

export default ({ app }, inject) => {
  window.Pusher = require("pusher-js");

  const echo = new Echo({
    broadcaster: "pusher",
    key: process.env.NUXT_ENV_PUSHER_KEY,
    cluster: process.env.NUXT_ENV_PUSHER_CLUSTER,
    forceTLS: true,
    authorizer: channel => {
      return {
        authorize: (socketId, callback) => {
          app.$axios
            .post("/broadcasting/auth", {
              socket_id: socketId,
              channel_name: channel.name
            })
            .then(response => {
              callback(false, response.data);
            })
            .catch(error => {
              callback(true, error);
            });
        }
      };
    }
  });

  inject("echo", echo);
};
