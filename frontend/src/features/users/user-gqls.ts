import { gql } from "@/graphql";

export const ACCOUNT = gql(`
  query Account($id: String!) {
    account(id: $id) {
      id
      email
      role
      position
      name
      isActive
    }
  }  
`);

export const USER_ACCOUNTS = gql(`
  query UserAccounts($query: String) {
    accounts(query: $query) {
      id
      email
      role
      position
      name
      isActive
    }
  }
`);

export const DELETE_USER = gql(`
  mutation DeleteAccount($input: String!) {
    deleteAccount(input: $input) {
      message
    }
  }
`);

export const CREATE_ACCOUNT = gql(`
  mutation CreateUser($input: AccountInput!) {
    createAccount(input: $input) {
      id
      name
      email
      role
      position
      isActive
    }
  }
`);

export const UPDATE_ACCOUNT = gql(`
  mutation UpdateAccount($input: AccountInput!, $id: String!) {
    updateAccount(input: $input, id: $id) {
      id
      name
      email
      role
      position
      isActive
    }
  }
`);
