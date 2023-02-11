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

  // test if you can write in search field and click search button
  it('search functions', function(){
    cy.get('#search').type('pirates')
    cy.contains('Search').click()
  })

  // test if movie can be clicked and it opens the page
  it('test movie clicking', function(){
    cy.get('.movie-pic').eq(0).click()
    cy.contains('Your rating')
  })

  // test if my ratings page can be opened
  it('test movie rating', function(){
    cy.contains('Ratings').click()
    cy.contains('MyRatings')
  })
  
})

