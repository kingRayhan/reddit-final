<template>
  <div v-bind="$attrs">
    <modal v-model="showShareModal">
      <ShareThread :threadUrl="`/threads/${thread.slug}`" />
    </modal>
    <div class="thread">
      <div class="thread__votes">
        <button
          class="arrow arrow--up-vote"
          :class="{ 'arrow--up-vote--voted': true }"
        ></button>

        <div class="text-sm font-bold text-gray-600">14</div>

        <button
          class="arrow arrow--down-vote"
          :class="{
            'arrow--down-vote--voted': false
          }"
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
            :to="{ name: 'threads-slug', params: { slug: thread.slug } }"
          >
            <img class="w-14 " :src="thread.image" alt="" />
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
            v-if="thread.url"
            :href="thread.url"
            target="_blank"
            class="text-sm text-gray-500"
          >
            ({{ hostName(thread.url) }})
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
                <a
                  v-if="$auth.loggedIn && $auth.user.id == thread.user.id"
                  class="mr-3 text-sm font-bold text-green-600 cursor-pointer"
                  @click.prevent="destroy"
                >
                  Edit
                </a>
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
            <p v-else-if="thread.url">
              <a :href="thread.url">{{ thread.url }}</a>
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
      isLiked: false,
      isUnliked: true,
      showShareModal: false
    };
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
    }
  }
};
</script>
