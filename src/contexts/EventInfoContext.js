import { createContext } from "react";

import Loading from "../components/Loading";

import { useGetEventInfo } from "../hooks/useApi/event";

const EventInfoContext = createContext();
export default EventInfoContext;

export function EventInfoProvider({ children }) {
  const [eventInfo, loadingEventInfo, error,, refresh] = useGetEventInfo();

  if (loadingEventInfo) {
    return (
      <Loading />
    );
  }

  return (
    <EventInfoContext.Provider value={{ eventInfo, loadingEventInfo, eventInfoError: error, refreshEventInfo: refresh }}>
      { children }
    </EventInfoContext.Provider>
  );
}
