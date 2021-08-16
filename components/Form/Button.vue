<template>
  <button
    v-bind="$attrs"
    @click="$emit('click', $event)"
    class="flex space-x-2"
    :class="{
      'bg-primaryDark': !isDanger,
      'bg-red-500': isDanger
    }"
  >
    <svg
      v-if="loading"
      class="w-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <p>
      <slot />
    </p>
  </button>
</template>
<script>
export default {
  props: ["loading", "isDanger"]
};
</script>
<style scoped lang="scss">
button {
  @apply text-base transition duration-300 text-white px-2 py-1 rounded uppercase;
  &:hover {
    @apply bg-opacity-75;
  }
  &[disabled] {
    background-color: gray;
    cursor: not-allowed;
  }
}
</style>
