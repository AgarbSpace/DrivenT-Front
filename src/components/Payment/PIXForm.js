import React from 'react';

import Input from '../../components/Form/Input'
import { PaymentInfosForm  } from './'

function PIXForm({
    handleInputValue, 
    paymentFormData
}) {
  return (
      <div>
        <h2>Dados de pagamento</h2>
        <PaymentInfosForm>
            <Input name='name' value={paymentFormData.name} onChange={handleInputValue} type="text" fullWidth label='Nome completo'/>
            <Input name='cpf' value={paymentFormData.cpf} onChange={handleInputValue} type="text" fullWidth label='CPF do titular'/>
        </PaymentInfosForm>
      </div>
  );
}

export default PIXForm;