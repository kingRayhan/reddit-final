<template>
  <div>
    <form @submit.prevent="postComment" class="mb-5 ">
      <textarea
        class="w-full p-2 border-2 border-gray-600"
        cols="30"
        rows="4"
        v-model="newComment"
      ></textarea>
      <p class="my-2 text-sm text-red-500" v-if="errors">
        {{ errors.text && errors.text[0] }}
      </p>
      <form-button>Submit</form-button>
    </form>

    <div>
      <comment
        v-for="comment in comments"
        :comment="comment"
        :key="comment.id"
      />
    </div>
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
import validation from "~/mixins/validation";
export default {
  props: ["thread_id"],
  mixins: [validation],
  data() {
    return {
      comments: [],
      commentsMeta: {
        current_page: 1,
        last_page: null
      },
      newComment: ""
    };
  },
  async fetch() {
    const { data: comments, meta } = await this.$axios.$get(
      `/api/comments/${this.thread_id}`
    );
    this.comments = comments;
    this.commentsMeta.last_page = meta.last_page;
  },
  methods: {
    async postComment() {
      this.clearErrors();
      try {
        const { data: comment } = await this.$axios.$post(
          `/api/comments/${this.thread_id}`,
          {
            text: this.newComment
          }
        );
        this.comments.unshift(comment);
        this.newComment = "";
        this.$emit("commentCreated");
      } catch (error) {
        this.resolveErrors(error);
      }
    },
    async loadmore() {
      this.commentsMeta.current_page += 1;

      const { data: comments } = await this.$axios.$get(
        `/api/comments/${this.thread_id}?page=${this.commentsMeta.current_page}`
      );

      this.comments = this.comments.concat(comments);
    }
  }
};
</script>
