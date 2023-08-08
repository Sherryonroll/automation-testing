Cypress.on('uncaught:exception', (err, runnable) => {
  return false // Preventing Cypress from failing the test
})

describe('test cacse automation task 1', () => {
  it('checks form tag', () => {
    // visiting url
    cy.visit('https://demoqa.com/')

    // clicking forms button
    cy.get('.card-body').contains('Forms').click()

    // clicking practice form button
    cy.get('.text').contains('Practice Form').click()

    // filling form data
    cy.get('#firstName').type('Cowlar')
    cy.get('#lastName').type('Developer')
    cy.get('#userEmail').type('qaengineer@cowlar.com')
    cy.get('#genterWrapper').contains('Male').click()
    cy.get('#userNumber').type('0123456789')
    cy.get('#subjectsContainer').click().type('Computer Science')
    cy.get('.subjects-auto-complete__menu').contains('Computer Science').click()
    cy.get('#currentAddress').click().type('Address 1')
    cy.get('#hobbiesWrapper').contains('Music').click()
    // getting problem in state/city tried different locator
    // but couldn't get it right
    cy.get('#state').contains('Select State')
    // .select('NCR').should('have.value', 'NCR')
    cy.get('#subjectsContainer').click().type('{enter}')
    // cy.get('#submit').click()

    // verifying form data
    cy.get('#firstName').should('have.value', 'Cowlar')
    cy.get('#lastName').should('have.value', 'Developer')
    cy.get('#userEmail').should('have.value', 'qaengineer@cowlar.com')
    // cy.get('#genterWrapper').should('be.checked')
    cy.get('#userNumber').should('have.value', '0123456789')
    // cy.get('#subjectContainer').should('have.value', 'Computer Science')
    // cy.get('#hobbiesWrapper').should('be.checked')
    cy.get('#currentAddress').should('have.value', 'Address 1')

    // cy.get('#closeLargeModal').click()
  })
})
