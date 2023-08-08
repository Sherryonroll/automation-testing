Cypress.on('uncaught:exception', (err, runnable) => {
  return false // Preventing Cypress from failing the test
})

describe('test case automation task 3', () => {
  it('checks book store app', () => {
    // intercepting the response for the specific ISBN request
    cy.intercept(
      'GET',
      'https://demoqa.com/BookStore/v1/Book?ISBN=9781593277574',
      {
        statusCode: 200,
        body: {
          isbn: '9781593277574',
          title: 'Understanding ECMAScript 6',
          subTitle: 'The Definitive Guide for JavaScript Developers',
          author: 'Nicholas C. Zakas',
          publish_date: '2016-09-03T00:00:00.000Z',
          publisher: 'No Starch Press',
          pages: 352,
          description:
            'ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that E',
          website: 'https://leanpub.com/understandinges6/read',
        },
      },
    ).as('getSpecificBook')

    // visiting url
    cy.visit('https://demoqa.com/')

    // clicking on book store application
    cy.get('.card-body').contains('Book Store Application').click()

    // visiting book store
    cy.contains('a', 'Understanding ECMAScript 6').click()

    // verifying the display the Book Store on top.
    cy.get('.container').should('contain', 'Book Store')

    // Verifying if the book details are present
    cy.get('.profile-wrapper').should('contain', '9781593277574')
    cy.get('.profile-wrapper').should('contain', 'Understanding ECMAScript 6')

    // Verifying the intercepted response
    cy.wait('@getSpecificBook').then((intercept) => {
      expect(intercept.response.statusCode).to.eq(200)
      expect(intercept.response.body).to.deep.equal({
        isbn: '9781593277574',
        title: 'Understanding ECMAScript 6',
        subTitle: 'The Definitive Guide for JavaScript Developers',
        author: 'Nicholas C. Zakas',
        publish_date: '2016-09-03T00:00:00.000Z',
        publisher: 'No Starch Press',
        pages: 352,
        description:
          'ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that E',
        website: 'https://leanpub.com/understandinges6/read',
      })
    })
  })
})
