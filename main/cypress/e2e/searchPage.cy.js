/* eslint-disable no-undef */
describe("Search Page ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.contains("Allow").click();
    cy.wait(1000);
    cy.get(".ui.massive.basic.circular.compact.fade.animated.button").click();
    cy.contains("Search").click();
  });

  it("shows search result matching the keyword", function () {
    cy.get("input").eq(1).type("pirate");
    cy.get("[data-testid='SearchIcon']").click();
    cy.wait(1000);
    cy.contains("Search result for 'pirate'");
    cy.contains("Pirates of Silicon Valley");
    cy.contains("Pirate Cinema");
  });

  it("shows no result for mismatching keyword", function () {
    cy.get("input").eq(1).type("asdasd");
    cy.get("[data-testid='SearchIcon']").click();
    cy.contains("No result for 'asdasd'");
  });

  it("hides previous search after new search", function () {
    cy.get("input").eq(1).type("pirate");
    cy.get("[data-testid='SearchIcon']").click();
    cy.contains("Pirates of Silicon Valley");
    cy.contains("Pirate Cinema");
    cy.get("input").eq(1).clear();
    cy.get("input").eq(1).type("harry potter");
    cy.get("[data-testid='SearchIcon']").click();
    cy.contains("Caesar Against the Pirates").should("not.exist");
    cy.contains("Pirate Cinema").should("not.exist");
  });

  it("show relevant result for search by actor", function () {
    cy.get(".MuiNativeSelect-select").select("actor");
    cy.get("input").eq(1).type("johnny depp");
    cy.get("[data-testid='SearchIcon']").click();
    cy.wait(1000);
    cy.contains("title A-Z").click();
    cy.wait(1000);
    cy.get(".table-left").within(() => {
      cy.get(".table-item-title").eq(0).contains("Arizona Dream");
    });
  });

  it("show relevant result for search by author", function () {
    cy.get(".MuiNativeSelect-select").select("author");
    cy.get("input").eq(1).type("jane austen");
    cy.get("[data-testid='SearchIcon']").click();
    cy.wait(1000);
    cy.contains("title A-Z").click();
    cy.wait(1000);
    cy.get(".table-right").within(() => {
      cy.get(".table-item-title").eq(0).contains("Emma");
    });
  });

  it("show relevant result for search by director", function () {
    cy.get(".MuiNativeSelect-select").select("director");
    cy.get("input").eq(1).type("tim burton");
    cy.get("[data-testid='SearchIcon']").click();
    cy.wait(1000);
    cy.contains("title A-Z").click();
    cy.wait(1000);
    cy.get(".table-left").within(() => {
      cy.get(".table-item-title").eq(0).contains("Alice in Wonderland");
    });
  });

  describe("opens the item page after", function () {
    beforeEach(function () {
      cy.get("input").eq(1).type("harry potter");
      cy.get("[data-testid='SearchIcon']").click();
    });

    it("movie picture is clicked", function () {
      cy.get(".table-left").find(".table-item-pic").first().click();
      cy.contains("Directors:");
    });

    it("book picture is clicked", function () {
      cy.get(".table-right").find(".table-item-pic").first().click();
      cy.contains("Authors:");
    });

    it("movie title is clicked", function () {
      cy.get(".table-left").find(".table-item-title").first().click();
      cy.contains("Directors:");
    });

    it("book title is clicked", function () {
      cy.get(".table-right").find(".table-item-title").first().click();
      cy.contains("Authors:");
    });
  });

  describe("shows items in correct order after", function () {
    beforeEach(function () {
      cy.get("input").eq(1).type("harry potter");
      cy.get("[data-testid='SearchIcon']").click();
      cy.wait(1000);
    });

    it("sorting by oldest first", function () {
      cy.contains("release oldest first").click();
      cy.wait(1000);
      cy.get(".table-left").within(() => {
        cy.get(".table-item-title")
          .eq(0)
          .contains("Harry Potter and the Philosopher's Stone");
        cy.get(".table-item-title")
          .eq(1)
          .contains("Harry Potter and the Chamber of Secrets");
      });
      cy.get(".table-right").within(() => {
        cy.get(".table-item-title")
          .eq(0)
          .contains("Harry Potter and the Sorcerer's Stone");
        cy.get(".table-item-title")
          .eq(1)
          .contains("Harry Potter and the Chamber of Secrets");
      });
    });

    it("sorting by newest first", function () {
      cy.contains("release newest first").click();
      cy.wait(1000);
      cy.get(".table-left").within(() => {
        cy.get(".table-item-title")
          .eq(0)
          .contains("Harry Potter and the Deathly Hallows: Part 1");
        cy.get(".table-item-title")
          .eq(1)
          .contains("Harry Potter and the Half-Blood Prince");
      });
      cy.get(".table-right").within(() => {
        cy.get(".table-item-title")
          .eq(0)
          .contains("Harry Potter and the Cursed Child");
        cy.get(".table-item-title")
          .eq(1)
          .contains("Harry Potter and the Methods of Rationality");
      });
    });

    it("sorting by title descending", function () {
      cy.contains("title Z-A").click();
      cy.wait(1000);
      cy.get(".table-left").within(() => {
        cy.get(".table-item-title")
          .eq(0)
          .contains("Harry Potter and the Prisoner of Azkaban");
        cy.get(".table-item-title")
          .eq(1)
          .contains("Harry Potter and the Philosopher's Stone");
      });
      cy.get(".table-right").within(() => {
        cy.get(".table-item-title").eq(0).contains("Harry, a History:");
        cy.get(".table-item-title").eq(1).contains("Harry Potter: The Prequel");
      });
    });

    it("sorting by title ascending", function () {
      cy.contains("title A-Z").click();
      cy.wait(1000);
      cy.get(".table-left").within(() => {
        cy.get(".table-item-title")
          .eq(0)
          .contains("Harry Potter and the Chamber of Secrets");
        cy.get(".table-item-title")
          .eq(1)
          .contains("Harry Potter and the Deathly Hallows: Part 1");
      });
      cy.get(".table-right").within(() => {
        cy.get(".table-item-title")
          .eq(0)
          .contains("Harry Potter and the Chamber of Secrets");
        cy.get(".table-item-title")
          .eq(1)
          .contains("Harry Potter and the Cursed Child");
      });
    });
  });
});
