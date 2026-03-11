import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData, unitSystem }) => {
  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(weatherData.daily.time[0])}, ${getTime(
          unitSystem,
          weatherData.daily.time[0]
        )} ${getAMPM(unitSystem, weatherData.daily.time[0])}`}
      </h2>
    </div>
  );
};
