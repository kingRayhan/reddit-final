<template>
  <div>
    <div class="mb-5" v-if="!$auth.loggedIn">
      <welcome-banner />
    </div>

    <Thread
      class="mb-4"
      v-for="(thread, index) in resources"
      :key="index"
      :thread="thread"
      @removed="handleAfterThreadDeleted"
    />

    <div
      v-observe-visibility="visibilityChanged"
      class="text-center"
      v-if="current_page < last_page"
    >
      <Loading />
    </div>
  </div>
</template>

<script>
import resource from "~/mixins/resource";
export default {
  head: {
    title: "Home"
  },
  mixins: [resource("threads")],
  methods: {
    handleAfterThreadDeleted(threadId) {
      this.resources = this.resources.filter(thread => thread.id !== threadId);
    }
  }
};
</script>
