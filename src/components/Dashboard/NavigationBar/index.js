import { Link, useRouteMatch } from "react-router-dom";

import styled from "styled-components";

import {
  FaFileContract,
  FaMoneyBill,
  FaBed,
  FaCalendarWeek,
  FaCertificate,
} from "react-icons/fa";

import NavigationButton from "./NavigationButton";

export default function NavigationBar() {
  const match = useRouteMatch();

  return (
    <Container>
      <Link to={`${match.path}/subscription`}>
        <NavigationButton>
          <FaFileContract />
          <span>Inscrição</span>
        </NavigationButton>
      </Link>

      <Link to={`${match.path}/payment`}>
        <NavigationButton>
          <FaMoneyBill />
          <span>Pagamento</span>
        </NavigationButton>
      </Link>

      <Link to={`${match.path}/hotel`}>
        <NavigationButton>
          <FaBed />
          <span>Hotel</span>
        </NavigationButton>
      </Link>

      <Link to={`${match.path}/activity`}>
        <NavigationButton>
          <FaCalendarWeek />
          <span>Atividades</span>
        </NavigationButton>
      </Link>

      <Link to={`${match.path}/certificate`}>
        <NavigationButton>
          <FaCertificate />
          <span>Certificado</span>
        </NavigationButton>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #a7a7a7;
  width: 100px;
  flex-shrink: 0;
  justify-content: space-between;

  > a {
    text-decoration: none;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 80px;
    flex-direction: row;
  }
`;
