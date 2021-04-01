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
        :helperText="errors.username && errors.username.join('')"
        :isError="errors.username !== undefined"
      />
      <form-input
        label="Email"
        placeholder="Your email"
        v-model="form.email"
        :helperText="errors.email && errors.email.join('')"
        :isError="errors.email !== undefined"
      />
      <form-input
        label="Password"
        placeholder="Your password"
        v-model="form.password"
        :helperText="errors.password && errors.password.join('')"
        :isError="errors.password !== undefined"
      />

      <form-input
        label="Password again"
        placeholder="Password again"
        v-model="form.password_confirmation"
        :helperText="
          errors.password_confirmation && errors.password_confirmation.join('')
        "
        :isError="errors.password_confirmation !== undefined"
      />

      <form-button>Login</form-button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      errors: {}
    };
  },
  methods: {
    handleRegister() {
      this.$axios.$get("/sanctum/csrf-cookie").then(() => {
        this.$axios
          .$post("/api/auth/register", this.form)
          .then(d => {
            this.$router.push("/");
          })
          .catch(e => (this.errors = e.response.data.errors));
      });
    }
  }
};
</script>
