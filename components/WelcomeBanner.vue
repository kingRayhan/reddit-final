<template>
  <section>
    <h2 class="text-2xl">Welcome to Reddit.</h2>
    <h4 class="mb-2 text-xl">
      Where a community about your favorite things is waiting for you.
    </h4>
    <form-button @click="moveToRegisterPage">
      Become a Redditor
    </form-button>
  </section>
</template>
<script>
export default {
  methods: {
    moveToRegisterPage() {
      this.$router.push({ name: "auth-signup" });
    }
  }
};
</script>
<style scoped>
section {
  background-image: url("~static/images/welcome-banner.png");
  background-position: right;
  background-color: #fefbca;
  padding: 8px;
}
</style>
