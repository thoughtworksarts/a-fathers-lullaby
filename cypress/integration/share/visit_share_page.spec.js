context('Visit share page', () => {
  it('should show share greeting message', () => {
    cy.visit('http://localhost:3000/share')
    cy.get('.SharePage').should('contain', 'When you share your story you become a part of this poetic movement. You give a voice to the call for social change.')
  })
})
