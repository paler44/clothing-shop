describe('empty spec', () => {
  it('go to shop page', () => {
    cy.visit('/shop')
    cy.log('xD')
    cy.get('[cy-data="item-id-2"]').click({force:true})
    cy.get('[cy-data="cart-icon"]').click()
    cy.get('[cy-data="checkout-button"]').should('contain', 'CHECKOUT').click()
    cy.get('[cy-data="cart-icon"]').click()
    cy.get('[cy-data="remove-button"]').click()
    //test
  })
})