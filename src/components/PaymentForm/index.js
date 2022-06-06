import { Box } from '@material-ui/core';
import { Modality, PaymentSubTitles, Price, TicketModality } from './Styleds';
import 'react-credit-cards/es/styles-compiled.css';
import React, { useEffect, useState } from 'react';
import CardData from './CardData';

export default function PaymentForm({ ticketModality, total, includeHotel }) {
  const [hotelIncluded, setHotelIncluded] = useState(' + com hotel');

  useEffect(() => {
    if(includeHotel === 'no') {
      setHotelIncluded(' + sem hotel');
    }
    if(ticketModality === 'online') {
      setHotelIncluded('');
    }
  }, []);
  
  return (
    <>
      <Box>
        <PaymentSubTitles>Ingresso escolhido</PaymentSubTitles>
        <TicketModality>
          <Modality>{ticketModality}{hotelIncluded}</Modality>
          <Price>{total}</Price>
        </TicketModality>
      </Box>
      <Box>
        <PaymentSubTitles>Pagamento</PaymentSubTitles>
        <CardData />
      </Box>
    </>
  );
}

