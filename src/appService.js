import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// We must create our own history so that we can manipulate it across
// applications.
const history = createBrowserHistory();

const AppService = () => (
  <Router history={history}>
    <h1>Kibana</h1>
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {[...apps.values()].map(app => (
            <li>
              <Link to={`/app/${app.id}`}>{app.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>

    <Route path="/" exact render={() => <h2>Home</h2>} />
    <Route path="/app/:appId" component={AppContainer} />
  </Router>
)

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.containerDiv = React.createRef();
  }

  componentDidMount() {
    this.mountApp();
  }

  componentWillUnmount() {
    this.unmountApp();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.appId !== this.props.match.params.appId)  {
      this.unmountApp();
      this.mountApp();
    }
  }

  mountApp() {
    const app = apps.get(this.props.match.params.appId);
    this.unmountFunc = app.mount(this.createMountContext(), this.containerDiv.current);
  }

  unmountApp() {
    this.unmountFunc();
  }

  render() {
    return <div key={this.props.match.params.appId} ref={this.containerDiv} />;
  }

  createMountContext() {
    return {
      basename: this.props.match.url,
      navigateToAppLink(appId, path) {
        history.push(
          `/app/${appId}${path}`
        );
      }
    }
  }
}

const apps = new Map();

export const appService = {
  registerApp(app) {
    apps.set(app.id, app);
  },

  start(domElement) {
    ReactDOM.render(
      <AppService />,
      domElement
    );
  },
}
