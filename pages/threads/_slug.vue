<template>
  <div>
    <thread :thread="thread" :expanded="true" />
    <hr class="my-5" />

    <div class="mb-5 ">
      <textarea
        class="w-full p-2 border-2 border-gray-600"
        cols="30"
        rows="4"
      ></textarea>
      <form-button>Submit</form-button>
    </div>

    <comment />
    <comment />
    <comment />
    <comment />
    <comment />
    <comment />
    <comment />
    <comment />
    <comment />
    <comment />
  </div>
</template>

<script>
import Thread from "~/components/Thread.vue";
export default {
  components: { Thread },
  async asyncData({ $axios, params }) {
    const { data: thread } = await $axios.$get(`/api/threads/${params.slug}`);
    return { thread };
  }
};
</script>
