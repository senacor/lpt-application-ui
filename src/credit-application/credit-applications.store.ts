import { CreditApplicationAdapter } from '@/credit-application/credit-application.adapter'
import type { CreditApplicationRequest } from '@/credit-application/models/credit-application-request.type'
import type { CreditDecision } from '@/credit-application/models/credit-decision.type'
import { defineStore } from 'pinia'

export const useCreditApplicationStore = defineStore({
  id: 'creditApplicationStore',
  state: () => ({
    decision: null as CreditDecision | null,
    latestRequest: {
      creditAmount: 10_000,
      firstName: '',
      lastName: '',
      zipCode: '',
      occupation: '',
      monthlyNetIncome: 2_200,
      monthlyExpenses: 1_600
    } as CreditApplicationRequest,
    creditApplicationAdapter: new CreditApplicationAdapter()
  }),
  getters: {},
  actions: {
    async submitApplicationAndReturnDecision(request: CreditApplicationRequest): Promise<CreditDecision> {
      this.latestRequest = request
      this.decision = (await this.creditApplicationAdapter.submitCreditApplication(request)).data
      return this.decision
    },
    acceptCreditOffering(): Promise<boolean> {
      if (!!this.decision?.id) {
        return this.creditApplicationAdapter.acceptCreditApplication(this.decision.id)
      }

      return Promise.reject(false)
    }
  }
})
