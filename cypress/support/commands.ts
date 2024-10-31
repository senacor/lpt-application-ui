/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import { CreditApplicationRequest } from '../../src/credit-application/models/credit-application-request.type'

export const setFormValues = (form: CreditApplicationRequest) => {
  // credit amount
  cy.get('[data-test-id="creditAmount"]').should('exist')

  // update the range slider
  cy.get('[data-test-id="creditAmount"]').invoke('val', form.creditAmount)
  cy.get('[data-test-id="creditAmount"]').trigger('input')

  // firstName
  cy.get('[data-test-id="firstName"]').should('exist')

  if (!!form.firstName) {
    cy.get('[data-test-id="firstName"]').type(form.firstName)
  } else {
    cy.get('[data-test-id="firstName"]').clear()
  }

  // lastName
  cy.get('[data-test-id="lastName"]').should('exist')

  if (!!form.lastName) {
    cy.get('[data-test-id="lastName"]').type(form.lastName)
  } else {
    cy.get('[data-test-id="lastName"]').clear()
  }

  // zipCode
  cy.get('[data-test-id="zipCode"]').should('exist')
  if (!!form.zipCode) {
    cy.get('[data-test-id="zipCode"]').type(form.zipCode)
  } else {
    cy.get('[data-test-id="zipCode"]').clear()
  }

  // occupation
  cy.get('[data-test-id="occupation"]').should('exist')
  if (!!form.occupation) {
    cy.get('[data-test-id="occupation"]').select(form.occupation)
  }

  // net-income
  cy.get('[data-test-id="monthlyNetIncome"]').should('exist')

  cy.get('[data-test-id="monthlyNetIncome"]').invoke('val', form.monthlyNetIncome)
  cy.get('[data-test-id="monthlyNetIncome"]').trigger('input')

  // expenses
  cy.get('[data-test-id="monthlyExpenses"]').should('exist')

  cy.get('[data-test-id="monthlyExpenses"]').invoke('val', form.monthlyExpenses)
  cy.get('[data-test-id="monthlyExpenses"]').trigger('input')
}

export const submitForm = () => {
  cy.get('[data-test-id="submitButton"]').should('exist')
  cy.get('[data-test-id="submitButton"]').click({ force: true })
}
