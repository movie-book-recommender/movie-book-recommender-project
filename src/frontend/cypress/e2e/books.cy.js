describe("Itemlens ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.contains("You are on page movies switch to books").click();
  });

  // test if frontend can be opened
  it("front page can be opened", function () {
    cy.contains("Top 10 newest books");
  });

  // test if newest books are relevant
  it("newest boooks are relevant", function () {
    cy.contains("A Conjuring of Light (Shades of Magic, #3)");
    cy.contains("Chasing Harry Winston").should("not.exist");
  });

  // test is book can be opened
  it("single book page can be opened", function () {
    cy.contains("A Conjuring of Light (Shades of Magic, #3)").click();
    cy.contains("Your rating");
  });

  // test if you can write in search field
  it("can type in search and shows results", function () {
    cy.get("input").type("rincewind");
    cy.contains("Eric (Discworld, #9; Rincewind #4)");
  });

  // test if you can clear search field and previously searched movies are hiden
  it("search input clears and hides previous search results", function () {
    cy.get("input").type("rincewind");
    cy.contains("Eric (Discworld, #9; Rincewind #4)");
    cy.get("input").clear();
    cy.contains("Eric (Discworld, #9; Rincewind #4)").should("not.exist");
  });

  it("search page opens", function () {
    cy.contains("Search").click();
    cy.contains("Search books");
  });

  it("search page opens and search for books", function () {
    cy.contains("Search").click();
    cy.contains("Search books");
    cy.get("input").type("rincewind");
    cy.contains("Eric (Discworld, #9; Rincewind #4)");
  });

  it("hides previous search", function () {
    cy.contains("Search").click();
    cy.contains("Search books");
    cy.get("input").type("rincewind");
    cy.contains("Eric (Discworld, #9; Rincewind #4)");
    cy.get("input").clear();
    cy.contains("Eric (Discworld, #9; Rincewind #4)").should("not.exist");
  });
});
