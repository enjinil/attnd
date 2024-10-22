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

export type Count = {
  __typename?: 'Count';
  count: Scalars['Int']['output'];
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

export type PaginatedSessionsParams = {
  page: Scalars['Int']['input'];
  startDate: Scalars['String']['input'];
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  /** Create new user account */
  createAccount?: Maybe<Account>;
  /** Delete user account */
  deleteAccount?: Maybe<DeleteSuccessResponse>;
  /** End active user session */
  endUserSession?: Maybe<Session>;
  /** Login as user with email and password */
  login: UserToken;
  /** Logout user */
  logout?: Maybe<LogoutResponse>;
  /** Create user session or return active session */
  startUserSession: Session;
  /** Update new user account */
  updateAccount?: Maybe<Account>;
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


export type RootMutationTypeUpdateAccountArgs = {
  id: Scalars['String']['input'];
  input: AccountInput;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  account: Account;
  accounts?: Maybe<Array<Account>>;
  /** Hello world! */
  helloWorld?: Maybe<HelloWorld>;
  me: Account;
  sessions?: Maybe<Array<SessionWithUser>>;
  sessionsByUserId?: Maybe<Array<Session>>;
  totalSessions: Count;
  totalSessionsByUserId: Count;
  /** Get active user session */
  userActiveSession?: Maybe<Session>;
  userSessions?: Maybe<Array<Session>>;
  userTodaySessions?: Maybe<Array<Maybe<Session>>>;
  userTotalSessions: Count;
  workHoursReport: Array<Maybe<WorkHoursSummary>>;
};


export type RootQueryTypeAccountArgs = {
  id: Scalars['String']['input'];
};


export type RootQueryTypeAccountsArgs = {
  query?: InputMaybe<Scalars['String']['input']>;
};


export type RootQueryTypeSessionsArgs = {
  params?: InputMaybe<SessionsParams>;
};


export type RootQueryTypeSessionsByUserIdArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  params?: InputMaybe<PaginatedSessionsParams>;
};


export type RootQueryTypeTotalSessionsArgs = {
  params?: InputMaybe<SessionsParams>;
};


export type RootQueryTypeTotalSessionsByUserIdArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  params?: InputMaybe<PaginatedSessionsParams>;
};


export type RootQueryTypeUserSessionsArgs = {
  params?: InputMaybe<PaginatedSessionsParams>;
};


export type RootQueryTypeUserTotalSessionsArgs = {
  params?: InputMaybe<PaginatedSessionsParams>;
};


export type RootQueryTypeWorkHoursReportArgs = {
  endDate: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type RootSubscriptionType = {
  __typename?: 'RootSubscriptionType';
  updatedSessions?: Maybe<Session>;
};


export type RootSubscriptionTypeUpdatedSessionsArgs = {
  token: Scalars['String']['input'];
};

export type Session = {
  __typename?: 'Session';
  endTime?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  startTime: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type SessionUser = {
  __typename?: 'SessionUser';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  position: Scalars['String']['output'];
};

export type SessionWithUser = {
  __typename?: 'SessionWithUser';
  endTime?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  startTime: Scalars['String']['output'];
  user: SessionUser;
  userId: Scalars['String']['output'];
};

export type SessionsParams = {
  startDate: Scalars['String']['input'];
};

export type UserToken = {
  __typename?: 'UserToken';
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  position: Scalars['String']['output'];
  role: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type WorkHoursSummary = {
  __typename?: 'WorkHoursSummary';
  sessionsPerDay: Scalars['Int']['output'];
  totalHours: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  workDate: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'RootMutationType', login: { __typename?: 'UserToken', token: string, email: string, role: string, position: string, name: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'RootMutationType', logout?: { __typename?: 'LogoutResponse', message?: string | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'RootQueryType', me: { __typename?: 'Account', email: string, role: string, position: string, name: string } };

export type UserSessionsQueryVariables = Exact<{
  params?: InputMaybe<PaginatedSessionsParams>;
}>;


export type UserSessionsQuery = { __typename?: 'RootQueryType', userSessions?: Array<{ __typename?: 'Session', id: string, startTime: string, endTime?: string | null, note?: string | null, userId: string }> | null, userTotalSessions: { __typename?: 'Count', count: number } };

export type AdminSessionsQueryVariables = Exact<{
  params?: InputMaybe<SessionsParams>;
}>;


export type AdminSessionsQuery = { __typename?: 'RootQueryType', sessions?: Array<{ __typename?: 'SessionWithUser', id: string, startTime: string, endTime?: string | null, note?: string | null, userId: string, user: { __typename?: 'SessionUser', id: string, email: string, name: string, position: string } }> | null, totalSessions: { __typename?: 'Count', count: number } };

export type UserTodaySessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserTodaySessionsQuery = { __typename?: 'RootQueryType', userTodaySessions?: Array<{ __typename?: 'Session', id: string, startTime: string, endTime?: string | null, note?: string | null, userId: string } | null> | null, userActiveSession?: { __typename?: 'Session', id: string, startTime: string, endTime?: string | null, note?: string | null, userId: string } | null };

export type StartSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type StartSessionMutation = { __typename?: 'RootMutationType', startUserSession: { __typename?: 'Session', id: string, startTime: string, endTime?: string | null, note?: string | null, userId: string } };

export type EndSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type EndSessionMutation = { __typename?: 'RootMutationType', endUserSession?: { __typename?: 'Session', id: string, startTime: string, endTime?: string | null, note?: string | null, userId: string } | null };

export type UpdatedSessionsSubscriptionSubscriptionVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type UpdatedSessionsSubscriptionSubscription = { __typename?: 'RootSubscriptionType', updatedSessions?: { __typename?: 'Session', id: string, startTime: string, endTime?: string | null, userId: string } | null };

export type SesssionsByUserIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
  params: PaginatedSessionsParams;
}>;


export type SesssionsByUserIdQuery = { __typename?: 'RootQueryType', account: { __typename?: 'Account', id: string, name: string }, sessionsByUserId?: Array<{ __typename?: 'Session', id: string, startTime: string, endTime?: string | null, note?: string | null, userId: string }> | null, totalSessionsByUserId: { __typename?: 'Count', count: number } };

export type WorkHoursReportQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
  startDate: Scalars['String']['input'];
  endDate: Scalars['String']['input'];
}>;


export type WorkHoursReportQuery = { __typename?: 'RootQueryType', workHoursReport: Array<{ __typename?: 'WorkHoursSummary', userId: string, workDate: string, totalHours: string, sessionsPerDay: number } | null> };

export type AccountQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AccountQuery = { __typename?: 'RootQueryType', account: { __typename?: 'Account', id: string, email: string, role: string, position: string, name: string, isActive: boolean } };

export type UserAccountsQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserAccountsQuery = { __typename?: 'RootQueryType', accounts?: Array<{ __typename?: 'Account', id: string, email: string, role: string, position: string, name: string, isActive: boolean }> | null };

export type DeleteAccountMutationVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type DeleteAccountMutation = { __typename?: 'RootMutationType', deleteAccount?: { __typename?: 'DeleteSuccessResponse', message?: string | null } | null };

export type CreateUserMutationVariables = Exact<{
  input: AccountInput;
}>;


export type CreateUserMutation = { __typename?: 'RootMutationType', createAccount?: { __typename?: 'Account', id: string, name: string, email: string, role: string, position: string, isActive: boolean } | null };

export type UpdateAccountMutationVariables = Exact<{
  input: AccountInput;
  id: Scalars['String']['input'];
}>;


export type UpdateAccountMutation = { __typename?: 'RootMutationType', updateAccount?: { __typename?: 'Account', id: string, name: string, email: string, role: string, position: string, isActive: boolean } | null };

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
    role
    position
    name
  }
}
    `) as unknown as TypedDocumentString<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = new TypedDocumentString(`
    mutation Logout {
  logout {
    message
  }
}
    `) as unknown as TypedDocumentString<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = new TypedDocumentString(`
    query Me {
  me {
    email
    role
    position
    name
  }
}
    `) as unknown as TypedDocumentString<MeQuery, MeQueryVariables>;
export const UserSessionsDocument = new TypedDocumentString(`
    query UserSessions($params: PaginatedSessionsParams) {
  userSessions(params: $params) {
    id
    startTime
    endTime
    note
    userId
  }
  userTotalSessions(params: $params) {
    count
  }
}
    `) as unknown as TypedDocumentString<UserSessionsQuery, UserSessionsQueryVariables>;
export const AdminSessionsDocument = new TypedDocumentString(`
    query AdminSessions($params: SessionsParams) {
  sessions(params: $params) {
    id
    startTime
    endTime
    note
    userId
    user {
      id
      email
      name
      position
    }
  }
  totalSessions(params: $params) {
    count
  }
}
    `) as unknown as TypedDocumentString<AdminSessionsQuery, AdminSessionsQueryVariables>;
export const UserTodaySessionsDocument = new TypedDocumentString(`
    query UserTodaySessions {
  userTodaySessions {
    id
    startTime
    endTime
    note
    userId
  }
  userActiveSession {
    id
    startTime
    endTime
    note
    userId
  }
}
    `) as unknown as TypedDocumentString<UserTodaySessionsQuery, UserTodaySessionsQueryVariables>;
export const StartSessionDocument = new TypedDocumentString(`
    mutation StartSession {
  startUserSession {
    id
    startTime
    endTime
    note
    userId
  }
}
    `) as unknown as TypedDocumentString<StartSessionMutation, StartSessionMutationVariables>;
export const EndSessionDocument = new TypedDocumentString(`
    mutation EndSession {
  endUserSession {
    id
    startTime
    endTime
    note
    userId
  }
}
    `) as unknown as TypedDocumentString<EndSessionMutation, EndSessionMutationVariables>;
export const UpdatedSessionsSubscriptionDocument = new TypedDocumentString(`
    subscription UpdatedSessionsSubscription($token: String!) {
  updatedSessions(token: $token) {
    id
    startTime
    endTime
    userId
  }
}
    `) as unknown as TypedDocumentString<UpdatedSessionsSubscriptionSubscription, UpdatedSessionsSubscriptionSubscriptionVariables>;
export const SesssionsByUserIdDocument = new TypedDocumentString(`
    query SesssionsByUserId($id: String!, $params: PaginatedSessionsParams!) {
  account(id: $id) {
    id
    name
  }
  sessionsByUserId(id: $id, params: $params) {
    id
    startTime
    endTime
    note
    userId
  }
  totalSessionsByUserId(id: $id, params: $params) {
    count
  }
}
    `) as unknown as TypedDocumentString<SesssionsByUserIdQuery, SesssionsByUserIdQueryVariables>;
export const WorkHoursReportDocument = new TypedDocumentString(`
    query WorkHoursReport($userId: String, $startDate: String!, $endDate: String!) {
  workHoursReport(userId: $userId, startDate: $startDate, endDate: $endDate) {
    userId
    workDate
    totalHours
    sessionsPerDay
  }
}
    `) as unknown as TypedDocumentString<WorkHoursReportQuery, WorkHoursReportQueryVariables>;
export const AccountDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<AccountQuery, AccountQueryVariables>;
export const UserAccountsDocument = new TypedDocumentString(`
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
export const UpdateAccountDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<UpdateAccountMutation, UpdateAccountMutationVariables>;