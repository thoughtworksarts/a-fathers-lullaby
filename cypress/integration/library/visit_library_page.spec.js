context('Visit library page', () => {
  it('should load all stories', () => {
    cy.visit('http://localhost:3000/library')
    cy.get('.loading').should('exist')
    cy.get('.loading', { timeout: 3000 }).should('not.exist')
    cy.get('.Story').should('have.length.above', 0)
    cy.get('.react-audio-player').should('exist')
  })
})
