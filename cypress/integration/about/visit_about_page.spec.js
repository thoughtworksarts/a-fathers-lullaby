context('Visit about page', () => {
  it('should show about text', () => {
    cy.visit('http://localhost:3000')
    cy.get('.AboutPage').should('contain', 'Personal stories have')
  })
  it('should show timeline 2017 paragraph', () => {
    cy.get('.Timeline').should('contain', 'The first chapter of the project')
  })
  it('should show timeline 2018 paragraph', () => {
    cy.get('.Timeline').should('contain', 'In the second chapter, 2018')
  })
  it('should show timeline 2019 paragraph', () => {
    cy.get('.Timeline').should('contain', 'At 2018 HUBweek')
  })
  it('should route user to share page when button is clicked', () => {
    cy.get('.Button').click({ force: true })
    cy.url().should('eq', 'http://localhost:3000/share')
  })
})
