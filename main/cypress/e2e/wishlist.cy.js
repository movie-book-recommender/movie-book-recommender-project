describe("Wishlist ", function () {
    beforeEach(function () {
      cy.visit("http://localhost:3000/movie");
    });

    describe("for movies", function () {
        beforeEach(function () {
          cy.wait(1000)
          cy.get(".movie-pic").first().click()
          cy.wait(1000)
          cy.get(".heart").click()
        })

        it("can add movie to wishlist", function (){
            cy.contains("Wishlist").click()
            cy.get(".heart").should("have.length", 1)
        })

        it("can remove movie from wishlist in Wishlist page", function (){
          cy.contains("Wishlist").click()
          cy.get(".heart").should("have.length", 1)
          cy.get(".heart").click()
          cy.reload()
          cy.get(".heart").should("have.length", 0)
        })

        it("can remove movie from wishlist in movie's page", function (){
          cy.contains("Wishlist").click()
          cy.get(".heart").should("have.length", 1)
          cy.get("img").first().click()
          cy.get(".heart").click()
          cy.contains("Wishlist").click()
          cy.get(".heart").should("have.length", 0)
        })
    })

    describe("for books", function () {
        beforeEach(function () {
          cy.wait(1000)
          cy.contains("Switch to books").click()
          cy.wait(1000)
          cy.get(".movie-pic").first().children("a").click()
          cy.wait(1000)
          cy.get(".heart").click()
        })

        it("can add book to wishlist", function (){
            cy.contains("Wishlist").click()
            cy.get(".heart").should("have.length", 1)
        })

        it("can remove book from wishlist in Wishlist page", function (){
          cy.contains("Wishlist").click()
          cy.get(".heart").should("have.length", 1)
          cy.get(".heart").click()
          cy.reload()
          cy.get(".heart").should("have.length", 0)
        })

        it("can remove book from wishlist in book's page", function (){
          cy.contains("Wishlist").click()
          cy.get(".heart").should("have.length", 1)
          cy.get("img").first().click()
          cy.get(".heart").click()
          cy.contains("Wishlist").click()
          cy.get(".heart").should("have.length", 0)
        })
    })
})