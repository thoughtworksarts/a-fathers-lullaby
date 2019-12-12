context('Visit explore page', () => {
  it('should show map', () => {
    cy.visit('http://localhost:3000/explore')
    cy.get('.explore-page').should('exist')
  })
})
