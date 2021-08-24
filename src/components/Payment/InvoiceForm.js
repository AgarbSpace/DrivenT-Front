import React from 'react';

import Input from '../../components/Form/Input'

function InvoiceForm({
    handleInputValue, 
    paymentFormData
}) {
  return (
    <div>
        <h2>Dados de pagamento</h2>
        <div>
            <Input name='name' value={paymentFormData.name} onChange={handleInputValue} type="text" fullWidth label='Nome completo'/>
            <Input name='cpf' value={paymentFormData.cpf} onChange={handleInputValue} type="text" fullWidth label='CPF do titular'/>
            <Input name='address' value={paymentFormData.address} onChange={handleInputValue} type="text" fullWidth label='Endereço'/>
        </div>
    </div>
    );
}

export default InvoiceForm;