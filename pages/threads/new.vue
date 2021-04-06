<template>
  <div>
    <h2 class="mb-4 text-2xl">Submit post/link</h2>

    <editor @saved="handleSaveThread" :errors="errors" />

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
  name: "New",
  head: {
    title: "Submit post/link"
  },
  mixins: [validation],
  methods: {
    async handleSaveThread(data) {
      try {
        const thread = await this.$axios.$post("/api/threads", data);
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
