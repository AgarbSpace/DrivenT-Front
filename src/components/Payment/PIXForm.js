import React from "react";

import Input from "../../components/Form/Input";
import { PaymentInfosForm  } from "./";

function PIXForm({
  handleInputValue, 
  paymentFormData
}) {
  return (
    <div>
      <h2>Dados de pagamento</h2>
      <PaymentInfosForm>
        <Input 
          name='name' 
          value={paymentFormData.name} 
          onChange={(e) => handleInputValue("name")(e)} 
          type="text" 
          fullWidth 
          label='Nome completo'
        />
        <Input 
          name='cpf' 
          maxLength="14"
          mask="999.999.999-99"
          value={paymentFormData.cpf} 
          onChange={(e) => handleInputValue("cpf")(e)} 
          type="text" 
          fullWidth 
          label='CPF'
        />
      </PaymentInfosForm>
    </div>
  );
}

export default PIXForm;
