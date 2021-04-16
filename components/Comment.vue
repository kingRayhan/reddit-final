<template>
  <div class="flex w-full mb-2">
    <!-- voting start -->
    <div class="vote">
      <button
        class="arrow arrow--up-vote"
        :class="{ 'arrow--up-vote--voted': true }"
      ></button>
      <button
        class="arrow arrow--down-vote"
        :class="{ 'arrow--down-vote--voted': false }"
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
        145 point(s) ( {{ comment.created_at }} )
      </span>
      <p class="text-xl">
        {{ comment.text }}
      </p>

      <div>
        <a href="#" class="mr-2 text-sm font-bold text-red-600">
          Delete
        </a>

        <a href="#" class="mr-2 text-sm font-bold text-gray-600">
          <span>Reply</span>
        </a>
      </div>
    </div>

    <div v-if="comment.replies">
      <comment
        v-for="comment in comment.replies"
        :comment="comment"
        :key="comment.id"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["comment"]
};
</script>
