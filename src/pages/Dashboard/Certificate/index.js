import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import UserContext from "../../../contexts/UserContext";

import DigitalCertificate from "../../../components/Dashboard/Certificate/DigitalCertificate";
import useApi from "../../../hooks/useApi";

export default function Certificate() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [certificateInfo, setCertificateInfo] = useState(null);

  const { userData } = useContext(UserContext);

  const api = useApi();

  useEffect(() => {
    const today = new Date();
    const endEventDate = new Date("2021-08-23");

    if (today > endEventDate) setIsAvailable(true);
  }, []);

  useEffect(() => {
    api.certificate.get(userData.user.id).then(({ data }) => {
      setCertificateInfo(data);
    });
  }, []);

  return (
    <CertificateContainer>
      {certificateInfo && isAvailable ? (
        <DigitalCertificate
          color={"#f77dae"}
          attendeeName={"Gustavo Barbosa Santos"}
          activities={["Palestra 1", "Palestra 2", "Palestra 3"]}
          startEventDate={certificateInfo.startEventDate}
          endEventDate={"2021-08-25T20:30:00.000Z"}
          workload={10}
          credentialNumber={certificateInfo.credential}
        />
      ) : (
        <p>O certificado digital ainda não está disponível.</p>
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
