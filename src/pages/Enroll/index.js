import { useContext } from "react";

import Page from "../../components/Page";

import EventInfoContext from "../../contexts/EventInfoContext";

export default function Enroll() {
  const { eventInfo, loadingEventInfo } = useContext(EventInfoContext);

  return (
    <Page backgroundImage={eventInfo.backgroundImage}>
      <div>
        {
          loadingEventInfo
            ?
              "carregando..."
            :
              eventInfo.eventTitle
        }
      </div>
    </Page>
  );
}
