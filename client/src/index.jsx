import 'react-dom';
import App from './components/App.jsx';
import { BrowserRouter } from 'react-router-dom';


// render App component on client
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root"));