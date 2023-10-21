import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTownInfo } from './redux/home/homeSlice';
import Layout from './components/Layout';
import Home from './routes/Home';
import Info from './routes/Info';
import PageError from './routes/PageError';
import './App.css';
import './styles/home.scss';
import './styles/nav.scss';
import './styles/info.scss';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTownInfo());
  }, [dispatch]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="details" element={<Info />} />
          <Route path="*" element={<PageError />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
