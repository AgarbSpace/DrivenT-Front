import { useState, useContext } from "react";

import AuthLayout from "../../layouts/Auth";

import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button"
import Link from "../../components/Link";
import { Column, Title, Label } from "../../components/Auth";

import EventInfoContext from "../../contexts/EventInfoContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingSignIn, setLoadingSignIn] = useState(false);

  const { eventInfo } = useContext(EventInfoContext);
  
  function submit(event) {
    event.preventDefault();
    setLoadingSignIn(true);
  } 

  return (
    <AuthLayout background={eventInfo.backgroundImage}>
      <Column>
        <img src={eventInfo.logoImage} alt="Event Logo" />
        <Title>{eventInfo.eventTitle}</Title>
      </Column>
      <Column>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>Entrar</Button>
        </form>
      </Column>
      <Column>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Column>
    </AuthLayout>
  );
}
