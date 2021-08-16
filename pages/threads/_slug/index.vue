<template>
  <div v-if="$fetchState.pending">
    <h1 class="text-4xl ">Loading</h1>
  </div>
  <div v-else>
    <thread
      :thread="thread"
      :expanded="true"
      @removed="handleAfterThreadDeleted"
    />
    <hr class="my-5" />

    <div class="mb-5 ">
      <textarea
        class="w-full p-2 border-2 border-gray-600"
        cols="30"
        rows="4"
      ></textarea>
      <form-button>Submit</form-button>
    </div>

    <comment v-for="comment in comments" :comment="comment" :key="comment.id" />

    <div
      class="text-center"
      v-if="commentsMeta.current_page < commentsMeta.last_page"
    >
      <a
        href="#"
        @click.prevent="loadmore"
        class="text-xl font-bold text-primaryDark"
      >
        Load Mores
      </a>
    </div>
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
      thread: {},
      comments: [],
      commentsMeta: {
        current_page: 1,
        last_page: null
      }
    };
  },
  async fetch() {
    const { data: thread } = await this.$axios.$get(
      `/api/threads/${this.$route.params.slug}`
    );
    const { data: comments, last_page } = await this.$axios.$get(
      `/api/comments?thread_id=${thread.id}`
    );
    this.thread = thread;
    this.comments = comments;

    this.commentsMeta.last_page = last_page;
  },
  methods: {
    handleAfterThreadDeleted() {
      this.$router.push({ name: "index" });
    },
    async loadmore() {
      this.commentsMeta.current_page += 1;

      const { data: comments } = await this.$axios.$get(
        `/api/comments?thread_id=${this.thread.id}&page=${this.commentsMeta.current_page}`
      );

      this.comments = this.comments.concat(comments);
    }
  }
};
</script>
