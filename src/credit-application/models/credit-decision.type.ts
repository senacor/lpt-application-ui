import type { CreditDecisionResult } from '@/credit-application/models/credit-decision-result.enum'

export type CreditDecision = {
  id: string
  decision: CreditDecisionResult | null
}
