import { Box, Typography } from '@material-ui/core';
import styled from 'styled-components';

const PaymentSubTitles = styled(Typography)`
  font-size: 20px!important;
  font-weight: 400!important;
  line-height: 23px!important;
  letter-spacing: 0em!important;
  text-align: left!important;
  color: #8E8E8E!important;
  margin-top: 30px!important;
`;

const TicketModality = styled(Box)`
  width: 290px!important;
  height: 108px!important;

  display: flex!important;
  flex-direction: column!important;
  justify-content: center!important;
  align-items: center!important;

  background-color: #FFEED2!important;
  border-radius: 20px!important;
  margin-top: 17px!important;
`;

const Modality = styled(Typography)`
  font-size: 16px!important;
  font-weight: 400!important;
  line-height: 19px!important;
  letter-spacing: 0em!important;
  text-align: center!important;
`;

const Price = styled(Typography)`
  font-size: 14px!important;
  font-weight: 400!important;
  line-height: 16px!important;
  letter-spacing: 0em!important;
  text-align: center!important;
  color: #898989!important;

  margin-top: 8px!important
`;

const CardContainer = styled(Box)`
  display: flex!important;
  align-items: center!important;
  margin-top: 17px!important;
`;

const CardForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-right: 350px;
  margin-left: 15px;
  gap: 15px;

  input{
      width: 300px;
      height: 50px;
      border-radius: 20px;
      border: 1px solid #898989;
      padding-left: 20px;
  }

`;

const FlexContainer = styled(Box)`
  display: flex;

  input{
      width: 125px;
  }

  input:first-child{
      margin-right: 50px;
  }
`;

const SubmitButton = styled.button`
  width: 250px;
  height: 37px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #E0E0E0;
  border-radius: 4px;
  margin-top: 30px;
  border: none;

  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;

  :hover{
      background-color: #898989;
      cursor: pointer;
  }
`;

const Confirmation = styled.div`
  display: flex;
  margin-top: 19px;

  ion-icon {
    width: 40px;
    height: 40px;
    color: #36B853;
  }
`;

const ConfirmationTexts = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 14px;

  span {
    font-family: 'Roboto';
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;

  }
  
  span:nth-child(2){
    font-weight: 400;
  }
`;

export {
  PaymentSubTitles,
  TicketModality,
  Modality,
  Price,
  CardContainer,
  CardForm,
  FlexContainer,
  SubmitButton,
  Confirmation,
  ConfirmationTexts
};
