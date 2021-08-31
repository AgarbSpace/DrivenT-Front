import React from "react";

import Input from "../../components/Form/Input";
import { PaymentInfosForm, FormRow  } from "./";

function CreditCardForm({
  handleInputValue, 
  paymentFormData
}) {
  return(
    <div>
      <h2>Informações do cartão</h2>
      <PaymentInfosForm>
        <Input name='cardNumber' value={paymentFormData.cardNumber} onChange={(e) => handleInputValue("cardNumber")(e)} type="text" fullWidth label='Número do cartão'/>
        <Input name='name' value={paymentFormData.name} onChange={(e) => handleInputValue("name")(e)} type="text" fullWidth label='Nome completo'/>
        <Input 
          name='cpf' 
          value={paymentFormData.cpf} 
          onChange={(e) => handleInputValue("cpf")(e)} 
          type="text" 
          fullWidth 
          label='CPF do titular'
          maxLength="14"
          mask="999.999.999-99"
        />
           
        <FormRow>
          <Input name='securityCode' type='number' value={paymentFormData.securityCode} onChange={(e) => handleInputValue("securityCode")(e)} label='Código de segurança'/>
          <Input name='expirationDate' type='date' value={paymentFormData.expirationDate} onChange={(e) => handleInputValue("expirationDate")(e)} label='Data de vencimento'/>
        </FormRow>
        <Input name='plots' type='number' value={paymentFormData.plots} onChange={(e) => handleInputValue("plots")(e)} label='Parcelas'/>
      </PaymentInfosForm>
    </div>
  );
}

export default CreditCardForm;
