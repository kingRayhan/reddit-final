export default {
  methods: {
    async sudoCheck() {
      const { confirmed } = await this.$axios.$get(
        "/api/auth/user/confirmed-password-status"
      );

      if (!confirmed) {
        this.$router.push({
          name: "sudo",
          query: { redirectTo: this.$route.path }
        });
        throw new Error("sudo is not confirmed");
      }
    }
  }
};
