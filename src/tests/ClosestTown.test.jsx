import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import ClosestTown from '../components/ClosestTown';

test('List of Cities', () => {
    const { asFragment } = render(
        <Provider store={store}>
            <Router>
                <ClosestTown />
            </Router>
        </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
});