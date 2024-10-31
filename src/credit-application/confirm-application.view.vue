<template>
  <div class="wrapper">
    <dl>
      <dt>Antrags-ID</dt>
      <dd>{{ decision?.uuid || '-' }}</dd>

      <dt>Antrags-Status</dt>
      <dd>{{ decision?.decision || '-' }}</dd>

      <dt>Kreditvolumen</dt>
      <dd>{{ creditAmountDisplay }}</dd>

      <dt>Vorname</dt>
      <dd>{{ latestRequest?.firstName || '-' }}</dd>

      <dt>Nachname</dt>
      <dd>{{ latestRequest?.lastName || '-' }}</dd>

      <dt>Postleitzahl</dt>
      <dd>{{ latestRequest?.zipCode || '-' }}</dd>

      <dt>Beschäftigung / Tätigkeit</dt>
      <dd>{{ latestRequest?.occupation || '- ' }}</dd>

      <dt>Monatliche Netto-Einkünfte</dt>
      <dd>{{ monthlyNetIncomeDisplay }}</dd>

      <dt>Monatliche Ausgaben</dt>
      <dd>{{ monthlyExpensesDisplay }}</dd>
    </dl>

    <button :disabled="!decision || !decision.uuid" @click="acceptCreditOffering">Angebot annehmen</button>
  </div>
</template>
<script setup lang="ts">
import { useCreditApplicationStore } from '@/credit-application/credit-applications.store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const store = useCreditApplicationStore()
const router = useRouter()
const { latestRequest, decision } = storeToRefs(store)

const eur = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR'
})

const creditAmountDisplay = computed(() => eur.format(latestRequest.value?.creditAmount || 0))

const monthlyNetIncomeDisplay = computed(() => eur.format(latestRequest.value?.monthlyNetIncome || 0))

computed(
  () =>
    ((latestRequest.value?.monthlyNetIncome || 0) / 1)
      .toFixed(2)
      .replace('.', ',')
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' €'
)

const monthlyExpensesDisplay = computed(() => eur.format(latestRequest.value?.monthlyExpenses || 0))

const acceptCreditOffering = () =>
  store
    .acceptCreditOffering()
    .then((_) => (_ ? router.push('/summary') : alert('Ihr Antrag konnte nicht angenommen werden!')))
    .catch(() => alert('Ein unerwarteter Fehler ist aufgetreten.'))
</script>

<style scoped>
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
