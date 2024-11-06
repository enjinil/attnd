import { useEffect, useState } from "react";
import { displayDatetime } from "@/utils/date";

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="tabular-nums py-2">
      {displayDatetime(currentTime)}
    </div>
  );
};

export default CurrentTime;