import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc)
dayjs.extend(timezone)

export const formatDateShort = (dateString: string) => {
  const date = dayjs.utc(dateString);
  const easternDate = date.tz('America/New_York');
  return easternDate.format('MM-DD-YY HH:mm');
}

export const formatDateLong = (dateString: string) => {
  const date = dayjs.utc(dateString);
  const easternDate = date.tz('America/New_York');
  return easternDate.format('MM-DD-YY HH:mm:ss');
}