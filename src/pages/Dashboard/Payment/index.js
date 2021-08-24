import Button from '../../components/Form/Button'

import { Container, ListPayments, ListPaymentItems } from '../../components/Payment'
import { useState  } from 'react';

import InvoiceForm from '../../components/Payment/InvoiceForm'
import PIXForm from '../../components/Payment/PIXForm'
import CreditCardForm from '../../components/Payment/CreditCardForm'

import pixIcon from '../../assets/images/pix-icon.png'
import creditCardIcon from '../../assets/images/credit-card-icon.png'
import invoiceIcon from '../../assets/images/invoice-icon.png'


import { useRef } from 'react';

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState()
  const [paymentFormData, setPaymentFormData] = useState({})

  const formRef = useRef(null)

  const handleChange = (value) => {
    setPaymentMethod(value)
    setPaymentFormData({})

    formRef.current.reset()
  }
  
  const handleInputValue = (inputRef) => {
    setPaymentFormData({
      ...paymentFormData,
      [inputRef.target.name]: inputRef.target.value
    })
  }

  const handlePaymentForm = () => {
    switch(paymentMethod){
      case 'invoice': 
        return <InvoiceForm handleInputValue={handleInputValue} paymentFormData={paymentFormData} />
      case 'credit-card': 
        return <CreditCardForm handleInputValue={handleInputValue} paymentFormData={paymentFormData} />
      case 'pix': 
        return <PIXForm handleInputValue={handleInputValue} paymentFormData={paymentFormData} />
      default: 
        <div />
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    console.log(paymentFormData)
  }

  return (
      <Container ref={formRef} onSubmit={handleFormSubmit}>
        <h1>Forma de pagamento</h1>
        
        <div>
          <ListPayments>
            <ListPaymentItems 
              onClick={() => handleChange('invoice')}
              selected={paymentMethod === 'invoice'}
            >
              <img src={invoiceIcon} alt='icone boleto' />
              <span>Boleto</span>
            </ListPaymentItems>
            <ListPaymentItems 
              onClick={() => handleChange('credit-card')}
              selected={paymentMethod === 'credit-card'}
            >
              <img src={creditCardIcon} alt='icone cartão de crédito' />
              <span>Cartão de crédito</span>
            </ListPaymentItems>
            <ListPaymentItems 
              onClick={() => handleChange('pix')}
              selected={paymentMethod === 'pix'}
            >
              <img src={pixIcon} alt='icone pix' />
              <span>PIX</span>
            </ListPaymentItems>
          </ListPayments>
          
          {paymentMethod && 
            <div>
              {handlePaymentForm()}
            </div>
          }
        </div>
        
        <Button disabled={!paymentMethod} type='submit' color='primary' fullWidth>
          Próximo
        </Button>
    </Container>
  );
}
