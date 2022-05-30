import PaymentForm from '../../../components/PaymentForm';
import TicketSelection from '../../../components/TicketSelection';
import styled from 'styled-components';
import { useState } from 'react';

export default function Payment() {
  const [ticketModality, setTicketModality] = useState('');
  const [includeHotel, setIncludeHotel] = useState('');
  const [total, setTotal] = useState(0);
  const [bookTicket, setBookTicket] = useState(false);

  return (
    <>
      <Title>Ingresso e pagamento</Title>

      {!bookTicket &&
        <TicketSelection
          ticketModality={ticketModality}
          setTicketModality={setTicketModality}
          includeHotel={includeHotel}
          setIncludeHotel={setIncludeHotel}
          total={total}
          setTotal={setTotal}
          setBookTicket={setBookTicket}
        />
      }

      {bookTicket && <PaymentForm />}
    </>
  );
}

const Title = styled.h4`
  font-family: 'Roboto';
  font-size: 34px;
  
  padding-bottom: 40px;
`;
