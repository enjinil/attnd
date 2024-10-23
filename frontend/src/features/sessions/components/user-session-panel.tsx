import { useMutation, useQuery } from "react-query";
import { Button } from "../../../components/ui/button";
import { useUser } from "../../../hooks/store";
import { gqlRequest } from "../../../lib/graphql-client";
import { FormattedTime } from "../../../components/ui/date";
import { ElapsedTime } from "../../../components/ui/date/elapsed-time";
import { queryClient } from "../../../lib/react-query";
import { SessionsSummary } from "./sessions-summary";
import { Session } from "../../../graphql/graphql";
import {
  END_SESSION,
  PANEL_USER_SESSIONS,
  START_SESSION,
} from "../sessions_gqls";
import { usePrompt } from "../../../hooks/usePrompt";

const UserSessionPanel = () => {
  const [prompt, PromptDialog] = usePrompt();
  const user = useUser();
  const { data, isSuccess } = useQuery({
    queryFn: () => gqlRequest(PANEL_USER_SESSIONS),
    queryKey: ["userTodaySessions"],
  });

  const startSessionMutation = useMutation({
    mutationFn: () => gqlRequest(START_SESSION),
    onSuccess: () => {
      queryClient.invalidateQueries(["userTodaySessions"]);
    },
  });

  const endSessionMutation = useMutation({
    mutationFn: (note: string) => gqlRequest(END_SESSION, { note }),
    onSuccess: () => {
      queryClient.invalidateQueries(["userTodaySessions"]);
      queryClient.invalidateQueries(["userSessions"]);
    },
  });

  const noActiveSession = isSuccess && data.data.userActiveSession == null;

  const handleStopSession = () =>
    prompt("Leave a note about the session").then((value) => {
      if (value !== null) {
        endSessionMutation.mutate(value);
      }
    });

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
              <ElapsedTime date={data?.data.userActiveSession?.startTime} />
              <span> from </span>
              <FormattedTime date={data?.data.userActiveSession?.startTime} />
            </p>
            <Button
              onClick={handleStopSession}
              isLoading={endSessionMutation.isLoading}
              variant="danger"
            >
              Stop Session
            </Button>
          </>
        )}
      </div>
      {isSuccess && (
        <SessionsSummary sessions={data.data.userTodaySessions as Session[]} />
      )}
      <PromptDialog />
    </>
  );
};

export { UserSessionPanel };
