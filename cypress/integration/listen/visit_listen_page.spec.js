context('Visit listen page', () => {
  it('should load all assets', () => {
    cy.visit('http://localhost:3000/listen')
    cy.get('.loading').should('exist')
    cy.get('.loading').should('not.exist')
    cy.get('.Asset').should('have.length.above', 0)
    cy.get('.react-audio-player').should('exist')
  })
})
