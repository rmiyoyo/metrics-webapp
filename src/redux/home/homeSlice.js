import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const CLOSE_URL = {
  KNOW_YOUR_LOCATION: 'https://api.ipgeolocation.io/ipgeo?&apiKey=af220bc2926740c1bdb54cd96f12a150',
  KNOW_YOUR_WEATHER: 'https: //api.openweathermap.org/data/2.5/weather?lat=-1.25917&lon=36.78583&appid=ddf20c9df8114e14ad3229967f236fd1',

};
export const fetchTownInfo = createAsyncThunk('home/fetchTownInfo', async (_, { rejectWithValue }) => {
  try {
    const fetchPOST = await axios.get(CLOSE_URL.KNOW_YOUR_LOCATION);
    const country = fetchPOST.data.country_name;
    const state = fetchPOST.data.state_prov;
    const townId = fetchPOST.data.city;
    const geoPost = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${townId}&limit=1&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const { lat, lon } = geoPost.data[0];
    const qualityPost = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const foreCast = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const qualityLvls = qualityPost.data.list[0].main.aqi;
    let dirtRange = '';

    const ipaddr = [
      { lat, lon: lon + 0.6 },
      { lat, lon: lon - 0.6 },
      { lat: lat + 0.6, lon },
      { lat: lat - 0.6, lon },
      { lat: lat + 0.6, lon: lon + 0.6 },
      { lat: lat - 0.6, lon: lon - 0.6 },
      { lat: lat + 0.6, lon: lon - 0.6 },
      { lat: lat - 0.6, lon: lon + 0.6 },
    ];

    const diffTowns = [];
    const firstTown = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${ipaddr[0].lat}&lon=${ipaddr[0].lon}&limit=1&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const firstDirt = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${ipaddr[0].lat}&lon=${ipaddr[0].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const weatherFirst = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ipaddr[0].lat}&lon=${ipaddr[0].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    if (firstTown && firstDirt && weatherFirst) {
      const townFirst = {
        city: firstTown.data[0].name,
        aqi: firstDirt.data.list[0].main.aqi,
        pollution: firstDirt.data.list[0].components,
        weather: {
          temp: weatherFirst.data.main.temp,
          hu: weatherFirst.data.main.humidity,
          ws: weatherFirst.data.wind.speed,
          icon: weatherFirst.data.weather[0].icon,
        },
      };
      diffTowns.push(townFirst);
    }

    const secondTown = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${ipaddr[1].lat}&lon=${ipaddr[1].lon}&limit=1&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const secondDirt = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${ipaddr[1].lat}&lon=${ipaddr[1].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const secondWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ipaddr[1].lat}&lon=${ipaddr[1].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    if (secondTown && secondDirt && secondWeather) {
      const townSecond = {
        city: secondTown.data[0].name,
        aqi: secondDirt.data.list[0].main.aqi,
        pollution: secondDirt.data.list[0].components,
        weather: {
          temp: secondWeather.data.main.temp,
          hu: secondWeather.data.main.humidity,
          ws: secondWeather.data.wind.speed,
          icon: secondWeather.data.weather[0].icon,
        },
      };
      diffTowns.push(townSecond);
    }

    const thirdTown = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${ipaddr[2].lat}&lon=${ipaddr[2].lon}&limit=1&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const thirdDirt = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${ipaddr[2].lat}&lon=${ipaddr[2].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const thirdWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ipaddr[2].lat}&lon=${ipaddr[2].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    if (thirdTown && thirdDirt && thirdWeather) {
      const townThird = {
        city: thirdTown.data[0].name,
        aqi: thirdDirt.data.list[0].main.aqi,
        pollution: thirdDirt.data.list[0].components,
        weather: {
          temp: thirdWeather.data.main.temp,
          hu: thirdWeather.data.main.humidity,
          ws: thirdWeather.data.wind.speed,
          icon: thirdWeather.data.weather[0].icon,
        },
      };
      diffTowns.push(townThird);
    }

    const fourthTown = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${ipaddr[3].lat}&lon=${ipaddr[3].lon}&limit=1&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const fourthDirty = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${ipaddr[3].lat}&lon=${ipaddr[3].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const fourthWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ipaddr[3].lat}&lon=${ipaddr[3].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    if (fourthTown && fourthDirty && fourthWeather) {
      const townFourth = {
        city: fourthTown.data[0].name,
        aqi: fourthDirty.data.list[0].main.aqi,
        pollution: fourthDirty.data.list[0].components,
        weather: {
          temp: fourthWeather.data.main.temp,
          hu: fourthWeather.data.main.humidity,
          ws: fourthWeather.data.wind.speed,
          icon: fourthWeather.data.weather[0].icon,
        },
      };
      diffTowns.push(townFourth);
    }

    const fifthTown = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${ipaddr[4].lat}&lon=${ipaddr[4].lon}&limit=1&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const fifthDirt = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${ipaddr[4].lat}&lon=${ipaddr[4].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const fifthWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ipaddr[4].lat}&lon=${ipaddr[4].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    if (fifthTown && fifthDirt && fifthWeather) {
      const townFifth = {
        city: fifthTown.data[0].name,
        aqi: fifthDirt.data.list[0].main.aqi,
        pollution: fifthDirt.data.list[0].components,
        weather: {
          temp: fifthWeather.data.main.temp,
          hu: fifthWeather.data.main.humidity,
          ws: fifthWeather.data.wind.speed,
          icon: fifthWeather.data.weather[0].icon,
        },
      };
      diffTowns.push(townFifth);
    }

    const sixthTown = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${ipaddr[5].lat}&lon=${ipaddr[5].lon}&limit=1&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const sixthDirt = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${ipaddr[5].lat}&lon=${ipaddr[5].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const sixthWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ipaddr[5].lat}&lon=${ipaddr[5].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    if (sixthTown && sixthDirt && sixthWeather) {
      const townSixth = {
        city: sixthTown.data[0].name,
        aqi: sixthDirt.data.list[0].main.aqi,
        pollution: sixthDirt.data.list[0].components,
        weather: {
          temp: sixthWeather.data.main.temp,
          hu: sixthWeather.data.main.humidity,
          ws: sixthWeather.data.wind.speed,
          icon: sixthWeather.data.weather[0].icon,
        },
      };
      diffTowns.push(townSixth);
    }

    const seventhTown = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${ipaddr[6].lat}&lon=${ipaddr[6].lon}&limit=1&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const seventhDirt = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${ipaddr[6].lat}&lon=${ipaddr[6].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const seventhWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ipaddr[6].lat}&lon=${ipaddr[6].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    if (seventhTown && seventhDirt && seventhWeather) {
      const townSeventh = {
        city: seventhTown.data[0].name,
        aqi: seventhDirt.data.list[0].main.aqi,
        pollution: seventhDirt.data.list[0].components,
        weather: {
          temp: seventhWeather.data.main.temp,
          hu: seventhWeather.data.main.humidity,
          ws: seventhWeather.data.wind.speed,
          icon: seventhWeather.data.weather[0].icon,
        },
      };
      diffTowns.push(townSeventh);
    }

    const eighthTown = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${ipaddr[7].lat}&lon=${ipaddr[7].lon}&limit=1&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const eighthDirt = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${ipaddr[7].lat}&lon=${ipaddr[7].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const eighthWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ipaddr[7].lat}&lon=${ipaddr[7].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    if (eighthTown && eighthDirt && eighthWeather) {
      const townEighth = {
        city: eighthTown.data[0].name,
        aqi: eighthDirt.data.list[0].main.aqi,
        pollution: eighthDirt.data.list[0].components,
        weather: {
          temp: eighthWeather.data.main.temp,
          hu: eighthWeather.data.main.humidity,
          ws: eighthWeather.data.wind.speed,
          icon: eighthWeather.data.weather[0].icon,
        },
      };
      diffTowns.push(townEighth);
    }

    switch (qualityLvls) {
      case 1:
        dirtRange = 'Good';
        break;
      case 2:
        dirtRange = 'Fair';
        break;
      case 3:
        dirtRange = 'Moderate';
        break;
      case 4:
        dirtRange = 'Poor';
        break;
      case 5:
        dirtRange = 'Very Poor';
        break;
      default:
        dirtRange = '';
    }
    return (
      {
        city: {
          country,
          state,
          city: townId,
          aqi: qualityLvls,
          dirtRange,
          pollution: qualityPost.data.list[0].components,
          weather: {
            temp: foreCast.data.main.temp,
            hu: foreCast.data.main.humidity,
            ws: foreCast.data.wind.speed,
            icon: foreCast.data.weather[0].icon,
          },
        },
        diffTowns,
      }
    );
  } catch (error) {
    return rejectWithValue('Sorry, we could not get your location');
  }
});

export const callActiveTown = createAsyncThunk('home/getUserInputData', async (userInput, { rejectWithValue }) => {
  try {
    let cities = [];
    if (userInput) {
      const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=ddf20c9df8114e14ad3229967f236fd1`;
      const resp = await axios.get(URL);
      cities = resp.data;
    }
    return cities;
  } catch (error) {
    return rejectWithValue('City not supported');
  }
});

export const callActiveTownInfo = createAsyncThunk('home/callActiveTownInfo', async ({ lat, lon, name }, { rejectWithValue }) => {
  try {
    const qualityPost = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const foreCast = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const qualityLvls = qualityPost.data.list[0].main.aqi;
    let dirtRange = '';

    const ipaddr = [
      { lat, lon: lon + 0.5 },
      { lat, lon: lon - 0.5 },
      { lat: lat + 0.5, lon },
      { lat: lat - 0.5, lon },
      { lat: lat + 0.5, lon: lon + 0.5 },
      { lat: lat - 0.5, lon: lon - 0.5 },
      { lat: lat + 0.5, lon: lon - 0.5 },
      { lat: lat - 0.5, lon: lon + 0.5 },
    ];

    const diffTowns = [];
    const firstTownPost = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${ipaddr[0].lat}&lon=${ipaddr[0].lon}&limit=1&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const firstDirt = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${ipaddr[0].lat}&lon=${ipaddr[0].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const weatherFirst = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ipaddr[0].lat}&lon=${ipaddr[0].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    if (firstTownPost && firstDirt && weatherFirst) {
      const townFirst = {
        city: firstTownPost.data[0].name,
        aqi: firstDirt.data.list[0].main.aqi,
        pollution: firstDirt.data.list[0].components,
        weather: {
          temp: weatherFirst.data.main.temp,
          hu: weatherFirst.data.main.humidity,
          ws: weatherFirst.data.wind.speed,
          icon: weatherFirst.data.weather[0].icon,
        },
      };
      diffTowns.push(townFirst);
    }

    const secondTown = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${ipaddr[1].lat}&lon=${ipaddr[1].lon}&limit=1&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const secondDirt = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${ipaddr[1].lat}&lon=${ipaddr[1].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const secondWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ipaddr[1].lat}&lon=${ipaddr[1].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    if (secondTown && secondDirt && secondWeather) {
      const townSecond = {
        city: secondTown.data[0].name,
        aqi: secondDirt.data.list[0].main.aqi,
        pollution: secondDirt.data.list[0].components,
        weather: {
          temp: secondWeather.data.main.temp,
          hu: secondWeather.data.main.humidity,
          ws: secondWeather.data.wind.speed,
          icon: secondWeather.data.weather[0].icon,
        },
      };
      diffTowns.push(townSecond);
    }

    const thirdTown = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${ipaddr[2].lat}&lon=${ipaddr[2].lon}&limit=1&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const thirdDirt = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${ipaddr[2].lat}&lon=${ipaddr[2].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const thirdWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ipaddr[2].lat}&lon=${ipaddr[2].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    if (thirdTown && thirdDirt && thirdWeather) {
      const townThird = {
        city: thirdTown.data[0].name,
        aqi: thirdDirt.data.list[0].main.aqi,
        pollution: thirdDirt.data.list[0].components,
        weather: {
          temp: thirdWeather.data.main.temp,
          hu: thirdWeather.data.main.humidity,
          ws: thirdWeather.data.wind.speed,
          icon: thirdWeather.data.weather[0].icon,
        },
      };
      diffTowns.push(townThird);
    }

    const fourthTown = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${ipaddr[3].lat}&lon=${ipaddr[3].lon}&limit=1&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const fourthDirty = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${ipaddr[3].lat}&lon=${ipaddr[3].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const fourthWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ipaddr[3].lat}&lon=${ipaddr[3].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    if (fourthTown && fourthDirty && fourthWeather) {
      const townFourth = {
        city: fourthTown.data[0].name,
        aqi: fourthDirty.data.list[0].main.aqi,
        pollution: fourthDirty.data.list[0].components,
        weather: {
          temp: fourthWeather.data.main.temp,
          hu: fourthWeather.data.main.humidity,
          ws: fourthWeather.data.wind.speed,
          icon: fourthWeather.data.weather[0].icon,
        },
      };
      diffTowns.push(townFourth);
    }

    const fifthTown = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${ipaddr[4].lat}&lon=${ipaddr[4].lon}&limit=1&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const fifthDirt = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${ipaddr[4].lat}&lon=${ipaddr[4].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const fifthWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ipaddr[4].lat}&lon=${ipaddr[4].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    if (fifthTown && fifthDirt && fifthWeather) {
      const townFifth = {
        city: fifthTown.data[0].name,
        aqi: fifthDirt.data.list[0].main.aqi,
        pollution: fifthDirt.data.list[0].components,
        weather: {
          temp: fifthWeather.data.main.temp,
          hu: fifthWeather.data.main.humidity,
          ws: fifthWeather.data.wind.speed,
          icon: fifthWeather.data.weather[0].icon,
        },
      };
      diffTowns.push(townFifth);
    }

    const sixthTown = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${ipaddr[5].lat}&lon=${ipaddr[5].lon}&limit=1&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const sixthDirt = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${ipaddr[5].lat}&lon=${ipaddr[5].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const sixthWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ipaddr[5].lat}&lon=${ipaddr[5].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    if (sixthTown && sixthDirt && sixthWeather) {
      const townSixth = {
        city: sixthTown.data[0].name,
        aqi: sixthDirt.data.list[0].main.aqi,
        pollution: sixthDirt.data.list[0].components,
        weather: {
          temp: sixthWeather.data.main.temp,
          hu: sixthWeather.data.main.humidity,
          ws: sixthWeather.data.wind.speed,
          icon: sixthWeather.data.weather[0].icon,
        },
      };
      diffTowns.push(townSixth);
    }

    const seventhTown = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${ipaddr[6].lat}&lon=${ipaddr[6].lon}&limit=1&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const seventhDirt = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${ipaddr[6].lat}&lon=${ipaddr[6].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const seventhWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ipaddr[6].lat}&lon=${ipaddr[6].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    if (seventhTown && seventhDirt && seventhWeather) {
      const townSeventh = {
        city: seventhTown.data[0].name,
        aqi: seventhDirt.data.list[0].main.aqi,
        pollution: seventhDirt.data.list[0].components,
        weather: {
          temp: seventhWeather.data.main.temp,
          hu: seventhWeather.data.main.humidity,
          ws: seventhWeather.data.wind.speed,
          icon: seventhWeather.data.weather[0].icon,
        },
      };
      diffTowns.push(townSeventh);
    }

    const eighthTown = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${ipaddr[7].lat}&lon=${ipaddr[7].lon}&limit=1&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const eighthDirt = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${ipaddr[7].lat}&lon=${ipaddr[7].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    const eighthWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ipaddr[7].lat}&lon=${ipaddr[7].lon}&appid=ddf20c9df8114e14ad3229967f236fd1`);
    if (eighthTown && eighthDirt && eighthWeather) {
      const townEighth = {
        city: eighthTown.data[0].name,
        aqi: eighthDirt.data.list[0].main.aqi,
        pollution: eighthDirt.data.list[0].components,
        weather: {
          temp: eighthWeather.data.main.temp,
          hu: eighthWeather.data.main.humidity,
          ws: eighthWeather.data.wind.speed,
          icon: eighthWeather.data.weather[0].icon,
        },
      };
      diffTowns.push(townEighth);
    }

    switch (qualityLvls) {
      case 1:
        dirtRange = 'Good';
        break;
      case 2:
        dirtRange = 'Fair';
        break;
      case 3:
        dirtRange = 'Moderate';
        break;
      case 4:
        dirtRange = 'Poor';
        break;
      case 5:
        dirtRange = 'Very Poor';
        break;
      default:
        dirtRange = '';
    }
    return (
      {
        city: {
          city: name,
          aqi: qualityLvls,
          dirtRange,
          pollution: qualityPost.data.list[0].components,
          weather: {
            temp: foreCast.data.main.temp,
            hu: foreCast.data.main.humidity,
            ws: foreCast.data.wind.speed,
            icon: foreCast.data.weather[0].icon,
          },
        },
        diffTowns,
      }
    );
  } catch (error) {
    return rejectWithValue('Your Location is not supported !!');
  }
});

const initialState = {
  city: {

  },
  diffTowns: [

  ],
  fetchingData: true,
  error: undefined,
  townActive: {},
  townsActive: [],
  townSelected: {},
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    addActiveTown: (state, action) => {
      state.townActive = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTownInfo.pending, (state) => {
        state.fetchingData = true;
        state.error = undefined;
      })
      .addCase(fetchTownInfo.fulfilled, (state, action) => {
        state.city = action.payload.city;
        state.diffTowns = [...action.payload.diffTowns];
        state.fetchingData = false;
        state.error = undefined;
      })
      .addCase(fetchTownInfo.rejected, (state, action) => {
        state.fetchingData = false;
        state.error = action.payload;
      })

      .addCase(callActiveTown.fulfilled, (state, action) => {
        state.townsActive = [...action.payload];
      })

      .addCase(callActiveTownInfo.pending, (state) => {
        state.fetchingData = true;
        state.error = undefined;
      })
      .addCase(callActiveTownInfo.fulfilled, (state, action) => {
        state.townSelected = action.payload.city;
        state.diffTowns = [...action.payload.diffTowns];
        state.fetchingData = false;
        state.error = undefined;
      })
      .addCase(callActiveTownInfo.rejected, (state, action) => {
        state.fetchingData = false;
        state.error = action.payload;
      });
  },
});

export const getData = (state) => (state.home);
export const { addActiveTown } = homeSlice.actions;
export default homeSlice.reducer;
