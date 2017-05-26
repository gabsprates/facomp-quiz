import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './AppContainer';

// Movido para configuração do webpack
// import '../sass/style.scss';

const renderApplication = (Component) => {
  ReactDOM.render((
    <AppContainer>
      <Component />
    </AppContainer>
  ), document.querySelector('#quiz'));
}

renderApplication(App);
if (module.hot) {
  module.hot.accept('./AppContainer', () => { renderApplication(App); });
}
