import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import CreateForm from './CreateForm';
import * as Utils from './Utils';
import siteSettings from '../site-settings.json';
import store from './store/store';

const CreatePage = () => (
  <div
    className="c-Create"
    style={Utils.hexToRgb(siteSettings.colors)}
  >
    <header className="c-Create__title">Create Page</header>
    <CreateForm />
  </div>
);

render(
  <Provider store={store}>
    <CreatePage />
  </Provider>,
  document.getElementById('root'),
);
