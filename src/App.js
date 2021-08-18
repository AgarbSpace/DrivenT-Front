import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { useContext } from "react";
import dayjs from "dayjs";
import { ToastContainer } from "react-toastify";

import ConditionalRoute from "./components/Router/ConditionalRoute";

import Countdown from "./pages/Countdown";
import Enroll from "./pages/Enroll";

import EventInfoContext, { EventInfoProvider } from "./contexts/EventInfoContext";
import { UserProvider } from "./contexts/UserContext";

export default function App() {
  return (
    <>
      <ToastContainer />
      <EventInfoProvider>
        <UserProvider>
          <Router>
            <Switch>
              <ConditionalRoute check={ensureCountdownOngoing} path="/" exact>
                <Countdown />
              </ConditionalRoute>

              <ConditionalRoute check={ensureCountdownOver} path="/enroll" exact>
                <Enroll />
              </ConditionalRoute>
            </Switch>
          </Router>
        </UserProvider>
      </EventInfoProvider>
    </>
  );
}

function ensureCountdownOngoing() {
  const { eventInfo } = useContext(EventInfoContext);

  return [
    { to: "/enroll", check: () => dayjs().isBefore(dayjs(eventInfo.startDate)) }
  ];
}

function ensureCountdownOver() {
  const { eventInfo } = useContext(EventInfoContext);

  return [
    { to: "/", check: () => dayjs().isAfter(dayjs(eventInfo.startDate)), message: "As inscrições não foram liberadas ainda!" }
  ];
} 
