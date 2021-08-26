<template>
  <div>
    <div v-if="$fetchState.pending">
      <Loading />
    </div>
    <div v-else>
      <div v-if="this.$route.query.type === 'thread'">
        <nuxt-link
          class="inline-block my-2 "
          :to="{ name: 'threads-slug', params: { slug: data.slug } }"
        >
          &larr; Back to thread</nuxt-link
        >
        <Thread :thread="data" :expanded="true" />
      </div>

      <div v-if="this.$route.query.type === 'comment'">
        <nuxt-link
          class="inline-block my-2 "
          :to="{
            name: 'threads-slug',
            params: { slug: this.$route.query.thread_slug }
          }"
        >
          &larr; Back to thread</nuxt-link
        >
        <comment :comment="data" :thread_id="this.$route.query.thread_id" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: ["auth"],
  layout: "fullwidth",
  data() {
    return {
      data: null
    };
  },
  fetchOnServer: false,
  async fetch() {
    try {
      const { data } = await this.$axios.$post(
        `/api/notifications/preview`,
        this.$route.query
      );
      console.log(data);
      this.data = data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
};
</script>
