context('Visit about page', () => {
  it('should show about text', () => {
    cy.visit('http://localhost:3000')
    cy.get('.AboutPage').should('contain', 'About')
  })
})
