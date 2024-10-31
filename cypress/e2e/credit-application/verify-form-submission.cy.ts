import { CreditDecisionResult } from '../../../src/credit-application/models/credit-decision-result.enum'
import { Occupations } from '../../../src/credit-application/models/occupations.enum'
import { setFormValues, submitForm } from '../../support/commands'
import { creditApplicationRequestAlias, interceptCreditApplicationRequest } from '../../support/requests'

describe('Verify Form Submission', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('valid and accepted form behaves as expected', () => {
    setFormValues({
      creditAmount: 36_000,
      firstName: 'Rolf',
      lastName: 'Zuckowski',
      zipCode: '76131',
      occupation: Occupations.FREELANCER,
      monthlyNetIncome: '800',
      monthlyExpenses: '500'
    })

    interceptCreditApplicationRequest(CreditDecisionResult.APPROVED)

    submitForm()

    cy.wait([`\@${creditApplicationRequestAlias}`])

    // TODO - do whatever is supposed to happen
  })

  it('invalid form behaves as expected', () => {
    // TODO - do whatever is supposed to happen
  })
})
