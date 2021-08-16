import { useContext } from "react";
import styled from "styled-components";

import Timer from "./Timer";

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

const Page = styled.div`
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 48px;

  & > *:not(:last-child) {
    margin-bottom: 24px;
  }
`;
