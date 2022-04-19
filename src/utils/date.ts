import dayjs from "dayjs";

const getDateFormat = (utc: string): string => {
  const date = dayjs(utc);
  const isDateToday = dayjs().startOf("day").isSame(date, "day");
  const isDateYesterday = dayjs().subtract(1, "day").isSame(date, "day");

  if (isDateToday) return "Сегодня, " + date.format("hh:mm");
  if (isDateYesterday) return "Вчера, " + date.format("hh:mm");
  return date.format("DD:MM, hh:mm");
};

export default getDateFormat;

//TODO сделать ".... дня назад"
