<script setup lang="ts">
//import { RouterLink, RouterView } from 'vue-router'
import type { CreditApplicationRequest } from '@/models/credit-application-request.type'
import { ref } from 'vue'
import { type AxiosResponse } from 'axios'
import type { CreditDecision } from '@/models/credit-decision.type'
import { CreditDecisionResult } from '@/models/credit-decision-result.enum'
import { creditApplicationRequestSchema } from '@/models/credit-application-request.schema'
import { type ValidationErrorItem, type ValidationResult } from 'joi'
import ErrorItem from '@/components/errors/error-item.vue'
import apiClientService from '@/services/api-client.service';
import CreditApplicationForm from '@/components/CreditApplicationForm.vue'

const creditApplicationForm = ref<CreditApplicationRequest>({
  creditAmount: 10_000,
  firstName: '',
  lastName: '',
  zipCode: '',
  occupation: '',
  monthlyNetIncome: 2_200,
  monthlyExpenses: 1_600,
});

const errors = ref<Array<string>>([]);


const validateForm = (form: CreditApplicationRequest): Array<string> | null => {
  errors.value = [];

  const validation: ValidationResult<CreditApplicationRequest> =
    creditApplicationRequestSchema.validate(form, { abortEarly: false })

  if (validation.error !== undefined) {
    const errorMessages = validation.error.details.map<string>((item: ValidationErrorItem) => item.message);
    errors.value = errorMessages;
    return errorMessages;
  }

  return null;
}

const handleCreditDecision = (promise: Promise<AxiosResponse<CreditDecision, never>>) => {
  promise
    .then((response: AxiosResponse<CreditDecision, never>) => {
      const decisionResult: CreditDecisionResult = response.data.decision;

      switch (decisionResult) {
        case CreditDecisionResult.APPROVED:
          alert('Ihr Antrag wurde genehmigt')
          break
        case CreditDecisionResult.CONDITIONAL_APPROVED:
          alert('Ihr Antrag wurde mit Einschränkungen genehmigt')
          break
        case CreditDecisionResult.REVISED_TERMS:
          alert(
            'Die Bedingungen für ihren Antrag wurden zwischenzeitlich geändert',
          )
          break
        case CreditDecisionResult.DENIED:
          alert(
            'Ihr Antrag wurde abgelehnt. Bitte wenden Sie sich an einen Kundenbetreuer',
          )
          break
        default:
          alert('Ein unvorhergesehener Fehler ist aufgetreten!')
          break
      }
    })
    .catch(error => {
      alert(error)
    });
};


const validateRequest = () => {
  const formValues: CreditApplicationForm = { ...creditApplicationForm.value }

  debugger;

  const validationResult: Array<string> | null = validateForm(formValues);

  // no error, post to backend
  if ((validationResult?.length ?? 0) <= 0) {
    handleCreditDecision(
      apiClientService.submitCreditApplication(formValues)
    );
  }
}
</script>

<template>
  <header>

    <h1>Der "ich möchte Dinge finanzieren" Kredit 💰</h1>

    <a href="https://www.pexels.com/photo/a-man-online-shopping-6994300/" target="_blank">
      <img
        alt="Man ordering stuff online"
        src="@/assets/pexels-kindelmedia-6994300.jpg"
        style="max-width: 600px"
      />
    </a>
  </header>

  <error-item v-for="error in errors" :key="error" :message="error"></error-item>

  <div class="wrapper">

    <form autocomplete="on" @submit.prevent="validateRequest">

    <CreditApplicationForm
      v-model="creditApplicationForm"
    />

      <!--<label for="firstName">Vorname</label>
      <input
        id="firstName"
        data-test-id="firstName"
        type="text"
        autocomplete="given-name"
        placeholder="Vorname"
        aria-invalid="false"
      />-->

      <!-- TODO - aria-attributes? -->


        <!-- requested credit -->
       <!-- <div>
          <label for="creditAmount">Kreditrahmen</label>
          <input
            id="creditAmount"
            data-test-id="creditAmountSlider"
            type="range"
            v-model="formData.creditAmount"
            min="5000"
            max="100000"
            step="1000"
            aria-invalid="false"
          />
          <input
            id="creditAmountInput"
            data-test-id="creditAmountInput"
            type="number"
            v-model.number="formData.creditAmount"
            min="5000"
            max="100000"
            step="1000"
            aria-invalid="false"
            aria-labelledby="creditAmount"
          />
        </div>-->

        <!-- firstName -->
        <!--<div>
          <label for="firstName">Vorname</label>
          <input
            id="firstName"
            data-test-id="firstName"
            type="text"
            v-model="formData.firstName"
            autocomplete="given-name"
            placeholder="Vorname"
            aria-invalid="false"
          />
        </div>-->

        <!-- lastName -->
        <!--<div>
          <label for="lastName">Nachname</label>
          <input
            id="lastName"
            data-test-id="lastName"
            type="text"
            v-model="formData.lastName"
            autocomplete="family-name"
            placeholder="Nachname"
            aria-invalid="false"
          />
        </div>-->

        <!-- zipCode -->
        <!--<div>
          <label for="zipCode">Postleitzahl</label>
          <input
            id="zipCode"
            data-test-id="zipCode"
            type="text"
            v-model="formData.zipCode"
            autocomplete="postal-code"
            placeholder="Postleitzahl"
            aria-invalid="false"
          />
        </div>-->

        <!-- occupation -->
        <!--<div>
          <label for="occupation">Beschäftigung</label>
          <select
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
          </select>
        </div>-->

        <!-- netIncome -->
        <!--<div>
          <label for="monthlyNetIncome">Monatliches Netto-Einkommen</label>
          <input
            id="monthlyNetIncome"
            data-test-id="monthlyNetIncomeSlider"
            type="range"
            v-model="formData.monthlyNetIncome"
            min="500"
            max="20000"
            step="50"
            aria-invalid="false"
          />
          <input
            id="monthlyNetIncomeInput"
            data-test-id="monthlyNetIncomeInput"
            type="number"
            v-model.number="formData.monthlyNetIncome"
            min="500"
            max="20000"
            step="50"
            aria-invalid="false"
          />
        </div>-->


        <!-- expenses -->
        <!--<div>
          <label for="monthlyExpenses">Monatliche Ausgaben</label>
          <input
            id="monthlyExpenses"
            data-test-id="monthlyExpensesSlider"
            type="range"
            v-model="formData.monthlyExpenses"
            min="500"
            max="20000"
            step="50"
            aria-invalid="false"
          />
          <input
            id="monthlyExpensesInput"
            data-test-id="monthlyExpensesInput"
            type="number"
            v-model.number="formData.monthlyExpenses"
            min="500"
            max="20000"
            step="50"
            aria-invalid="false"
          />
        </div>-->

        <input
          id="submitButton"
          data-test-id="submitButton"
          type="submit"
          value="Antrag prüfen"
        />
      </form>

      <!--<nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>-->
    </div>

  <!--<RouterView />-->
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
  float: left;
  margin-bottom: 2em;
}

input[type=submit]:hover {
  background-color: #45a049;
}





header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
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

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
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
</style>
