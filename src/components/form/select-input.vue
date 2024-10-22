<script setup lang="ts">
import type { SelectValue } from '@/models/select-value.type'

defineProps<{
  selectId: string,
  dataTestId: string,
  formKey: string,
  options: Array<SelectValue>,
}>();

</script>

<template>
  Select Input

  {{selectId}}
  <!--<select
    id="occupation"
    data-test-id="occupation"
    v-model="formData.occupation"
    aria-invalid="false"
  >
    <option value="null">keine Angabe</option>
    <option value="Angestellter">Angestellter</option>
    <option value="Selbstständiger">Selbstständiger</option>
    <option value="Banken und Finanzdienstleistung">
      Banken und Finanzdienstleistung
    </option>
    <option value="Informationsdienstleistung">
      Informationstechnologie
    </option>
  </select>-->
</template>

<style scoped>

</style>
