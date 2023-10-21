import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { BsArrowRightCircle } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import { getData, addActiveTown } from '../redux/home/homeSlice';

const TownList = () => {
  const { diffTowns, fetchingData, error } = useSelector(getData);
  const dispatch = useDispatch();
  const handleClick = (city) => dispatch(addActiveTown(city));
  return (
    <div className="other-towns-area">
      {(!fetchingData && !error)
        && (
          <>
            {diffTowns.map((cityItem) => (
              <NavLink
                key={uuidv4()}
                to="details"
                onClick={() => (handleClick(cityItem))}
              >
                <div className="town-piece-bx">
                  <BsArrowRightCircle className="next-drctn" />
                  <div className="clmt-bx">
                    <div className="photo-bx">
                      <img src={`https://download.spinetix.com/content/widgets/icons/weather/${cityItem.weather.icon}.png`} alt="weather icon" />
                    </div>
                    <div className="climate-info">
                      <div className="heat-map">
                        T:
                        {' '}
                        {cityItem.weather.temp}
                        °
                      </div>
                      <div className="humidity-map">
                        hu:
                        {' '}
                        {cityItem.weather.hu}
                        %
                      </div>
                      <div className="dkf-map">
                        ws:
                        {' '}
                        {cityItem.weather.ws}
                        m/s
                      </div>
                    </div>
                  </div>
                  <div className="jd-map">
                    <h1>{cityItem.city}</h1>
                    <p>
                      AQI:
                      {' '}
                      {cityItem.aqi}
                    </p>
                  </div>
                </div>
              </NavLink>
            ))}
          </>
        )}
    </div>
  );
};

export default TownList;
