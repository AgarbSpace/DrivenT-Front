import { Box } from '@material-ui/core';
import { Modality, PaymentSubTitles, Price, TicketModality } from './Styleds';
import 'react-credit-cards/es/styles-compiled.css';
import React from 'react';
import CardData from './CardData';

export default function PaymentForm() {
  return (
    <>
      <Box>
        <PaymentSubTitles>Ingresso escolhido</PaymentSubTitles>
        <TicketModality>
          <Modality>Presencial + Com Hotel</Modality>
          <Price>R$ 600</Price>
        </TicketModality>
      </Box>
      <Box>
        <PaymentSubTitles>Pagamento</PaymentSubTitles>
        <CardData />
      </Box>
    </>
  );
}

