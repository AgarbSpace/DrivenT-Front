import { Box } from '@material-ui/core';
import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { toast } from 'react-toastify';
import { CardContainer, CardForm, FlexContainer, SubmitButton } from '../Styleds';

export default class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(!this.state.cvc || !this.state.expiry || !this.state.name ||!this.state.number) {
      toast('Não foi possível salvar suas informações!');
    }
  }
  
  render() {
    return (
      <Box>
        <CardContainer>
          <Cards
            cvc={this.state.cvc}
            expiry={this.state.expiry}
            focused={this.state.focus}
            name={this.state.name}
            number={this.state.number}
          />
          <CardForm onSubmit={this.handleSubmit}>
        	  <input
              type="tel"
              name="number"
              placeholder="Card Number"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
        	  <input
              type="tel"
              name="name"
              placeholder="Name"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <FlexContainer>
        	    <input
                type="tel"
                name="expiry"
                placeholder="Valid Thru"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
        	    <input
                type="tel"
                name="cvc"
                placeholder="Cvc"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </FlexContainer>
          </CardForm>
        </CardContainer>
        <SubmitButton type='submit' onClick={this.handleSubmit}>FINALIZAR PAGAMENTO</SubmitButton>
      </Box>
    );
  }
}
