const FormattedTime = ({ date }: { date: Date | string | undefined | null }) => {
  if (date == null || date === undefined) return null;
  
  const dateObject = typeof date === 'string' ? new Date(date) : date;

  if (!(dateObject instanceof Date) || isNaN(dateObject.getTime())) {
    return null;
  }

  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');

  return <span>{`${hours}:${minutes}`}</span>;
};

export { FormattedTime };