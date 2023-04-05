describe("Wishlist ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/");
    cy.contains("Don't allow").click();
    cy.wait(1000);
  });

  describe("for movies", function () {
    beforeEach(function () {
      cy.wait(1000);
      cy.get(".movie-pic").first().click();
      cy.wait(1000);
      cy.get(".heart").click();
    });

    it("can add movie to wishlist", function () {
      cy.contains("Wishlist").click();
      cy.get(".heart").should("have.length", 1);
    });

    it("can remove movie from wishlist in Wishlist page", function () {
      cy.contains("Wishlist").click();
      cy.get(".heart").should("have.length", 1);
      cy.get(".heart").click();
      cy.reload();
      cy.get(".heart").should("have.length", 0);
    });

    it("can remove movie from wishlist in movie's page", function () {
      cy.contains("Wishlist").click();
      cy.wait(1000);
      cy.get(".table-left").within(() => {
        cy.get(".heart").should("have.length", 1);
        cy.get("img").first().click();
      });
      cy.wait(1000);
      cy.get(".heart").click();
      cy.contains("Wishlist").click();
      cy.contains("No items on Wishlist!");
    });
  });

  describe("for books", function () {
    beforeEach(function () {
      cy.wait(1000);
      cy.get(".movie-pic").eq(11).children("a").click();
      cy.wait(1000);
      cy.get(".heart").click();
    });

    it("can add book to wishlist", function () {
      cy.contains("Wishlist").click();
      cy.get(".heart").should("have.length", 1);
    });

    it("can remove book from wishlist in Wishlist page", function () {
      cy.contains("Wishlist").click();
      cy.get(".heart").should("have.length", 1);
      cy.get(".heart").click();
      cy.reload();
      cy.get(".heart").should("have.length", 0);
    });

    it("can remove book from wishlist in book's page", function () {
      cy.contains("Wishlist").click();
      cy.get(".heart").should("have.length", 1);
      cy.get("img").first().click();
      cy.get(".heart").click();
      cy.contains("Wishlist").click();
      cy.get(".heart").should("have.length", 0);
    });
  });
});
