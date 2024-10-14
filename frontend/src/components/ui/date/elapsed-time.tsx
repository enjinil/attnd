import { useState, useEffect } from 'react';
import { ReadableDuration } from './readable-duration';

const ONE_MINUTE = 60000;

const ElapsedTime = ({ date }: { date: Date | string | undefined }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, ONE_MINUTE);

    return () => clearInterval(timer);
  }, []);

  const startDate = new Date(date || now);
  const endDate = now;

  return <ReadableDuration from={startDate} to={endDate} /> 
};

export { ElapsedTime };