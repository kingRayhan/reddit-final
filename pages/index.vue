<template>
  <div class="mt-3">
    <Thread class="mb-4" />
    <Thread class="mb-4" />
    <Thread class="mb-4" />
  </div>
</template>

<script>
export default {
  head: {
    title: "Home"
  },
  asyncData({ query, store }) {
    if (query.verified == 1)
      store.commit("alert/SHOW_SUCCESS", "Your accout is active now");
  }
};
</script>
