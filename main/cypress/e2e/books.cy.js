/* eslint-disable no-undef */
describe("Itemlens book mainpage ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/movies");
    cy.contains("Switch to books").click();
  });

  it("shows relevant newest books", function () {
    cy.contains("Top 10 newest books");
    cy.contains("A Conjuring of Light (Shades of Magic, #3)");
    cy.contains("Chasing Harry Winston").should("not.exist");
  });

  it("enables switching to movies page", function () {
    cy.contains("Switch to movies").click();
    cy.contains("Your are currently on movies page.");
  });

  it("shows correct results when typing in search bar", function () {
    cy.get(".divider.default.text").type("rincewind");
    cy.contains("Eric (Discworld, #9; Rincewind #4)");
  });

  it("hides previous search results after clearing search input", function () {
    cy.get(".divider.default.text").type("rincewind");
    cy.contains("Eric (Discworld, #9; Rincewind #4)");
    cy.get("input").clear();
    cy.contains("Eric (Discworld, #9; Rincewind #4)").should("not.exist");
  });

  it("link to book works", function () {
    cy.get(".divider.default.text").type("rincewind");
    cy.contains("Eric (Discworld, #9; Rincewind #4)").click();
    cy.contains("Your rating:");
  });
});
