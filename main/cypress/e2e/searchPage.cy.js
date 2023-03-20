describe("Search Page ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/movies")
    cy.get(".navbar").contains("Search").click()
  });

  it("can be opened", function () {
    cy.contains("Search movies and books")
  });

  it("shows search result matching the keyword", function () {
    cy.get("input").type("pirate")
    cy.get("[data-testid='SearchIcon']").click()
    cy.contains("Search result for 'pirate'")
    cy.contains("Caesar Against the Pirates")
    cy.contains("Pirate Cinema")
  });

  it("shows no result for mismatching keyword", function () {
    cy.get("input").type("asdasd")
    cy.get("[data-testid='SearchIcon']").click()
    cy.contains("No result for 'asdasd'")
  })

  it("hides previous search after new search", function () {
    cy.get("input").type("pirate")
    cy.get("[data-testid='SearchIcon']").click()
    cy.contains("Caesar Against the Pirates")
    cy.contains("Pirate Cinema")
    cy.get("input").clear();
    cy.get("input").type("harry potter");
    cy.get("[data-testid='SearchIcon']").click()
    cy.contains("Caesar Against the Pirates").should("not.exist")
    cy.contains("Pirate Cinema").should("not.exist")
  });

  describe("opens the item page after", function () {
    beforeEach(function () {
      cy.get("input").type("harry potter")
      cy.get("[data-testid='SearchIcon']").click()
    })

    it("movie picture is clicked", function () {
      cy.get(".table-left")
      .find(".table-item-pic").first()
      .click()
      cy.contains("Directors:")
    })
    
    it("book picture is clicked", function () {
      cy.get(".table-right")
      .find(".table-item-pic").first()
      .click()
      cy.contains("Authors:")
    })
  
    it("movie title is clicked", function () {
      cy.get(".table-left")
      .find(".table-item-title").first()
      .click()
      cy.contains("Directors:")
    })
  
    it("book title is clicked", function () {
      cy.get(".table-right")
      .find(".table-item-title").first()
      .click()
      cy.contains("Authors:")
    })
  })

  describe("shows items in correct order after", function () {
    beforeEach(function () {
      cy.get("input").type("harry potter")
      cy.get("[data-testid='SearchIcon']").click()
      cy.wait(1000)
    })

    it("sorting by oldest first", function (){
      cy.contains("release oldest first").click()
      cy.wait(1000)
      cy.get(".table-left").within(() => {
        cy.get(".table-item-title").eq(0).contains("Harry Potter and the Philosopher's Stone")
        cy.get(".table-item-title").eq(1).contains("Harry Potter and the Chamber of Secrets")
      })
      cy.get(".table-right").within(() => {
        cy.get(".table-item-title").eq(0).contains("Harry Potter and the Sorcerer's Stone")
        cy.get(".table-item-title").eq(1).contains("Harry Potter and the Chamber of Secrets")
      })
    })

    
    it("sorting by newest first", function (){
      cy.contains("release newest first").click()
      cy.wait(1000)
      cy.get(".table-left").within(() => {
        cy.get(".table-item-title").eq(0).contains("Harry Potter 20th Anniversary: Return to Hogwarts")
        cy.get(".table-item-title").eq(1).contains("Harry Potter: A History Of Magic")
      })
      cy.get(".table-right").within(() => {
        cy.get(".table-item-title").eq(0).contains("Harry Potter and the Cursed Child")
        cy.get(".table-item-title").eq(1).contains("Harry Potter and the Methods of Rationality")
      })
    })

    it("sorting by title descending", function (){
      cy.contains("title Z-A").click()
      cy.wait(1000)
      cy.get(".table-left").within(() => {
        cy.get(".table-item-title").eq(0).contains("The Greater Good - Harry Potter Fan Film")
        cy.get(".table-item-title").eq(1).contains("Harry Potter: A History Of Magic")
      })
      cy.get(".table-right").within(() => {
        cy.get(".table-item-title").eq(0).contains("Harry, a History:")
        cy.get(".table-item-title").eq(1).contains("Harry Potter: The Prequel")
      })
    })

    it("sorting by title ascending", function (){
      cy.contains("title A-Z").click()
      cy.wait(1000)
      cy.get(".table-left").within(() => {
        cy.get(".table-item-title").eq(0).contains("Harry Potter 20th Anniversary: Return to Hogwarts")
        cy.get(".table-item-title").eq(1).contains("Harry Potter and the Chamber of Secrets")
      })
      cy.get(".table-right").within(() => {
        cy.get(".table-item-title").eq(0).contains("Harry Potter and the Chamber of Secrets")
        cy.get(".table-item-title").eq(1).contains("Harry Potter and the Cursed Child")
      })
    })
  })
})
