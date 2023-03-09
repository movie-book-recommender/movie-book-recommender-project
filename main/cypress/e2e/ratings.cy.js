describe("Ratings", function () {
    beforeEach(function () {
        cy.visit("http://localhost:3000/movie")
    })

    describe("for movies", function () {
        beforeEach(function () {
            cy.wait(1000)
            cy.get(".movie-pic").first().click()
            cy.wait(1000)
            cy.get(".react-stars")
            .within(() => {
                cy.get("[data-index='0']").click()
            })
        })

        it("can rate movie", function (){
            cy.get(".navbar").contains("Ratings").click()
            cy.contains("You have not rated anything yet!").should("not.exist")
        })

        it("can remove movie rating", function (){
            cy.get(".navbar").contains("Ratings").click()
            cy.contains("You have rated 1 movies.").should("exist")
            cy.get(".navbar").contains("ItemLens").click()
            cy.wait(1000)
            cy.get(".movie-pic").eq(1).click()
            cy.wait(1000)
            cy.get(".react-stars")
            .within(() => {
                cy.get("[data-index='2']").click()
            })
            cy.get(".navbar").contains("Ratings").click()
            cy.contains("You have rated 2 movies.").should("exist")
            cy.contains("Remove rating").first().click()
            cy.contains("You have rated 1 movies.").should("exist")
        })

        it("can remove all movie ratings", function (){
            cy.get(".navbar").contains("Ratings").click()
            cy.contains("You have rated 1 movies.").should("exist")
            cy.get(".navbar").contains("ItemLens").click()
            cy.wait(1000)
            cy.get(".movie-pic").eq(1).click()
            cy.wait(1000)
            cy.get(".react-stars")
            .within(() => {
                cy.get("[data-index='2']").click()
            })
            cy.get(".navbar").contains("Ratings").click()
            cy.contains("You have rated 2 movies.").should("exist")
            cy.contains("Remove all ratings").first().click()
            cy.contains("You have not rated anything yet!").should("exist")
        })
    })

    describe("for books", function () {
        beforeEach(function () {
            cy.contains("Switch to books").click()
            cy.wait(1000)
            cy.get(".movie-pic")
            .first()
            .children("a").click()
            cy.wait(1000)
            cy.get(".react-stars")
            .within(() => {
                cy.get("[data-index='0']").click()
            })
        })

        it("can rate book", function (){
            cy.get(".navbar").contains("Ratings").click()
            cy.contains("You have rated 1 books.").should("exist")
        })

        it("can remove book rating", function (){
            cy.get(".navbar").contains("Ratings").click()
            cy.contains("You have rated 1 books.").should("exist")
            cy.get(".navbar").contains("ItemLens").click()
            cy.wait(1000)
            cy.get(".movie-pic").eq(1).children("a").click()
            cy.wait(1000)
            cy.get(".react-stars")
            .within(() => {
                cy.get("[data-index='2']").click()
            })
            cy.get(".navbar").contains("Ratings").click()
            cy.contains("You have rated 2 books.").should("exist")
            cy.contains("Remove rating").first().click()
            cy.contains("You have rated 1 books.").should("exist")
        })

        it("can remove all book rating", function (){
            cy.get(".navbar").contains("Ratings").click()
            cy.contains("You have rated 1 books.").should("exist")
            cy.get(".navbar").contains("ItemLens").click()
            cy.wait(1000)
            cy.get(".movie-pic").eq(1).children("a").click()
            cy.wait(1000)
            cy.get(".react-stars")
            .within(() => {
                cy.get("[data-index='2']").click()
            })
            cy.get(".navbar").contains("Ratings").click()
            cy.contains("You have rated 2 books.").should("exist")
            cy.contains("Remove all rating").click()
            cy.contains("You have not rated anything yet!").should("exist")
            cy.contains("You have rated 2 books.").should("not.exist")
        })
    })
})
