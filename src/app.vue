<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import type { CreditApplicationRequest } from '@/creditapplication/models/credit-application-request.type'
import { computed, ref } from 'vue'
import { type AxiosResponse } from 'axios'
import type { CreditDecision } from '@/creditapplication/models/credit-decision.type'
import { CreditDecisionResult } from '@/creditapplication/models/credit-decision-result.enum'
import { creditApplicationRequestSchema } from '@/creditapplication/models/credit-application-request.schema'
import { type ValidationErrorItem, type ValidationResult } from 'joi'
import ErrorItem from '@/basis-components/errors/error-item.vue'
import apiClientService from '@/creditapplication/credit-application.adapter'
import CreditApplicationForm from '@/creditapplication/credit-application-form.vue'

const creditApplicationRequestForm = ref<CreditApplicationRequest>({
  creditAmount: 10_000,
  firstName: '',
  lastName: '',
  zipCode: '',
  occupation: '',
  monthlyNetIncome: 2_200,
  monthlyExpenses: 1_600,
})

const creditDecisionResult = ref<CreditDecision>({
  uuid: '',
  decision: null,
})

const creditAmountDisplay = computed(() => {
  return (
    (creditApplicationRequestForm.value.creditAmount / 1)
      .toFixed(2)
      .replace('.', ',')
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' €'
  )
})

const monthlyNetIncomeDisplay = computed(() => {
  return (
    (creditApplicationRequestForm.value.monthlyNetIncome / 1)
      .toFixed(2)
      .replace('.', ',')
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' €'
  )
})

const monthlyExpensesDisplay = computed(() => {
  return (
    (creditApplicationRequestForm.value.monthlyExpenses / 1)
      .toFixed(2)
      .replace('.', ',')
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' €'
  )
})

const errors = ref<Array<string>>([])

const validateForm = (form: CreditApplicationRequest): Array<string> | null => {
  errors.value = []

  const validation: ValidationResult<CreditApplicationRequest> =
    creditApplicationRequestSchema.validate(form, { abortEarly: false })

  if (validation.error !== undefined) {
    const errorMessages = validation.error.details.map<string>(
      (item: ValidationErrorItem) => item.message,
    )
    errors.value = errorMessages
    return errorMessages
  }

  return null
}

const handleCreditDecision = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  promise: Promise<AxiosResponse<CreditDecision, any>>,
) => {
  promise
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((response: AxiosResponse<CreditDecision, any>) => {
      creditDecisionResult.value = response.data

      const decisionResult: CreditDecisionResult = response.data.decision

      switch (decisionResult) {
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
    })
    .catch(error => {
      alert(error)
    })
}

const validateRequest = () => {
  const formValues: CreditApplicationRequest =
    creditApplicationRequestForm.value
  const validationResult: Array<string> | null = validateForm(formValues)

  // no error, post to backend
  if ((validationResult?.length ?? 0) <= 0) {
    handleCreditDecision(apiClientService.submitCreditApplication(formValues))
  }
}

const acceptCreditOffering = () => {
  if (!!creditDecisionResult.value.uuid) {
    apiClientService
      .acceptCreditApplication(uuid)
      .then((response: AxiosResponse) => {
        if (response.status >= 200 && response.status < 300) {
          alert('Antrag erfolgreich angenommen!')
        } else {
          alert('Antrag konnte nicht angenommen werden!')
        }

        // display error or redirect to target page
      })
  } else {
    alert('No uuid is set, cannot accept the offering')
  }
}
</script>

<template>
  <header>
    <h1>Der "ich möchte Dinge finanzieren" Kredit 💰</h1>

    <a
      href="https://www.pexels.com/photo/a-man-online-shopping-6994300/"
      target="_blank"
    >
      <img
        alt="Man ordering stuff online"
        src="@/assets/pexels-kindelmedia-6994300.jpg"
        style="max-width: 600px"
      />
    </a>
  </header>

  <template v-if="(errors.length ?? 0) > 0">
    <error-item
      v-for="error in errors"
      :key="error"
      :message="error"
    ></error-item>
  </template>

  <!-- "page" 1 - form -->
  <div class="wrapper">
    <form autocomplete="on" @submit.prevent="validateRequest">
      <CreditApplicationForm v-model="creditApplicationRequestForm" />
    </form>
  </div>

  <!-- "page" 2 - confirm -->
  <div class="wrapper">
    <dl>
      <dt>Antrags-ID</dt>
      <dd>{{ creditDecisionResult.uuid }}</dd>

      <dt>Kreditvolumen</dt>
      <dd>{{ creditAmountDisplay }}</dd>

      <dt>Vorname</dt>
      <dd>{{ creditApplicationRequestForm.firstName }}</dd>

      <dt>Nachname</dt>
      <dd>{{ creditApplicationRequestForm.lastName }}</dd>

      <dt>Postleitzahl</dt>
      <dd>{{ creditApplicationRequestForm.zipCode }}</dd>

      <dt>Beschäftigung / Tätigkeit</dt>
      <dd>{{ creditApplicationRequestForm.occupation }}</dd>

      <dt>Monatliche Netto-Einkünfte</dt>
      <dd>{{ monthlyNetIncomeDisplay }}</dd>

      <dt>Monatliche Ausgaben</dt>
      <dd>{{ monthlyExpensesDisplay }}</dd>
    </dl>

    <button @click="acceptCreditOffering()">Angebot annehmen</button>
  </div>

  <div class="wrapper">
    <nav>
      <RouterLink to="/form">Form</RouterLink>
      <RouterLink to="/confirm">Confirm</RouterLink>
      <RouterLink to="/success">Success</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

dl {
  display: grid;
  grid-gap: 4px 16px;
  grid-template-columns: max-content;
}
dt {
  font-weight: bold;
}
dd {
  margin: 0;
  grid-column-start: 2;
}
</style>
