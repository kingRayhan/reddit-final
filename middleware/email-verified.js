export default async function({ store, redirect, $auth }) {
  if (!$auth.user.email_verified_at) {
    store.commit("alert/SHOW_ERROR", "Your email is not verified yet");
    return redirect("/");
  }
}
