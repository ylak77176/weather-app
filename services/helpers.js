import {
  isoToLocalTime,
  kmToMiles,
  kmhToMph,
  timeTo12HourFormat,
} from "./converters";

export const getWindSpeed = (unitSystem, windInKmh) =>
  unitSystem == "metric" ? windInKmh : kmhToMph(windInKmh);

export const getVisibility = (unitSystem, visibilityInMeters) =>
  unitSystem == "metric"
    ? (visibilityInMeters / 1000).toFixed(1)
    : kmToMiles(visibilityInMeters / 1000);

export const getTime = (unitSystem, isoTime) =>
  unitSystem == "metric"
    ? isoToLocalTime(isoTime)
    : timeTo12HourFormat(isoToLocalTime(isoTime));

export const getAMPM = (unitSystem, isoTime) =>
  unitSystem === "imperial"
    ? isoToLocalTime(isoTime).split(":")[0] >= 12
      ? "PM"
      : "AM"
    : "";

export const getWeekDay = (isoDate) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[new Date(isoDate).getUTCDay()];
};
