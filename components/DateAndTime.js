import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData, unitSystem }) => {
  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(weatherData.daily.time[0])}, ${getTime(
          unitSystem,
          weatherData.current.time
        )} ${getAMPM(unitSystem, weatherData.current.time)}`}
      </h2>
    </div>
  );
};
