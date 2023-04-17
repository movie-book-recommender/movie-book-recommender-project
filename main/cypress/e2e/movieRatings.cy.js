/* eslint-disable no-undef */
describe("Movie ratings", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.wait(1000);
    cy.contains("Allow").click();
    cy.wait(1000);
    cy.get(".movie-pic").first().click();
    cy.wait(1000);
    cy.get(".react-stars").within(() => {
      cy.get("[data-index='0']").click();
    });
  });

  it("can rate movie", function () {
    cy.get(".ui.massive.basic.circular.compact.fade.animated.button").click();
    cy.contains("Ratings").click();
    cy.contains("You have not rated any movies yet!").should("not.exist");
  });

  it("can adjust movie rating", function () {
    cy.get(".react-stars").within(() => {
      cy.get(
        "[style='position: relative; overflow: hidden; cursor: pointer; display: block; float: left; color: gray; font-size: 40px;']"
      ).should("have.length", 4);
      cy.get("[data-index='4']").click();
      cy.get(
        "[style='position: relative; overflow: hidden; cursor: pointer; display: block; float: left; color: gray; font-size: 40px;']"
      ).should("have.length", 0);
    });
  });

  it("adjusted rating in Ratings page updates on the movie's page", function () {
    cy.get(".ui.massive.basic.circular.compact.fade.animated.button").click();
    cy.contains("Ratings").click();
    cy.wait(1000);
    cy.get(".react-stars").within(() => {
      cy.get(
        "[style='position: relative; overflow: hidden; cursor: pointer; display: block; float: left; color: gray; font-size: 40px;']"
      ).should("have.length", 4);
      cy.get("[data-index='4']").click();
    });
    cy.get("img").eq(1).click();
    cy.wait(1000);
    cy.get(".react-stars").within(() => {
      cy.get(
        "[style='position: relative; overflow: hidden; cursor: pointer; display: block; float: left; color: gray; font-size: 40px;']"
      ).should("have.length", 0);
    });
  });

  it("can remove movie rating", function () {
    cy.get(".ui.massive.basic.circular.compact.fade.animated.button").click();
    cy.contains("Ratings").click();
    cy.contains("You have rated 1 movies.").should("exist");
    cy.get(".ui.basic.circular.fade.animated.button").eq(0).click();
    cy.wait(1000);
    cy.get(".movie-pic").eq(1).click();
    cy.wait(1000);
    cy.get(".react-stars").within(() => {
      cy.get("[data-index='2']").click();
    });
    cy.get(".ui.massive.basic.circular.compact.fade.animated.button").click();
    cy.contains("Ratings").click();
    cy.contains("You have rated 2 movies.").should("exist");
    cy.contains("Remove rating").first().click();
    cy.contains("You have rated 1 movies.").should("exist");
  });

  it("can remove all movie ratings", function () {
    cy.get(".ui.massive.basic.circular.compact.fade.animated.button").click();
    cy.contains("Ratings").click();
    cy.contains("You have rated 1 movies.").should("exist");
    cy.get(".ui.basic.circular.fade.animated.button").eq(0).click();
    cy.wait(1000);
    cy.get(".movie-pic").eq(1).click();
    cy.wait(1000);
    cy.get(".react-stars").within(() => {
      cy.get("[data-index='2']").click();
    });
    cy.get(".ui.massive.basic.circular.compact.fade.animated.button").click();
    cy.contains("Ratings").click();
    cy.contains("You have rated 2 movies.").should("exist");
    cy.contains("Remove all movie ratings").first().click();
    cy.contains("You have not rated any movies yet!").should("exist");
  });
});
