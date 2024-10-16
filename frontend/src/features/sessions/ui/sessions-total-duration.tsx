import { useEffect, useState } from "react";
import { ReadableDuration } from "../../../components/ui/date/readable-duration";
import { Session } from "../../../graphql/graphql";

type SessionsTotalDurationProps = {
  sessions: Session[];
};

const ONE_MINUTE = 60000;

const SessionsTotalDuration = ({ sessions }: SessionsTotalDurationProps) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, ONE_MINUTE);

    return () => clearInterval(timer);
  }, []);

  const calculateTotalDuration = () => {
    let totalDurationMs = 0;

    sessions.forEach((session) => {
      const startTime = new Date(session.startTime);
      const endTime = session.endTime ? new Date(session.endTime) : now;
      totalDurationMs += endTime.getTime() - startTime.getTime();
    });

    return totalDurationMs;
  };

  const totalDurationMs = calculateTotalDuration();
  const startDate = new Date(0);
  const endDate = new Date(totalDurationMs);

  return <ReadableDuration from={startDate} to={endDate} />;
};

export { SessionsTotalDuration };
