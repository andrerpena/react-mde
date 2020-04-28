/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000')
  })
  it('.type() - type into a DOM element', () => {
    // https://on.cypress.io/type
    cy.get('.mde-text')
      .type('{selectall}{backspace}')
      .type('@')
        .wait(500)
        .type('{downArrow}')
        .type('{enter}')
        .should('have.value', '@angela ')
  })
  it('.type() - type into a DOM element', () => {
    // https://on.cypress.io/type
    cy.get('.mde-text')
        .type('{selectall}{backspace}')
        .type('nice')
        .type('{ctrl}b')
        .should('have.value', '**nice**')
  })
})
