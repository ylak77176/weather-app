import { useState, useEffect } from "react";
import { weatherCodes } from "../services/weatherCodes";
import { weatherCodes, weatherIcons } from "../services/weatherCodes";
import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";

export const App = () => {
  const [weatherData, setWeatherData] = useState();
  const [unitSystem, setUnitSystem] = useState("metric");


  useEffect(() => {
    const getData = async () => {
      const res = await fetch("api/data");
      const data = await res.json();
      setWeatherData(data);
    };
    getData();

    const interval = setInterval(getData, 3600000);
    return () => clearInterval(interval);
  }, []);

  const changeSystem = () =>
    unitSystem == "metric"
      ? setUnitSystem("imperial")
      : setUnitSystem("metric");

  return weatherData && !weatherData.error ? (
    <div className={styles.wrapper}>
      <MainCard
        city={weatherData.cityName}
        country={weatherData.country}
        description={weatherCodes[weatherData.current.weathercode]}
        iconName={weatherIcons[weatherData.current.weathercode][weatherData.current.is_day ? "day" : "night"]}
        unitSystem={unitSystem}
        weatherData={weatherData}
      />
      <ContentBox>
        <Header>
          <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
                  </Header>
        <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  ) : weatherData && weatherData.error ? (
    <ErrorScreen errorMessage="Data loading error. Please contact support." />

  ) : (
    <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;
