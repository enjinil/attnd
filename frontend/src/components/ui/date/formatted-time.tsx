import dayjs from "dayjs";

const FormattedTime = ({ date }: { date: Date | string | undefined }) => {
  if(date == undefined) return <></>
  
  const dateObject = dayjs(date);

  return <span>{dateObject.format("HH:mm")}</span>;
};

export { FormattedTime };
