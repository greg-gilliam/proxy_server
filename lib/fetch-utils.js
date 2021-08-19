const fetch = require('node-fetch');

async function getWeatherData(lat, lon) {
  const apiResp = await fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_IO}&lat=${lat}&lon=${lon}`
  );
  const apiData = await apiResp.json();
  const data = apiData.data.map((weathObj) => {
    return {
      forecast: weathObj.weather.description,
      time: new Date(weathObj.ts * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };
  });
  return data;
}

module.exports = {
  getWeatherData,
};