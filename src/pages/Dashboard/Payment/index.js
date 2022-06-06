import PaymentForm from '../../../components/PaymentForm';
import TicketSelection from '../../../components/TicketSelection';
import styled from 'styled-components';
import { useState } from 'react';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { Box } from '@material-ui/core';

const styles = {
  box: {
    display: 'flex',
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default function Payment() {
  const [ticketModality, setTicketModality] = useState('');
  const [includeHotel, setIncludeHotel] = useState('');
  const [total, setTotal] = useState(0);
  const [bookTicket, setBookTicket] = useState(false);

  const { enrollment } = useEnrollment();

  return (
    <>
      <Title>Ingresso e pagamento</Title>
      {
        enrollment === null
          ?
          <Box sx={styles.box}>
            <Text>Você precisa completar sua inscrição antes de prosseguir para escolha de ingresso</Text>
          </Box>
          :
          <HasEnrollment
            ticketModality={ticketModality}
            setTicketModality={setTicketModality}
            includeHotel={includeHotel}
            setIncludeHotel={setIncludeHotel}
            total={total}
            setTotal={setTotal}
            setBookTicket={setBookTicket}
            bookTicket={bookTicket}
          />
      }
    </>
  );
}

function HasEnrollment({
  ticketModality,
  setTicketModality,
  includeHotel,
  setIncludeHotel,
  total,
  setTotal,
  setBookTicket,
  bookTicket
}) {
  return (
    <>
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

      {bookTicket && <PaymentForm ticketModality={ticketModality} includeHotel = {includeHotel} total = {total}/>}
    </>
  );
}

const Title = styled.h4`
  font-family: 'Roboto';
  font-size: 34px;
  
  padding-bottom: 40px;
`;

const Text = styled.h4`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 400;
  width: 50%;
  text-align: center;
  color: #8E8E8E;
  line-height: 23px;
`;
