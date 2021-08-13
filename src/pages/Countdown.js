import * as eventApi from "../services/event";

export default function Countdown() {
  const [eventInfo, loadingEventInfo] = eventApi.getInfo();

  if (loadingEventInfo) {
    return "Loading...";
  }

  return (
    <>
      <h1>{eventInfo.startDate}</h1>
    </>
  );
}