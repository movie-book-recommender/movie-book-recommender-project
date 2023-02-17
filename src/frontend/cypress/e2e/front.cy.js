describe("Itemlens ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  // test if frontend can be opened
  it("front page can be opened", function () {
    cy.contains("Top 10 newest movies");
  });

  // test if wishlist button can be clicked
  it("wishlist can be opened", function () {
    cy.contains("Wishlist").click();
  });

  // test if going back to frontpage from wishlist works
  it("can go back", function () {
    cy.contains("ItemLens").click();
    cy.contains("Top 10 newest movies");
  });

  // test if you can write in search field
  it("can type in search and shows results", function () {
    cy.get("input").type("pirates");
    cy.contains("Caesar Against the Pirates");
  });

  // test if you can clear search field and previously searched movies are hiden
  it("search input clears and hides previous search results", function () {
    cy.get("input").type("pirates");
    cy.contains("Caesar Against the Pirates");
    cy.get("input").clear();
    cy.contains("Caesar Against the Pirates").should("not.exist");
  });

  // test if movie can be clicked and it opens the page
  it("test movie clicking", function () {
    cy.get(".movie-pic").eq(0).click();
    cy.contains("Your rating");
  });

  // test if you can rate movie DOES NOT WORK YET DON'T KNOW HOW
  // TO MAKE TEST FOR STARS RATINGS

  // test if my ratings page can be opened
  it("test movie rating", function () {
    cy.contains("Ratings").click();
    cy.contains("MyRatings");
  });
});

// test if you can open search page
it("search page opens", function () {
  cy.contains("Search").click();
  cy.contains("Search movies");
});
it("search page opens and search for movies", function () {
  cy.contains("Search").click();
  cy.contains("Search movies");
  cy.get("input").type("pirates");
  cy.contains("Caesar Against the Pirates");
});
it("search page opens and search for movies hides previous search", function () {
  cy.contains("Search").click();
  cy.contains("Search movies");
  cy.get("input").type("pirates");
  cy.contains("Caesar Against the Pirates");
  cy.get("input").clear();
  cy.contains("Caesar Against the Pirates").should("not.exist");
});
