context('Visit about page', () => {
  it('should show about text', () => {
    cy.visit('http://localhost:3000')
    cy.get('.AboutPage').should('contain', 'Personal stories have transformative power and create profound encounters. A Father\'s Lullaby invites you to become part of a growing movement.')
  })
})
