describe("Create session", () => {
  beforeEach(() => {
    cy.resetDatabase();
  });

  it("user can start and stop session", () => {
    const userAccount = {
      email: "user@test.localhost",
      password: "password123456",
      role: "user",
    } as const;

    cy.loginAs(userAccount);

    cy.visit("/");
    cy.location().should(({ pathname }) => {
      expect(pathname).to.equal("/sessions");
    });

    cy.findByRole("button", { name: /start session/i }).click();

    cy.wait(1000);

    cy.findByRole("button", { name: /stop session/i }).click();
    cy.findByLabelText(/prompt/i).type("Completed a new session.");
    cy.findByRole("button", { name: /ok/i }).click();
    cy.contains("Session ended!").should("exist");

    cy.findByRole("link", { name: /show note/i }).click();
    cy.contains("Completed a new session.").should("exist");
    cy.findByRole("button", { name: /close/i }).click();
  });
});
