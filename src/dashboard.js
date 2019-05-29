import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

export const Dashboard = ({ basename, navigateToAppLink }) => (
  /* Apps must use the provided basename to configure their router */
  <BrowserRouter basename={basename}>
    <h2>Dashboard</h2>

    {/* To navigate across apps, use the goToAppLink function */}
    <button onClick={() => navigateToAppLink('visualize', '/new')}>New Visualization</button>
  </BrowserRouter>
)
