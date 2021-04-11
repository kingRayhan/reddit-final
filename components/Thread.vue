<template>
  <div v-bind="$attrs">
    <modal v-model="showShareModal">
      <ShareThread :threadUrl="`/threads/${thread.slug}`" />
    </modal>
    <div class="thread">
      <div class="thread__votes">
        <button
          class="arrow arrow--up-vote"
          :class="{ 'arrow--up-vote--voted': isUpvoted }"
          @click="upVote"
        ></button>

        <div class="text-sm font-bold text-gray-600">
          {{ thread.voteScores }}
        </div>

        <button
          class="arrow arrow--down-vote"
          :class="{
            'arrow--down-vote--voted': isDownvoted
          }"
          @click="downVote"
        ></button>
      </div>

      <div class="thread__inner">
        <div class="thread__icon">
          <nuxt-link
            v-if="!thread.image"
            :to="{ name: 'threads-slug', params: { slug: thread.slug } }"
            class="block logos"
            :class="{
              'logos--logo-link': thread.type == 'LINK',
              'logos--logo-post': thread.type == 'TEXT'
            }"
          ></nuxt-link>
          <nuxt-link
            v-else
            :to="{ name: 'threads-slug', params: { slug: thread.slug } }"
          >
            <img class="w-14 " :src="thread.image" :alt="thread.title" />
          </nuxt-link>
        </div>

        <div>
          <nuxt-link
            :to="{ name: 'threads-slug', params: { slug: thread.slug } }"
            class="mt-0 text-xl"
          >
            {{ thread.title }}
          </nuxt-link>
          <a
            v-if="thread.link"
            :href="thread.link"
            target="_blank"
            class="text-sm text-gray-500"
          >
            ({{ hostName(thread.link) }})
          </a>

          <div class="flex">
            <button
              class="mr-2 icons icons--icon-post"
              :class="{ 'icons--icon-post--active': expanded }"
              @click="expanded = !expanded"
            ></button>

            <div>
              <p class="text-sm text-gray-600">
                submitted {{ thread.time }} by
                <nuxt-link
                  :to="{
                    name: 'u-username',
                    params: { username: thread.user.username }
                  }"
                  class="font-bold text-gray-600"
                >
                  u/{{ thread.user.username }}
                </nuxt-link>
              </p>

              <div>
                <span class="mr-3 text-sm font-bold text-gray-600">
                  74 comments
                </span>

                <button
                  class="mr-3 text-sm font-bold text-gray-600 hover:underline"
                  @click="showShareModal = true"
                >
                  Share
                </button>
                <nuxt-link
                  v-if="$auth.loggedIn && $auth.user.id == thread.user.id"
                  class="mr-3 text-sm font-bold text-green-600 cursor-pointer"
                  :to="{
                    name: 'threads-slug-edit',
                    params: { slug: thread.slug }
                  }"
                >
                  Edit
                </nuxt-link>
                <a
                  v-if="$auth.loggedIn && $auth.user.id == thread.user.id"
                  class="text-sm font-bold text-red-600 cursor-pointer"
                  @click.prevent="destroy"
                >
                  Delete
                </a>
              </div>
            </div>
          </div>
          <div v-if="expanded" class="thread__details overflow-ellipsis">
            <p v-if="thread.image">
              <img :src="thread.image" :alt="thread.title" />
            </p>
            <p v-else-if="thread.text">
              {{ thread.text }}
            </p>
            <p v-else-if="thread.link">
              <a :href="thread.link">{{ thread.link }}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["thread", "expanded"],
  data() {
    return {
      showShareModal: false,
      isUpvoted:
        this.$auth.loggedIn &&
        this.thread.upVotedBy.includes(this.$auth.user.id),
      isDownvoted:
        this.$auth.loggedIn &&
        this.thread.downVotedBy.includes(this.$auth.user.id)
    };
  },
  watch: {
    isUpvoted(_, oldVote) {
      if (oldVote) {
        this.thread.voteScores--;
      } else {
        this.thread.voteScores++;
      }
    },
    isDownvoted(_, oldVote) {
      if (oldVote) {
        this.thread.voteScores++;
      } else {
        this.thread.voteScores--;
      }
    }
  },
  methods: {
    hostName(fullUrl) {
      const url = new URL(fullUrl);
      return url.host;
    },
    async destroy() {
      if (confirm("sure to delete?")) {
        await this.$axios.$delete(`/api/threads/${this.thread.slug}`);
        this.$emit("removed", this.thread.id);
      }
    },
    async upVote() {
      if (!this.$auth.loggedIn) {
        return this.$store.commit("alert/SHOW_ERROR", "You are not logged in");
      }
      try {
        await this.$axios.$post("/api/votes/up", {
          resource_type: "thread",
          resource_id: this.thread.id
        });
      } catch (error) {}
      this.isUpvoted = !this.isUpvoted;
      this.isDownvoted = false;
    },
    async downVote() {
      if (!this.$auth.loggedIn) {
        return this.$store.commit("alert/SHOW_ERROR", "You are not logged in");
      }
      try {
        await this.$axios.$post("/api/votes/down", {
          resource_type: "thread",
          resource_id: this.thread.id
        });
      } catch (error) {}

      this.isDownvoted = !this.isDownvoted;
      this.isUpvoted = false;
    }
  }
};
</script>
