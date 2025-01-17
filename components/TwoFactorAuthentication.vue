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

        <div v-if="recoveryCodes">
          <p class="mt-5 text-gray-500">
            Store these recovery codes in a secure password manager. They can be
            used to recover access to your account if your two factor
            authentication device is lost.
          </p>
          <pre v-html="recoveryCodes.join('\n')" class="p-3 bg-gray-100"></pre>
        </div>
      </div>

      <div>
        <div class="flex space-x-4">
          <form-button
            v-if="!recoveryCodes && isTwoFacorAutheticationEnabled"
            :loading="loading"
            @click="generateRecoveryCodes"
          >
            Show recovery codes
          </form-button>

          <form-button
            v-if="recoveryCodes && isTwoFacorAutheticationEnabled"
            :loading="loading"
            @click="reGenerateRecoveryCodes"
          >
            Regenerate recovery codes
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
import validation from "~/mixins/validation";
export default {
  mixins: [validation],
  data() {
    return {
      loading: false,
      recoveryCodes: null,
      qrCode: null
    };
  },
  mounted() {},
  methods: {
    async enableTwofactoryAuthentication() {
      this.loading = true;
      try {
        await this.$axios.$post("/api/auth/user/two-factor-authentication");
        const { svg } = await this.$axios.$get(
          "/api/auth/user/two-factor-qr-code"
        );
        const codes = await this.$axios.$get(
          "/api/auth/user/two-factor-recovery-codes"
        );
        this.qrCode = svg;
        this.recoveryCodes = codes;
        this.loading = false;
        this.$auth.fetchUser();
      } catch (error) {}
    },
    async disableTwofactoryAuthentication() {
      this.loading = true;

      try {
        await this.$axios.$delete("/api/auth/user/two-factor-authentication");

        this.loading = false;
        this.qrCode = null;
        this.recoveryCodes = null;
        this.$auth.fetchUser();
      } catch (error) {}
    },
    async generateRecoveryCodes() {
      this.loading = true;
      try {
        const codes = await this.$axios.$get(
          "/api/auth/user/two-factor-recovery-codes"
        );
        this.recoveryCodes = codes;
        this.loading = false;
      } catch (error) {}
    },
    async reGenerateRecoveryCodes() {
      this.loading = true;
      try {
        await this.$axios.$post("/api/auth/user/two-factor-recovery-codes");
        await this.generateRecoveryCodes();
        this.loading = false;
      } catch (error) {}
    }
  },
  computed: {
    isTwoFacorAutheticationEnabled() {
      return Boolean(this.$auth.user.two_factor_secret);
    }
  }
};
</script>
