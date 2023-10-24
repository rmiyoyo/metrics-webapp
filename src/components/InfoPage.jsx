import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { getData } from '../redux/home/homeSlice';
import drizzleIcon from '../assets/logo/drop.png';

const InfoPage = () => {
  const { townActive } = useSelector(getData);
  useEffect(() => {
    if (Object.keys(townActive).length > 0) {
      localStorage.setItem('townActive', JSON.stringify(townActive));
    }
  }, [townActive]);

  const city = Object.keys(townActive).length > 0 ? townActive : JSON.parse(localStorage.getItem('townActive'));

  const dirtRange = (aqi) => {
    let level = '';
    switch (aqi) {
      case 1:
        level = 'Good';
        break;
      case 2:
        level = 'Fair';
        break;
      case 3:
        level = 'Moderate';
        break;
      case 4:
        level = 'Poor';
        break;
      case 5:
        level = 'Very Poor';
        break;
      default:
        townActive.dirtRange = '';
    }
    return level;
  };

  return (
    <>
      {city && Object.keys(townActive).length === 0 && <p className="empty-info">Data Not Found</p>}
      {city && Object.keys(townActive).length !== 0 && (
        <>
          <div className="info-sarea">
            <NavLink to="/metrics-webapp" className="back-arrow-link">
              <BsArrowLeftCircle className="back-arrow" />
            </NavLink>
            <div className="weather-data-area">
              <div className="weather-logo-area">
                <img src={`https://download.spinetix.com/content/widgets/icons/weather/${townActive.weather.icon}.png`} alt="weather icon" />
              </div>
              <div className="weather-infos-sctn">
                <div className="heat-map">
                  {townActive.weather.temp}
                  °
                </div>
                <div className="humidity-map">
                  <img src={drizzleIcon} alt="water drop" />
                  {townActive.weather.hu}
                  %
                </div>
                <div className="dkf-map">
                  ws:
                  {' '}
                  {townActive.weather.ws}
                  m/s
                </div>
              </div>
            </div>
            <div className="air-info-bdns">
              <h1 className="city">
                {townActive.city}
                {' '}
                Air Quality Index
              </h1>
              <p className={dirtRange(townActive.aqi)}>
                {townActive.aqi}
              </p>
              <p
                className={dirtRange(townActive.aqi)}
              >
                {dirtRange(townActive.aqi)}
                <span className="dirtifier">
                  PM2.5:
                  {' '}
                  {townActive.pollution.pm2_5}
                  μg/m
                  <sup>3</sup>
                </span>
                <span className="dirtifier">
                  PM10:
                  {' '}
                  {townActive.pollution.pm10}
                  μg/m
                  <sup>3</sup>
                </span>
              </p>
            </div>
          </div>
          <hr />
          <div className="other-pollutants">
            <h2>Others Pollutant Concentrations</h2>
            <p className="dirtifier">
              CO:
              {' '}
              {townActive.pollution.co}
              μg/m
              <sup>3</sup>
            </p>
            <p className="dirtifier">
              NO:
              {' '}
              {townActive.pollution.no}
              μg/m
              <sup>3</sup>
            </p>
            <p className="dirtifier">
              NO2:
              {' '}
              {townActive.pollution.no2}
              μg/m
              <sup>3</sup>
            </p>
            <p className="dirtifier">
              O3:
              {' '}
              {townActive.pollution.o3}
              μg/m
              <sup>3</sup>
            </p>
            <p className="dirtifier">
              SO2:
              {' '}
              {townActive.pollution.so2}
              μg/m
              <sup>3</sup>
            </p>
            <p className="dirtifier">
              NH3:
              {' '}
              {townActive.pollution.nh3}
              μg/m
              <sup>3</sup>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default InfoPage;
