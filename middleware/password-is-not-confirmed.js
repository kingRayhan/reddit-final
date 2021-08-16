export default async function({ store, $axios, redirect }) {
  const { confirmed } = await $axios.$get(
    "/api/auth/user/confirmed-password-status"
  );

  if (confirmed) {
    store.commit("alert/SHOW_ERROR", "Your already confirmed your password");
    return redirect("/");
  }
}
