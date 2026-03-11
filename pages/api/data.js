import config from "../../config.json";

export default async function handler(req, res) {
  const { city } = config;

  // Step 1 - convert city name to coordinates
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
  );
  const geoData = await geoRes.json();
  const { latitude, longitude, country_code } = geoData.results[0];

  // Step 2 - fetch weather with coordinates
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weathercode,relative_humidity_2m,wind_speed_10m,wind_direction_10m&daily=sunrise,sunset, time&hourly=visibility&timezone=auto`
  );
  const data = await weatherRes.json();
  res.status(200).json({ ...data, cityName: city, country: country_code });
}