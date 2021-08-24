import React from 'react';

import Input from '../../components/Form/Input'
import { PaymentInfosForm, FormRow  } from './'

function CreditCardForm({
    handleInputValue, 
    paymentFormData
}) {
  return(
    <div>
        <h2>Informações do cartão</h2>
        <PaymentInfosForm>
            <Input name='cardNumber' value={paymentFormData.cardNumber} onChange={handleInputValue} type="text" fullWidth label='Número do cartão'/>
            <Input name='name' value={paymentFormData.name} onChange={handleInputValue} type="text" fullWidth label='Nome completo'/>
            <Input name='cpf' value={paymentFormData.cpf} onChange={handleInputValue} type="text" fullWidth label='CPF do titular'/>
           
            <FormRow>
                <Input name='securityCode' type='number' value={paymentFormData.securityCode} onChange={handleInputValue} label='Código de segurança'/>
                <Input name='expirationDate' value={paymentFormData.expirationDate} onChange={handleInputValue} type="text" label='Data de vencimento'/>
            </FormRow>
            <Input name='plots' type='number' value={paymentFormData.securityCode} onChange={handleInputValue} label='Parcelas'/>
        </PaymentInfosForm>
    </div>
  );
}

export default CreditCardForm;