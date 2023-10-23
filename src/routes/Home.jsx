import { useSelector } from 'react-redux';
import { getData } from '../redux/home/homeSlice';
import ClosestTown from '../components/ClosestTown';
import TownList from '../components/Townlist';
import ActiveTown from '../components/ActiveTown';

const Home = () => {
  const { townSelected } = useSelector(getData);
  return (
    <div>
      {Object.keys(townSelected).length !== 0 ? <ActiveTown /> : <ClosestTown />}
      <TownList />
    </div>
  );
};

export default Home;
