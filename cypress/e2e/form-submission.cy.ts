import { creditApplicationRequestAlias, interceptCreditApplicationRequest } from '../support/requests'
import { CreditDecisionResult } from '../../src/models/credit-decision-result.enum'
import { setFormValues, submitForm } from '../support/commands'
import { Occupations } from '../../src/models/occupations.enum'

describe('Form submission', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('valid and accepted form behaves as expected', () => {
    setFormValues({
      creditAmount: 36_000,
      firstName: 'Rolf',
      lastName: 'Zuckowski',
      zipCode: '76131',
      occupation: Occupations.FREELANCER,
      monthlyNetIncome: '800',
      monthlyExpenses: '500',
    });

    interceptCreditApplicationRequest(CreditDecisionResult.APPROVED);

    submitForm();

    cy.wait([`\@${creditApplicationRequestAlias}`]);

    // TODO - do whatever is supposed to happen
  });

  it('invalid form behaves as expected', () => {
    // TODO - do whatever is supposed to happen
  })
});
