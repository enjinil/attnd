import { useState, useEffect } from 'react';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime);

const ElapsedTime = ({ date }: { date: Date | string | undefined }) => {
  const [, setUpdate] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setUpdate(prevUpdate => prevUpdate + 1);
    }, 60000); // Update every 60000 milliseconds (1 minute)

    return () => clearInterval(timer);
  }, []);

  if (date == undefined) return null;
  
  const dateObject = dayjs(date);

  return <span>{dateObject.fromNow()}</span>;
};

export { ElapsedTime };