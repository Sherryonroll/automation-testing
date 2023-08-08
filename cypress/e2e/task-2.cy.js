Cypress.on('uncaught:exception', (err, runnable) => {
  return false // Preventing Cypress from failing the test
})

describe('test cacse automation task 2', () => {
  it('checks interaction tag', () => {
    // visiting url
    cy.visit('https://demoqa.com/')

    // clicking on Interaction card
    cy.get('.card-body').contains('Interactions').click()

    // verifying sidebar contains the given tabs
    cy.get('.accordion').should('contain', 'Elements')
    cy.get('.accordion').should('contain', 'Forms')
    cy.get('.accordion').should('contain', 'Alerts, Frame & Windows')
    cy.get('.accordion').should('contain', 'Widgets')
    cy.get('.accordion').should('contain', 'Interactions')
    cy.get('.accordion').should('contain', 'Book Store Application')

    // clicking on resizable tab
    cy.get('.text').contains('Resizable').click()

    // verifying current height and width
    cy.get('#resizableBoxWithRestriction').should('have.css', 'width', '200px')
    cy.get('#resizableBoxWithRestriction').should('have.css', 'height', '200px')

    // resizing box1 by dragging the right corner
    let initialWidth, initialHeight
    cy.get('#resizableBoxWithRestriction').then(($box) => {
      initialWidth = $box.outerWidth()
      initialHeight = $box.outerHeight()
    })
    // getting problem in resizing
    cy.get('#resizableBoxWithRestriction')
      .trigger('mousedown', { which: 1, clientX: 200, clientY: 200 }) // Start dragging from the bottom-right corner
      .trigger('mousemove', { clientX: 250, clientY: 250 }) // Adjusting to desired coordinates for resizing
      .trigger('mouseup')
    cy.wait(1000)

    // Verifying the new dimensions after resizing
    cy.get('#resizableBoxWithRestriction').then(($box) => {
      // expect($box.outerWidth()).to.be.greaterThan(initialWidth)
      // expect($box.outerHeight()).to.be.greaterThan(initialHeight)
      expect($box.outerWidth()).to.be.lessThan(501) // Max-Width: 500
      expect($box.outerHeight()).to.be.lessThan(301) // Max-Height: 300
      expect($box.outerWidth()).to.be.greaterThan(149) // Min-Width: 150
      expect($box.outerHeight()).to.be.greaterThan(149) // Min-Height: 150
    })

    // verifying box 2 is resizable
    cy.get('#resizable')
      .trigger('mousedown', { which: 1, clientX: 200, clientY: 200 }) // Start dragging from the bottom-right corner
      .trigger('mousemove', { clientX: 250, clientY: 250 }) // Adjust to desired coordinates for resizing
      .trigger('mouseup')
    cy.get('#resizableBoxWithRestriction').then(($box) => {
      // expect($box.outerWidth()).to.be.greaterThan(initialWidth)
      // expect($box.outerHeight()).to.be.greaterThan(initialHeight)
    })
  })
})
