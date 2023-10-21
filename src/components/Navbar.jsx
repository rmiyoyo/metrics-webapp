import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import { BsArrowBarDown } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callActiveTown, getData, callActiveTownInfo } from '../redux/home/homeSlice';
// import logo from 'assets/logo/logo.png';

const NavBar = () => {
  const [userEntry, sentEntryData] = useState('');
  const dispatch = useDispatch();
  const [userInterface, userInterfaceSet] = useState('flex');

  const handleInput = (e) => {
    if (e.target.value.replace(/[^a-zA-Z]/g, '').length !== 0) {
      sentEntryData(e.target.value);
      userInterfaceSet('flex');
    }
  };

  useEffect(() => {
    dispatch(callActiveTown(userEntry));
  }, [dispatch, userEntry]);
  const { townsActive } = useSelector(getData);

  const handleCityClick = (option) => {
    sentEntryData(option);
  };
  const handleInputBlur = () => {
    dispatch(callActiveTown(userEntry));
    if (townsActive.length > 0) {
      const { lat, lon, name } = townsActive[0];
      dispatch(callActiveTownInfo({ lat, lon, name }));
    }
    userInterfaceSet('none');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' && userEntry.length === 1) {
      sentEntryData('');
    }
  };

  return (
    <nav>
      {/* <img src={logo} alt="logo" /> */}
      <div className="enter-town">
        <input
          type="text"
          placeholder="Search A City"
          value={userEntry}
          onChange={handleInput}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
        />
        <ul className="suggestions-lst" style={{ display: userInterface }}>
          {townsActive.map((city) => (
            <NavLink
              type="button"
              key={uuidv4()}
              onClick={() => handleCityClick(city.name)}
            >
              {city.name}
            </NavLink>
          ))}
        </ul>
        <BsArrowBarDown className="look-logo" />
      </div>
      <NavLink
        to="/"
      >
        <AiOutlineHome className="home-logo" />
      </NavLink>
    </nav>
  );
};

export default NavBar;
