<template>
  <div class="grid grid-cols-12 ">
    <div
      class="col-span-6 col-start-4 p-5 border-2 border-dashed border-primaryDark"
    >
      <div class="mb-3">
        <h3
          class="flex space-x-2 text-2xl font-bold uppercase text-primaryDark"
        >
          <svg
            class="w-6 "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
            />
          </svg>
          <span>Recover your account</span>
        </h3>
        <p class="mt-3 text-xl text-gray-600 ">
          Forgot your account’s password or having trouble logging into your
          Team? Enter your email address and we’ll send you a recovery link.
        </p>
      </div>

      <form action="#" class="mt-5" @submit.prevent="forgotPassword">
        <form-input
          placeholder="Your email address"
          label="Email address"
          v-model="form.email"
          :helperText="errorMessage('email')"
          :isError="Boolean(errorMessage('email'))"
        />
        <form-button :loading="loading">Send recovery email</form-button>
      </form>
    </div>
  </div>
</template>

<script>
import validation from "~/mixins/validation";
export default {
  head: {
    title: "Recovery account"
  },
  mixins: [validation],
  layout: "fullwidth",
  data() {
    return {
      form: {
        email: ""
      },
      loading: false
    };
  },
  methods: {
    async forgotPassword() {
      this.errors = {};
      this.loading = true;
      await this.$axios.$get("/sanctum/csrf-cookie");
      this.$axios
        .$post("/api/auth/forgot-password", this.form)
        .then(() => {
          this.$store.commit(
            "alert/SHOW_SUCCESS",
            "Check email inbox to recover your account"
          );
          this.$router.push({
            name: "index"
          });
        })
        .catch(this.resolveErrors);

      this.loading = false;
    }
  }
};
</script>
