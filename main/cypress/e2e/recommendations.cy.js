/* eslint-disable no-undef */
describe("Itemlens' movie main page ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.contains("Allow").click();
    cy.wait(1000);
  });
  it("movie page contains movie recommendations", function () {
    cy.get(".movie-pic").eq(0).click();

    cy.contains("Similar movies");
    cy.wait(1000);
    cy.contains("The Incredibles");
    cy.contains("Similiar books");
    cy.wait(1000);
    cy.contains("Battle Bunny");
  });

  it("book page contains similar books", function () {
    cy.contains("Top 10 newest books");
    cy.wait(1000);
    cy.get(".movie-info").contains("180 Seconds").click();
    cy.contains("Similar books");
    cy.wait(2000);
    cy.contains("Ten Tiny Breaths (Ten Tiny Breaths, #1)");
    cy.contains("Similar movies");
    cy.contains("The Notebook");
  });
});
