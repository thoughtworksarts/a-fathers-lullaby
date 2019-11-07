context('Visit about page', () => {
  it('should show about text', () => {
    cy.visit('http://localhost:3000')
    cy.get('.AboutPage').should('contain', 'Personal stories have transformative power and create profound encounters. A Father\'s Lullaby invites you to become part of a growing movement.')
  })
  it('should show timeline 2017 paragraph', () => {
    cy.get('.Timeline').should('contain', 'The first chapter of the project was launched in 2017, when artist served as Boston Artist-in-Residence with ' +
    'mayor’s Office of Art and Culture and Boston Centers for Youth & Families, in collaboration with Blackstone Community ' +
    'Center in South End and in connection with my role as Research Fellow at MIT Open Documentary Lab.\nThe culmination of these ' +
    'experiences was shared with the public in a participatory media installation at Villa Victoria Center for the Arts, 2017, at the' +
    ' heart of the community where the work was produced.')
  })
  it('should show timeline 2018 paragraph', () => {
    cy.get('.Timeline').should('contain', 'In the second chapter, 2018, the project expanded through collaboration with local artists and partnership with institutions, such as the Federal Probation Office, the newly formed Office of Returning Citizens and commissioned by the Boston Center for the Arts.The result was a site - responsive, public sound installation on Tremont St., Boston Center for the Arts public plaza, July - Oct 2018.')
  })
  it('should show timeline 2019 paragraph', () => {
    cy.get('.Timeline').should('contain', 'At 2018 HUBweek, We The Future conference, we prototyped an immersive participatory installation inside a shipping container; a self-contained model of a complex interactive media installation that could be accessible at any public site as a low budget traveling exhibit, alternative to a gallery or museum space. Collaborators: Hisham Bedri (pressure sensor panels with audio playback and light activation), Christian Gentry (live sound composition), Halsey Burgen (geolocated participatory website), Farid Manshadi & Jason Bashaw & Omid Fallahazad & Nedallah Fahandej & Kevin Long (installation), Afshin Fahandezh & Lizandro Segura (documentation)')
  })
  it('should route user to share page when button is clicked', () => {
    cy.get('.Button').click()
    cy.url().should('eq', 'http://localhost:3000/share')
  })
})
