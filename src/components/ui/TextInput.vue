<template>
  <div class="flex flex-col">
    <label>{{ label }}</label>
    <input
      :value="modelValue"
      type="text"
      class="border-2 hover:opacity-75"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {},
    label: {
      type: String,
      default: null,
    },
  },
  emits: ["update:modelValue"],
  setup() {
    return {};
  },
};
</script>
