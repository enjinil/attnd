import { gql } from "../../graphql";

export const LOGIN = gql(`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      email
      role
      position
      name
    }
  }
`);

export const LOGOUT = gql(`
  mutation Logout {
    logout {
      message
    }
  }
`);

export const ME = gql(`
  query Me{
    me {
      email
      role
      position
      name
    }
  }
`);
