describe("Search Page ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.contains("Search").click();
  });

  it("search page opens", function () {
    cy.contains("Search movies");
  });
  it("search page opens and search for movies", function () {
    cy.get("input").type("pirates");
    cy.get("[data-testid='SearchIcon']").click()
    cy.contains("Caesar Against the Pirates");
  });

  it("hides previous search", function () {
    cy.get("input").type("pirates");
    cy.get("[data-testid='SearchIcon']").click()
    cy.contains("Caesar Against the Pirates");
    cy.get("input").clear();
    cy.get("input").type("harry potter");
    cy.get("[data-testid='SearchIcon']").click()
    cy.contains("Caesar Against the Pirates").should("not.exist");
  });

  describe("shows movies in correct order after", function(){
    beforeEach(function () {
      cy.get("input").type("harry potter");
      cy.get("[data-testid='SearchIcon']").click()
    })

    it("sorting by oldest first", function (){
      cy.contains("release oldest first").click()
      cy.contains("release oldest first").click()
      cy.get(".movie-slot").first().contains("Harry Potter and the Philosopher's Stone")
    })

    it("sorting by title descending", function (){
      cy.contains("title Z-A").click()
      cy.contains("title Z-A").click()
      cy.get(".movie-slot").first().contains("The Greater Good - Harry Potter Fan Film")
    })
  })
});
