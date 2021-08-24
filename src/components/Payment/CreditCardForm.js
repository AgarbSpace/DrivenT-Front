import React from 'react';

import Input from '../../components/Form/Input'

function CreditCardForm({
    handleInputValue, 
    paymentFormData
}) {
  return(
    <div>
        <h2>Dados de pagamento</h2>
        <div>
            <Input name='cardNumber' value={paymentFormData.cardNumber} onChange={handleInputValue} type="text" fullWidth label='Número do cartão'/>
            <Input name='name' value={paymentFormData.name} onChange={handleInputValue} type="text" fullWidth label='Nome completo'/>
            <Input name='bornDate' value={paymentFormData.bornDate} onChange={handleInputValue} type="text" fullWidth label='Data de vencimento'/>
            <div>
                <Input name='securityCode' type='number' value={paymentFormData.securityCode} onChange={handleInputValue} label='Código de segurança'/>
                <Input mask name='cpf' value={paymentFormData.cpf} onChange={handleInputValue} type="text" label='CPF do titular'/>
            </div>
        </div>
        <div>

        </div>
    </div>
  );
}

export default CreditCardForm;