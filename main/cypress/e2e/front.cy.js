/* eslint-disable no-undef */
describe("BookCine's movie mainpage ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/");
    cy.wait(1000);

    cy.contains("Allow").click();
    cy.wait(1000);
  });

  // test if frontend can be opened
  it("can be opened", function () {
    cy.contains("Highest rated movies");
  });

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
