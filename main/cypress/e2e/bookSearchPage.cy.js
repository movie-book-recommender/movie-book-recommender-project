describe("Books Search Page ", function () {
    beforeEach(function () {
      cy.visit("http://localhost:3000/movies")
      cy.contains("Switch to books").click()
      cy.contains("Search").click()
    })

    it("can be opened", function () {
        cy.contains("Search books");
      });
      
      it("shows search result matching the keyword", function () {
        cy.get("input").type("rincewind");
        cy.get("[data-testid='SearchIcon']").click()
        cy.contains("Eric (Discworld, #9; Rincewind #4)");
      });
    
    it("hides previous search after new search", function () {
        cy.get("input").type("rincewind");
        cy.get("[data-testid='SearchIcon']").click()
        cy.contains("Eric (Discworld, #9; Rincewind #4)");
        cy.get("input").clear();
        cy.get("input").type("harry potter");
        cy.get("[data-testid='SearchIcon']").click()
        cy.contains("Eric (Discworld, #9; Rincewind #4)").should("not.exist");
    });

    it("opens the book page when book picture is clicked", function () {
        cy.get("input").type("harry potter");
        cy.get("[data-testid='SearchIcon']").click()
        cy.get(".table-item-pic").eq(0).click()
        cy.contains("Your rating:")
    })

    it("opens the book page when book title is clicked", function () {
        cy.get("input").type("harry potter");
        cy.get("[data-testid='SearchIcon']").click()
        cy.get(".table-item-title").eq(0).click()
        cy.contains("Your rating:")
    })

    describe("shows books in correct order after", function(){
    beforeEach(function () {
        cy.get("input").type("harry potter");
        cy.get("[data-testid='SearchIcon']").click()
    })

    it("sorting by title descending", function (){
        cy.wait(1000)
        cy.contains("Harry Potter Boxset")
        cy.contains("title Z-A").click()
        cy.wait(1000)
        cy.get(".table-item").eq(0).contains("Harry, a History")
        cy.get(".table-item").eq(1).contains("Harry Potter: The Prequel")
    })

    it("sorting by title ascending", function (){
        cy.wait(1000)
        cy.contains("Harry Potter Boxset")
        cy.contains("title A-Z").click()
        cy.wait(1000)
        cy.get(".table-item").eq(0).contains("Harry Potter and the Chamber of Secrets")
        cy.get(".table-item").eq(1).contains("Harry Potter and the Cursed Child - Parts One and Two")
    })
    })
})