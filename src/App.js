import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Countdown from "./pages/Countdown";
import Enroll from "./pages/Enroll";

import { EventInfoProvider } from "./contexts/EventInfoContext";

export default function App() {
  return (
    <EventInfoProvider>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Countdown />
          </Route>

          <Route path="/enroll" exact>
            <Enroll />
          </Route>
        </Switch>
      </Router>
    </EventInfoProvider>
  );
}
