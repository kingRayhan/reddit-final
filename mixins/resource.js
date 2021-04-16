function paginationResource(resourceName) {
  return {
    data() {
      return {
        resources: [],
        meta: {},
        last_page: null,
        current_page: null
      };
    },
    async fetch() {
      const threads = await this.$axios.$get(`/api/${resourceName}`);
      this.resources = threads.data;
      this.current_page = threads.meta.current_page;
      this.last_page = threads.meta.last_page;
    },
    methods: {
      async loadMore() {
        const { data } = await this.$axios.$get(
          `/api/${resourceName}?page=${this.current_page}`
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
}

export default paginationResource;
