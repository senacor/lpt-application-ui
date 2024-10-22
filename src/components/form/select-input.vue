<script setup lang="ts">
import type { SelectValue } from '@/models/select-value.type'

const model = defineModel();

defineProps<{
  fieldName: string,
  displayName: string,
  options: Array<SelectValue>,
  validity: boolean,
}>();

</script>

<template>
  <div>
    <label :for="fieldName">{{displayName}}</label>
    <select
      :id="fieldName"
      :data-test-id="fieldName"
      :aria-invalid="validity"
      v-model="model"
    >
      <option disabled="disabled" selected="selected">-- bitte auswählen --</option>
      <template v-if="options.length > 0">
        <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
      </template>
    </select>
  </div>
</template>

<style scoped>
select {
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
