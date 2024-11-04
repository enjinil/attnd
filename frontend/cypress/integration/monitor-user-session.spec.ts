import { displayTime } from "../../src/utils/date";

describe("Monitor user session", () => {
  beforeEach(() => {
    cy.resetDatabase();
  });

  it("admin see session added and updated when user start and end a session", () => {
    const userAccount = {
      email: "user@test.localhost",
      password: "password123456",
      role: "user",
    } as const;

    cy.createAccount(userAccount);

    cy.loginAs({
      email: "admin@test.localhost",
      password: "password123456",
      role: "admin",
    });

    cy.visit("/");

    cy.getAuthToken(userAccount).then((token) => {
      // Start user session
      cy.request({
        method: "POST",
        url: "http://127.0.0.1:4000/api/graphql",
        body: {
          query:
            "mutation StartSession { startUserSession { id startTime endTime note userId }}",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      cy.contains("Test Name (Test Position)").should("exist");
      cy.findByTestId("column-startTime").contains(displayTime(new Date()));

      cy.wait(1000);

      // End user session
      cy.request({
        method: "POST",
        url: "http://127.0.0.1:4000/api/graphql",
        body: {
          query:
            "mutation EndSession($note: String!) {  endUserSession(note: $note) {    id    startTime    endTime    note    userId  }}",
          variables: {
            note: "Completed test monitor session.",
          },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      cy.findByTestId("column-endTime").contains(displayTime(new Date()));
      cy.findByRole("link", { name: /show note/i }).click();
      cy.contains("Completed test monitor session.").should("exist");
    });
  });
});
