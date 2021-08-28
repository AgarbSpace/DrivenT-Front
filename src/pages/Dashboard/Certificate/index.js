import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import styled from "styled-components";

import useApi from "../../../hooks/useApi";

import UserContext from "../../../contexts/UserContext";

import Loader from "react-loader-spinner";

import DigitalCertificate from "../../../components/Dashboard/Certificate/DigitalCertificate";

export default function Certificate() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [certificateInfo, setCertificateInfo] = useState(null);

  const { userData } = useContext(UserContext);

  const api = useApi();

  useEffect(() => {
    api.event.getEventInfo().then(({ data }) => {
      const today = dayjs();
      const endEventDate = data.endDate;

      if (today.isAfter(endEventDate)) {
        api.certificate.findOrCreate(userData.user.id).then(({ data }) => {
          setCertificateInfo(data);
          setIsAvailable(true);
        });
      }
    });
  }, []);

  return (
    <CertificateContainer>
      {isAvailable ? (
        certificateInfo ? (
          <DigitalCertificate
            color={"#f77dae"}
            attendeeName={"Gustavo Barbosa Santos"}
            activities={["Palestra 1", "Palestra 2", "Palestra 3"]}
            startEventDate={certificateInfo.startEventDate}
            endEventDate={certificateInfo.endEventDate}
            workload={10}
            credentialNumber={certificateInfo.credential}
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
