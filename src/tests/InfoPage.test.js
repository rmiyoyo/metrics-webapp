import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import InfoPage from '../components/InfoPage';

test('Details Page', () => {
    const { asFragment } = render(
        <Provider store={store}>
            <Router>
                <InfoPage />
            </Router>
        </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
});