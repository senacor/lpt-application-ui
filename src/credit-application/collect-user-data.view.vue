<template>
  <template v-if="(errors.length ?? 0) > 0">
    <error-item v-for="error in errors" :key="error" :message="error"></error-item>
  </template>
  <div class="wrapper">
    <form autocomplete="on" @submit.prevent="validateFormAndRequestCreditDecision">
      <CreditApplicationForm v-model="creditApplicationRequestForm" />
    </form>
  </div>
</template>

<script setup lang="ts">
import ErrorItem from '@/basis-components/errors/error-item.vue'
import CreditApplicationForm from '@/credit-application/credit-application-form.component.vue'
import { useCreditApplicationStore } from '@/credit-application/credit-applications.store'
import { creditApplicationRequestSchema } from '@/credit-application/models/credit-application-request.schema'
import type { CreditApplicationRequest } from '@/credit-application/models/credit-application-request.type'
import { CreditDecisionResult } from '@/credit-application/models/credit-decision-result.enum'
import type { CreditDecision } from '@/credit-application/models/credit-decision.type'
import type { ValidationErrorItem, ValidationResult } from 'joi'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const store = useCreditApplicationStore()
const router = useRouter()

const creditApplicationRequestForm = storeToRefs(store).latestRequest

const errors = ref<string[]>([])

const handleCreditDecision = (decision: CreditDecision) => {
  switch (decision.decision) {
    case CreditDecisionResult.REVISED_TERMS:
      alert('Die Bedingungen für ihren Antrag wurden zwischenzeitlich geändert.')
      break
    case CreditDecisionResult.DENIED:
      alert('Ihr Antrag wurde abgelehnt. Bitte wenden Sie sich an einen Kundenbetreuer.')
      break

    // CreditDecisionResult.APPROVED:
    // CreditDecisionResult.CONDITIONAL_APPROVED
    default:
      router.push('/confirm')
  }
}

const validateFormAndRequestCreditDecision = async () => {
  const formValues = creditApplicationRequestForm.value
  errors.value = validateForm(formValues)

  if ((errors.value.length ?? 0) < 1) {
    handleCreditDecision(await store.submitApplicationAndReturnDecision(formValues))
  }
}

const validateForm = (form: CreditApplicationRequest): string[] => {
  const validation: ValidationResult<CreditApplicationRequest> = creditApplicationRequestSchema.validate(form, {
    abortEarly: false
  })

  return validation.error !== undefined
    ? validation.error.details.map<string>((item: ValidationErrorItem) => item.message)
    : []
}
</script>
