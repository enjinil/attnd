/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Account = {
  __typename?: 'Account';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  position: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type AccountInput = {
  email: Scalars['String']['input'];
  isActive: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  position: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type DeleteSuccessResponse = {
  __typename?: 'DeleteSuccessResponse';
  message?: Maybe<Scalars['String']['output']>;
};

export type HelloWorld = {
  __typename?: 'HelloWorld';
  message?: Maybe<Scalars['String']['output']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  message?: Maybe<Scalars['String']['output']>;
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  /** Create new user account */
  createAccount?: Maybe<Account>;
  /** Delete user account */
  deleteAccount?: Maybe<DeleteSuccessResponse>;
  /** Login as user with email and password */
  login: UserToken;
  /** Logout user */
  logout?: Maybe<LogoutResponse>;
};


export type RootMutationTypeCreateAccountArgs = {
  input: AccountInput;
};


export type RootMutationTypeDeleteAccountArgs = {
  input: Scalars['String']['input'];
};


export type RootMutationTypeLoginArgs = {
  input: LoginInput;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  accounts?: Maybe<Array<Account>>;
  /** Hello world! */
  helloWorld?: Maybe<HelloWorld>;
};

export type UserToken = {
  __typename?: 'UserToken';
  email: Scalars['String']['output'];
  role: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type UserAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserAccountsQuery = { __typename?: 'RootQueryType', accounts?: Array<{ __typename?: 'Account', id: string, email: string, role: string, position: string, name: string, isActive: boolean }> | null };

export type DeleteAccountMutationVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type DeleteAccountMutation = { __typename?: 'RootMutationType', deleteAccount?: { __typename?: 'DeleteSuccessResponse', message?: string | null } | null };

export type CreateUserMutationVariables = Exact<{
  input: AccountInput;
}>;


export type CreateUserMutation = { __typename?: 'RootMutationType', createAccount?: { __typename?: 'Account', id: string, name: string, email: string, role: string, position: string, isActive: boolean } | null };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'RootMutationType', login: { __typename?: 'UserToken', token: string, email: string, role: string } };

export type HelloWorldQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloWorldQuery = { __typename?: 'RootQueryType', helloWorld?: { __typename?: 'HelloWorld', message?: string | null } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const UserAccountsDocument = new TypedDocumentString(`
    query UserAccounts {
  accounts {
    id
    email
    role
    position
    name
    isActive
  }
}
    `) as unknown as TypedDocumentString<UserAccountsQuery, UserAccountsQueryVariables>;
export const DeleteAccountDocument = new TypedDocumentString(`
    mutation DeleteAccount($input: String!) {
  deleteAccount(input: $input) {
    message
  }
}
    `) as unknown as TypedDocumentString<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const CreateUserDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = new TypedDocumentString(`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    email
    role
  }
}
    `) as unknown as TypedDocumentString<LoginMutation, LoginMutationVariables>;
export const HelloWorldDocument = new TypedDocumentString(`
    query HelloWorld {
  helloWorld {
    message
  }
}
    `) as unknown as TypedDocumentString<HelloWorldQuery, HelloWorldQueryVariables>;