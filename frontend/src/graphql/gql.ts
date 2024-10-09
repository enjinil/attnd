/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query UserAccounts {\n    accounts {\n      id\n      email\n      role\n      position\n      name\n      isActive\n    }\n  }\n": types.UserAccountsDocument,
    "\n  mutation DeleteAccount($input: String!) {\n    deleteAccount(input: $input) {\n      message\n    }\n  }\n": types.DeleteAccountDocument,
    "\n  mutation CreateUser($input: AccountInput!) {\n    createAccount(input: $input) {\n      id\n      name\n      email\n      role\n      position\n      isActive\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      token\n      email\n      role\n    }\n  }\n": types.LoginDocument,
    "\n  query HelloWorld {\n    helloWorld {\n      message\n    }\n  }\n": types.HelloWorldDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UserAccounts {\n    accounts {\n      id\n      email\n      role\n      position\n      name\n      isActive\n    }\n  }\n"): typeof import('./graphql').UserAccountsDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteAccount($input: String!) {\n    deleteAccount(input: $input) {\n      message\n    }\n  }\n"): typeof import('./graphql').DeleteAccountDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($input: AccountInput!) {\n    createAccount(input: $input) {\n      id\n      name\n      email\n      role\n      position\n      isActive\n    }\n  }\n"): typeof import('./graphql').CreateUserDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      token\n      email\n      role\n    }\n  }\n"): typeof import('./graphql').LoginDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query HelloWorld {\n    helloWorld {\n      message\n    }\n  }\n"): typeof import('./graphql').HelloWorldDocument;


export function gql(source: string) {
  return (documents as any)[source] ?? {};
}
