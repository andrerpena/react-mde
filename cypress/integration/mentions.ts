const DELAY = 500;

context("Mentions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4000");
  });
  it("'@ + Enter' should select the first suggestion", () => {
    cy.get(".mde-text")
      .type("{selectall}{backspace}")
      .type("@")
      .wait(DELAY)
      .type("{enter}")
      .should("have.value", "@andre ");
  });
  it("'@ + Arrow down + Enter' should select the first suggestion", () => {
    cy.get(".mde-text")
      .type("{selectall}{backspace}")
      .type("@")
      .wait(DELAY)
      .type("{downArrow}")
      .type("{enter}")
      .should("have.value", "@angela ");
  });
  it("'@ + 4x Arrow down + Enter' should cycle and select the first suggestion", () => {
    cy.get(".mde-text")
      .type("{selectall}{backspace}")
      .type("@")
      .wait(DELAY)
      .type("{downArrow}{downArrow}{downArrow}{downArrow}")
      .type("{enter}")
      .should("have.value", "@andre ");
  });
});
