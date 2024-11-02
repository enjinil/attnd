describe("Authentication", () => {
  beforeEach(() => {
    cy.resetDatabase();
    cy.visit("/");
  });

  it("allows to login as admin", () => {
    const adminAccount = {
      email: "admin@test.localhost",
      password: "password123456",
      role: "admin",
    } as const;

    cy.createAccount(adminAccount);

    cy.visit("/login");

    cy.findByLabelText(/email/i).type(adminAccount.email);
    cy.findByLabelText(/password/i).type(adminAccount.password);

    cy.findByRole("button", { name: /login/i }).click();

    cy.location().should(({ pathname }) => {
      expect(pathname).to.equal("/admin");
    });
  });

  it("allows to login as user", () => {
    const userAccount = {
      email: "user@test.localhost",
      password: "password123456",
      role: "user",
    } as const;

    cy.createAccount(userAccount);

    cy.visit("/login");

    cy.findByLabelText(/email/i).type(userAccount.email);
    cy.findByLabelText(/password/i).type(userAccount.password);

    cy.findByRole("button", { name: /login/i }).click();

    cy.location().should(({ pathname }) => {
      expect(pathname).to.equal("/sessions");
    });
  });
});
