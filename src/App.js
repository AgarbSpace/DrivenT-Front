import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Countdown from "./pages/Countdown";

import { EventInfoProvider } from "./contexts/EventInfoContext";

export default function App() {
  return (
    <EventInfoProvider>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Countdown />
          </Route>
        </Switch>
      </Router>
    </EventInfoProvider>
  );
}
