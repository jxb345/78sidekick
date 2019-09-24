import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from "history";
import App from './App.jsx';
import Info from './Info.jsx';
import About from './About.jsx';

const history = createBrowserHistory();


class Wrapper extends React.Component {

  render() {
    return (
      <Router history={history}>
        <Link to={App}></Link>
        <Route exact={true} path="/" component={App} />
        <Link to={Info} target="_blank"></Link>
        <Route path="/info" component={Info} />
      </Router>
    )
  }
}

export default Wrapper;