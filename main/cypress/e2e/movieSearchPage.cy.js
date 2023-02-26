describe("Movies Search Page ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/movies");
    cy.contains("Search").click();
  });

  it("can be opened", function () {
    cy.contains("Search movies");
  });
  it("shows search result matching the keyword", function () {
    cy.get("input").type("pirates");
    cy.get("[data-testid='SearchIcon']").click()
    cy.contains("Caesar Against the Pirates");
  });

  it("hides previous search after new search", function () {
    cy.get("input").type("pirates");
    cy.get("[data-testid='SearchIcon']").click()
    cy.contains("Caesar Against the Pirates");
    cy.get("input").clear();
    cy.get("input").type("harry potter");
    cy.get("[data-testid='SearchIcon']").click()
    cy.contains("Caesar Against the Pirates").should("not.exist");
  });

  it("opens the movie page when movie picture is clicked", function () {
    cy.get("input").type("harry potter");
    cy.get("[data-testid='SearchIcon']").click()
    cy.get(".table-item-pic").eq(0).click()
    cy.contains("Your rating:")
  })

  it("opens the movie page when movie title is clicked", function () {
    cy.get("input").type("harry potter");
    cy.get("[data-testid='SearchIcon']").click()
    cy.get(".table-item-title").eq(0).click()
    cy.contains("Your rating:")
  })

  //These tests fail for some reason
  /*describe("shows movies in correct order after", function(){
    beforeEach(function () {
      cy.get("input").type("harry potter");
      cy.get("[data-testid='SearchIcon']").click()
    })*/

    it("sorting by oldest first", function (){
        cy.get("input").type("harry potter");
        cy.get("[data-testid='SearchIcon']").click()
        cy.wait(1000)
        cy.contains("Harry Potter and the Philosopher's Stone")
        cy.contains("release oldest first").click()
        cy.wait(1000)
        cy.get(".table-item").first().contains("Harry Potter and the Philosopher's Stone")
    })

    it("sorting by title descending", function (){
      cy.get("input").type("harry potter");
      cy.get("[data-testid='SearchIcon']").click()
      cy.contains("title Z-A").click()
      cy.contains("title Z-A").click()
      cy.get(".table-item").first().contains("The Greater Good - Harry Potter Fan Film")
    })
  //})
});
