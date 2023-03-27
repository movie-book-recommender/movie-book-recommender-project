/* eslint-disable no-undef */
describe("Itemlens' movie main page ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.contains("Allow").click()
    cy.wait(1000)
  });

  it("movie page contains movie recommendations", function () {
    cy.get("input").type("harry potte");
    cy.get(".movie-info")
      .contains("Harry Potter and the Half-Blood Prince")
      .click();
    cy.contains("Similar movies");
    cy.wait(1000);
    cy.contains("Harry Potter and the Philosopher's Stone");
    cy.contains("Similiar books");
    cy.wait(1000);
    cy.contains("Harry Potter and the Prisoner of Azkaban (Harry Potter, #3)")
  });

  it("book page contains similar books", function () {
    cy.contains("Switch to books").click();
    cy.contains("Top 10 newest books");
    cy.wait(1000);
    cy.get(".movie-info").contains("180 Seconds").click();
    cy.contains("Similar books");
    cy.wait(1000);
    cy.contains("Ten Tiny Breaths (Ten Tiny Breaths, #1)");
    cy.contains("Similar movies");
    cy.contains("The Notebook");
  });
});
