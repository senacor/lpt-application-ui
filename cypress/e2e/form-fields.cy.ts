describe('Form fields', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('opens the application and displays the correct information', () => {
    cy.title()
      .should('equal', 'Der "ich möchte Dinge finanzieren" Kredit 💰');
  });

  it('contains the required input fields with default values', () => {
    // credit amount
    cy
      .get('[data-test-id="creditAmount"]')
      .should('exist')
      .invoke('val')
      .should('equal', '10000');
    cy
      .get('[data-test-id="creditAmountInput"]')
      .should('exist')
      .should('contain.value', '10000');

    // firstName
    cy
      .get('[data-test-id="firstName"]')
      .should('exist')
      .should('contain.value', '');

    // lastName
    cy
      .get('[data-test-id="lastName"]')
      .should('exist')
      .should('contain.value', '');

    // zipCode
    cy
      .get('[data-test-id="zipCode"]')
      .should('exist')
      .should('contain.value', '');

    // occupation
    cy
      .get('[data-test-id="occupation"]')
      .should('exist')
      .should('have.value', null);

    // net-income
    cy
      .get('[data-test-id="monthlyNetIncome"]')
      .should('exist')
      .invoke('val')
      .should('equal', '2200');
    cy
      .get('[data-test-id="monthlyNetIncome"]')
      .should('exist')
      .should('contain.value', '2200');

    // expenses
    cy
      .get('[data-test-id="monthlyExpenses"]')
      .should('exist')
      .invoke('val')
      .should('equal', '1600');
    cy
      .get('[data-test-id="monthlyExpenses"]')
      .should('exist')
      .should('contain.value', '1600');
  });

  describe('combined inputs behave correctly', () => {
    // only tested on one field combination
    it('updates the number input when the range slider gets updated', () => {
      // credit amount
      cy
        .get('[data-test-id="creditAmount"]')
        .should('exist')
        .invoke('val')
        .should('equal', '10000');
      cy
        .get('[data-test-id="creditAmountInput"]')
        .should('exist')
        .should('contain.value', '10000');

      // update the range slider
      cy
        .get('[data-test-id="creditAmount"]')
        .invoke('val', '20000');
      cy
        .get('[data-test-id="creditAmount"]')
        .trigger('input');

      cy
        .get('[data-test-id="creditAmountInput"]')
        .should('exist')
        .should('contain.value', '20000');
    });
    it('updates the range slider when the input gets updated', () => {
      // credit amount
      cy
        .get('[data-test-id="creditAmount"]')
        .should('exist')
        .invoke('val')
        .should('equal', '10000');
      cy
        .get('[data-test-id="creditAmountInput"]')
        .should('exist')
        .should('contain.value', '10000');

      // update the range slider
      cy
        .get('[data-test-id="creditAmountInput"]')
        .clear();
      cy
        .get('[data-test-id="creditAmountInput"]')
        .type('20000');
      cy
        .get('[data-test-id="creditAmountInput"]')
        .trigger('input');

      cy
        .get('[data-test-id="creditAmount"]')
        .should('exist')
        .invoke('val')
        .should('equal', '20000');
    });
  });
})
