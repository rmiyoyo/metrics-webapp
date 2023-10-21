import { useSelector } from 'react-redux';
import { getData } from '../redux/home/homeSlice';
import waterDrop from '../assets/logo/drop.png';

const ClosestTown = () => {
  const { city, fetchingData, error } = useSelector(getData);
  return (
    <div className="closest-town-area">
      {fetchingData && (
        <div>
          is Loading
          <div className="sjd-waves">
            <div>{ }</div>
            <div>{ }</div>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
      {(!fetchingData && !error)
        && (
          <>
            <div className="weather-data-area">
              <div className="weather-logo-area">
                <img src={`https://download.spinetix.com/content/widgets/icons/weather/${city.weather.icon}.png`} alt="weather icon" />
              </div>
              <div className="weather-infos-sctn">
                <div className="heat-map">
                  {city.weather.temp}
                  °
                </div>
                <div className="humidity-map">
                  <img src={waterDrop} alt="water drop" />
                  {city.weather.hu}
                  %
                </div>
                <div className="dkf-map">
                  ws:
                  {' '}
                  {city.weather.ws}
                  m/s
                </div>
              </div>
            </div>
            <div className="air-info-bdns">
              <h1 className="city">
                {city.city}
                {' '}
                Air Quality Index
              </h1>
              <p className={city.dirtRange}>
                {city.aqi}
              </p>
              <p
                className={city.dirtRange}
              >
                {city.dirtRange}
                <span className="dirtifier">
                  PM2.5:
                  {' '}
                  {city.pollution.pm2_5}
                  μg/m
                  <sup>3</sup>
                </span>
                <span className="dirtifier">
                  PM10:
                  {' '}
                  {city.pollution.pm10}
                  μg/m
                  <sup>3</sup>
                </span>
              </p>
            </div>
          </>
        )}
    </div>
  );
};

export default ClosestTown;
