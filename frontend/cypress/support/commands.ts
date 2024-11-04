/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import "@testing-library/cypress/add-commands";

type Account = {
  email: string;
  password: string;
  role: "admin" | "user";
};

declare global {
  namespace Cypress {
    interface Chainable {
      resetDatabase(): void;
      createAccount(
        account: Account
      ): Cypress.Chainable<Cypress.Response<void>>;
      loginAs(account: Account): void;
      getAuthToken(credentials: {
        email: string;
        password: string;
      }): Chainable<string>;
    }
  }
}

Cypress.Commands.add("resetDatabase", () => {
  cy.request({
    method: "DELETE",
    url: "http://127.0.0.1:4000/test/reset-database",
  });
});

Cypress.Commands.add("createAccount", (account) => {
  cy.request("POST", "http://127.0.0.1:4000/test/create-account", account);
});

Cypress.Commands.add("loginAs", (account) => {
  cy.createAccount(account).then(() => {
    cy.request("POST", "http://127.0.0.1:4000/api/graphql", {
      query:
        "mutation Login($input: LoginInput!) { login(input: $input) { token email role position name }}",
      variables: {
        input: {
          email: account.email,
          password: account.password,
        },
      },
    }).then((res) => {
      window.localStorage.setItem(
        "AUTH_TOKEN",
        JSON.stringify(res.body.data.login.token)
      );
    });
  });
});

Cypress.Commands.add("getAuthToken", ({ email, password }) => {
  return cy
    .request({
      method: "POST",
      url: "http://127.0.0.1:4000/api/graphql",
      body: {
        query:
          "mutation Login($input: LoginInput!) { login(input: $input) { token email role position name }}",
        variables: {
          input: {
            email,
            password,
          },
        },
      },
      failOnStatusCode: false,
    })
    .then((response) => {
      return response.body.data.login.token;
    });
});
