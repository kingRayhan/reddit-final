<template>
  <div class="grid grid-cols-12 ">
    <div
      class="col-span-6 col-start-4 p-5 border-2 border-yellow-500 border-dashed"
    >
      <div class="mb-3">
        <h3 class="flex space-x-2 text-2xl font-bold text-yellow-500 uppercase">
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
          <span>Two factor authentication</span>
        </h3>
        <p class="mt-3 text-xl text-gray-600 ">
          Please confirm access to your account by entering the authentication
          code provided by your authenticator application.
        </p>
      </div>

      <form action="#" class="mt-5" @submit.prevent="confirmCode">
        <form-input
          placeholder="Authentication code"
          label="Code"
          v-model="code"
          :helperText="errorMessage('code')"
          :isError="Boolean(errorMessage('code'))"
        />
        <button class="px-2 py-1 text-white bg-yellow-500 rounded">
          Confirm
        </button>
      </form>

      <div class="mt-2 ">
        <nuxt-link :to="{ name: 'auth-two-factor-challenge-recovery-codes' }">
          I have recovery codes
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import validation from "~/mixins/validation";
export default {
  head: {
    title: "sudo"
  },
  mixins: [validation],
  middleware: [],
  layout: "fullwidth",
  data() {
    return {
      code: ""
    };
  },
  methods: {
    confirmCode() {
      this.errors = {};
      this.$axios
        .$post("/api/auth/two-factor-challenge ", {
          code: this.code
        })
        .then(d => {
          this.$store.commit("alert/SHOW_SUCCESS", "Successfully logged in");
          this.$router.push({
            name: "index"
          });
          this.$auth.fetchUser();
        })
        .catch(this.resolveErrors);
    }
  }
};
</script>
