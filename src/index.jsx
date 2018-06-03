import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './css/musiclist.scss';

import Store from './store';

import TemplateContainer from './components/TemplateContainer';

const renderApp = (Component) => {
  render(
    <AppContainer>
      <Provider store={Store} >
        <Component headline="Test Headline" />
      </Provider>
    </AppContainer>,
    document.querySelector('#react-app'),
  );
};

renderApp(TemplateContainer);

if (module && module.hot) {
  module.hot.accept('./components/TemplateContainer', () => {
    renderApp(TemplateContainer);
  });
}
