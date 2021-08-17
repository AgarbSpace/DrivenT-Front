import { createContext } from "react";

import Splash from "../components/Splash";

import { useGetEventInfo } from "../hooks/useApi/event";

const EventInfoContext = createContext();
export default EventInfoContext;

export function EventInfoProvider({ children }) {
  const [eventInfo, loadingEventInfo, error,, refresh] = useGetEventInfo();

  if (loadingEventInfo) {
    return (
      <Splash loading />
    );
  }

  if (error) {
    let message = error.response ? error.response.data.message : "Could not connect to server. Please try again later.";
    return (
      <Splash message={message} />
    );
  }

  return (
    <EventInfoContext.Provider value={{ eventInfo, loadingEventInfo, eventInfoError: error, refreshEventInfo: refresh }}>
      { children }
    </EventInfoContext.Provider>
  );
}
