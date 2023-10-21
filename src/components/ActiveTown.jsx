import { useSelector } from 'react-redux';
import { getData } from '../redux/home/homeSlice';
import waterDrop from '../assets/logo/drop.png';

const ActiveTown = () => {
  const { fetchingData, error, townSelected } = useSelector(getData);
  return (
    <div className="closest-town-area">
      {fetchingData && (
        <div>
          is Loading
          <div className="progress">
            <div className="inner">{ }</div>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
      {(!fetchingData && !error && Object.keys(townSelected).length !== 0)
        && (
          <>
            <div className="weather-data-area">
              <div className="weather-logo-area">
                <img src={`https://download.spinetix.com/content/widgets/icons/weather/${townSelected.weather.icon}.png`} alt="weather icon" />
              </div>
              <div className="weather-infos-sctn">
                <div className="heat-map">
                  {townSelected.weather.temp}
                  °
                </div>
                <div className="humidity-map">
                  <img src={waterDrop} alt="water drop" />
                  {townSelected.weather.hu}
                  %
                </div>
                <div className="dkf-map">
                  ws:
                  {' '}
                  {townSelected.weather.ws}
                  m/s
                </div>
              </div>
            </div>
            <div className="air-info-bdns">
              <h1 className="city">
                {townSelected.city}
                {' '}
                Air Quality Index
              </h1>
              <p className={townSelected.dirtRange}>
                {townSelected.aqi}
              </p>
              <p
                className={townSelected.dirtRange}
              >
                {townSelected.dirtRange}
                <span className="dirtifier">
                  PM2.5:
                  {' '}
                  {townSelected.pollution.pm2_5}
                  μg/m
                  <sup>3</sup>
                </span>
                <span className="dirtifier">
                  PM10:
                  {' '}
                  {townSelected.pollution.pm10}
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

export default ActiveTown;
