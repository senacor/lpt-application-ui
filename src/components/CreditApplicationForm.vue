<script setup lang="ts">
import SelectInput from '@/components/form/select-input.vue'
import TextInput from '@/components/form/text-input.vue'
import SliderInput from '@/components/form/slider-input.vue'
</script>

<template>
  <!-- Kreditrahmen -->
  <SliderInput msg="Test"></SliderInput>
  <!-- Vorname -->
  <TextInput
   field-name="vorname"
   display-name="Vorname"
   placeholder="Vorname"
   auto-complete="given-name"
   :validity="true"
  ></TextInput>
  <!-- Nachname -->
  <TextInput
    field-name="nachname"
    display-name="Nachname"
    placeholder="Nachname"
    auto-complete="family-name"
    :validity="true"
  ></TextInput>
  <!-- Postleitzahl -->
  <TextInput
    field-name="zipCode"
    display-name="Postleitzahl"
    placeholder="Postleitzahl"
    auto-complete="postal-code"
    :validity="true"
  ></TextInput>
  <!-- Beschäftigung -->
  <SelectInput
    select-id="occupation"
    data-test-id="occupation"
    form-key="occupation"
    options="[]"
  />
  <!-- Netto-Einkommen -->
  <SliderInput msg="Lol"></SliderInput>
  <!-- Monatliche Ausgaben -->
  <SliderInput msg="Lol"></SliderInput>
</template>

<style scoped>
  input[type=text], input[type=range], input[type=number], select, textarea {
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

  input[type=submit] {
    background-color: #04AA6D;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    float: right;
  }

  input[type=submit]:hover {
    background-color: #45a049;
  }
</style>
