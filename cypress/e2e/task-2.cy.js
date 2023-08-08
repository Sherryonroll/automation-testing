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

    // making variable to store the inital dimension of box
    let initialWidth, initialHeight
    cy.get('#resizableBoxWithRestriction').then(($box) => {
      initialWidth = $box.outerWidth()
      initialHeight = $box.outerHeight()
    })
    cy.get('#resizableBoxWithRestriction > span').as('resizeableElement')

    // Resizing the element
    cy.get('@resizeableElement').trigger('mousedown', { which: 1 })
    cy.get('@resizeableElement').trigger('mousemove', {
      clientX: 500,
      clientY: 300,
    })
    cy.get('@resizeableElement').trigger('mouseup', { force: true })
    cy.wait(2000)

    // Verifying the new dimensions after resizing
    cy.get('#resizableBoxWithRestriction').then(($box) => {
      expect($box.outerWidth()).to.be.lessThan(501) // Max-Width: 500
      expect($box.outerHeight()).to.be.lessThan(301) // Max-Height: 300
      expect($box.outerWidth()).to.be.greaterThan(149) // Min-Width: 150
      expect($box.outerHeight()).to.be.greaterThan(149) // Min-Height: 150

      // verifying box changed it dimensions from the intial dimensions
      expect($box.outerWidth()).to.not.equal(initialWidth)
      expect($box.outerHeight()).to.not.equal(initialHeight)
    })

    // making variable to store the inital dimension of box
    let resizeWidth, resizeHeight
    cy.get('#resizable').then(($box) => {
      initialWidth = $box.outerWidth()
      initialHeight = $box.outerHeight()
    })

    // Resizing the element
    cy.get('#resizable').trigger('mousedown', { which: 1 })
    cy.get('#resizable').trigger('mousemove', {
      clientX: 500,
      clientY: 300,
    })
    cy.get('#resizable').trigger('mouseup', { force: true })

    cy.wait(2000)

    // verifying box changed it dimensions from the intial dimensions
    cy.get('#resizable').then(($box) => {
      expect($box.outerWidth()).to.not.equal(resizeWidth)
      expect($box.outerHeight()).to.not.equal(resizeHeight)
    })
  })
})
