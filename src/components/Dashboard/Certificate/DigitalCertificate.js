import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

import dayjs from "dayjs";

import Brand from "../../../assets/images/drivent.png";
import Button from "../../Form/Button";

export default function DigitalCertificate({
  color,
  attendeeName,
  activities,
  startEventDate,
  endEventDate,
  workload,
  credentialNumber,
  isInDashboardPage,
}) {
  const [primaryColor, setPrimaryColor] = useState("#f77dae");

  useEffect(() => {
    setPrimaryColor(color);
  }, [color]);

  const [activitiesGroup, setActivitiesGroup] = useState();

  useEffect(() => {
    let str = "";

    activities.forEach((activity, i) => {
      if (i === 0) str += activity;
      else if (i === activities.length - 1) str += ` e ${activity}`;
      else str += `, ${activity}`;
    });

    setActivitiesGroup(str);
  }, []);

  const firstEventDay = dayjs(startEventDate).format("D/M/YYYY");
  const lastEventDay = dayjs(endEventDate).format("D/M/YYYY");

  const certificate = useRef();

  function downloadCertificate() {
    html2canvas(certificate.current).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, "certificate.png");
      });
    });
  }

  return (
    <CertificateContainer>
      <CertificateWrapper ref={certificate}>
        <Header backgroundColor={primaryColor}>
          <EventBrand>
            <img src={Brand} alt="" />
          </EventBrand>
        </Header>
        <Infos>
          <Attendee>
            <p>Certificamos que</p>
            <p>{attendeeName}</p>
          </Attendee>
          <Subscribes>
            <p>Participou das atividades</p>
            <p>{activitiesGroup}</p>
          </Subscribes>
          <Workload>
            <p>{`Durante os dias ${firstEventDay} a ${lastEventDay}`}</p>
            <p>{`Totalizando uma carga horária estimada em ${workload} horas`}</p>
          </Workload>
        </Infos>
        <Footer>
          <Signature borderColor={primaryColor}>
            <p>Assinado digitalmente por Guga</p>
          </Signature>
          <Credential>
            <p>{`Nº da credencial: ${credentialNumber}`}</p>
          </Credential>
        </Footer>
      </CertificateWrapper>

      <Options>
        <Button onClick={downloadCertificate} color="primary">
          Fazer Download
        </Button>
        {isInDashboardPage && (
          <Link to={`/certificate/credential/${credentialNumber}`}>
            <Button>Visualizar</Button>
          </Link>
        )}
      </Options>
    </CertificateContainer>
  );
}

const CertificateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CertificateWrapper = styled.div`
  width: 850px;
  min-height: 500px;
  padding: 15px;
  border: 15px double #131114;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 18px;
  color: #131114;

  background-color: #fff;
`;

const Header = styled.div`
  width: 100%;
  height: 125px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.backgroundColor};
`;

const Infos = styled.div`
  width: 100%;

  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EventBrand = styled.div`
  object-fit: fill;
  padding: 10px;
  border: 10px double #131114;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #f54296;
`;

const Attendee = styled.div`
  width: 100%;
  padding: 15px 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 24px;

  p:last-child {
    font-size: 32px;
    font-weight: 700;
  }
`;

const Subscribes = styled.div`
  width: 100%;
  padding: 15px 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 24px;

  p:last-child {
    font-size: 16px;
    font-weight: 400;
  }
`;

const Workload = styled.div`
  width: 100%;
  padding: 15px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Footer = styled.div`
  width: 100%;
  height: 65px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Signature = styled.div`
  display: flex;
  justify-content: center;

  p {
    padding: 5px;
    border: 2px dashed ${(props) => props.borderColor};
  }
`;

const Credential = styled.div`
  display: flex;
  justify-content: center;

  opacity: 0.45;
`;

const Options = styled.div`
  display: flex;

  > a {
    text-decoration: none;
  }

  > button {
    margin: 0 10px;
  }
`;
