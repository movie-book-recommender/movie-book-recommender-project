/* eslint-disable no-undef */
describe("BookCine navbar ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/");
    cy.wait(1000);
    cy.contains("Allow").click();
  });

  describe("hidden menu", function () {
    beforeEach(function() {
      cy.get(".ui.massive.basic.circular.compact.fade.animated.button").click();
    })

    it("wishlist can be opened", function() {
      cy.contains("Wishlist").click();
      cy.contains("No items on Wishlist!");
    })

    it("raitings can be opened", function() {
      cy.contains("Ratings").click();
      cy.contains("You have not rated any books yet!");
    })

    it("search can be opened", function () {  
      cy.contains("Search").click();
      cy.contains("Search movies and books");
    })

    it("about can be opened", function () {
      cy.contains("About").click();
      cy.contains("About BookCine");
    });
  })

  it("shows correct results when typing in search bar for books", function () {
    cy.get("input").click();
    cy.get(".ui.toggle.button").eq(0).click();
    cy.get("input").type("rincewind");
    cy.contains("Eric (Discworld, #9; Rincewind #4)");
  });

  it("hides previous search results after clearing search input for books", function () {
    cy.get("input").click();
    cy.get(".ui.toggle.button").eq(0).click();
    cy.get("input").type("rincewind");
    cy.contains("Eric (Discworld, #9; Rincewind #4)");
    cy.get("input").clear();
    cy.contains("Eric (Discworld, #9; Rincewind #4)").should("not.exist");
  });

  it("shows results for quick search for movies", function () {
    cy.get("input").type("pirates");
    cy.contains("Pirates of Silicon Valley");
  });

  // test if you can clear search field and previously searched movies are hiden
  it("hides previous search result after clearing search input for movies", function () {
    cy.get("input").type("pirates");
    cy.contains("Pirates of Silicon Valley");
    cy.get("input").clear();
    cy.contains("Pirates of Silicon Valley").should("not.exist");
  });

  it("link to movie works in search", function () {
    cy.get("input").type("pirates");
    cy.contains("Pirates of Silicon Valley").click();
    cy.wait(1000)
    cy.contains("Your rating:");
    cy.contains("Similar movies");
    cy.contains("The Hoax");
    cy.contains("Similar books");
    cy.contains("The Innovators");
  });

  it("link to book works in search", function () {
    cy.get("input").click();
    cy.get(".ui.toggle.button").eq(0).click();
    cy.get("input").type("rincewind");
    cy.contains("Eric (Discworld, #9; Rincewind #4)").click();
    cy.wait(1000)
    cy.contains("Your rating:");
    cy.contains("Other books from author")
    cy.contains("Dodger")
    cy.contains("Similar movies");
    cy.contains("The Princess Bride");
    cy.contains("Similar books");
    cy.contains("The Light Fantastic");
  });
});
