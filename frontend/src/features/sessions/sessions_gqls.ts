import { gql } from "../../graphql";

export const USER_SESSIONS = gql(`
  query UserSessions ($params: SessionsParams) {
    sessions (params: $params) {
      id
      startTime
      endTime
      note
      userId
    }
    totalSessions (params: $params) {
      count
    }
  }
`);

export const ADMIN_USER_SESSIONS = gql(`
  query AdminUserSessions ($params: UserSessionsParams) {
    userSessions (params: $params) {
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
    totalUserSessions (params: $params) {
      count
    }
  }
`);

export const PANEL_USER_SESSIONS = gql(`
  query UserTodaySessions {
    todaySessions {
      id
      startTime
      endTime
      note
      userId
    }
    activeSession {
      id
      startTime
      endTime
      note
      userId
    }
  }
`);

export const START_SESSION = gql(`
  mutation StartSession {
    startSession {
      id
      startTime
      endTime
      note
      userId
    }
  }
`);

export const END_SESSION = gql(`
  mutation EndSession {
    endSession {
      id
      startTime
      endTime
      note
      userId
    }
  }
`);

export const UPDATED_SESSIONS_SUBS = gql(`
  subscription UpdatedSessionsSubscription ($token: String!) {
    updatedSessions(token: $token) {
      id
      startTime
      endTime
      userId
    }
  }
`);
