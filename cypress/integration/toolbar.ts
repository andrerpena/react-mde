context("Toolbar", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4000");
  });
  it("bold", () => {
    cy.get(".mde-text")
      .type("{selectall}{backspace}")
      .type("react-mde");

    cy.get('button[data-name="bold"]').click();
    cy.get(".mde-text").should("have.value", "**react-mde**");
  });
  it("italic", () => {
    cy.get(".mde-text")
      .type("{selectall}{backspace}")
      .type("react-mde");

    cy.get('button[data-name="italic"]').click();
    cy.get(".mde-text").should("have.value", "*react-mde*");
  });
  it("strikethrough", () => {
    cy.get(".mde-text")
      .type("{selectall}{backspace}")
      .type("react-mde");

    cy.get('button[data-name="strikethrough"]').click();
    cy.get(".mde-text").should("have.value", "~~react-mde~~");
  });
  it("link", () => {
    cy.get(".mde-text")
      .type("{selectall}{backspace}")
      .type("react-mde");

    cy.get('button[data-name="link"]').click();
    cy.get(".mde-text").should("have.value", "[react-mde](url)");
  });
  it("quote", () => {
    cy.get(".mde-text")
      .type("{selectall}{backspace}")
      .type("react-mde");

    cy.get('button[data-name="quote"]').click();
    cy.get(".mde-text").should("have.value", "> react-mde");
  });
  it("image", () => {
    cy.get(".mde-text")
      .type("{selectall}{backspace}")
      .type("react-mde");

    cy.get('button[data-name="image"]').click();
    cy.get(".mde-text").should("have.value", "![](react-mde)");
  });
});
