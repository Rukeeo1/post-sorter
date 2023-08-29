// https://on.cypress.io/api

describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.intercept('GET', '/posts', {
      fixture: 'posts.json', // Replace with the path to your mock data fixture
    });
    
    cy.visit('http://127.0.0.1:517')
    // cy.contains('h1', 'You did it!')
  })
})
