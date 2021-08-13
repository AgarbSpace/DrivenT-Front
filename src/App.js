import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Countdown from "./pages/Countdown";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Countdown />
        </Route>
      </Switch>
    </Router>
  );
}
