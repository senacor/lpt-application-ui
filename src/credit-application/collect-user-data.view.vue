<template>
  <template v-if="(errors.length ?? 0) > 0">
    <error-item
      v-for="error in errors"
      :key="error"
      :message="error"
    ></error-item>
  </template>
  <div class="wrapper">
    <form
      autocomplete="on"
      @submit.prevent="validateFormAndRequestCreditDecision"
    >
      <CreditApplicationForm v-model="creditApplicationRequestForm" />
    </form>
  </div>
</template>

<script setup lang="ts">
import CreditApplicationForm from '@/credit-application/credit-application-form.component.vue'
import type { CreditApplicationRequest } from '@/credit-application/models/credit-application-request.type'
import { ref } from 'vue'
import type { ValidationErrorItem, ValidationResult } from 'joi'
import { creditApplicationRequestSchema } from '@/credit-application/models/credit-application-request.schema'
import type { CreditDecision } from '@/credit-application/models/credit-decision.type'
import { CreditDecisionResult } from '@/credit-application/models/credit-decision-result.enum'
import ErrorItem from '@/basis-components/errors/error-item.vue'
import { useCreditApplicationStore } from '@/credit-application/credit-applications.store'

const store = useCreditApplicationStore()

const creditApplicationRequestForm = ref<CreditApplicationRequest>({
  creditAmount: 10_000,
  firstName: '',
  lastName: '',
  zipCode: '',
  occupation: '',
  monthlyNetIncome: 2_200,
  monthlyExpenses: 1_600,
})

const errors = ref<string[]>([])

const handleCreditDecision = (decision: CreditDecision) => {
  switch (decision.decision) {
    case CreditDecisionResult.APPROVED:
      alert('Ihr Antrag wurde genehmigt.')
      break
    case CreditDecisionResult.CONDITIONAL_APPROVED:
      alert('Ihr Antrag wurde mit Einschränkungen genehmigt.')
      break
    case CreditDecisionResult.REVISED_TERMS:
      alert(
        'Die Bedingungen für ihren Antrag wurden zwischenzeitlich geändert.',
      )
      break
    case CreditDecisionResult.DENIED:
      alert(
        'Ihr Antrag wurde abgelehnt. Bitte wenden Sie sich an einen Kundenbetreuer.',
      )
      break
    default:
      alert('Ein unvorhergesehener Fehler ist aufgetreten!')
      break
  }
}

const validateFormAndRequestCreditDecision = async () => {
  const formValues = creditApplicationRequestForm.value
  errors.value = validateForm(formValues)

  if ((errors.value.length ?? 0) < 1) {
    handleCreditDecision(await store.submitApplication(formValues))
  }
}

const validateForm = (form: CreditApplicationRequest): string[] => {
  const validation: ValidationResult<CreditApplicationRequest> =
    creditApplicationRequestSchema.validate(form, { abortEarly: false })

  return validation.error !== undefined
    ? validation.error.details.map<string>(
        (item: ValidationErrorItem) => item.message,
      )
    : []
}
</script>

<style scoped></style>
