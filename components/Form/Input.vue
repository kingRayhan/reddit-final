<template>
  <div class="mb-2 input-component">
    <label>
      <span class="font-bold text-gray-600" v-if="label">
        {{ label }}
      </span>
      <input
        @change="$emit('input', $event.target.value)"
        :value="value"
        v-bind="$attrs"
        class="block w-full px-2 py-1 text-xl border focus:outline-none"
        :class="{
          'border-red-500': isError
        }"
      />

      <p
        :class="{
          'text-red-500': isError
        }"
        v-if="helperText"
      >
        {{ helperText }}
      </p>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false
    },
    isError: {
      type: Boolean,
      default: false
    },
    helperText: {
      type: String
    },
    label: {
      type: String
    }
  }
};
</script>
