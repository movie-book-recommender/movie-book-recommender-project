/* eslint-disable no-undef */
describe("Itemlens' movie main page ", function () {
<<<<<<< HEAD
    beforeEach(function () {
      cy.visit("http://localhost:3000");
      cy.contains("Allow").click()
      cy.wait(1000)
    });
  
    it("home page has no recommendations at first", function () {
      cy.contains("Recommended movies for you");
      cy.contains("Please rate at least one movie and one book to receive personal recommendations.");
    });
  
    it("home page shows relevant recommendations after rating", function () {
      cy.contains("What About Love").click();
      cy.get(".react-stars")
      .within(() => {
        cy.get("[data-index='0']").click()
      });
      cy.wait(1000);
      cy.contains("Switch to books").click();
      cy.wait(1000);
      cy.contains("180 Seconds").click();
      cy.wait(1000);
      cy.get(".react-stars")
      .within(() => {
        cy.get("[data-index='0']").click()
      });
      cy.wait(1000);
      cy.get(".navbar").contains("ItemLens").click();
      cy.wait(1000);
      cy.contains("Update").click();
      cy.wait(10000);
      cy.contains("Company Man");

    });
=======
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.contains("Allow").click();
    cy.wait(1000);
>>>>>>> a42a7a92b1fab8d0ca7b1e523f6d0504f79877f9
  });

  it("home page has no recommendations at first", function () {
    cy.contains("Recommended movies for you");
    cy.contains(
      "Please rate at least one movie and one book to receive personal recommendations."
    );
  });

  it("home page shows relevant recommendations after rating", function () {
    cy.contains("What About Love").click();
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
    cy.get(".navbar").contains("ItemLens").click();
    cy.wait(10000);
    cy.contains("Company Man");
  });

  it("home page has no recommendations at first", function () {
    cy.contains("Recommended movies for you");
    cy.contains(
      "Please rate at least one movie and one book to receive personal recommendations."
    );
  });

  it("home page shows relevant recommendations after rating", function () {
    cy.contains("What About Love").click();
    cy.get(".react-stars").within(() => {
      cy.get("[data-index='0']").click();
    });
    cy.wait(1000);
    cy.contains("ItemLens").click();
    cy.wait(1000);
    cy.contains("180 Seconds").click();
    cy.wait(1000);
    cy.get(".react-stars").within(() => {
      cy.get("[data-index='0']").click();
    });
    cy.wait(1000);
    cy.get(".navbar").contains("ItemLens").click();
    cy.wait(10000);
    cy.contains("Company Man");
  });
});
