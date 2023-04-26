/* eslint-disable no-undef */
describe("BookCine's movie main page ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.wait(1000);
    cy.contains("Allow").click();
    cy.wait(1000);
  });

  it("home page has no recommendations at first", function () {
    cy.contains(
      "Please rate at least one movie and one book to receive personal recommendations."
    );
  });

  it("home page shows relevant recommendations after rating", function () {
    cy.get("input").type("lego movie");
    cy.contains("The Lego Movie").click();
    cy.get(".react-stars").within(() => {
      cy.get("[data-index='0']").click();
    });
    cy.get(".ui.basic.circular.fade.animated.button").eq(0).click();
    cy.get("input").click();
    cy.get(".ui.toggle.button").eq(0).click();
    cy.get("input").type("180");
    cy.contains("180 Seconds").click();
    cy.wait(1000);
    cy.get(".react-stars").within(() => {
      cy.get("[data-index='0']").click();
    });
    cy.wait(1000);
    cy.get(".ui.basic.circular.fade.animated.button").eq(0).click();
    cy.wait(1000);
    cy.contains("Update").click();
    cy.wait(10000);
    cy.contains("Down from the Mountain");
  });
});
