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
  /** Login as user with email and password */
  login: UserToken;
  /** Logout user */
  logout?: Maybe<LogoutResponse>;
};


export type RootMutationTypeLoginArgs = {
  input: LoginInput;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  /** Hello world! */
  helloWorld?: Maybe<HelloWorld>;
};

export type UserToken = {
  __typename?: 'UserToken';
  email: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'RootMutationType', login: { __typename?: 'UserToken', token: string, email: string } };

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

export const LoginDocument = new TypedDocumentString(`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    email
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