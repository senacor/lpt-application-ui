<template>
  <!-- Kreditrahmen -->
  <SliderInput
    field-name="creditAmount"
    display-name="Kreditrahmen"
    v-model="form!.creditAmount"
    :min="5_000"
    :max="100_000"
    :step="1_000"
    :validity="true"
  ></SliderInput>
  <!-- Vorname -->
  <TextInput
    field-name="firstName"
    display-name="Vorname"
    v-model="form!.firstName"
    placeholder="Vorname"
    auto-complete="given-name"
    :validity="true"
  ></TextInput>
  <!-- Nachname -->
  <TextInput
    field-name="lastName"
    display-name="Nachname"
    v-model="form!.lastName"
    placeholder="Nachname"
    auto-complete="family-name"
    :validity="true"
  ></TextInput>
  <!-- Postleitzahl -->
  <TextInput
    field-name="zipCode"
    display-name="Postleitzahl"
    v-model="form!.zipCode"
    placeholder="Postleitzahl"
    auto-complete="postal-code"
    :validity="true"
  ></TextInput>
  <!-- Beschäftigung -->
  <SelectInput
    field-name="occupation"
    display-name="Beschäftigung / Tätigkeit"
    v-model="form!.occupation"
    :options="occupationOptions"
    :validity="true"
  />
  <!-- Netto-Einkommen -->
  <SliderInput
    field-name="monthlyNetIncome"
    display-name="Monatliches Netto-Einkommen"
    v-model="form!.monthlyNetIncome"
    :min="500"
    :max="20_000"
    :step="50"
    :validity="true"
  ></SliderInput>
  <!-- Monatliche Ausgaben -->
  <SliderInput
    field-name="monthlyExpenses"
    display-name="Monatliche Ausgaben"
    v-model="form!.monthlyExpenses"
    :min="500"
    :max="20_000"
    :step="50"
    :validity="true"
  ></SliderInput>

  <input id="submitButton" data-test-id="submitButton" type="submit" value="Antrag prüfen" />
</template>

<script setup lang="ts">
import SelectInput from '@/basis-components/form-support/select-input.vue'
import SliderInput from '@/basis-components/form-support/slider-input.vue'
import TextInput from '@/basis-components/form-support/text-input.vue'
import type { CreditApplicationRequest } from '@/credit-application/models/credit-application-request.type'
import { getOccupationsAsSelectValueArray } from '@/credit-application/models/occupations.enum'
import type { SelectValue } from '@/credit-application/models/select-value.type'

const occupationOptions: Array<SelectValue> = getOccupationsAsSelectValueArray()
const form = defineModel<CreditApplicationRequest>()
</script>

<style scoped>
input[type='submit'] {
  background-color: #04aa6d;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: left;
  margin-top: 2em;
}

input[type='submit']:hover {
  background-color: #45a049;
}
</style>
