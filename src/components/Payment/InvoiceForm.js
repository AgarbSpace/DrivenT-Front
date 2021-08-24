import React from 'react';

import Input from '../../components/Form/Input'
import { PaymentInfosForm  } from './'

function InvoiceForm({
    handleInputValue, 
    paymentFormData
}) {
  return (
    <div>
        <h2>Dados de pagamento</h2>
        <PaymentInfosForm>
            <Input name='name' value={paymentFormData.name} onChange={(e) => handleInputValue('name')(e)} type="text" fullWidth label='Nome completo'/>
            <Input name='cpf' value={paymentFormData.cpf} onChange={(e) => handleInputValue('cpf')(e)} type="text" fullWidth label='CPF'/>
        </PaymentInfosForm>
    </div>
    );
}

export default InvoiceForm;