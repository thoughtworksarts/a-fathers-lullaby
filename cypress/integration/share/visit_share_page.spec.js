context('Visit share page', () => {
  it('should show share greeting message', () => {
    cy.visit('http://localhost:3000/share')
    cy.get('.SharePage').should('contain', 'Together we create a rich audio landscape of memories and stories. Prepare for your recording and build our shared experience.')
  })
})
