<template>
  <div>
    <h2 class="text-3xl uppercase text-primaryDark">Settings</h2>
    <form @submit.prevent="updateProfile" class="p-5 my-5 bg-gray-50">
      <form-input
        placeholder="Username"
        label="Username"
        v-model="profile.username"
        :helperText="errorMessage('username')"
        :isError="Boolean(errorMessage('username'))"
      />
      <form-input
        placeholder="Email"
        label="Email"
        v-model="profile.email"
        :helperText="errorMessage('email')"
        :isError="Boolean(errorMessage('email'))"
      />
      <form-button :loading="loading">Update Profile</form-button>
    </form>

    <form class="p-5 mt-5 bg-gray-50" @submit.prevent="updatePassword">
      <form-input
        placeholder="Current password"
        label="Current password"
        type="password"
        v-model="credentials.current_password"
        :helperText="errorMessage('current_password')"
        :isError="Boolean(errorMessage('current_password'))"
      />
      <form-input
        placeholder="New password"
        label="New password"
        type="password"
        v-model="credentials.password"
        :helperText="errorMessage('password')"
        :isError="Boolean(errorMessage('password'))"
      />
      <form-input
        placeholder="Confirm new password"
        label="Confirm password"
        type="password"
        v-model="credentials.password_confirmation"
        :helperText="errorMessage('password_confirmation')"
        :isError="Boolean(errorMessage('password_confirmation'))"
      />
      <form-button :loading="loading">Update password</form-button>
    </form>

    <two-factor-authentication />

    <div class="mt-8">
      <div class="p-5 border-2 border-red-500 border-dashed">
        <div class="mb-3">
          <h3 class="text-2xl font-bold text-red-500 uppercase">Danger zone</h3>
          <p class="text-xl text-gray-600">
            Are you sure you want to delete your account? Once your account is
            deleted, all of its resources and data will be permanently deleted.
            Please enter your password to confirm you would like to permanently
            delete your account.
          </p>
        </div>

        <button
          class="px-2 py-1 text-white bg-red-500 rounded"
          @click="destroyAccount"
        >
          Delete profile
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import validation from "~/mixins/validation";
export default {
  mixins: [validation],
  name: "Settings",
  head: {
    title: "Settings"
  },
  mounted() {
    // this.$axios
    //   .$get("/api/auth/user/two-factor-qr-code")
    //   .then(d => console.log(d));
  },
  data() {
    return {
      profile: {
        ...this.$auth.user
      },
      credentials: {
        current_password: "",
        password: "",
        password_confirmation: ""
      },
      loading: false
    };
  },
  methods: {
    async updateProfile() {
      this.loading = true;
      this.errors = {};
      try {
        await this.$axios.$put(
          "/api/auth/user/profile-information",
          this.profile
        );
        this.loading = false;
        this.$auth.fetchUser();
        this.$store.commit(
          "alert/SHOW_SUCCESS",
          "Profile updated successfully"
        );
      } catch (error) {
        this.loading = false;
        this.resolveErrors(error);
      }
    },
    async updatePassword() {
      this.loading = true;
      this.errors = {};
      try {
        await this.$axios.$put("/api/auth/user/password", this.credentials);
        this.loading = false;
        this.$store.commit(
          "alert/SHOW_SUCCESS",
          "Password updated successfully"
        );
      } catch (error) {
        this.loading = false;
        this.resolveErrors(error);
      }
    },
    async destroyAccount() {
      try {
        await this.$axios.$delete("/api/auth/destroy");
        this.$user.fetchUser();
      } catch (error) {}
    }
  }
};
</script>
