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
    <div>
      <a href="#">Forgot password?</a>
      <button class="px-3 mt-2 bg-gray-200 border border-gray-600 ">
        Login
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      errors: {}
    };
  },
  methods: {
    async handleLogin() {
      try {
        const user = await this.$auth.loginWith("laravelSanctum", {
          data: this.form
        });
        console.log(user);
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    }
  }
};
</script>
