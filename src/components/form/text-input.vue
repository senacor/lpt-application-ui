<script setup lang="ts">
defineProps<{
  fieldName: string,
  displayName: string,
  autoComplete: string,
  placeholder: string,
  validity: boolean,
}>();
</script>

<template>

  <!-- v-model="formData.lastName" -->
  <div>
    <label :for="fieldName">{{displayName}}</label>
    <input
      :id="fieldName"
      :data-test-id="fieldName"
      type="text"
      :autocomplete="autoComplete"
      :placeholder="placeholder"
      :aria-invalid="validity"
    />
  </div>
</template>

<style scoped>

</style>
