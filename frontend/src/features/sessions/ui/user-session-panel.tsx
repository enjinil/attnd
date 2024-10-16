import { useMutation, useQuery } from "react-query";
import { Button } from "../../../components/ui/button";
import { gql } from "../../../graphql";
import { useUser } from "../../../hooks/store";
import { gqlRequest } from "../../../lib/graphql-client";
import { FormattedTime } from "../../../components/ui/date";
import { ElapsedTime } from "../../../components/ui/date/elapsed-time";
import { queryClient } from "../../../lib/react-query";
import { SessionsSummary } from "./sessions-summary";
import { Session } from "../../../graphql/graphql";

const USER_SESSIONS = gql(`
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

const START_SESSION = gql(`
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

const END_SESSION = gql(`
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

const UserSessionPanel = () => {
  const user = useUser();
  const { data, isSuccess } =
    useQuery({
      queryFn: () => gqlRequest(USER_SESSIONS),
      queryKey: ["userTodaySessions"],
    });

  const startSessionMutation = useMutation({
    mutationFn: () => gqlRequest(START_SESSION),
    onSuccess: () => {
      queryClient.invalidateQueries(["userTodaySessions"]);
    },
  });

  const endSessionMutation = useMutation({
    mutationFn: () => gqlRequest(END_SESSION),
    onSuccess: () => {
      queryClient.invalidateQueries(["userTodaySessions"]);
      queryClient.invalidateQueries(["userSessions"]);
    },
  });

  const noActiveSession =
    isSuccess && data.data.activeSession == null;

  return (
    <>
      <div className="pb-4 mb-6">
        <h2 className="text-2xl font-bold leading-2 mb-2">
          Hello {user?.name},
        </h2>

        {noActiveSession ? (
          <>
            <p className="text-lg font-bold mb-6">
              Are you ready to start your work session today?
            </p>
            <Button
              onClick={() => startSessionMutation.mutate()}
              isLoading={startSessionMutation.isLoading}
            >
              <span className="mr-2">🚀</span> Start Session
            </Button>
          </>
        ) : (
          <>
            <p className="text-lg font-bold mb-6">
              <span>You have been active for </span>
              <ElapsedTime
                date={data?.data.activeSession?.startTime}
              />
              <span> from </span>
              <FormattedTime
                date={data?.data.activeSession?.startTime}
              />
            </p>
            <Button
              onClick={() => endSessionMutation.mutate()}
              isLoading={endSessionMutation.isLoading}
              variant="danger"
            >
              Stop Session
            </Button>
          </>
        )}
      </div>
      {isSuccess && <SessionsSummary sessions={data.data.todaySessions as Session[]} />}
    </>
  );
};

export { UserSessionPanel };
