/* eslint-disable no-undef */
describe("Itemlens' movie mainpage ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.contains("Allow").click();
    cy.wait(1000);
  });

  // test if frontend can be opened
  it("can be opened", function () {
    cy.contains("Top 10 newest movies");
  });

  // test if movies are relevant
  it("shows relevant movies", function () {
    cy.contains("What About Love");
    cy.contains("Kaguya-sama: Love Is War").should("not.exist");
  });
  it("shows relevant newest books", function () {
    cy.contains("Top 10 newest books");
    cy.contains("A Conjuring of Light (Shades of Magic, #3)");
    cy.contains("Chasing Harry Winston").should("not.exist");
  });

  // test if movie can be clicked and it opens the page
  it("opens movie page when movie picture is clicked", function () {
    cy.get(".movie-pic").eq(0).click();
    cy.contains("Your rating");
  });

  it("opens movie page when movie title is clicked", function () {
    cy.get(".movie-info").eq(0).click("left");
    cy.contains("Your rating");
  });
});
