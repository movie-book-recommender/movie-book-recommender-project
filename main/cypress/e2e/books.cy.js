/* eslint-disable no-undef */
describe("Itemlens book mainpage ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/");
    cy.wait(1000);

    cy.contains("Allow").click();
    cy.wait(1000);
  });

  it("shows relevant newest books", function () {
    cy.contains("Top 10 newest books");
    cy.contains("A Conjuring of Light (Shades of Magic, #3)");
    cy.contains("Chasing Harry Winston").should("not.exist");
  });
  // quick search ei tällä hetkellä toimi kirjoille
  // it("shows correct results when typing in search bar", function () {
  //   cy.get("input").type("rincewind");
  //   cy.contains("Eric (Discworld, #9; Rincewind #4)");
  // });

  // it("hides previous search results after clearing search input", function () {
  //   cy.get("input").type("rincewind");
  //   cy.contains("Eric (Discworld, #9; Rincewind #4)");
  //   cy.get("input").clear();
  //   cy.contains("Eric (Discworld, #9; Rincewind #4)").should("not.exist");
  // });
});
