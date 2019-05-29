import React from 'react';
import ReactDOM from 'react-dom';
import { appService } from './appService';

import { Dashboard } from './dashboard';
import { Visualize } from './visualize';

appService.registerApp({
  id: 'visualize',
  name: 'Visualize',
  mount(context, domElem) {
    ReactDOM.render(<Visualize {...context} />, domElem);
    return () => {
      ReactDOM.unmountComponentAtNode(domElem);
    }
  }
});

appService.registerApp({
  id: 'dashboard',
  name: 'Dashboard',
  mount(context, domElem) {
    ReactDOM.render(<Dashboard {...context} />, domElem);
    return () => {
      ReactDOM.unmountComponentAtNode(domElem);
    }
  }
});

appService.registerApp({
  id: 'management',
  name: 'Management',
  mount(context, domElem) {
    domElem.innerHTML = `
      <h2>Management</h2>
      <div>Non-react app!</div>
    `;
    return () => domElem.innerHTML = '';
  }
})

appService.start(document.getElementById('root'));
