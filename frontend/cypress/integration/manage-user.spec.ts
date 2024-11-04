describe("Manage user", () => {
  beforeEach(() => {
    cy.resetDatabase();
  });

  it("admin can manage user", () => {
    cy.loginAs({
      email: "admin@test.localhost",
      password: "password123456",
      role: "admin",
    });

    cy.visit("/");

    cy.findByRole("link", { name: /users/i }).click();

    // Create user
    cy.findByRole("button", { name: /new user/i }).click();

    cy.findByLabelText(/name/i).type("New user");
    cy.findByLabelText(/position/i).type("E2E Tester");
    cy.findByLabelText(/email/i).type("user@test.localhost");
    cy.findByLabelText(/password/i).type("password123456");
    cy.findByRole("radio", { name: /user/i }).click();

    cy.findByRole("button", { name: /create user/i }).click();

    cy.contains("User created successfully!").should("exist");

    cy.location().should(({ pathname }) => {
      expect(pathname).to.equal("/users");
    });

    // Update user
    cy.contains("user@test.localhost")
      .parent("tr")
      .findByRole("link", { name: /edit/i })
      .click();

    cy.findByLabelText(/name/i).type(" updated");
    cy.findByLabelText(/position/i).type(" updated");
    cy.findByLabelText(/email/i).type("updated");
    cy.findByLabelText(/password/i).type("updatedpassword123456");
    cy.findByRole("radio", { name: /admin/i }).click();

    cy.findByRole("button", { name: /save changes/i }).click();

    cy.contains("User updated successfully!").should("exist");

    cy.findByRole("button", { name: /back/i }).click();

    cy.location().should(({ pathname }) => {
      expect(pathname).to.equal("/users");
    });

    // Delete user
    cy.contains("user@test.localhostupdated")
      .parent("tr")
      .findByRole("button", { name: /delete/i })
      .click();

    cy.findByRole("button", { name: /confirm/i }).click();

    cy.contains("User deleted successfully!").should("exist");
  });
});
