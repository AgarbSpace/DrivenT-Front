import styled from "styled-components";

import Timer from "./Timer";

import * as eventApi from "../../services/event";

export default function Countdown() {
  const [eventInfo, loadingEventInfo] = eventApi.getInfo();

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
