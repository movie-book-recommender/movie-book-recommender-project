describe("BookCine's movie main page ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.wait(1000);
    cy.contains("Don't allow").click();
    cy.wait(1000);
  });

  it("home page shows relevant recommendations after rating", function () {
    cy.contains("The Lego Movie").click();
    cy.get(".react-stars").within(() => {
      cy.get("[data-index='0']").click();
    });
    cy.wait(1000);
    cy.visit("http://localhost:3000");

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

  it("home page shows relevant recommendations after rating", function () {
    cy.contains("The Lego Movie").click();
    cy.get(".react-stars").within(() => {
      cy.get("[data-index='0']").click();
    });
    cy.wait(1000);
    cy.get(".ui.basic.circular.fade.animated.button").eq(0).click();
    cy.wait(1000);
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