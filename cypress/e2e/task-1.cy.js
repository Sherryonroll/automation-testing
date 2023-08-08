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
    cy.get('input#react-select-3-input').type('NCR{enter}', { force: true })
    cy.get('input#react-select-4-input').type('Delhi{enter}', { force: true })

    // clicking on submit button
    cy.get('button#submit').click({ force: true })

    //verifying information presented in the modal is the same as provided
    cy.get('.table.table-dark tbody').within(() => {
      cy.contains('tr', 'Student Name').should('contain', 'Cowlar Developer')
      cy.contains('tr', 'Student Email').should(
        'contain',
        'qaengineer@cowlar.com',
      )
      cy.contains('tr', 'Gender').should('contain', 'Male')
      cy.contains('tr', 'Mobile').should('contain', '0123456789')
      cy.contains('tr', 'Date of Birth').should('contain', '08 August,2023')
      cy.contains('tr', 'Subjects').should('contain', 'Computer Science')
      cy.contains('tr', 'Address').should('contain', 'Address 1')
      cy.contains('tr', 'State and City').should('contain', 'NCR Delhi')
    })

    // closing the modal
    cy.get('button#closeLargeModal').click({ force: true })
  })
})
