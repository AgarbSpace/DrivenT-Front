import styled from "styled-components";

import {
  FaFileContract,
  FaMoneyBill,
  FaBed,
  FaCalendarWeek,
  FaCertificate
} from "react-icons/fa";

import NavigationButton from "./NavigationButton";

export default function NavigationBar() {
  return (
    <Container>
      <NavigationButton>
        <FaFileContract />
        <span>Inscrição</span>
      </NavigationButton>

      <NavigationButton>
        <FaMoneyBill />
        <span>Pagamento</span>
      </NavigationButton>

      <NavigationButton>
        <FaBed />
        <span>Hotel</span>
      </NavigationButton>
      
      <NavigationButton>
        <FaCalendarWeek />
        <span>Atividades</span>
      </NavigationButton>

      <NavigationButton>
        <FaCertificate />
        <span>Certificado</span>
      </NavigationButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #A7A7A7;
  width: 100px;
  flex-shrink: 0;
  justify-content: space-between;

  @media (max-width: 600px) {
    width: 100%;
    height: 80px;
    flex-direction: row;
  }
`;
