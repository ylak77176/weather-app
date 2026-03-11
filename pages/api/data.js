import config from "../../config.json";

export default async function handler(req, res) {
  const { city } = config;

  // Step 1 - convert city name to coordinates
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
  );
  const geoData = await geoRes.json();
  const { latitude, longitude } = geoData.results[0];

  // Step 2 - fetch weather with coordinates
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m,windspeed_10m&timezone=auto`
  );
  const data = await weatherRes.json();
  res.status(200).json({ ...data, cityName: city });
}