<template>
  <div class="flex items-center justify-start bg-[#bdbeff]">
    <div>
      <img src="~static/images/share-modal.jpg" />
    </div>
    <div class="px-2 text-gray-700">
      <h2 class="text-2xl">WoooHooo!!</h2>
      <p class="text-xl">You care to share this? 🍕</p>
      <input
        class="w-full p-2 mt-2 text-gray-500 border-dashed rounded border-1"
        :value="shareUrl"
        @click="handleCopy"
      />
      <p v-if="isCopied" class="font-bold text-white ">Thread url copy</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["threadUrl"],
  data() {
    return {
      isCopied: false,
      timeout: null
    };
  },

  computed: {
    shareUrl() {
      return process.env.NUXT_ENV_URL + this.threadUrl;
    }
  },
  methods: {
    handleCopy(e) {
      e.target.select();
      document.execCommand("copy");

      this.isCopied = true;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => (this.isCopied = false), 3000);
    }
  }
};
</script>
