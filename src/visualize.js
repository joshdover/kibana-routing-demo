import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

export const Visualize = ({ basename }) => (
  <BrowserRouter basename={basename}>
    <h2>Visualize</h2>

    <div>
      <nav>
        <ul>
          <li><Link to="/new">New</Link></li>
        </ul>
      </nav>
    </div>

    <Route path="/" exact render={() => <h3>Home</h3>} />
    <Route path="/new" exact render={() => <h3>New Visualization</h3>} />
  </BrowserRouter>
)
