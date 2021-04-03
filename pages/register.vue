<template>
  <div>
    <h3 class="mb-4 font-bold uppercase text-primaryDark">
      create a new account
    </h3>

    <form method="post" @submit.prevent="handleRegister">
      <form-input
        label="Username"
        placeholder="Your username"
        v-model="form.username"
        :helperText="errorMessage('username')"
        :isError="Boolean(errorMessage('username'))"
      />
      <form-input
        label="Email"
        placeholder="Your email"
        type="email"
        v-model="form.email"
        :helperText="errorMessage('email')"
        :isError="Boolean(errorMessage('email'))"
      />
      <form-input
        label="Password"
        placeholder="Your password"
        v-model="form.password"
        type="password"
        :helperText="errorMessage('password')"
        :isError="Boolean(errorMessage('password'))"
      />

      <form-input
        label="Password again"
        placeholder="Password again"
        type="password"
        v-model="form.password_confirmation"
        :helperText="errorMessage('password_confirmation')"
        :isError="Boolean(errorMessage('password_confirmation'))"
      />

      <form-button>Login</form-button>
    </form>
  </div>
</template>
<script>
import validation from "~/mixins/validation";
export default {
  mixins: [validation],
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
      }
    };
  },
  methods: {
    async handleRegister() {
      await this.$axios.$get("/sanctum/csrf-cookie");

      this.$axios
        .$post("/api/auth/register", this.form)
        .then(() => {
          this.$store.commit(
            "alert/SHOW_SUCCESS",
            "Check your email to verify"
          );

          this.$auth.fetchUser();
          this.$router.push("/");
        })
        .catch(this.resolveErrors);
    }
  }
};
</script>
