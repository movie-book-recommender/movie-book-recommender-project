/* eslint-disable no-undef */
describe("Itemlens' movie main page ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("movie page contains movie recommendations", function () {
    cy.get("input").type("harry potte");
    cy.contains("Harry Potter and the Half-Blood Prince");

    cy.get(".movie-pic").eq(11).click();
    cy.contains("Similar movies");
    cy.contains("Harry Potter and the Philosopher's Stone");
  });
  it("book page contains similar books", function () {
    cy.contains("Switch to books").click();
    cy.contains("Top 10 newest books");

    cy.get(".movie-pic").eq(0).click("left");
    cy.contains("Similar books");
    cy.contains("Ten Tiny Breaths (Ten Tiny Breaths, #1)");
  });
});
