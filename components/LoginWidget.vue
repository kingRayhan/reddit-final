<template>
  <form
    @submit.prevent="handleLogin"
    class="flex flex-col items-start p-2 mb-3 border border-gray-600 justify-items-end"
  >
    <ul>
      <li v-for="error in errors" :key="error" class="text-red-500 ">
        {{ error.join(" ") }}
      </li>
    </ul>

    <div class="flex">
      <input
        v-model="form.email"
        type="text"
        placeholder="Email"
        class="w-1/2 px-3 py-1 mr-3 border border-gray-600 focus:outline-none focus:border-primaryDark"
      />
      <input
        v-model="form.password"
        type="password"
        placeholder="Password"
        class="w-1/2 px-3 py-1 border border-gray-600 focus:outline-none focus:border-primaryDark"
      />
    </div>
    <div class="space-x-3 ">
      <nuxt-link :to="{ name: 'auth-forgot-password' }">
        Forgot password?
      </nuxt-link>
      <button class="px-3 mt-2 bg-gray-200 border border-gray-600 ">
        Login
      </button>
    </div>
  </form>
</template>

<script>
import validation from "~/mixins/validation";
export default {
  mixins: [validation],
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    handleLogin() {
      this.$auth
        .loginWith("laravelSanctum", {
          data: this.form
        })
        .catch(this.resolveErrors);
    }
  }
};
</script>
