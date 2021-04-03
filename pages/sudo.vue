<template>
  <div>
    <div class="p-5 border-2 border-yellow-500 border-dashed">
      <img src="~/static/images/snoo-cry.jpg" alt="snoo-cry" />

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
          <span>Hey, Hold on!!</span>
        </h3>
        <p class="mt-3 text-xl text-gray-600 ">
          Before commiting this action, you need to confirm your passowrd
        </p>

        <div class="mt-5 ">
          <form-input
            placeholder="Current password"
            label="Confirm password"
            type="password"
            v-model="password"
            :helperText="errorMessage('password')"
            :isError="Boolean(errorMessage('password'))"
          />
        </div>
      </div>

      <button
        class="px-2 py-1 text-white bg-yellow-500 rounded"
        @click="confirmPassword"
      >
        Confirm
      </button>
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
  middleware: ["auth", "password-is-not-confirmed"],
  data() {
    return {
      password: ""
    };
  },
  methods: {
    confirmPassword() {
      this.$axios
        .$post("/api/auth/user/confirm-password", {
          password: this.password
        })
        .then(d => {
          this.$store.commit(
            "alert/SHOW_SUCCESS",
            "Your password is confirmed"
          );
          this.$router.push(this.$route.query.redirectTo);
          this.$nuxt.$emit("sudo-confirmed", true);
        })
        .catch(this.resolveErrors);
    }
  }
};
</script>
