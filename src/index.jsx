import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import TestComponent from './TestComponent';

const renderApp = (Component) => {
  render(
    <AppContainer>
      <Component headline="Test Headline" />
    </AppContainer>,
    document.querySelector('#react-app'),
  );
};

renderApp(TestComponent);

if (module && module.hot) {
  module.hot.accept('./TestComponent', () => {
    renderApp(TestComponent);
  });
}
