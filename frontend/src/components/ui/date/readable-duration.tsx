type ReadableDurationProps = {
  from: Date | string | undefined | null;
  to: Date | string | undefined | null;
}

const ReadableDuration = ({ from, to }: ReadableDurationProps) => {
  if(!from || !to) return null

  // Convert dates to milliseconds
  const fromMs = new Date(from).getTime();
  const toMs = new Date(to).getTime();

  // Calculate the difference in milliseconds
  const durationMs = toMs - fromMs;

  // Convert milliseconds to hours and minutes
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  if (durationMs < 60000) {
    return <span>less than a minute</span>;
  }

  if (hours === 0) {
    return (
      <span>
        {minutes} minute{minutes !== 1 ? "s" : ""}
      </span>
    );
  }

  return (
    <span>
      {hours} hour{hours !== 1 ? "s" : ""}
      {minutes > 0 && ` ${minutes} minute${minutes !== 1 ? "s" : ""}`}
    </span>
  );
};

export { ReadableDuration };