<script setup lang="ts">

const model = defineModel();

defineProps<{
  fieldName: string,
  displayName: string,
  min: number
  max: number,
  step: number,
  validity: boolean,
}>();
</script>

<template>
  <div>
    <label :for="fieldName">{{displayName}}</label>
    <input
      :id="fieldName"
      :data-test-id="fieldName"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-model.number="model"
      :aria-invalid="validity"
    />
    <input
      :id="fieldName + 'Input'"
      :data-test-id="fieldName + 'Input'"
      type="number"
      :min="min"
      :max="max"
      :step="step"
      v-model.number="model"
      :aria-invalid="validity"
    />
  </div>
</template>

<style scoped>
input[type=range], input[type=number] {
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
