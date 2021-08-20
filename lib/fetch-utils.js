const fetch = require('node-fetch');

async function locationData(search) {
  const location = await fetch(
    `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_IQ}&q=${search}&format=json`
  );
  const locationJSON = await location.json();
  const data = {
    formatted_query: locationJSON[0].display_name,
    latitude: locationJSON[0].lat,
    longitude: locationJSON[0].lon,
  };
  return data;
}

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

async function getReviewsData(lat, lon) {
  let url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`;
  const bearer = 'Bearer ' + process.env.YELP;
  const apiResp = await fetch(url, {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Authorization': bearer,
      'Content-Type': 'application/json'
    } });
  const apiData = await apiResp.json();
  const data = apiData.businesses.map((b) => {
    return {
      name: b.name,
      image_url: b.image_url,
      price: b.price,
      rating: b.rating,
      url: b.url,
    };
  });
  return data;
}


module.exports = {
  getWeatherData, getReviewsData, locationData
};