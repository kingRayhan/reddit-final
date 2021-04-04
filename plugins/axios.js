export default ({ $axios, redirect, store, route }) => {
  $axios.onResponse(response => {
    if (response.data.two_factor === true) {
      redirect({ name: "auth-two-factor-challenge" });
    }
  });

  /**
   * Check if password confirmation is needed
   */
  $axios.onError(error => {
    if (error.response.status == 423) {
      redirect({
        name: "sudo",
        query: { redirectTo: route.path }
      });
      store.commit("alert/SHOW_ERROR", error.response.data.message);
    }
  });
};
