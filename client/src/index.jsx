import 'react-dom';
import App from './components/App.jsx';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from "history";
const history = createBrowserHistory();



// render App component on client
ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root"));