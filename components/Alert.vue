<template>
  <div
    v-if="show"
    class="fixed top-0 left-0 w-full py-2 text-center "
    :class="{
      'bg-green-500': type === 'success',
      'bg-red-500 text-white': type === 'error'
    }"
  >
    <span>{{ message }}</span>
    <button @click="close" class="absolute top-2 right-3">&times;</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState("alert", ["show", "type", "message"]),
  data() {
    return {
      showAlert: this.show
    };
  },
  watch: {
    showAlert(newVal) {
      if (newVal)
        setTimeout(() => {
          this.showAlert = false;
          alert("");
        }, 5000);
    }
  },
  methods: {
    close() {
      this.$store.commit("alert/CLOSE");
    }
  }
};
</script>
