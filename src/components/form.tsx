import React from 'react';
import './form.scss';

interface Card {
  cardNumber: string
  holderName: string
  cvv: string
  expirationMonth: string
  expirationYear: string
  isFlipped: boolean
  isInputFocused: boolean
  elementFocused: string  
}

export default class Form extends React.Component<{}, Card> {
  
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
        <div className='p-form'>
          <div className='p-form__group'>
            <label htmlFor='cardNumber' className='p-form__label'>Card Number</label>
            <input type='text' id='cardNumber' className='p-form__input'/>
          </div>
        </div>
      </div>
    )
  }
}