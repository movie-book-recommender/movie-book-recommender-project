describe("Book ratings", function () {
    beforeEach(function () {
        cy.visit("http://localhost:3000/movie")
        cy.contains("Switch to books").click()
        cy.wait(1000)
        cy.get(".movie-pic").first().children("a").click()
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

    it("can adjust book rating", function () {
        cy.get(".react-stars")
        .within(() => {
            cy.get("[style='position: relative; overflow: hidden; cursor: pointer; display: block; float: left; color: gray; font-size: 40px;']")
            .should("have.length", 4)
            cy.get("[data-index='4']").click()
            cy.get("[style='position: relative; overflow: hidden; cursor: pointer; display: block; float: left; color: gray; font-size: 40px;']")
            .should("have.length", 0)
        })
    })

    it("adjusted rating in Ratings page updates on the book's page", function (){
        cy.get(".navbar").contains("Ratings").click()
        cy.wait(1000)
        cy.get(".react-stars")
        .within(() => {
            cy.get("[style='position: relative; overflow: hidden; cursor: pointer; display: block; float: left; color: gray; font-size: 40px;']")
            .should("have.length", 4)
            cy.get("[data-index='4']").click()
        })
        cy.get("img").click()
        cy.wait(1000)
        cy.get(".react-stars")
        .within(() => {
            cy.get("[style='position: relative; overflow: hidden; cursor: pointer; display: block; float: left; color: gray; font-size: 40px;']")
            .should("have.length", 0)
        })
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
