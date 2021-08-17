import { useContext } from "react";
import styled from "styled-components";

import Page from "../../components/Page";
import Container from "../../components/Container";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";

import EventInfoContext from "../../contexts/EventInfoContext";

export default function Enroll() {
  const { eventInfo } = useContext(EventInfoContext);
  console.log(eventInfo);

  return (
    <Page background={eventInfo.backgroundImage}>
      <StyledContainer width="400px" height="520px">
        <Column>
          <img src={eventInfo.logoImage} alt="Event Logo" />
          <Title>{eventInfo.eventTitle}</Title>
        </Column>
        <Column>
          <Label>Inscrição</Label>
          <Input label="E-mail" type="text" fullWidth />
          <Input label="Senha" type="password" fullWidth />
          <Input label="Repita sua senha" type="password" fullWidth />
          <Button color="primary" fullWidth>Inscrever</Button>
        </Column>
        <Column>
          &copy; Driven.t
        </Column>
      </StyledContainer>
    </Page>
  );
}

const StyledContainer = styled(Container)`
  font-size: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-top: 10px;
`;

const Label = styled.h1`
  font-size: 24px;
  margin-bottom: 10px
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;
