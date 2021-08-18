<template>
  <div v-if="$fetchState.pending" class="text-center ">
    <Loading />
  </div>
  <div v-else>
    <thread
      :thread="thread"
      :expanded="true"
      @removed="handleAfterThreadDeleted"
    />
    <hr class="my-5" />

    <CommentSection
      :thread_id="thread.id"
      @commentCreated="() => thread.comments_count++"
    />
  </div>
</template>

<script>
export default {
  name: "Details",

  head() {
    return {
      title: this.thread.title
    };
  },
  data() {
    return {
      thread: {}
    };
  },
  async fetch() {
    const { data: thread } = await this.$axios.$get(
      `/api/threads/${this.$route.params.slug}`
    );
    this.thread = thread;
  },
  methods: {
    handleAfterThreadDeleted() {
      this.$router.push({ name: "index" });
    }
  }
};
</script>
