type DurationTimeProps = {
  from?: Date | string | null;
  to?: Date | string | null;
};

const DurationTime = ({ from, to }: DurationTimeProps) => {
  if (!from || !to) return "";

  const fromDate = new Date(from);
  const toDate = new Date(to);

  if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
    return "Invalid date";
  }

  const durationMs = toDate.getTime() - fromDate.getTime();

  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};

export { DurationTime };
