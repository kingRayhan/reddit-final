<template>
  <div>
    <h2 class="mb-4 text-2xl">Update post/link</h2>

    <editor @saved="handleSaveThread" :errors="errors" :thread="thread" />

    <div class="mt-4">
      <div>
        please be mindful of reddit's
        <a href="https://old.reddit.com/help/contentpolicy" target="_blank">
          content policy
        </a>
        and practice
        <a href="https://old.reddit.com/wiki/reddiquette" target="_blank">
          good reddiquette </a
        >.
      </div>
      <div class="link-notice" style="display: none">
        posting this link saves the image or gif to reddit.
      </div>
    </div>
  </div>
</template>

<script>
import validation from "~/mixins/validation";
export default {
  middleware: "auth",
  name: "Update",
  head: {
    title: "Submit post/link"
  },
  data() {
    return {
      thread: {}
    };
  },
  mixins: [validation],
  async asyncData({ $axios, params }) {
    const { data: thread } = await $axios.$get(`/api/threads/${params.slug}`);
    return { thread };
  },
  methods: {
    async handleSaveThread(data) {
      try {
        const thread = await this.$axios.$put(
          `/api/threads/${this.$route.params.slug}`,
          data
        );
        // TODO: redirect to thread details page

        this.$store.commit(
          "alert/SHOW_SUCCESS",
          "Your thread created successfully"
        );
        this.$router.push({
          name: "index"
        });
      } catch (e) {
        this.resolveErrors(e);
      }
    }
  }
};
</script>
