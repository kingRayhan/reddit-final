<template>
  <div class="mt-3">
    <modal />
    <Thread
      class="mb-4"
      v-for="(thread, index) in resources"
      :key="index"
      :thread="thread"
      @removed="handleAfterThreadDeleted"
    />
    <div
      v-observe-visibility="visibilityChanged"
      v-if="current_page < last_page"
    >
      loading
    </div>
  </div>
</template>

<script>
import pagination from "~/mixins/pagination";
export default {
  head: {
    title: "Home"
  },
  data() {
    return {};
  },
  mixins: [pagination],
  async asyncData({ query, store, $axios }) {
    if (query.verified == 1)
      store.commit("alert/SHOW_SUCCESS", "Your accout is active now");

    const threads = await $axios.$get("/api/threads");
    return {
      resources: threads.data,
      current_page: threads.meta.current_page,
      last_page: threads.meta.last_page
    };
  },
  methods: {
    handleAfterThreadDeleted(threadId) {
      this.resources = this.resources.filter(thread => thread.id !== threadId);
    }
  }
};
</script>
