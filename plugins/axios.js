export default ({ $axios, redirect }) => {
  $axios.onResponse(response => {
    if (response.data.two_factor === true) {
      redirect({ name: "auth-two-factor-challenge" });
    }
  });
  // $axios.onError(error => {
  //   // if (error.response.data?.message)
  //   //   store.commit("alert/SHOW_ERROR", error.response.data.message);
  // });
};
