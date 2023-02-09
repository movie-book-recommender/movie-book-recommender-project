describe('Itemlens ', function() {
  beforeEach(function(){
    cy.visit('http://localhost:3000')
  })

  // test if frontend can be opened
  it('front page can be opened', function() {
    cy.contains('Top 10 movies in 2020')
  })

  // test if wishlist button can be clicked
  it('wishlist can be opened', function(){
    cy.contains('Wishlist').click()
  })

  // test if going back to frontpage from wishlist works
  it('can go back', function(){
    cy.contains('ItemLens').click()
    cy.contains('Top 10 movies in 2020')
  })

  // test if you can write in search field 
  it('can type in search and shows results', function(){
    cy.get('input').type('pirates')
    cy.contains('Caesar Against the Pirates')
  })

  // test if you can clear search field and previously searched movies are hiden
  it('search input clears and hides previous search results', function(){
    cy.get('input').type('pirates')
    cy.contains('Caesar Against the Pirates')
    cy.get('input').clear()
    cy.contains('Caesar Against the Pirates').should('not.exist')

  })
})
