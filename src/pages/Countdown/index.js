import { useContext } from "react";

import Timer from "./Timer";
import Page from "../../components/Page";

import EventInfoContext from "../../contexts/EventInfoContext";

export default function Countdown() {
  const { eventInfo, loadingEventInfo } = useContext(EventInfoContext);

  if (loadingEventInfo) {
    return "Loading...";
  }

  return (
    <Page backgroundImage={eventInfo.backgroundImage}>
      <div>Faltam</div>
      <Timer time={eventInfo.startDate} />
      <div>Para as inscrições</div>
    </Page>
  );
}
