/* eslint-disable no-undef */
describe("BookCine's movie mainpage ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.contains("Allow").click()
    cy.wait(1000)
  });

  // test if frontend can be opened
  it("can be opened", function () {
    cy.contains("Top 10 newest movies");
  });

  // test if movies are relevant
  it("shows relevant movies", function () {
    cy.contains("The Lego Movie");
    cy.contains("Kaguya-sama: Love Is War").should("not.exist");
  });

  // test if wishlist button can be clicked
  it("link to Wishlist works", function () {
    cy.contains("Wishlist").click();
  });

  // test if my ratings page can be opened
  it("link to Ratings works ", function () {
    cy.contains("Ratings").click();
    cy.contains("You have not rated any movies yet!");
  });

  it("link to Search works ", function () {
    cy.get(".navbar").contains("Search").click();
    cy.contains("Search movies and books");
  });
  // testit searchille toimivat, kun joku hyväksyy uuden searching :)
  // // test if you can write in search field
  // it("shows results for quick search", function () {
  //   cy.get("input").type("pirates");
  //   cy.contains("Caesar Against the Pirates");
  // });

  // // test if you can clear search field and previously searched movies are hiden
  // it("hides previous search result after clearing search input", function () {
  //   cy.get("input").type("pirates");
  //   cy.contains("Caesar Against the Pirates");
  //   cy.get("input").clear();
  //   cy.contains("Caesar Against the Pirates").should("not.exist");
  // });

  // test if movie can be clicked and it opens the page
  it("opens movie page when movie picture is clicked", function () {
    cy.get(".movie-pic").eq(0).click();
    cy.contains("Your rating");
  });

  it("opens movie page when movie title is clicked", function () {
    cy.get(".movie-info").eq(0).click();
    cy.contains("Your rating");
  });
});
