export default ({ $axios, store }) => {
  $axios.onError(error => {
    // if (error.response.data?.message)
    //   store.commit("alert/SHOW_ERROR", error.response.data.message);
  });
};
