import { Box, Typography } from '@material-ui/core';
import { CardContainer, CardForm, FlexContainer, Modality, PaymentSubTitles, Price, TicketModality } from './Styleds';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useState } from 'react';
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

