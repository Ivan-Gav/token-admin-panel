import dayjs from "dayjs";

export const Time = ({
  timestring,
  title,
}: {
  timestring: string;
  title?: string;
}) => {
  const time = dayjs(timestring).format("DD/MM/YYYY HH:mm");

  return <span title={title}>{time}</span>;
};
