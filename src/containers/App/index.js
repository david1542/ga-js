import { Router } from 'react-router-dom';
import {RouterSwitch} from '../../components/RouterSwitch';
import {history} from '../../history';

const App = (props) => {
  return (
    <div className="App">
      <Router history={props.history || history}>
        <RouterSwitch />
      </Router>
    </div>
  );
};

export {App};
