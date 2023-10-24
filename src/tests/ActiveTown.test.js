import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import ActiveTown from '../components/ActiveTown';

test('Selected City', () => {
    const { asFragment } = render(
        <Provider store={store}>
            <Router>
                <ActiveTown />
            </Router>
        </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
});