import { Box } from '@material-ui/core';
import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { toast } from 'react-toastify';
import { postTicket } from '../../../services/ticket';
import { CardContainer, CardForm, Confirmation, ConfirmationTexts, FlexContainer, SubmitButton } from '../Styleds';

export default class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
    confirmed: false
  };

  ticket = {
    modality: '',
    includeHotel: '',
    token: ''
  }

  constructor(props) {
    super(props);

    if (props.ticketModality === 'Online') {
      this.ticket = { modality: 'Online', includeHotel: false, token: props.token };
      return;
    }

    this.ticket = { modality: props.ticketModality };

    if (props.includeHotel === 'no') {
      this.ticket = { ...this.ticket, includeHotel: false, token: props.token };
      return;
    }

    this.ticket = { ...this.ticket, includeHotel: true, token: props.token };
  }

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  // eslint-disable-next-line space-before-function-paren
  handleSubmit = async (e) => {
    if (!this.state.cvc || !this.state.expiry || !this.state.name || !this.state.number) {
      toast('Não foi possível salvar suas informações!');
      return;
    }
    try {
      await postTicket(this.ticket);
      this.setState({ confirmed: true });
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  }

  render() {
    return (
      <Box>
        {this.state.confirmed === false ?
          <>
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
          </>
          :
          <>
            <Confirmation>
              <ion-icon name="checkmark-circle"></ion-icon>
              <ConfirmationTexts>
                <span>Pagamento confirmado!</span>
                <span>Prossiga para escolha de hospedagem e atividades</span>
              </ConfirmationTexts>
            </Confirmation>
          </>}
      </Box>
    );
  }
}
