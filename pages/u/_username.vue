<template>
  <div>
    <div class="px-2 border-2 border-dashed">
      <h1 class="text-3xl uppercase">u/{{ $route.params.username }}</h1>
    </div>
    <div class="mt-3">
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
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: `u/${this.$route.params.username}`
    };
  },
  data() {
    return {
      resources: [],
      meta: {}
    };
  },
  async asyncData({ $axios, params }) {
    const threads = await $axios.$get(
      `/api/threads?username=${params.username}`
    );
    return {
      resources: threads.data,
      current_page: threads.meta.current_page,
      last_page: threads.meta.last_page
    };
  },
  methods: {
    async loadMore() {
      const { data } = await this.$axios.$get(
        `/api/threads?username=${this.$route.params.username}&page=${this.current_page}`
      );
      this.resources.push(...data);
    },
    async visibilityChanged(isVisible) {
      if (!isVisible || this.current_page >= this.last_page) return;
      this.current_page++;
      await this.loadMore();
    },
    handleAfterThreadDeleted(threadId) {
      this.resources = this.resources.filter(thread => thread.id !== threadId);
    }
  }
};
</script>
