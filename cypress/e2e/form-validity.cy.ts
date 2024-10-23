import { setFormValues, submitForm } from '../support/commands'
import { Occupations } from '../../src/models/occupations.enum'
import type { CreditApplicationRequest } from '../../src/models/credit-application-request.type'

const exampleForm: CreditApplicationRequest = {
  creditAmount: 25_000,
  firstName: 'Bob',
  lastName: 'Kelso',
  zipCode: '90449',
  occupation: Occupations.SELF_EMPLOYED,
  monthlyNetIncome: 12_000,
  monthlyExpenses: 5_000,
};

describe('Form validity', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('returns no errors on submit, if all fields are filled with valid data', () => {
    setFormValues(exampleForm);

    // TODO - mock request
  });

  describe('returns error messages', () => {
    // field with the range slider and number input cannot really be updated to invalid values

    it('firstName is empty', () => {
      setFormValues({
        ...exampleForm,
        firstName: '',
      });

      submitForm();

      cy
        .get('[data-test-id="error-item"]')
        .should('exist');

      cy
        .get('[data-test-id="error-item"]')
        .should('contain.text', 'Das Feld "Vorname" darf nicht leer sein');
    });

    it('lastName is empty', () => {
      setFormValues({
        ...exampleForm,
        lastName: '',
      });

      submitForm();

      cy
        .get('[data-test-id="error-item"]')
        .should('exist');

      cy
        .get('[data-test-id="error-item"]')
        .should('contain.text', 'Das Feld "Nachname" darf nicht leer sein');
    });

    it('zipCode is empty', () => {
      setFormValues({
        ...exampleForm,
        zipCode: '',
      });

      submitForm();

      cy
        .get('[data-test-id="error-item"]')
        .should('exist');

      cy
        .get('[data-test-id="error-item"]')
        .should('contain.text', 'Das Feld "Postleitzahl" darf nicht leer sein');
    });

    it('occupation is empty', () => {
      setFormValues({
        ...exampleForm,
        occupation: '',
      });

      submitForm();

      cy
        .get('[data-test-id="error-item"]')
        .should('exist');

      cy
        .get('[data-test-id="error-item"]')
        .should('contain.text', 'Das Feld "Beschäftigung" darf nicht leer sein')
        .should('contain.text', 'Bitte wählen Sie eine gültige Beschäftigung aus');
    });
  });
});
