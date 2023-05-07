describe('empty spec', () => {
  it('go to shop page', () => {
    cy.visit('https://example.com/')
    cy.log('xD')
    cy.get('h1').should('be.visible')
    
    //test
  })
})