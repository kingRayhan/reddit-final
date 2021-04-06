export default {
  data() {
    return {
      resources: [],
      meta: {}
    };
  },
  methods: {
    async loadMore() {
      const { data } = await this.$axios.$get(
        `/api/threads?page=${this.current_page}`
      );
      this.resources.push(...data);
    },
    async visibilityChanged(isVisible) {
      if (!isVisible || this.current_page >= this.last_page) return;
      this.current_page++;
      await this.loadMore();
    }
  }
};
