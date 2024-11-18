import type { CreditDecisionResult } from '@/credit-application/models/credit-decision-result.enum'

export type CreditDecision = {
  // the uuid of the request, most likely returned from the backend
  id: string
  // the result of the credit application validation
  decision: CreditDecisionResult | null
}
