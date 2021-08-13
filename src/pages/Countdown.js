import { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import useInterval from "react-useinterval";

import * as eventApi from "../services/event";

export default function Countdown() {
  const [eventInfo, loadingEventInfo] = eventApi.getInfo();
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    if (eventInfo) setTimeRemaining(diffToDate(eventInfo.startDate));
  }, [eventInfo]);

  useInterval(() => {
    if (timeRemaining) {
      let { days, hours, minutes, seconds } = timeRemaining;

      seconds--;
      if (seconds < 0) {
        minutes--;
        seconds = 59;
      }
      if (minutes < 0) {
        hours--;
        minutes = 59;
      }
      if (hours < 0) {
        days--;
        hours = 23;
      }

      setTimeRemaining({ days, hours, minutes, seconds });
    }
  }, 1000);

  if (loadingEventInfo) {
    return "Loading...";
  }

  return (
    <Page backgroundImage={eventInfo.backgroundImage}>
      <h1>
        {`${timeRemaining.days}`.padStart(2, "0")}
        :
        {`${timeRemaining.hours}`.padStart(2, "0")}
        :
        {`${timeRemaining.minutes}`.padStart(2, "0")}
        :
        {`${timeRemaining.seconds}`.padStart(2, "0")}</h1>
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
`;

function diffToDate(date) {
  const now = dayjs();
  let to = dayjs(date);

  const days = to.diff(now, "days");
  to = to.add(-days, "days");

  const hours = to.diff(now, "hours");
  to = to.add(-hours, "hours");

  const minutes = to.diff(now, "minutes");
  to = to.add(-minutes, "minutes");

  const seconds = to.diff(now, "seconds");

  return {
    days,
    hours,
    minutes,
    seconds
  };
}
