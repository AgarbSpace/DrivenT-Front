import { Box } from '@material-ui/core';
import { Modality, PaymentSubTitles, Price, TicketModality } from './Styleds';
import 'react-credit-cards/es/styles-compiled.css';
import React, { useEffect, useState } from 'react';
import CardData from './CardData';
import useToken from '../../hooks/useToken';

export default function PaymentForm({ ticketModality, total, includeHotel, hasTicket }) {
  const [hotelIncluded, setHotelIncluded] = useState(' + Com Hotel');
  const token = useToken();

  useEffect(() => {
    if (includeHotel === 'no') {
      setHotelIncluded(' + Sem Hotel');
    }
    if (ticketModality === 'Online') {
      setHotelIncluded('');
    }
  }, []);

  return (
    <>
      <Box>
        <PaymentSubTitles>Ingresso escolhido</PaymentSubTitles>
        <TicketModality>
          <Modality>{ticketModality}{hotelIncluded}</Modality>
          <Price>R$ {total}</Price>
        </TicketModality>
      </Box>
      <Box>
        <PaymentSubTitles>Pagamento</PaymentSubTitles>
        <CardData
          ticketModality={ticketModality}
          includeHotel={includeHotel}
          token={token}
          hasTicket={hasTicket}
        />
      </Box>
    </>
  );
}

