import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import TownList from '../components/Townlist';
import store from './.redux';

const sampleTowns = [
  {
    city: 'City1',
    weather: {
      icon: 'sunny',
      temp: 25,
      hu: 50,
      ws: 5,
    },
    aqi: 30,
  },
  {
    city: 'City2',
    weather: {
      icon: 'cloudy',
      temp: 18,
      hu: 65,
      ws: 3,
    },
    aqi: 45,
  },
];

describe('TownList Component', () => {
  it('should render the component without crashing', () => {
    const { container } = render(
      <Provider store={store}>
        <TownList />
      </Provider>,
    );
    expect(container).toBeInTheDocument();
  });

  it('should render town items when data is available', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TownList />
      </Provider>,
    );

    sampleTowns.forEach((town) => {
      const cityName = getByText(town.city);
      expect(cityName).toBeInTheDocument();
    });
  });

  it('should call handleClick when a town is clicked', () => {
    const mockDispatch = jest.fn();
    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useDispatch: () => mockDispatch,
    }));

    const { getByText } = render(
      <Provider store={store}>
        <TownList />
      </Provider>,
    );

    const cityItem = sampleTowns[0];
    const cityName = getByText(cityItem.city);

    fireEvent.click(cityName);

    expect(mockDispatch).toHaveBeenCalledWith(addActiveTown(cityItem));
  });
});
