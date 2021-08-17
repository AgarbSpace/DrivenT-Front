import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

import Page from "../../components/Page";
import Container from "../../components/Container";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";

import EventInfoContext from "../../contexts/EventInfoContext";

import { useEnroll } from "../../hooks/useApi/enrollment";

export default function Enroll() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [, loadingEnroll, enrollError,, enroll] = useEnroll(email, password);
  
  const { eventInfo } = useContext(EventInfoContext);

  useEffect(() => {
    if (enrollError) {
      if (enrollError.response) {
        for (const detail of enrollError.response.data.details) {
          toast(detail);
        }
      } else {
        toast("Não foi possível conectar ao servidor!");
      }
    }
  }, [enrollError]);

  function submit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast("As senhas devem ser iguais!");
    } else {
      enroll();
    }
  }

  return (
    <Page background={eventInfo.backgroundImage}>
      <StyledContainer width="400px" height="520px">
        <Column>
          <img src={eventInfo.logoImage} alt="Event Logo" />
          <Title>{eventInfo.eventTitle}</Title>
        </Column>
        <Column>
          <Label>Inscrição</Label>
          <form onSubmit={submit}>
            <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
            <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
            <Input label="Repita sua senha" type="password" fullWidth value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <Button type="submit" color="primary" fullWidth disabled={loadingEnroll}>Inscrever</Button>
          </form>
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
