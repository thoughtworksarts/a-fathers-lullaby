context('Visit about page', () => {
  it('should show about text', () => {
    cy.visit('http://localhost:3000')
    cy.get('.AboutPage').should('contain', 'A Father’s Lullaby highlights the role of men in raising children while underlining the absence of fathers due to racial disparities of mass incarceration. Policies have taken their toll on children, our next generation. This contributory project invites you to record your voice, share insight, sing a lullaby and create a collective voice for this issue and to imagine social policies based on support not criminalization. The space of love and shared memories of childhood becomes the place to contemplate difficult issues our society is facing today.'
    )
  })
})
