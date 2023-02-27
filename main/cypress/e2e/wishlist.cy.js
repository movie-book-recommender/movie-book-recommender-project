describe("Wishlist ", function () {
    beforeEach(function () {
      cy.visit("http://localhost:3000/movie");
    });

    it("can add movie to wishlist", function (){
        cy.wait(1000)
        cy.get(".movie-pic").first().click()
        cy.wait(1000)
        cy.get(".heart").click()
        cy.contains("Wishlist").click()
        cy.get(".heart").should("have.length", 1)
    })

})