<template>
  <div class="w-8/12">
    <form @submit.prevent="handleSubmit">
      <client-only>
        <Tabs class="thread-editor-tabs" @changed="tabChanged">
          <div class="p-3 rounded-sm bg-primary">
            <label for="title" class="text-lg">
              <span class="text-red-500 ">*</span> title
            </label>
            <input
              id="title"
              type="text"
              v-model="form.title"
              class="w-full p-1 text-xl border border-black focus:outline-none"
            />
            <p v-if="errorMessage('title')" class="text-red-500">
              {{ errorMessage("title") }}
            </p>
          </div>
          <Tab title="Link" :active="form.type == 'LINK'">
            <div class="p-3 mt-5 rounded-sm bg-primary">
              <label for="title" class="text-lg">
                url
              </label>
              <input
                id="url"
                v-model="form.link"
                type="text"
                class="w-full p-1 text-xl border border-black focus:outline-none"
              />
              <p v-if="errorMessage('link')" class="text-red-500">
                {{ errorMessage("link") }}
              </p>
            </div>
            <!-- Image -->
            <div
              class="p-3 mt-5 border-2 border-dashed rounded-md border-primaryDark"
            >
              <FileUploader @fileUploaded="url => (form.image = url)" />
            </div>
          </Tab>
          <Tab title="Text" :active="form.type == 'TEXT'">
            <div class="p-3 mt-5 rounded-sm bg-primary">
              <label for="text" class="text-lg ">
                text <span class="text-gray-500 ">(optional)</span>
              </label>
              <textarea
                id="text"
                ref="threadText"
                v-model="form.text"
                class="w-full p-1 overflow-y-hidden text-xl border border-black focus:outline-none"
              />
              <p v-if="errorMessage('text')" class="text-red-500">
                {{ errorMessage("text") }}
              </p>
            </div>
          </Tab>
        </Tabs>
      </client-only>

      <div class="mt-4">
        <form-button>Submit</form-button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  props: ["errors", "thread"],

  data() {
    return {
      form: {
        title: this.thread?.title || "",
        text: this.thread?.text || "",
        link: this.thread?.link || "",
        image: this.thread?.image || "",
        type: this.thread?.type || "LINK"
      }
    };
  },

  watch: {
    "form.text"() {
      // Auto height textarea
      const textAreaDOM = this.$refs.threadText;
      textAreaDOM.style.height = "64px";
      textAreaDOM.style.height = textAreaDOM.scrollHeight + "px";
    }
  },
  methods: {
    tabChanged({ title }) {
      this.form.type = title.toUpperCase();
    },
    handleSubmit() {
      this.$emit("saved", this.form);
    },
    errorMessage(key) {
      if (this.errors[key]) return this.errors[key].join(" ");
    },
    removeImage() {
      this.form.image = "";
    }
  }
};
</script>
