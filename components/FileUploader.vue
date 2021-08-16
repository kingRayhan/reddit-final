<template>
  <file-pond
    name="file"
    label-idle="Drop image here..."
    :allow-multiple="false"
    :server="filepondConfig"
    accepted-file-types="image/jpeg, image/jpg, image/png, image/gif"
  />
</template>

<script>
import VueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
// import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
// import FilePondPluginImagePreview from "filepond-plugin-image-preview";
//

const FilePond = VueFilePond();
// FilePondPluginFileValidateType
// FilePondPluginImagePreview

export default {
  data() {
    return {
      filepondConfig: {
        process: {
          url: "https://api.cloudinary.com/v1_1/firereddit/image/upload",
          method: "POST",
          ondata(formData) {
            formData.append("upload_preset", "fire-reddit-assets");
            return formData;
          },
          onload: response => {
            this.$emit("fileUploaded", JSON.parse(response).secure_url);
          }
        }
      }
    };
  },
  components: {
    FilePond
  }
};
</script>
