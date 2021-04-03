<template>
  <div
    class="p-3 mb-10 border-2 border-dashed rounded-sm border-primary"
    v-if="!$auth.user.email_verified_at"
  >
    <img
      class="w-56 mx-auto"
      src="~/static/images/snoo-verify-email.png"
      alt="reddit email not varified"
    />

    <p class="my-3 text-xl">
      Your email address is not verified yet. Before submitting your first
      thread verify your email address
    </p>
    <button
      class="w-full py-2 mt-2 text-white rounded bg-primaryDark"
      @click="resend"
    >
      Resent email
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async resend() {
      await this.$axios.$post("/api/auth/email/verification-notification");
    }
  }
};
</script>
