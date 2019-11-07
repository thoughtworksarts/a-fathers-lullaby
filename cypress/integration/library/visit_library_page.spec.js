context('Visit library page', () => {
  it('should load all assets', () => {
    cy.visit('http://localhost:3000/library')
    cy.get('.loading').should('exist')
    cy.get('.loading').should('not.exist', { pageLoadTimeout: 30000 })
    cy.get('.Asset').should('have.length.above', 0)
    cy.get('.react-audio-player').should('exist')
  })
})
