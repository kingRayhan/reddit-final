<template>
  <div>
    <Navbar />
    <div class="container mx-auto">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>
<script>
export default {
  async fetch() {
    if (this.$auth.loggedIn) await this.$store.dispatch("notification/load");
  }
};
</script>
