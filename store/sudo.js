export const state = () => ({
  confirmed: false
});

export const mutation = {
  CHANGE_CONFIRMATION(state, confirmation) {
    state.confirmed = confirmation;
  }
};
