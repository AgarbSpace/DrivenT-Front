import Button from '../../../components/Form/Button'

import { Container, ListPayments, ListPaymentItems } from '../../../components/Payment'
import { useState  } from 'react';

import InvoiceForm from '../../../components/Payment/InvoiceForm'
import PIXForm from '../../../components/Payment/PIXForm'
import CreditCardForm from '../../../components/Payment/CreditCardForm'

import pixIcon from '../../../assets/images/pix-icon.png'
import creditCardIcon from '../../../assets/images/credit-card-icon.png'
import invoiceIcon from '../../../assets/images/invoice-icon.png'

import { useForm } from '../../../hooks/useForm'
import { useRef } from 'react';


export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState('')

  const formRef = useRef(null)
  
  const handleFormInitialValue = () => {
    switch(paymentMethod){
      case 'invoice': 
        return {
          name: '',
          cpf: ''
        }
      case 'credit-card':
        return {
          cardNumber: '',
          name: '',
          cpf: '',
          securityCode: '',
          expirationDate: '',
          plots: ''
        }
      case 'pix':
        return {
          name: '',
          cpf: ''
        }
      default: return {}
    }
  }

  const { 
    handleSubmit,
    handleChange, 
    data, 
    // error, 
    setData,
  } = useForm({
    onSubmit: (data) => console.log({
      ...data,
      paymentMethod
    }),
    initialValues: handleFormInitialValue()
  })
  
  const handlePaymentForm = () => {
    switch(paymentMethod){
      case 'invoice': 
        return <InvoiceForm handleInputValue={handleChange} paymentFormData={data} />
      case 'credit-card': 
        return <CreditCardForm handleInputValue={handleChange} paymentFormData={data} />
      case 'pix': 
        return <PIXForm handleInputValue={handleChange} paymentFormData={data} />
      default: 
        <div />
    }
  }
  
  const handlePaymentMethod = (method) => {
    setPaymentMethod(method)
    setData(handleFormInitialValue())
  }

  return (
      <Container ref={formRef} onSubmit={handleSubmit}>
        <h1>Forma de pagamento</h1>
        
        <div>
          <ListPayments>
            <ListPaymentItems 
              onClick={() => handlePaymentMethod('invoice')}
              selected={paymentMethod === 'invoice'}
            >
              <img src={invoiceIcon} alt='icone boleto' />
              <span>Boleto</span>
            </ListPaymentItems>
            <ListPaymentItems 
              onClick={() => handlePaymentMethod('credit-card')}
              selected={paymentMethod === 'credit-card'}
            >
              <img src={creditCardIcon} alt='icone cartão de crédito' />
              <span>Cartão de crédito</span>
            </ListPaymentItems>
            <ListPaymentItems 
              onClick={() => handlePaymentMethod('pix')}
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
