import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './routes/Home';
import Info from './routes/Info';
import PageError from './routes/PageError';
import './App.css';

function App() {
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
