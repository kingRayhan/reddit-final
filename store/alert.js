export const state = () => ({
  show: false,
  type: "error", // error, success
  message: ""
});

export const mutations = {
  SHOW_ERROR(state, message) {
    state.show = true;
    state.type = "error";
    state.message = message;
  },
  SHOW_SUCCESS(state, message) {
    state.show = true;
    state.type = "success";
    state.message = message;
  },
  CLOSE(state) {
    state.show = false;
    state.message = "";
  }
};
