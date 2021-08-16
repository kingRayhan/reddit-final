export default {
  data() {
    return {
      errors: {}
    };
  },
  methods: {
    errorMessage(key) {
      if (this.errors[key]) return this.errors[key].join(" ");
    },
    resolveErrors(e) {
      this.errors = e.response.data.errors;
    }
  }
};
