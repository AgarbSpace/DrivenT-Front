import PaymentForm from '../../../components/PaymentForm';
import TicketSelection from '../../../components/TicketSelection';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { Box } from '@material-ui/core';
import useTypeOfEnrollment from '../../../hooks/api/useTypeOfEnrolmment';

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
  const [hasTicket, setHasTicket] = useState(false);

  const { enrollment, enrollmentLoading } = useEnrollment();
  const { getTypeOfEnrollment } = useTypeOfEnrollment();

  useEffect(() => {
    if (enrollment) {
      handleHasTicket();
    }
  }, [enrollmentLoading]);

  async function handleHasTicket() {
    const { typeId: typeofEnrollment } = await getTypeOfEnrollment(enrollment.id);

    if (!typeofEnrollment) return;

    setHasTicket(true);
    setBookTicket(true);

    if (typeofEnrollment === 1) {
      setTicketModality('Online');
      setIncludeHotel('');
      setTotal(100);
    }

    if (typeofEnrollment === 2) {
      setTicketModality('Presencial');
      setIncludeHotel('no');
      setTotal(250);
    }

    if (typeofEnrollment === 3) {
      setTicketModality('Presencial');
      setIncludeHotel('yes');
      setTotal(600);
    }
  }

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
            hasTicket={hasTicket}
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
  bookTicket,
  hasTicket
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

      {bookTicket &&
        <PaymentForm
          ticketModality={ticketModality}
          includeHotel={includeHotel}
          total={total}
          hasTicket={hasTicket}
        />
      }
    </>
  );
}

const Title = styled.h4`
  font-family: 'Roboto';
  font-size: 34px;
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
