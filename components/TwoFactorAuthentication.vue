<template>
  <div class="mt-8">
    <div class="p-5 border-2 border-dashed border-primaryDark">
      <div class="mb-3">
        <h3 class="text-2xl font-bold uppercase text-primaryDark">
          Two Factor Authentication
        </h3>

        <h3
          class="text-lg font-medium text-green-500"
          v-if="isTwoFacorAutheticationEnabled"
        >
          You have enabled two factor authentication.
        </h3>

        <h3 class="text-lg font-medium text-red-500" v-else>
          You have not enabled two factor authentication.
        </h3>

        <p class="text-xl text-gray-600">
          When two factor authentication is enabled, you will be prompted for a
          secure, random token during authentication. You may retrieve this
          token from your phone's
          <a
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US"
          >
            Google Authenticator application.
          </a>
        </p>

        <div v-if="qrCode">
          <p class="mt-4 text-gray-500">
            Two factor authentication is now enabled. Scan the following QR code
            using your phone's authenticator application.
          </p>

          <div v-html="qrCode"></div>
        </div>
      </div>

      <div>
        <div class="flex space-x-4">
          <form-button
            v-if="!recoveryCode & isTwoFacorAutheticationEnabled"
            :loading="loading"
          >
            Show recovery codes
          </form-button>

          <form-button
            :loading="loading"
            @click="enableTwofactoryAuthentication"
            v-if="!isTwoFacorAutheticationEnabled"
          >
            Enable
          </form-button>

          <form-button
            :isDanger="true"
            :loading="loading"
            @click="disableTwofactoryAuthentication"
            v-if="isTwoFacorAutheticationEnabled"
          >
            Disable
          </form-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sudo from "~/mixins/sudo";
import validation from "~/mixins/validation";
export default {
  mixins: [sudo, validation],
  data() {
    return {
      loading: false,
      recoveryCode: null,
      qrCode: null
    };
  },
  mounted() {},
  methods: {
    async enableTwofactoryAuthentication() {
      this.loading = true;
      await this.sudoCheck();
      await this.$axios.$post("/api/auth/user/two-factor-authentication");
      const { svg } = await this.$axios.$get(
        "/api/auth/user/two-factor-qr-code"
      );

      this.qrCode = svg;

      this.loading = false;
      this.$auth.fetchUser();
    },
    async disableTwofactoryAuthentication() {
      this.loading = true;
      this.sudoCheck();
      await this.$axios.$delete("/api/auth/user/two-factor-authentication");
      this.loading = false;
      this.qrCode = null;
      this.$auth.fetchUser();
    },
    async showQRCode() {
      // this.loading = true;
      // const { svg } = await this.$axios.$get(
      //   "/api/auth/user/two-factor-qr-code"
      // );
      // this.recoveryCode =
    }
  },
  computed: {
    isTwoFacorAutheticationEnabled() {
      return Boolean(this.$auth.user.two_factor_secret);
    }
  }
};
</script>
