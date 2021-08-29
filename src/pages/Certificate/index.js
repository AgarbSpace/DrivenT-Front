import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";

import { toast } from "react-toastify";

import useApi from "../../hooks/useApi";

import EventInfoContext from "../../contexts/EventInfoContext";

import Page from "../../components/Page";
import DigitalCertificate from "../../components/Dashboard/Certificate/DigitalCertificate";

export default function Certificate() {
  const { eventInfo } = useContext(EventInfoContext);
  const { credential } = useParams();

  const [certificateInfo, setCertificateInfo] = useState();

  const api = useApi();

  useEffect(() => {
    api.certificate
      .getByCredential(credential)
      .then(({ data }) => {
        setCertificateInfo(data);
      })
      .catch((err) => {
        if (err.response) {
          toast(err.response.data.message);
        }
      });
  }, []);

  return (
    <Page background={eventInfo.backgroundImage}>
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
            isInDashboardPage={false}
          />
        ) : (
          <p>Certificado inválido.</p>
        )
      ) : (
        <p>Certificado inválido.</p>
      )}
    </Page>
  );
}
