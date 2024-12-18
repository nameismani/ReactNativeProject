import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);

export const formatTime = (timeStamp: number): number | string => {
  return timeStamp ? dayjs(timeStamp).fromNow() : "Unknown time";
};
