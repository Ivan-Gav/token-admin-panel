import { format, parseISO } from "date-fns";

export const Time = ({
  timestring,
  title,
}: {
  timestring: string;
  title?: string;
}) => {
  const time = format(parseISO(timestring), "dd/MM/yyyy HH:mm");

  return <span title={title}>{time}</span>;
};
