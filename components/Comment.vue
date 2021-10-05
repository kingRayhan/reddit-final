<template>
  <div>
    <div class="flex w-full mb-2">
      <!-- voting start -->
      <div class="vote">
        <button
          @click="upVote"
          class="arrow arrow--up-vote"
          :class="{ 'arrow--up-vote--voted': isUpvoted }"
        ></button>
        <button
          @click="downVote"
          class="arrow arrow--down-vote"
          :class="{ 'arrow--down-vote--voted': isDownvoted }"
        ></button>
      </div>
      <!-- voting end -->

      <div class="mb-4 ml-5">
        <nuxt-link
          class="font-bold"
          :to="{
            name: 'u-username',
            params: { username: comment.user.username }
          }"
        >
          u/{{ comment.user.username }}
        </nuxt-link>
        <span class="text-sm text-gray-600">
          {{ comment.voteScores }} point(s) (
          {{ $time(comment.created_at).fromNow() }} )
        </span>
        <p class="text-xl">
          {{ comment.text }}
        </p>

        <div>
          <a
            v-if="$auth.loggedIn && $auth.user.id == comment.user.id"
            href="#"
            @click.prevent="deleteComment"
            class="mr-2 text-sm font-bold text-red-600"
          >
            Delete
          </a>

          <a
            href="#"
            @click.prevent="replyOpen = !replyOpen"
            class="mr-2 text-sm font-bold text-gray-600"
          >
            <span v-if="!replyOpen">Reply</span>
            <span v-if="replyOpen">Close</span>
          </a>

          <form v-if="replyOpen" @submit.prevent="postReply(comment.id)">
            <textarea
              v-model="newReply"
              class="w-full p-2 border-2 border-gray-600"
            ></textarea>
            <form-button>post</form-button>
          </form>
        </div>
      </div>
    </div>

    <div v-if="comment.replies" class="ml-8 border-l-2">
      <comment
        v-for="comment in comment.replies"
        :comment="comment"
        :key="comment.id"
        @commentDeleted="cleanupComment"
        :thread_id="thread_id"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["comment", "thread_id"],
  data() {
    return {
      replyOpen: false,
      newReply: "",
      isUpvoted:
        this.$auth.loggedIn &&
        this.comment.upVotedBy.includes(this.$auth.user.id),
      isDownvoted:
        this.$auth.loggedIn &&
        this.comment.downVotedBy.includes(this.$auth.user.id)
    };
  },
  mounted() {
    this.$echo
      .channel(`votes.comment.${this.comment.id}`)
      .listen("VoteUpdated", vote => {
        if (this.$auth.loggedIn && vote.actor_id == this.$auth.user.id) return;

        this.comment.voteScores = vote.voteScores;
      });
  },
  beforeDestroy() {
    this.$echo.leave(`votes.comment.${this.comment.id}`);
  },
  watch: {
    isUpvoted(_, oldVote) {
      if (oldVote) {
        this.comment.voteScores--;
      } else {
        this.comment.voteScores++;
      }
    },
    isDownvoted(_, oldVote) {
      if (oldVote) {
        this.comment.voteScores++;
      } else {
        this.comment.voteScores--;
      }
    }
  },
  methods: {
    cleanupComment(comment) {
      const index = this.comment.replies.findIndex(c => c.id == comment.id);
      this.comment.replies.splice(index, 1);
    },
    async deleteComment() {
      if (confirm("sure to delete?")) {
        try {
          const comment = await this.$axios.$delete(
            `/api/comments/${this.comment.id}`
          );
          this.$emit("commentDeleted", comment.data);
        } catch (error) {}
      }
    },

    async postReply(reply_to) {
      try {
        const reply = await this.$axios.$post(
          `/api/comments/${this.thread_id}?reply_to=${reply_to}`,
          { text: this.newReply }
        );
        this.replyOpen = false;
        this.newReply = "";
        this.comment.replies = [reply.data, ...this.comment.replies];
      } catch (error) {}
    },
    async upVote() {
      if (!this.$auth.loggedIn) {
        return this.$store.commit("alert/SHOW_ERROR", "You are not logged in");
      }
      this.isUpvoted = !this.isUpvoted;
      this.isDownvoted = false;
      try {
        await this.$axios.$post("/api/votes/up", {
          resource_type: "comment",
          resource_id: this.comment.id
        });
      } catch (error) {}
    },
    async downVote() {
      if (!this.$auth.loggedIn) {
        return this.$store.commit("alert/SHOW_ERROR", "You are not logged in");
      }
      this.isDownvoted = !this.isDownvoted;
      this.isUpvoted = false;
      try {
        await this.$axios.$post("/api/votes/down", {
          resource_type: "comment",
          resource_id: this.comment.id
        });
      } catch (error) {}
    }
  }
};
</script>
