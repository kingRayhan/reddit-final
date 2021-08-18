export default {
  data() {
    return {
      errors: {}
    };
  },
  methods: {
    clearErrors() {
      this.errors = {};
    },
    errorMessage(key) {
      if (this.errors[key]) return this.errors[key].join(" ");
    },
    resolveErrors(e) {
      this.errors = e.response.data.errors;
    }
  }
};
