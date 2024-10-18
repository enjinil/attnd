import { FormattedTime } from "../../../components/ui/date";
import { ReadableDuration } from "../../../components/ui/date/readable-duration";
import { Session } from "../../../graphql/graphql";
import { SessionsTotalDuration } from "./sessions-total-duration";

type SessionsSummaryProps = {
  sessions: Session[] | undefined | null;
};

const endTime = (endTime: string | null | undefined) =>
  endTime ? (
    <FormattedTime date={endTime} />
  ) : (
    <span className="text-red-600">ongoing..</span>
  );

const SessionsSummary = ({ sessions }: SessionsSummaryProps) => {
  if (!sessions) return <></>;
  if (sessions.length == 0)
    return (
      <div className="bg-slate-100 border border-slate-200 rounded-md px-1 pb-1 pt-2">
        <div className="flex items-center px-3">
          <h3 className="text-slate-600 pb-2 mr-auto">You have not started a session today.</h3>
        </div>
      </div>
    );

  return (
    <div className="bg-slate-100 border border-slate-200 rounded-md px-1 pb-1 pt-2">
      <div className="flex items-center px-3">
        <h3 className="text-slate-600 pb-2 mr-auto">Your sessions today</h3>
        <div className="text-lg font-bold mb-2">
          <SessionsTotalDuration sessions={sessions} />
        </div>
      </div>
      <div className="px-4 py-3 border border-slate-300 bg-slate-50 rounded">
        <div className="relative space-y-1">
          {sessions.map((session) => (
            <div key={session.id}>
              <FormattedTime date={session.startTime} />
              <span> - </span>
              {endTime(session.endTime)}
              {session.endTime && (
                <>
                  <span> → </span>
                  <ReadableDuration
                    from={session.startTime}
                    to={session.endTime}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { SessionsSummary };
