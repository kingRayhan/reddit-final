<template>
  <div>
    <login-widget v-if="!$auth.loggedIn" />

    <email-not-verified v-if="$auth.loggedIn" />

    <div>
      <nuxt-link class="mb-4 submitter-button" :to="{ name: 'threads-new' }">
        <span>Submit now</span>
        <div class="nub"></div>
      </nuxt-link>
    </div>

    <img
      src="~/static/images/toto-logo-1599689481-30467661479.png"
      alt="reddit"
      class="my-4"
    />

    <rules />
  </div>
</template>
