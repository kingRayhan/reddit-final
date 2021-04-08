<template>
  <div class="fixed inset-0 z-30 bg-opacity-25 bg-primaryDark" v-show="value">
    <div class="flex items-center justify-center min-h-screen">
      <button class="absolute text-5xl top-1 right-3" @click="close">
        &times;
      </button>
      <div class="p-3 m-5 bg-white rounded  ring-1">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit("input", false);
      this.$emit("closed");
    }
  }
};
</script>
