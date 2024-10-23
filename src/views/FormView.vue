<script setup lang="ts">
import CreditApplicationForm from '@/components/CreditApplicationForm.vue'
import { ref } from 'vue'
import type { CreditApplicationRequest } from '@/models/credit-application-request.type'

const creditApplicationRequestForm = ref<CreditApplicationRequest>({
  creditAmount: 10_000,
  firstName: '',
  lastName: '',
  zipCode: '',
  occupation: '',
  monthlyNetIncome: 2_200,
  monthlyExpenses: 1_600,
});
</script>

<template>
  <CreditApplicationForm
    v-model="creditApplicationRequestForm"
  />
</template>

<style scoped>

</style>
