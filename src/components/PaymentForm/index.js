import { Box, Typography } from '@material-ui/core';
import { Modality, PaymentSubTitles, Price, TicketModality } from './Styleds';
import 'react-credit-cards/es/styles-compiled.css';
import React from 'react';
import CardData from './CardData';

export default function PaymentForm() {
  return ( 
    <>
      <Typography variant="h4">Ingresso e pagamento</Typography>
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

