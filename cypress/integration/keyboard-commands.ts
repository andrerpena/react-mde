context("Keyboard commands", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4000");
  });
  it("bold", () => {
    cy.get(".mde-text")
      .type("{selectall}{backspace}")
      .type("nice")
      .type("{ctrl}b")
      .should("have.value", "**nice**");
  });
  it("italic", () => {
    cy.get(".mde-text")
      .type("{selectall}{backspace}")
      .type("nice")
      .type("{ctrl}i")
      .should("have.value", "*nice*");
  });
});
