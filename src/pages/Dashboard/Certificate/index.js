import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import styled from "styled-components";

import useApi from "../../../hooks/useApi";

import UserContext from "../../../contexts/UserContext";
import EventInfoContext from "../../../contexts/EventInfoContext";

import Loader from "react-loader-spinner";

import DigitalCertificate from "../../../components/Dashboard/Certificate/DigitalCertificate";

export default function Certificate() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [certificateInfo, setCertificateInfo] = useState(null);

  const { userData } = useContext(UserContext);
  const { eventInfo } = useContext(EventInfoContext);

  const api = useApi();

  useEffect(() => {
    const today = dayjs();
    const endEventDate = eventInfo.endDate;

    if (today.isAfter(endEventDate)) {
      api.certificate.findOrCreate(userData.user.id).then(({ data }) => {
        setCertificateInfo(data);
        setIsAvailable(true);
      });
    }
  }, []);

  return (
    <CertificateContainer>
      {isAvailable ? (
        certificateInfo ? (
          <DigitalCertificate
            color={"#f77dae"}
            attendeeName={certificateInfo.name}
            activities={["Palestra 1", "Palestra 2", "Palestra 3"]}
            startEventDate={certificateInfo.startEventDate}
            endEventDate={certificateInfo.endEventDate}
            workload={10}
            credentialNumber={certificateInfo.credential}
            isInDashboardPage={true}
          />
        ) : (
          <p>O certificado digital ainda não está disponível.</p>
        )
      ) : (
        <Loader type={"TailSpin"} color={"#f54296"} />
      )}
    </CertificateContainer>
  );
}

const CertificateContainer = styled.div`
  width: 100%;
  height: inherit;

  display: flex;
  justify-content: center;
  align-items: center;

  > p {
    font-size: 32px;
  }
`;
