<template>
  <div v-bind="$attrs">
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
                >
                  Share
                </button>
                <a class="text-sm font-bold text-red-600 cursor-pointer">
                  Delete
                </a>
              </div>
            </div>
          </div>
          <div v-if="expanded" class="thread__details">
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
      isLiked: false,
      isUnliked: true
    };
  },
  methods: {
    hostName(fullUrl) {
      const url = new URL(fullUrl);
      return url.host;
    }
  }
};
</script>
