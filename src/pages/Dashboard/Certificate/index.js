import { useEffect, useState } from "react";
import styled from "styled-components";

import DigitalCertificate from "../../../components/Dashboard/Certificate/DigitalCertificate";

export default function Certificate() {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const today = new Date();
    const endEventDate = new Date("2021-08-23");

    if (today > endEventDate) setIsAvailable(true);
  });

  return (
    <CertificateContainer>
      {isAvailable ? (
        <DigitalCertificate
          color={"#f77dae"}
          attendeeName={"Gustavo Barbosa Santos"}
          activities={["Palestra 1", "Palestra 2", "Palestra 3"]}
          startEventDate={"2021-08-20T20:30:00.000Z"}
          endEventDate={"2021-08-25T20:30:00.000Z"}
          workload={10}
          credentialNumber={"abcd-efgh-ijkl-mnop"}
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
