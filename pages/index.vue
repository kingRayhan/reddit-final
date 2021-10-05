<template>
  <div>
    <div class="mb-5" v-if="!$auth.loggedIn">
      <welcome-banner />
    </div>

    <div v-if="$fetchState.pending" class="text-center ">
      <Loading />
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
  mounted() {
    this.$echo.channel("threads").listen("NewThreadCreated", thread => {
      if (thread.data.user !== this.$auth.user.id) {
        this.resources.unshift(thread.data);
      }
    });
  },
  beforeDestroy() {
    this.$echo.leave("threads");
  },
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
