describe("Itemlens ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

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

  it("hides previous search", function () {
    cy.contains("Search").click();
    cy.contains("Search movies");
    cy.get("input").type("pirates");
    cy.contains("Caesar Against the Pirates");
    cy.get("input").clear();
    cy.contains("Caesar Against the Pirates").should("not.exist");
  });
  it("resease new sort works", function () {
    cy.contains("Search").click();
    cy.contains("Search movies");
    cy.get("input").type("pirates");
    cy.contains("Caesar Against the Pirates");
    cy.contains("release newest first").click();
    cy.contains("Caesar Against the Pirates").should("not.be.visible");
    cy.contains("Pirates");
  });
});
