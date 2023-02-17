describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/shop')
    cy.get('[cy-data="item-id-2"]').click({force:true})
    cy.get('[cy-data="cart-icon"]').click({force:true})
    cy.get('[cy-data="checkout-button"]').click({force:true})
    cy.get('[cy-data="cart-icon"]').click({force:true})
    cy.get('[cy-data="remove-button"]').click({force:true})
  })
})