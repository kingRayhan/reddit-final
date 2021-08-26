<template>
  <div>
    <Navbar />
    <div class="container reddit-layout">
      <main class="reddit-layout__content">
        <Nuxt />
      </main>
      <aside class="reddit-layout__sidebar">
        <sidebar />
      </aside>
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
