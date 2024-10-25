<template>
  <div class="wrapper">
    <dl>
      <dt>Antrags-ID</dt>
      <dd>{{ decision?.uuid || 'Unknown' }}</dd>

      <dt>Kreditvolumen</dt>
      <dd>{{ creditAmountDisplay }}</dd>

      <dt>Vorname</dt>
      <dd>{{ latestRequest?.firstName || 'Unknown' }}</dd>

      <dt>Nachname</dt>
      <dd>{{ latestRequest?.lastName || 'Unknown' }}</dd>

      <dt>Postleitzahl</dt>
      <dd>{{ latestRequest?.zipCode || 'Unknown' }}</dd>

      <dt>Beschäftigung / Tätigkeit</dt>
      <dd>{{ latestRequest?.occupation || 'Unknown' }}</dd>

      <dt>Monatliche Netto-Einkünfte</dt>
      <dd>{{ monthlyNetIncomeDisplay }}</dd>

      <dt>Monatliche Ausgaben</dt>
      <dd>{{ monthlyExpensesDisplay }}</dd>
    </dl>

    <button @click="acceptCreditOffering">Angebot annehmen</button>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCreditApplicationStore } from '@/credit-application/credit-applications.store'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const store = useCreditApplicationStore()
const router = useRouter()
const { latestRequest, decision } = storeToRefs(store)

const creditAmountDisplay = computed(() => {
  return (
    (latestRequest.value!.creditAmount / 1)
      .toFixed(2)
      .replace('.', ',')
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' €'
  )
})

const monthlyNetIncomeDisplay = computed(
  () =>
    (latestRequest.value!.monthlyNetIncome / 1)
      .toFixed(2)
      .replace('.', ',')
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' €',
)

const monthlyExpensesDisplay = computed(
  () =>
    (latestRequest.value!.monthlyExpenses / 1)
      .toFixed(2)
      .replace('.', ',')
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' €',
)

const acceptCreditOffering = () =>
  store
    .acceptCreditOffering()
    .then(_ =>
      _
        ? router.push('/summary')
        : alert('Ihr Antrag konnte nicht angenommen werden!'),
    )
    .catch(() => alert('Ein unerwarteter Fehler ist aufgetreten.'))
</script>

<style scoped></style>
