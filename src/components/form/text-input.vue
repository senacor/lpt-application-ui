<script setup lang="ts">
const model = defineModel();

defineProps<{
  fieldName: string,
  displayName: string,
  autoComplete: string,
  placeholder: string,
  validity: boolean,
}>();
</script>

<template>
  <div>
    <label :for="fieldName">{{displayName}}</label>
    <input
      :id="fieldName"
      :data-test-id="fieldName"
      type="text"
      :autocomplete="autoComplete"
      :placeholder="placeholder"
      :aria-invalid="validity"
      v-model="model"
    />
  </div>
</template>

<style scoped>
  input[type=text] {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
  }

  label {
    padding: 12px 12px 12px 0;
    display: inline-block;
  }
</style>
