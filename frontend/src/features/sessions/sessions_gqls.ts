import { gql } from "../../graphql";

export const USER_SESSIONS = gql(`
  query UserSessions ($params: PaginatedSessionsParams) {
    userSessions (params: $params) {
      id
      startTime
      endTime
      note
      userId
    }
    userTotalSessions (params: $params) {
      count
    }
  }
`);

export const ADMIN_USER_SESSIONS = gql(`
  query AdminSessions ($params: SessionsParams) {
    sessions (params: $params) {
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
    totalSessions (params: $params) {
      count
    }
  }
`);

export const PANEL_USER_SESSIONS = gql(`
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
`);

export const START_SESSION = gql(`
  mutation StartSession {
    startUserSession {
      id
      startTime
      endTime
      note
      userId
    }
  }
`);

export const END_SESSION = gql(`
  mutation EndSession($note: String!) {
    endUserSession(note: $note) {
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

export const SESSSIONS_BY_USER_ID = gql(`
  query SesssionsByUserId ($id: String!, $params: PaginatedSessionsParams!) {
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
`);

export const WORK_HOURS_REPORT = gql(`
  query WorkHoursReport($userId: String, $startDate: String!, $endDate: String!) {
    workHoursReport(userId: $userId, startDate: $startDate, endDate: $endDate) {
      userId
      workDate
      totalHours
      sessionsPerDay
    }
  }
`);
