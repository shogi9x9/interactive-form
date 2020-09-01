import React from 'react';
import Form from './form';
import Card from './card';

interface cardState {
  cardNumber: string
  holderName: string
  cvv: string
  expirationMonth: string
  expirationYear: string
  isFlipped: boolean
  isInputFocused: boolean
  elementFocused: string  
}

export default class CreditForm extends React.Component<{}, cardState> {
  
  constructor(props: object) {
    super(props);
    this.state = {
      cardNumber: 'XXXX XXXX XXXX',
      holderName: 'Name',
      cvv: 'XXX',
      expirationMonth: 'XX',
      expirationYear: 'XX',
      isFlipped: false,
      isInputFocused: false,
      elementFocused: ''  
    };
  }

  render() {
    return (
      <div className='p-creditCardForm'>
        <Card />
        <Form />
      </div>
    )
  }
}