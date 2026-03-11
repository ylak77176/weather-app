/* OLD OPEN Weather API

export default async function handler(req, res) {
  const { cityInput } = req.body;
  const getWeatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
  );
  const data = await getWeatherData.json();
  res.status(200).json(data);
}
*/



import config from "../../config.json";

export default async function handler(req, res) {
  const { cityInput } = config;

  // Step 1 - convert city name to coordinates
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}&count=1`
  );
  const geoData = await geoRes.json();
  const { latitude, longitude } = geoData.results[0];

  // Step 2 - fetch weather with coordinates
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m,windspeed_10m&timezone=auto`
  );
  const data = await weatherRes.json();
  res.status(200).json({ ...data, cityName: cityInput });
}