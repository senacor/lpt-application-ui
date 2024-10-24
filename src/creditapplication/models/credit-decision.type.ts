import type { CreditDecisionResult } from '@/creditapplication/models/credit-decision-result.enum'

export type CreditDecision = {
  // the uuid of the request, most likely returned from the backend
  uuid: string
  // the result of the credit application validation
  decision: CreditDecisionResult | null
}
