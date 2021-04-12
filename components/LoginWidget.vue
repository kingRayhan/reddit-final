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
    <div class="flex items-center justify-between w-full">
      <div class="flex items-center space-x-2">
        <input type="checkbox" id="remember" v-model="form.remember" />
        <label for="remember">remember me</label>
      </div>

      <nuxt-link :to="{ name: 'auth-forgot-password' }">
        reset password
      </nuxt-link>

      <button class="px-3 mt-2 bg-gray-200 border border-gray-600 ">
        <span v-if="loading">
          Loading....
        </span>
        <span v-else>
          Login
        </span>
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
        password: "",
        remember: true
      },
      loading: false
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      try {
        await this.$auth.loginWith("laravelSanctum", {
          data: this.form
        });
      } catch (error) {
        this.resolveErrors(error);
      }

      this.loading = false;
    }
  }
};
</script>
