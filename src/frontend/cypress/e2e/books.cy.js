describe("Itemlens books' page ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.contains("Switch to books").click();
  });

  it("shows relevant newest books", function () {
    cy.contains("Top 10 newest books");
    cy.contains("A Conjuring of Light (Shades of Magic, #3)");
    cy.contains("Chasing Harry Winston").should("not.exist");
  });

  it("enables switching to movies page", function () {
    cy.contains("Switch to movies").click();
    cy.contains("Top 10 newest movies");
  });

  it("shows correct results when typing in search bar", function () {
    cy.get("input").type("rincewind");
    cy.contains("Eric (Discworld, #9; Rincewind #4)");
  });

  it("hides previous search results after clearing search input", function () {
    cy.get("input").type("rincewind");
    cy.contains("Eric (Discworld, #9; Rincewind #4)");
    cy.get("input").clear();
    cy.contains("Eric (Discworld, #9; Rincewind #4)").should("not.exist");
  });

  it("opens the search page", function () {
    cy.contains("Search").click();
    cy.contains("Search books");
  });

  it("on search page shows correct result for search", function () {
    cy.contains("Search").click();
    cy.contains("Search books");
    cy.get("input").type("rincewind");
    cy.get("[data-testid='SearchIcon']").click()
    cy.contains("Eric (Discworld, #9; Rincewind #4)");
  });

  it("on search previous search is overwritten after new search is done", function () {
    cy.contains("Search").click();
    cy.contains("Search books");
    cy.get("input").type("rincewind");
    cy.get("[data-testid='SearchIcon']").click()
    cy.contains("Eric (Discworld, #9; Rincewind #4)");
    cy.get("input").clear();
    cy.get("input").type("harry potter");
    cy.get("[data-testid='SearchIcon']").click()
    cy.contains("Eric (Discworld, #9; Rincewind #4)").should("not.exist");
  });
});
