import { CreditApplicationAdapter } from '@/credit-application/credit-application.adapter'
import type { CreditApplicationRequest } from '@/credit-application/models/credit-application-request.type'
import type { CreditDecision } from '@/credit-application/models/credit-decision.type'
import { defineStore } from 'pinia'

export const useCreditApplicationStore = defineStore({
  id: 'creditApplicationStore',
  state: () => ({
    decision: null as CreditDecision | null,
    latestRequest: null as CreditApplicationRequest | null,
    creditApplicationAdapter: new CreditApplicationAdapter()
  }),
  getters: {},
  actions: {
    async submitApplication(request: CreditApplicationRequest): Promise<CreditDecision> {
      this.latestRequest = request
      return (await this.creditApplicationAdapter.submitCreditApplication(request)).data
    },
    acceptCreditOffering(): Promise<boolean> {
      if (!!this.decision?.uuid) {
        return this.creditApplicationAdapter.acceptCreditApplication(this.decision.uuid)
      }

      return Promise.reject(false)
    }
  }
})
